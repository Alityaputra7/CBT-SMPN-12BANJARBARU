import express from 'express';
import http from 'node:http';
import { createServer as createViteServer } from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Import initial seed data for server-side store initialization
import {
  INITIAL_SCHOOL_SETTING,
  INITIAL_OPERATOR,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_EXAMS,
  INITIAL_QUESTION_BANK,
  createInitialStudentSessions,
  INITIAL_AUDIT_LOGS,
  reconcileOfficialTeachersAndSubjects,
  reconcileOfficialMathQuestions,
  reconcileOfficialGrade7Banks,
  reconcileOfficialGrade8Banks,
} from './src/data/seedData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'cbt-store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface CbtStoreData {
  schoolSetting: typeof INITIAL_SCHOOL_SETTING;
  operator: typeof INITIAL_OPERATOR;
  students: typeof INITIAL_STUDENTS;
  teachers: typeof INITIAL_TEACHERS;
  classes: typeof INITIAL_CLASSES;
  subjects: typeof INITIAL_SUBJECTS;
  exams: typeof INITIAL_EXAMS;
  sessions: ReturnType<typeof createInitialStudentSessions>;
  questionBank: typeof INITIAL_QUESTION_BANK;
  auditLogs: typeof INITIAL_AUDIT_LOGS;
}

let storeVersion = 1;
let lastUpdated = Date.now();
let inMemoryStore: CbtStoreData;

function getInitialStore(): CbtStoreData {
  return {
    schoolSetting: INITIAL_SCHOOL_SETTING,
    operator: INITIAL_OPERATOR,
    students: INITIAL_STUDENTS,
    teachers: INITIAL_TEACHERS,
    classes: INITIAL_CLASSES,
    subjects: INITIAL_SUBJECTS,
    exams: INITIAL_EXAMS,
    sessions: createInitialStudentSessions(INITIAL_STUDENTS),
    questionBank: INITIAL_QUESTION_BANK,
    auditLogs: INITIAL_AUDIT_LOGS,
  };
}

function saveStoreToDisk() {
  try {
    const payload = {
      version: storeVersion,
      lastUpdated,
      data: inMemoryStore,
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  } catch (err) {
    console.error('[CBT Server] Failed to save store to disk:', err);
  }
}

try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.data) {
      inMemoryStore = parsed.data;
      storeVersion = parsed.version || 1;
      lastUpdated = parsed.lastUpdated || Date.now();
      const diskReconciled = reconcileOfficialTeachersAndSubjects(
        inMemoryStore.teachers,
        inMemoryStore.subjects
      );
      const mathReconciled = reconcileOfficialMathQuestions(
        inMemoryStore.questionBank,
        inMemoryStore.exams
      );
      const grade7Reconciled = reconcileOfficialGrade7Banks(
        mathReconciled.questionBank,
        mathReconciled.exams
      );
      const grade8Reconciled = reconcileOfficialGrade8Banks(
        grade7Reconciled.questionBank,
        grade7Reconciled.exams
      );
      if (
        diskReconciled.migrated ||
        mathReconciled.migrated ||
        grade7Reconciled.migrated ||
        grade8Reconciled.migrated
      ) {
        inMemoryStore.teachers = diskReconciled.teachers;
        inMemoryStore.subjects = diskReconciled.subjects;
        inMemoryStore.questionBank = grade8Reconciled.questionBank;
        inMemoryStore.exams = grade8Reconciled.exams;
        storeVersion++;
        lastUpdated = Date.now();
        saveStoreToDisk();
        console.log('[CBT Server] Migrated legacy teachers/subjects/question banks on disk to latest official database');
      }
      console.log(`[CBT Server] Loaded existing shared database from ${DATA_FILE} (Version ${storeVersion})`);
    } else {
      inMemoryStore = getInitialStore();
      saveStoreToDisk();
    }
  } else {
    inMemoryStore = getInitialStore();
    saveStoreToDisk();
    console.log(`[CBT Server] Initialized new shared database at ${DATA_FILE}`);
  }
} catch (err) {
  console.error('[CBT Server] Error loading store from disk, fallback to initial seed:', err);
  inMemoryStore = getInitialStore();
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.get('/api/cbt/health', (_req, res) => {
    res.json({
      status: 'ok',
      serverTime: new Date().toISOString(),
      version: storeVersion,
    });
  });

  app.get('/api/cbt/version', (_req, res) => {
    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
    });
  });

  app.get('/api/cbt/data', (_req, res) => {
    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
      data: inMemoryStore,
    });
  });

  app.post('/api/cbt/sync', (req, res) => {
    const { updates } = req.body || {};
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid updates payload' });
    }

    if (updates.schoolSetting) inMemoryStore.schoolSetting = updates.schoolSetting;
    if (updates.operator) inMemoryStore.operator = updates.operator;
    if (Array.isArray(updates.students)) inMemoryStore.students = updates.students;
    if (Array.isArray(updates.teachers)) inMemoryStore.teachers = updates.teachers;
    if (Array.isArray(updates.classes)) inMemoryStore.classes = updates.classes;
    if (Array.isArray(updates.subjects)) inMemoryStore.subjects = updates.subjects;
    if (Array.isArray(updates.exams)) inMemoryStore.exams = updates.exams;
    if (Array.isArray(updates.sessions)) inMemoryStore.sessions = updates.sessions;
    if (updates.questionBank) inMemoryStore.questionBank = updates.questionBank;
    if (Array.isArray(updates.auditLogs)) inMemoryStore.auditLogs = updates.auditLogs;

    storeVersion++;
    lastUpdated = Date.now();
    saveStoreToDisk();

    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
    });
  });

  app.post('/api/cbt/session', (req, res) => {
    const { session } = req.body || {};
    if (!session || !session.id) {
      return res.status(400).json({ success: false, message: 'Invalid student session payload' });
    }

    const idx = inMemoryStore.sessions.findIndex((s: any) => s.id === session.id);
    if (idx >= 0) {
      inMemoryStore.sessions[idx] = session;
    } else {
      inMemoryStore.sessions.push(session);
    }

    storeVersion++;
    lastUpdated = Date.now();
    saveStoreToDisk();

    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
    });
  });

  app.post('/api/cbt/reset', (_req, res) => {
    inMemoryStore = getInitialStore();
    storeVersion++;
    lastUpdated = Date.now();
    saveStoreToDisk();
    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
      data: inMemoryStore,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    app.get('/@vite/client', (_req, res) => {
      res.type('application/javascript');
      res.send(`const sheetsMap = new Map();
export function updateStyle(id, content) {
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-vite-dev-id', id);
    style.textContent = content;
    document.head.appendChild(style);
    sheetsMap.set(id, style);
  } else {
    style.textContent = content;
  }
}
export function removeStyle(id) {
  const style = sheetsMap.get(id);
  if (style) {
    style.remove();
    sheetsMap.delete(id);
  }
}
export function injectQuery(url) {
  return url;
}
export function createHotContext() {
  return {
    data: {},
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    decline() {},
    invalidate() {},
    on() {},
    off() {},
    send() {},
  };
}
export class ErrorOverlay {}
`);
    });

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[CBT Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
