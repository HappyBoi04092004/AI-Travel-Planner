/**
 * Automated Client-side Logger for AI Vietnam Travel Planner.
 * Captures UI events, warnings, network errors, and unhandled exceptions.
 * Persists to both browser localStorage and Next.js /api/client-logs endpoint.
 */

export interface StoredLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  source: string;
  stack?: string;
  metadata?: any;
}

const LOCAL_STORAGE_KEY = 'ai_travel_client_logs';
const MAX_LOCAL_LOGS = 100;

export function logClientEvent(
  level: 'info' | 'warn' | 'error',
  message: string,
  details?: any
) {
  const ts = new Date().toISOString();
  const entry: StoredLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: ts,
    level,
    message,
    source: typeof window !== 'undefined' ? window.location.pathname || '/' : 'server',
    stack:
      details instanceof Error
        ? details.stack
        : typeof details === 'object'
        ? JSON.stringify(details)
        : details ? String(details) : undefined
  };

  // 1. Console log
  if (level === 'error') {
    console.error(`[${ts}] [CLIENT-ERROR]`, message, details || '');
  } else if (level === 'warn') {
    console.warn(`[${ts}] [CLIENT-WARN]`, message, details || '');
  } else {
    console.log(`[${ts}] [CLIENT-INFO]`, message, details || '');
  }

  // 2. Persist in browser localStorage
  if (typeof window !== 'undefined') {
    try {
      const existing = getClientLogs();
      existing.unshift(entry);
      if (existing.length > MAX_LOCAL_LOGS) {
        existing.length = MAX_LOCAL_LOGS;
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // Storage quota or private mode protection
    }

    // 3. Forward to Next.js API endpoint (works on localhost AND Vercel)
    try {
      fetch('/api/client-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
        // Use keepalive so log reaches server even if page unloads
        keepalive: true
      }).catch(() => {
        // Silent catch to prevent logging recursion
      });
    } catch {
      // Ignore background transport error
    }
  }
}

/**
 * Retrieve logs stored in localStorage
 */
export function getClientLogs(): StoredLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clear client logs
 */
export function clearClientLogs() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      fetch('/api/client-logs', { method: 'DELETE' }).catch(() => {});
    } catch {
      // Ignore
    }
  }
}

/**
 * Global error listeners to catch and log unhandled exceptions automatically.
 */
let isInitialized = false;

export function initGlobalErrorLogging() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  window.onerror = (message, source, lineno, colno, error) => {
    logClientEvent('error', `Uncaught exception: ${message}`, {
      source,
      lineno,
      colno,
      stack: error?.stack
    });
  };

  window.onunhandledrejection = (event) => {
    logClientEvent('error', `Unhandled Promise Rejection: ${event.reason?.message || event.reason}`, {
      reason: event.reason
    });
  };

  logClientEvent('info', 'Client logging system initialized', {
    url: window.location.href,
    userAgent: navigator.userAgent
  });
}
