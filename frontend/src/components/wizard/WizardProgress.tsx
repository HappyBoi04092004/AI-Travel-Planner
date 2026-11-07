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
    <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all flex-shrink-0 text-left ${
                  isCurrent
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white border-2 border-pink-600 shadow-md shadow-pink-900/10'
                    : isCompleted
                    ? 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border border-transparent'
                    : isAccessible
                    ? 'text-slate-600 hover:text-slate-900 dark:text-slate-400 border border-transparent'
                    : 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50 border border-transparent'
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
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                    isCurrent
                      ? 'text-white shadow-sm shadow-pink-900/30'
                      : isCompleted
                      ? 'bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-200 font-extrabold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckIcon className="w-4 h-4 text-pink-600" /> : step.number}
                </div>

                {/* Step details */}
                <div className="hidden md:block">
                  <div className={`text-xs leading-tight flex items-center gap-1.5 ${isCurrent ? 'font-black text-slate-950 dark:text-white' : 'font-bold text-slate-800 dark:text-slate-200'}`}>
                    <span>{step.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[130px]">
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

