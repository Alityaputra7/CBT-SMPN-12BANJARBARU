import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

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
  INITIAL_AUDIT_LOGS
} from './src/data/seedData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'cbt-store.json');

// Ensure data directory exists
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

// Load store from disk or initialize
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.data) {
      inMemoryStore = parsed.data;
      storeVersion = parsed.version || 1;
      lastUpdated = parsed.lastUpdated || Date.now();
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

const JSONBIN_CONFIG = {
  BIN_ID: '6ae3da16ac6210605a5d7d67',
  MASTER_KEY: '$2a$10$FInWr6nZAYYAmp8/KXrUoOEuDH5NOQ/0oM82MRBKIjynMzb/H5vXO',
  BASE_URL: 'https://api.jsonbin.io/v3/b',
};

async function pushStoreToJsonBin() {
  try {
    const rawJson = JSON.stringify(inMemoryStore);
    const deflated = zlib.deflateSync(rawJson);
    const b64 = deflated.toString('base64');

    const payload = {
      version: storeVersion,
      lastUpdated,
      compressed: true,
      data: b64
    };

    await fetch(`${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
      },
      body: JSON.stringify(payload),
    });
    console.log(`[CBT Server] Synced store to JSONBin.io (Compressed size: ${(b64.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error('[CBT Server] Error pushing to JSONBin:', err);
  }
}

async function loadStoreFromJsonBin() {
  try {
    const res = await fetch(`${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
        'Cache-Control': 'no-cache',
      },
    });
    if (res.ok) {
      const json = await res.json();
      const rec = json.record;
      if (rec) {
        let storeData: any = null;
        if (rec.compressed && typeof rec.data === 'string') {
          const inflated = zlib.inflateSync(Buffer.from(rec.data, 'base64')).toString('utf-8');
          storeData = JSON.parse(inflated);
        } else if (rec.students) {
          storeData = rec;
        }

        if (storeData) {
          if (storeData.schoolSetting) inMemoryStore.schoolSetting = storeData.schoolSetting;
          if (storeData.operator) inMemoryStore.operator = storeData.operator;
          if (Array.isArray(storeData.students)) inMemoryStore.students = storeData.students;
          if (Array.isArray(storeData.teachers)) inMemoryStore.teachers = storeData.teachers;
          if (Array.isArray(storeData.classes)) inMemoryStore.classes = storeData.classes;
          if (Array.isArray(storeData.subjects)) inMemoryStore.subjects = storeData.subjects;
          if (Array.isArray(storeData.exams)) inMemoryStore.exams = storeData.exams;
          if (storeData.questionBank) inMemoryStore.questionBank = storeData.questionBank;
          if (Array.isArray(storeData.sessions)) inMemoryStore.sessions = storeData.sessions;
          if (Array.isArray(storeData.auditLogs)) inMemoryStore.auditLogs = storeData.auditLogs;
          if (rec.version) storeVersion = rec.version;
          if (rec.lastUpdated) lastUpdated = rec.lastUpdated;
          saveStoreToDisk();
          console.log(`[CBT Server] Successfully hydrated from JSONBin.io (Version ${storeVersion}, Questions: ${inMemoryStore.questionBank?.questions?.length || 0})`);
        }
      }
    }
  } catch (err) {
    console.warn('[CBT Server] Unable to load from JSONBin on start:', err);
  }
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

async function startServer() {
  // Hydrate latest data from JSONBin.io at startup
  await loadStoreFromJsonBin();

  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // CORS headers for multi-device cross-origin support if needed
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check
  app.get('/api/cbt/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString(), version: storeVersion });
  });

  // 1. GET /api/cbt/data - Complete database state for cross-device sync
  app.get('/api/cbt/data', (req, res) => {
    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
      data: inMemoryStore,
    });
  });

  // 2. GET /api/cbt/version - Lightweight version check for polling
  app.get('/api/cbt/version', (req, res) => {
    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
    });
  });

  // 3. POST /api/cbt/sync - Batch or partial updates from any device (phone/laptop)
  app.post('/api/cbt/sync', (req, res) => {
    const { updates } = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ success: false, error: 'Missing updates object' });
    }

    // Merge updates into in-memory store
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
    pushStoreToJsonBin();

    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
    });
  });

  // 4. POST /api/cbt/session - Single session real-time sync (heartbeat, answer, finish)
  app.post('/api/cbt/session', (req, res) => {
    const { session } = req.body;
    if (!session || !session.id) {
      return res.status(400).json({ success: false, error: 'Invalid session' });
    }

    const idx = inMemoryStore.sessions.findIndex(s => s.id === session.id);
    if (idx >= 0) {
      inMemoryStore.sessions[idx] = session;
    } else {
      inMemoryStore.sessions.push(session);
    }

    storeVersion++;
    lastUpdated = Date.now();
    saveStoreToDisk();
    pushStoreToJsonBin();

    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
    });
  });

  // 5. POST /api/cbt/reset - Restore factory seed data
  app.post('/api/cbt/reset', (req, res) => {
    inMemoryStore = getInitialStore();
    storeVersion++;
    lastUpdated = Date.now();
    saveStoreToDisk();
    pushStoreToJsonBin();
    res.json({
      success: true,
      version: storeVersion,
      lastUpdated,
      data: inMemoryStore,
    });
  });

  // In development: mount Vite dev server as middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production: serve built static frontend files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CBT Server] SMP Negeri 12 Banjarbaru running on http://0.0.0.0:${PORT}`);
    console.log(`[CBT Server] Shared multi-device sync active between mobile phones and laptops`);
  });
}

startServer().catch(err => {
  console.error('[CBT Server] Fatal error starting server:', err);
  process.exit(1);
});
