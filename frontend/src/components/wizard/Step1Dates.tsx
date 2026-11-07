'use client';

import React, { useState, useMemo } from 'react';
import { useTripWizard } from '@/context/TripWizardContext';
import { formatVietnameseDate } from '@/utils/dateUtils';
import {
  CalendarDaysIcon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function Step1Dates() {
  const {
    startDate,
    returnDate,
    totalDays,
    setDates,
    originCity,
    setOriginCity,
    tripPace,
    setTripPace,
    nextStep,
    canProceedStep1
  } = useTripWizard();

  const [dateError, setDateError] = useState('');

  // Today in YYYY-MM-DD
  const todayStr = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setDateError('');

    if (returnDate && new Date(newStart) > new Date(returnDate)) {
      // Auto adjust return date to at least 2 days after start
      const adjustedReturn = new Date(newStart);
      adjustedReturn.setDate(adjustedReturn.getDate() + 2);
      const returnStr = adjustedReturn.toISOString().split('T')[0];
      setDates(newStart, returnStr);
    } else {
      setDates(newStart, returnDate);
    }
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReturn = e.target.value;
    setDateError('');

    if (startDate && new Date(newReturn) < new Date(startDate)) {
      setDateError('Ngày trở về không thể sớm hơn ngày khởi hành.');
      return;
    }
    setDates(startDate, newReturn);
  };

  // Preset shortcut buttons
  const applyPreset = (durationDays: number) => {
    const start = startDate ? new Date(startDate) : new Date();
    // If start is in the past, reset to tomorrow
    if (start < new Date()) {
      start.setDate(new Date().getDate() + 1);
    }
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays - 1);

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
    setDateError('');
    setDates(startStr, endStr);
  };

  // Weather availability check (Open-Meteo forecasts up to 16 days ahead)
  const isWithinWeatherWindow = useMemo(() => {
    if (!startDate) return false;
    const now = new Date();
    const start = new Date(startDate);
    const diffDays = Math.ceil((start.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return diffDays >= 0 && diffDays <= 16;
  }, [startDate]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Introduction */}
      <div className="border-b border-pink-200/80 dark:border-gray-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-100 text-pink-800 dark:bg-pink-950/70 dark:text-pink-300 border-2 border-pink-300 dark:border-pink-800 mb-3 shadow-2xs">
          <CalendarDaysIcon className="w-4 h-4 text-pink-600" />
          <span>Bước 1 trên 6 • Lên lịch trình</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Chọn thời gian cho chuyến <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">du lịch Việt Nam</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700 dark:text-gray-300">
          Xác định ngày khởi hành và ngày kết thúc để hệ thống tối ưu hóa dự báo thời tiết thực tế và lộ trình di chuyển phù hợp nhất.
        </p>
      </div>

      {/* Date Selection Box */}
      <div className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/95 dark:bg-gray-900/95 p-6 sm:p-8 rounded-3xl border-2 border-pink-200/80 dark:border-pink-900/60 shadow-lg shadow-pink-500/5">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500" />

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
            Ngày khởi hành (Departure Date) <span className="text-pink-600">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              min={todayStr}
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200 dark:border-gray-700 bg-pink-50/30 dark:bg-gray-800/50 text-gray-900 dark:text-white text-base font-bold focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none"
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Khuyến khích chọn trong vòng 16 ngày tới để nhận dự báo thời tiết chi tiết.
          </p>
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
            Ngày trở về (Return Date) <span className="text-pink-600">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              min={startDate || todayStr}
              value={returnDate}
              onChange={handleReturnDateChange}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200 dark:border-gray-700 bg-pink-50/30 dark:bg-gray-800/50 text-gray-900 dark:text-white text-base font-bold focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none"
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Hệ thống tự động kiểm tra đảm bảo ngày về sau ngày khởi hành.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="md:col-span-2 pt-3 border-t border-pink-100 dark:border-gray-800">
          <span className="text-xs font-extrabold uppercase tracking-wider text-pink-800 dark:text-pink-400 block mb-2.5">
            Gợi ý nhanh độ dài chuyến đi:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {[
              { days: 3, label: '3 ngày (Cuối tuần ngắn)' },
              { days: 5, label: '5 ngày (Kỳ nghỉ lý tưởng)' },
              { days: 7, label: '7 ngày (1 tuần trải nghiệm)' },
              { days: 10, label: '10 ngày (Hành trình liên tỉnh)' }
            ].map(p => (
              <button
                key={p.days}
                type="button"
                onClick={() => applyPreset(p.days)}
                style={
                  totalDays === p.days
                    ? {
                        backgroundColor: '#db2777',
                        backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
                        color: '#ffffff'
                      }
                    : {}
                }
                className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                  totalDays === p.days
                    ? 'text-white border-pink-600 shadow-md shadow-pink-500/30 scale-[1.03]'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-pink-400 hover:bg-pink-50/50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {dateError && (
          <div className="md:col-span-2 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-sm font-bold flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5 flex-shrink-0 text-rose-600" />
            <span>{dateError}</span>
          </div>
        )}
      </div>

      {/* Trip Preferences: Origin City & Pace */}
      <div className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/95 dark:bg-gray-900/95 p-6 sm:p-8 rounded-3xl border-2 border-pink-200/80 dark:border-pink-900/60 shadow-lg shadow-pink-500/5">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500" />

        {/* Origin City */}
        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
            Điểm xuất phát (Origin City)
          </label>
          <div className="relative">
            <input
              type="text"
              value={originCity}
              onChange={e => setOriginCity(e.target.value)}
              placeholder="VD: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng..."
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-pink-200 dark:border-gray-700 bg-pink-50/30 dark:bg-gray-800/50 text-gray-900 dark:text-white text-sm font-bold focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 outline-none"
            />
            <MapPinIcon className="w-5 h-5 text-pink-500 absolute left-3.5 top-4" />
          </div>
          <div className="flex gap-2.5 mt-2.5">
            {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'].map(city => (
              <button
                key={city}
                type="button"
                onClick={() => setOriginCity(city)}
                className="text-xs text-pink-700 dark:text-pink-300 hover:text-pink-900 hover:underline font-bold px-2 py-0.5 rounded-md bg-pink-50 dark:bg-pink-950/50 border border-pink-200/80"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Trip Pace */}
        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
            Nhịp độ chuyến đi (Trip Pace)
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {[
              { id: 'relaxed', title: 'Thư thả', desc: '1-2 điểm/ngày' },
              { id: 'balanced', title: 'Cân bằng', desc: '2-3 điểm/ngày' },
              { id: 'fast', title: 'Khám phá nhiều', desc: '3-4 điểm/ngày' }
            ].map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setTripPace(p.id as any)}
                style={
                  tripPace === p.id
                    ? {
                        borderColor: '#db2777',
                        backgroundColor: '#fdf2f8'
                      }
                    : {}
                }
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  tripPace === p.id
                    ? 'text-pink-950 dark:text-pink-100 font-black shadow-md shadow-pink-500/15 scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-700 hover:border-pink-300 bg-white dark:bg-slate-800 hover:bg-pink-50/40 text-slate-800 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black">{p.title}</div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card & Weather Notification */}
      {startDate && returnDate && totalDays > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-pink-50/90 via-rose-50/60 to-white dark:from-slate-900 dark:via-pink-950/20 dark:to-slate-900 border-2 border-pink-300 dark:border-pink-800 shadow-md shadow-pink-500/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-pink-700 dark:text-pink-300 font-black text-sm">
                <CheckCircleIcon className="w-5 h-5 text-pink-600 stroke-[2.5]" />
                <span>Thời gian chuyến đi đã chọn:</span>
              </div>
              <p className="text-xl font-black text-pink-950 dark:text-white" suppressHydrationWarning>
                {formatVietnameseDate(startDate)} → {formatVietnameseDate(returnDate)} ({totalDays} ngày {totalDays - 1} đêm)
              </p>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5 pt-1">
                <ClockIcon className="w-4 h-4 text-pink-600" />
                <span>Xuất phát từ <strong className="font-extrabold text-slate-900 dark:text-white">{originCity || 'Việt Nam'}</strong> • Nhịp độ: <strong className="font-extrabold text-pink-700 dark:text-pink-300">{tripPace === 'relaxed' ? 'Thư thả' : tripPace === 'fast' ? 'Khám phá nhiều' : 'Cân bằng'}</strong></span>
              </div>
            </div>

            {/* Weather status indicator */}
            <div className="text-xs sm:text-right">
              {isWithinWeatherWindow ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-100 text-pink-900 dark:bg-pink-950/70 dark:text-pink-200 font-extrabold border-2 border-pink-300 dark:border-pink-800 shadow-xs">
                  <SparklesIcon className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  Dự báo thời tiết chi tiết khả dụng (Open-Meteo)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200 font-extrabold border-2 border-amber-300 dark:border-amber-800 shadow-xs">
                  <InformationCircleIcon className="w-4 h-4 text-amber-600" />
                  Ngày đi xa hơn 16 ngày (khí hậu trung bình)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          disabled={!canProceedStep1}
          onClick={nextStep}
          style={
            canProceedStep1
              ? {
                  backgroundColor: '#db2777',
                  backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
                  color: '#ffffff'
                }
              : {}
          }
          className={`inline-flex items-center gap-3 px-10 py-4.5 rounded-2xl text-base sm:text-lg font-black transition-all shadow-xl ${
            canProceedStep1
              ? 'text-white shadow-pink-600/35 hover:shadow-2xl hover:shadow-pink-600/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
          }`}
        >
          <span>Tiếp tục: Khám phá bản đồ Việt Nam</span>
          <ArrowRightIcon className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

