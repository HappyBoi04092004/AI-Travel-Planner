import { NextRequest, NextResponse } from 'next/server';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  source: string;
  stack?: string;
  metadata?: any;
}

// In-memory ring buffer for the latest 200 serverless log events
const MAX_LOGS = 200;
const memoryLogs: LogEntry[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entry: LogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      level: body.level || 'info',
      message: body.message || 'Unknown event',
      source: body.source || 'client',
      stack: body.stack,
      metadata: body.metadata
    };

    memoryLogs.unshift(entry);
    if (memoryLogs.length > MAX_LOGS) {
      memoryLogs.pop();
    }

    // Output to stdout/stderr so Vercel runtime logs capture it
    if (entry.level === 'error') {
      console.error(`[VERCEL-CLIENT-LOG] [ERROR] [${entry.timestamp}] ${entry.message}`, entry.stack || '');
    } else if (entry.level === 'warn') {
      console.warn(`[VERCEL-CLIENT-LOG] [WARN] [${entry.timestamp}] ${entry.message}`);
    } else {
      console.log(`[VERCEL-CLIENT-LOG] [INFO] [${entry.timestamp}] ${entry.message}`);
    }

    return NextResponse.json({ success: true, loggedId: entry.id });
  } catch (error: any) {
    console.error('[CLIENT-LOGS-API-ERROR]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');
  const limit = Math.min(Number(searchParams.get('limit')) || 50, MAX_LOGS);

  let filtered = memoryLogs;
  if (level) {
    filtered = filtered.filter(l => l.level === level);
  }

  return NextResponse.json({
    total: memoryLogs.length,
    returned: Math.min(filtered.length, limit),
    environment: {
      isVercel: Boolean(process.env.VERCEL),
      nodeEnv: process.env.NODE_ENV,
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'not_set',
      serverTime: new Date().toISOString()
    },
    logs: filtered.slice(0, limit)
  });
}

export async function DELETE() {
  memoryLogs.length = 0;
  return NextResponse.json({ success: true, message: 'Logs cleared' });
}
