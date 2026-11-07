'use client';

import React from 'react';
import { useTripWizard } from '@/context/TripWizardContext';
import { WizardStep } from '@/types/wizard';
import {
  CalendarDaysIcon,
  MapPinIcon,
  SparklesIcon,
  TruckIcon,
  HeartIcon,
  DocumentCheckIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface StepMeta {
  number: WizardStep;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepMeta[] = [
  { number: 1, title: 'Thời gian', shortDesc: 'Chọn ngày đi & về', icon: CalendarDaysIcon },
  { number: 2, title: 'Bản đồ Việt Nam', shortDesc: 'Khám phá & chọn điểm đến', icon: MapPinIcon },
  { number: 3, title: 'Văn hóa & Đặc sản', shortDesc: 'Ẩm thực & Danh thắng', icon: SparklesIcon },
  { number: 4, title: 'Phương tiện', shortDesc: 'Chọn cách di chuyển', icon: TruckIcon },
  { number: 5, title: 'Tiện ích & POI', shortDesc: 'Nhà thuốc & Dịch vụ', icon: HeartIcon },
  { number: 6, title: 'Lịch trình AI', shortDesc: 'Tổng quan & Sinh lộ trình', icon: DocumentCheckIcon },
];

export default function WizardProgress() {
  const { currentStep, goToStep, canProceedStep1, canProceedStep2 } = useTripWizard();

  const isStepAccessible = (stepNum: WizardStep) => {
    if (stepNum === 1) return true;
    if (stepNum === 2) return canProceedStep1;
    if (stepNum >= 3) return canProceedStep1 && canProceedStep2;
    return false;
  };

  return (
    <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b-2 border-pink-200/80 dark:border-pink-900/40 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-3 py-1">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isAccessible = isStepAccessible(step.number);
            const Icon = step.icon;

            return (
              <button
                key={step.number}
                type="button"
                disabled={!isAccessible}
                onClick={() => isAccessible && goToStep(step.number)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl transition-all flex-shrink-0 text-left ${
                  isCurrent
                    ? 'bg-gradient-to-r from-pink-500/15 via-rose-500/20 to-pink-500/10 dark:bg-pink-950/50 text-pink-950 dark:text-pink-100 border-2 border-pink-500 shadow-md shadow-pink-500/15'
                    : isCompleted
                    ? 'bg-pink-50/60 dark:bg-pink-950/20 text-pink-900 dark:text-pink-200 hover:bg-pink-100/70 border-2 border-pink-200/80 dark:border-pink-900/50 cursor-pointer'
                    : isAccessible
                    ? 'bg-white/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-pink-300 hover:bg-pink-50/40 border-2 border-slate-200/80 dark:border-slate-800 cursor-pointer'
                    : 'bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-600 border-2 border-transparent cursor-not-allowed opacity-50'
                }`}
              >
                {/* Step badge */}
                <div
                  style={
                    isCurrent
                      ? {
                          backgroundColor: '#db2777',
                          backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
                          color: '#ffffff'
                        }
                      : {}
                  }
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    isCurrent
                      ? 'text-white shadow-sm shadow-pink-500/40 ring-2 ring-pink-400/40'
                      : isCompleted
                      ? 'bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300 font-extrabold border border-pink-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckIcon className="w-4 h-4 text-pink-600 stroke-[3]" /> : step.number}
                </div>

                {/* Step details */}
                <div className="hidden md:block">
                  <div className={`text-xs leading-tight flex items-center gap-1.5 ${isCurrent ? 'font-black text-pink-950 dark:text-pink-100' : isCompleted ? 'font-extrabold text-pink-900 dark:text-pink-200' : 'font-bold text-slate-700 dark:text-slate-300'}`}>
                    <span>{step.title}</span>
                  </div>
                  <div className={`text-[10.5px] font-medium truncate max-w-[130px] ${isCurrent ? 'text-pink-800 dark:text-pink-300 font-bold' : isCompleted ? 'text-pink-700/80 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {step.shortDesc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

