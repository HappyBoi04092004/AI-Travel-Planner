/**
 * Automated Client-side Logger for AI Vietnam Travel Planner.
 * Captures UI events, warnings, and unhandled errors and persists them
 * to the centralized system logs via /api/client-logs.
 */

export function logClientEvent(
  level: 'info' | 'warn' | 'error',
  message: string,
  details?: any
) {
  const ts = new Date().toISOString();
  if (level === 'error') {
    console.error(`[${ts}] [CLIENT-ERROR]`, message, details || '');
  } else if (level === 'warn') {
    console.warn(`[${ts}] [CLIENT-WARN]`, message, details || '');
  } else {
    console.log(`[${ts}] [CLIENT-INFO]`, message, details || '');
  }

  // Non-blocking forward to backend logger if in browser
  if (typeof window !== 'undefined') {
    try {
      const payload = {
        level,
        message,
        source: window.location.pathname || 'wizard',
        stack:
          details instanceof Error
            ? details.stack
            : typeof details === 'object'
            ? JSON.stringify(details)
            : String(details || '')
      };

      fetch('http://localhost:4000/api/client-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {
        // Silent catch to prevent logging recursion
      });
    } catch {
      // Ignore background log transport errors
    }
  }
}

/**
 * Global error listeners to catch and log unhandled exceptions automatically.
 */
export function initGlobalErrorLogging() {
  if (typeof window === 'undefined') return;

  window.onerror = (message, source, lineno, colno, error) => {
    logClientEvent('error', `Uncaught exception: ${message}`, {
      source,
      lineno,
      colno,
      stack: error?.stack
    });
  };

  window.onunhandledrejection = (event) => {
    logClientEvent('error', `Unhandled Promise Rejection: ${event.reason}`, {
      reason: event.reason
    });
  };
}

