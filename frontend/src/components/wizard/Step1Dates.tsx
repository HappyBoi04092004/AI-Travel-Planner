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
      <div className="border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200 dark:border-pink-800 mb-3">
          <CalendarDaysIcon className="w-4 h-4" />
          <span>Bước 1 trên 6 • Lên lịch trình</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Chọn thời gian cho chuyến du lịch Việt Nam
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Xác định ngày khởi hành và ngày kết thúc để hệ thống tối ưu hóa dự báo thời tiết thực tế và lộ trình di chuyển phù hợp nhất.
        </p>
      </div>

      {/* Date Selection Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        {/* Departure Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ngày khởi hành (Departure Date) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              min={todayStr}
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white text-base font-medium focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all outline-none"
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Khuyến khích chọn trong vòng 16 ngày tới để nhận dự báo thời tiết chi tiết.
          </p>
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ngày trở về (Return Date) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              min={startDate || todayStr}
              value={returnDate}
              onChange={handleReturnDateChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white text-base font-medium focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all outline-none"
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Hệ thống tự động kiểm tra đảm bảo ngày về sau ngày khởi hành.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="md:col-span-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2.5">
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  totalDays === p.days
                    ? 'text-white border-pink-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-pink-400 cursor-pointer'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {dateError && (
          <div className="md:col-span-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5 flex-shrink-0" />
            <span>{dateError}</span>
          </div>
        )}
      </div>

      {/* Trip Preferences: Origin City & Pace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        {/* Origin City */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Điểm xuất phát (Origin City)
          </label>
          <div className="relative">
            <input
              type="text"
              value={originCity}
              onChange={e => setOriginCity(e.target.value)}
              placeholder="VD: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
          </div>
          <div className="flex gap-2 mt-2">
            {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'].map(city => (
              <button
                key={city}
                type="button"
                onClick={() => setOriginCity(city)}
                className="text-xs text-pink-600 dark:text-pink-400 hover:underline font-medium"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Trip Pace */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nhịp độ chuyến đi (Trip Pace)
          </label>
          <div className="grid grid-cols-3 gap-2">
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
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                  tripPace === p.id
                    ? 'text-pink-950 font-black shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black">{p.title}</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card & Weather Notification */}
      {startDate && returnDate && totalDays > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-extrabold text-sm">
                <CheckCircleIcon className="w-5 h-5 text-rose-600" />
                <span>Thời gian chuyến đi đã chọn:</span>
              </div>
              <p className="text-lg font-black text-slate-950 dark:text-white" suppressHydrationWarning>
                {formatVietnameseDate(startDate)} → {formatVietnameseDate(returnDate)} ({totalDays} ngày {totalDays - 1} đêm)
              </p>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5 pt-1">
                <ClockIcon className="w-4 h-4 text-rose-600" />
                <span>Xuất phát từ <strong className="font-bold text-slate-900 dark:text-white">{originCity || 'Việt Nam'}</strong> • Nhịp độ: <strong className="font-bold text-rose-700 dark:text-rose-400">{tripPace === 'relaxed' ? 'Thư thả' : tripPace === 'fast' ? 'Năng động' : 'Cân bằng'}</strong></span>
              </div>
            </div>

            {/* Weather status indicator */}
            <div className="text-xs sm:text-right">
              {isWithinWeatherWindow ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-900 dark:bg-rose-950/70 dark:text-rose-200 font-bold border border-rose-200 dark:border-rose-800">
                  <SparklesIcon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  Dự báo thời tiết chi tiết khả dụng (Open-Meteo)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200 font-bold border border-amber-200 dark:border-amber-800">
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
          className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-black transition-all shadow-lg ${
            canProceedStep1
              ? 'text-white shadow-pink-900/35 hover:shadow-xl hover:scale-[1.02] cursor-pointer'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
          }`}
        >
          <span>Tiếp tục: Khám phá bản đồ Việt Nam</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

