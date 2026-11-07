'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getClientLogs, clearClientLogs, StoredLog } from '@/utils/logger';
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  TrashIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

export default function LogsDashboardPage() {
  const [logs, setLogs] = useState<StoredLog[]>([]);
  const [serverLogs, setServerLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'client' | 'server'>('client');
  const [filterLevel, setFilterLevel] = useState<'all' | 'error' | 'warn' | 'info'>('all');
  const [copied, setCopied] = useState(false);
  const [backendHealth, setBackendHealth] = useState<'checking' | 'online' | 'offline'>('checking');
  const [weatherHealth, setWeatherHealth] = useState<'checking' | 'online' | 'offline'>('checking');
  const [systemInfo, setSystemInfo] = useState<any>(null);

  const loadLogs = async () => {
    // 1. Client logs from localStorage
    const local = getClientLogs();
    setLogs(local);

    // 2. Server logs from Next.js API
    try {
      const res = await fetch('/api/client-logs?limit=100');
      if (res.ok) {
        const data = await res.json();
        setServerLogs(data.logs || []);
        setSystemInfo(data.environment || null);
      }
    } catch (e) {
      console.warn('Cannot fetch server logs:', e);
    }
  };

  const checkConnectivity = async () => {
    // Check backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    try {
      const res = await fetch(`${apiUrl}/health`, { method: 'GET' });
      if (res.ok) {
        setBackendHealth('online');
      } else {
        setBackendHealth('offline');
      }
    } catch {
      setBackendHealth('offline');
    }

    // Check Open-Meteo
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&daily=temperature_2m_max&timezone=Asia/Ho_Chi_Minh',
        { method: 'GET' }
      );
      if (res.ok) {
        setWeatherHealth('online');
      } else {
        setWeatherHealth('offline');
      }
    } catch {
      setWeatherHealth('offline');
    }
  };

  useEffect(() => {
    loadLogs();
    checkConnectivity();
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    if (confirm('Bạn có chắc muốn xóa sạch toàn bộ logs?')) {
      clearClientLogs();
      setLogs([]);
      setServerLogs([]);
    }
  };

  const handleCopy = () => {
    const targetLogs = activeTab === 'client' ? logs : serverLogs;
    navigator.clipboard.writeText(JSON.stringify(targetLogs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const targetLogs = activeTab === 'client' ? logs : serverLogs;
    const blob = new Blob([JSON.stringify(targetLogs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system_logs_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const displayedLogs = (activeTab === 'client' ? logs : serverLogs).filter(l => {
    if (filterLevel === 'all') return true;
    return l.level === filterLevel;
  });

  const errorCount = (activeTab === 'client' ? logs : serverLogs).filter(l => l.level === 'error').length;
  const warnCount = (activeTab === 'client' ? logs : serverLogs).filter(l => l.level === 'warn').length;
  const infoCount = (activeTab === 'client' ? logs : serverLogs).filter(l => l.level === 'info').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              title="Quay lại Wizard"
            >
              <ArrowLeftIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-slate-950 dark:text-white flex items-center gap-2">
                <span>📋 Bảng Nhật ký Lỗi & Hệ thống (System Logs)</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Tự động bắt lỗi runtime, kiểm tra kết nối API và chẩn đoán triển khai Vercel / Cloud
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadLogs}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowPathIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>Làm mới</span>
            </button>
            <button
              onClick={handleCopy}
              style={{ backgroundColor: '#db2777', color: '#ffffff' }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <ClipboardDocumentCheckIcon className="w-4 h-4" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Tải file .json</span>
            </button>
            <button
              onClick={handleClear}
              className="p-2 rounded-xl border border-red-200 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
              title="Xóa toàn bộ logs"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* System Diagnostics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Backend Status */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Flask Backend API</span>
              <ServerIcon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              {backendHealth === 'online' ? (
                <>
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Kết nối thành công</span>
                </>
              ) : backendHealth === 'offline' ? (
                <>
                  <XCircleIcon className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400">Chế độ Fallback Offline</span>
                </>
              ) : (
                <>
                  <ArrowPathIcon className="w-5 h-5 text-slate-400 animate-spin" />
                  <span className="text-sm font-bold text-slate-500">Đang kiểm tra...</span>
                </>
              )}
            </div>
            <p className="text-[10.5px] text-slate-400 truncate">
              {systemInfo?.apiUrl || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}
            </p>
          </div>

          {/* Open-Meteo Satellite API */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Dự báo Open-Meteo</span>
              <span>🛰️</span>
            </div>
            <div className="flex items-center gap-2">
              {weatherHealth === 'online' ? (
                <>
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Hoạt động tốt (200 OK)</span>
                </>
              ) : (
                <>
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-black text-red-600">Khí hậu dự phòng</span>
                </>
              )}
            </div>
            <p className="text-[10.5px] text-slate-400">Dữ liệu khí tượng vệ tinh 34 tỉnh</p>
          </div>

          {/* Deployment Environment */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Môi trường chạy</span>
              <span>⚡</span>
            </div>
            <div className="text-sm font-black text-slate-900 dark:text-white">
              {systemInfo?.isVercel ? '▲ Vercel Production' : '🖥️ Localhost Dev'}
            </div>
            <p className="text-[10.5px] text-slate-400">Next.js 16 Turbopack</p>
          </div>

          {/* Log Counts Summary */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Thống kê sự kiện</span>
              <span>📊</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="text-red-600 font-black">🔴 {errorCount} Lỗi</span>
              <span className="text-amber-600 font-bold">🟡 {warnCount} Cảnh báo</span>
              <span className="text-slate-600 font-semibold">🟢 {infoCount} Tin</span>
            </div>
            <p className="text-[10.5px] text-slate-400">Tổng cộng {displayedLogs.length} mục hiển thị</p>
          </div>
        </div>

        {/* Tab & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('client')}
              style={
                activeTab === 'client'
                  ? { backgroundColor: '#db2777', color: '#ffffff' }
                  : {}
              }
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'client'
                  ? 'shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Trình duyệt Client ({logs.length})
            </button>
            <button
              onClick={() => setActiveTab('server')}
              style={
                activeTab === 'server'
                  ? { backgroundColor: '#db2777', color: '#ffffff' }
                  : {}
              }
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'server'
                  ? 'shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Máy chủ Serverless ({serverLogs.length})
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1">Lọc:</span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'error', label: `Lỗi (${errorCount})` },
              { id: 'warn', label: `Cảnh báo (${warnCount})` },
              { id: 'info', label: `Thông tin (${infoCount})` }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterLevel(f.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterLevel === f.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Table / List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          {displayedLogs.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <CheckCircleIcon className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200">
                Hệ thống hoạt động hoàn hảo, không có lỗi nào được ghi nhận!
              </h3>
              <p className="text-xs text-slate-500">
                Tất cả các sự kiện và ngoại lệ sẽ tự động xuất hiện tại đây khi phát sinh.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
              {displayedLogs.map(log => {
                const isErr = log.level === 'error';
                const isWarn = log.level === 'warn';

                return (
                  <div key={log.id} className="p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                              isErr
                                ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                                : isWarn
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {log.level}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {new Date(log.timestamp).toLocaleTimeString()} ({log.source})
                          </span>
                        </div>
                        <p className={`text-xs font-bold ${isErr ? 'text-red-700 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
                          {log.message}
                        </p>
                        {log.stack && (
                          <pre className="mt-2 p-2.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap max-h-36">
                            {log.stack}
                          </pre>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                        {log.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
