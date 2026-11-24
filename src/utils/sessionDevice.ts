import { Question, StudentExamSession } from '../types/cbt';

const BROWSER_DEVICE_ID_KEY = 'SMPN12_CBT_BROWSER_DEVICE_ID';
const STUDENT_SESSION_PREFIX = 'SMPN12_CBT_STUDENT_SESS_';

/**
 * Generates or retrieves a persistent browser-specific device ID
 * and binds a deterministic unique session ID per student NIS.
 * Ensures concurrent multi-user logins from different devices never collide,
 * while allowing the same student to resume cleanly on their own device.
 */
export function getBrowserDeviceId(): string {
  try {
    let deviceId = localStorage.getItem(BROWSER_DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(BROWSER_DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  } catch {
    return `dev-mem-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function getStudentSessionDeviceId(nis: string): string {
  const cleanNis = nis.trim();
  const browserId = getBrowserDeviceId();
  const storageKey = `${STUDENT_SESSION_PREFIX}${cleanNis}`;
  try {
    let tabSessionId = sessionStorage.getItem(storageKey);
    if (!tabSessionId) {
      // Tie the session ID directly to this browser's persistent ID + student NIS
      tabSessionId = `${browserId}__${cleanNis}`;
      sessionStorage.setItem(storageKey, tabSessionId);
      localStorage.setItem(storageKey, tabSessionId);
    }
    return tabSessionId;
  } catch {
    return `${browserId}__${cleanNis}`;
  }
}

export function clearStudentSessionDeviceId(nis: string): void {
  const cleanNis = nis.trim();
  const storageKey = `${STUDENT_SESSION_PREFIX}${cleanNis}`;
  try {
    sessionStorage.removeItem(storageKey);
    localStorage.removeItem(storageKey);
  } catch {
    // ignore storage errors
  }
}

export function detectClientDeviceInfo(): string {
  if (typeof navigator === 'undefined') return 'Browser CBT';
  const ua = navigator.userAgent || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  let browser = 'Browser';
  if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';

  return `${browser} / ${isMobile ? 'HP (Mobile)' : 'Laptop/PC'}`;
}

/**
 * Calculates real-time automatic score (PG, PG Kompleks, Benar/Salah, Isian, Mencocokkan)
 * so Operator monitoring displays accurate live "Nilai Sementara / Akhir".
 */
export function calculateProvisionalScore(
  questions: Question[],
  answers: StudentExamSession['answers'],
  essayScore = 0
): { scorePg: number; finalScore: number } {
  let scorePgTotal = 0;

  questions.forEach(q => {
    const studentAns = answers?.[q.id]?.answer;
    if (studentAns === undefined || studentAns === null || studentAns === '') return;

    if (q.type === 'pg' && Array.isArray(q.correctAnswers)) {
      if (studentAns === q.correctAnswers[0]) scorePgTotal += q.points;
    } else if (q.type === 'benar_salah' && q.statements && q.statements.length > 0) {
      try {
        const map: Record<string, string> =
          typeof studentAns === 'string' && studentAns.startsWith('{') ? JSON.parse(studentAns) : {};
        let matches = 0;
        q.statements.forEach(st => {
          if (map[st.id] === st.correctAnswer) matches++;
        });
        scorePgTotal += Math.round((matches / q.statements.length) * q.points);
      } catch {
        // ignore invalid JSON
      }
    } else if (q.type === 'benar_salah' && Array.isArray(q.correctAnswers)) {
      if (studentAns === q.correctAnswers[0]) scorePgTotal += q.points;
    } else if (q.type === 'isian' && q.correctAnswerText) {
      if (
        typeof studentAns === 'string' &&
        studentAns.trim().toLowerCase() === q.correctAnswerText.trim().toLowerCase()
      ) {
        scorePgTotal += q.points;
      }
    } else if (q.type === 'pg_kompleks' && Array.isArray(q.correctAnswers) && Array.isArray(studentAns)) {
      const sortedCorrect = [...q.correctAnswers].sort().join(',');
      const sortedStudent = [...studentAns].sort().join(',');
      if (sortedCorrect === sortedStudent) scorePgTotal += q.points;
    } else if (q.type === 'mencocokkan' && q.matchingPairs && q.matchingPairs.length > 0) {
      try {
        const map: Record<string, string> =
          typeof studentAns === 'string' && studentAns.startsWith('{') ? JSON.parse(studentAns) : {};
        let matches = 0;
        q.matchingPairs.forEach(p => {
          if (map[p.id] === p.rightText) matches++;
        });
        scorePgTotal += Math.round((matches / q.matchingPairs.length) * q.points);
      } catch {
        // ignore invalid JSON
      }
    }
  });

  return {
    scorePg: scorePgTotal,
    finalScore: scorePgTotal + (essayScore || 0)
  };
}
