'use client';

import React from 'react';
import { TripWizardProvider, useTripWizard } from '@/context/TripWizardContext';
import WizardProgress from './WizardProgress';
import Step1Dates from './Step1Dates';
import Step2VietnamMap from './Step2VietnamMap';
import Step3LocalDiscovery from './Step3LocalDiscovery';
import Step4Transportation from './Step4Transportation';
import Step5POIMap from './Step5POIMap';
import Step6ReviewConfirm from './Step6ReviewConfirm';
import WizardAIChatbot from './WizardAIChatbot';
import { UserMenu } from '@/components/auth';
import { ThemeToggle } from '@/components/ui';
import Link from 'next/link';
import { SparklesIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { initGlobalErrorLogging } from '@/utils/logger';

function WizardContent() {
  const { currentStep } = useTripWizard();

  React.useEffect(() => {
    initGlobalErrorLogging();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Header Navbar */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b-2 border-pink-200/80 dark:border-pink-900/50 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div
                style={{
                  backgroundColor: '#db2777',
                  backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)'
                }}
                className="relative w-11 h-11 rounded-full p-[2.5px] shadow-md shadow-pink-500/30 group-hover:scale-105 transition-transform flex-shrink-0 ring-2 ring-pink-400/50"
              >
                <img
                  src="/logo.jpg"
                  alt="Logo AI Vietnam Travel Planner"
                  className="w-full h-full object-cover object-top rounded-full bg-slate-900"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white block leading-tight">
                  AI Vietnam <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 bg-clip-text text-transparent">Travel Planner</span>
                </span>
                <span className="text-[10.5px] text-pink-700 dark:text-pink-400 font-extrabold uppercase tracking-wider block">
                  Trợ lý lập kế hoạch du lịch Việt Nam
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/saved-trips"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 hover:bg-pink-100 dark:hover:bg-pink-900/80 border border-pink-200 dark:border-pink-800 transition-colors shadow-2xs"
            >
              <BookmarkIcon className="w-4 h-4 text-pink-600" />
              <span>Chuyến đi đã lưu</span>
            </Link>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Step Progress Bar */}
      <WizardProgress />

      {/* Main Step Workspace with generous bottom clearance for floating AI chatbot */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-36 sm:pb-40">
        {currentStep === 1 && <Step1Dates />}
        {currentStep === 2 && <Step2VietnamMap />}
        {currentStep === 3 && <Step3LocalDiscovery />}
        {currentStep === 4 && <Step4Transportation />}
        {currentStep === 5 && <Step5POIMap />}
        {currentStep === 6 && <Step6ReviewConfirm />}
      </main>

      {/* Persistent AI Assistant */}
      <WizardAIChatbot />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 AI Vietnam Travel Planner • Nền tảng lập kế hoạch du lịch thông minh Việt Nam</p>
          <div className="flex items-center gap-3">
            <Link
              href="/logs"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-pink-950/30 transition-colors font-bold text-[11px]"
            >
              <span>📋 Nhật ký Lỗi & Hệ thống (Logs)</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function VietnamTravelWizard() {
  return (
    <TripWizardProvider>
      <WizardContent />
    </TripWizardProvider>
  );
}

