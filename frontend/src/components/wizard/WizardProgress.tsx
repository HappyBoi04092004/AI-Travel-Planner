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
    <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-xs">
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
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all flex-shrink-0 text-left ${
                  isCurrent
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 shadow-xs'
                    : isCompleted
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                    : isAccessible
                    ? 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                    : 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-50'
                }`}
              >
                {/* Step badge */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckIcon className="w-4 h-4" /> : step.number}
                </div>

                {/* Step details */}
                <div className="hidden md:block">
                  <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                    <span>{step.title}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[130px]">
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

