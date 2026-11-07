'use client';

import React from 'react';
import { useTripWizard } from '@/context/TripWizardContext';
import { TransportMode } from '@/types/wizard';
import {
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface TransportOptionMeta {
  id: TransportMode;
  name: string;
  icon: string;
  shortDesc: string;
  speedKmh: number;
  costPerKmVND: number;
  advantages: string[];
  disadvantages: string[];
  suitableFor: string;
}

const TRANSPORT_OPTIONS: TransportOptionMeta[] = [
  {
    id: 'plane',
    name: 'Máy bay (Airplane)',
    icon: '✈️',
    shortDesc: 'Nhanh nhất cho chặng dài Bắc - Trung - Nam',
    speedKmh: 650,
    costPerKmVND: 2200,
    advantages: ['Tiết kiệm thời gian tối đa', 'Thoải mái, tiện nghi cao', 'An toàn bậc nhất'],
    disadvantages: ['Chi phí cao hơn các phương tiện khác', 'Mất thêm thời gian check-in sân bay'],
    suitableFor: 'Khoảng cách trên 400km (Hà Nội ↔ Đà Nẵng ↔ TP.HCM ↔ Phú Quốc)'
  },
  {
    id: 'car',
    name: 'Ô tô riêng / Taxi dịch vụ (Private Car)',
    icon: '🚗',
    shortDesc: 'Tiện lợi, chủ động và riêng tư cho gia đình',
    speedKmh: 65,
    costPerKmVND: 12000,
    advantages: ['Tự do dừng đỗ check-in', 'Không gian riêng tư thoải mái', 'Đưa đón tận nơi'],
    disadvantages: ['Chi phí xăng/thuê xe nếu đi ít người', 'Cần tài xế hoặc bằng lái'],
    suitableFor: 'Chặng ngắn & trung bình (<250km), du lịch cùng gia đình hoặc nhóm 3-7 người'
  },
  {
    id: 'sleeper_bus',
    name: 'Xe khách / Giường nằm (Sleeper Bus)',
    icon: '🚌',
    shortDesc: 'Tiết kiệm chi phí, nghỉ ngơi qua đêm tiện lợi',
    speedKmh: 55,
    costPerKmVND: 800,
    advantages: ['Giá vé hợp lý', 'Có thể đi chuyến đêm tiết kiệm 1 đêm khách sạn', 'Nhiều khung giờ chạy'],
    disadvantages: ['Dễ bị say xe với người nhạy cảm', 'Thời gian di chuyển lâu hơn'],
    suitableFor: 'Hành trình 150km - 500km (Hà Nội → Sa Pa/Hà Giang, Sài Gòn → Đà Lạt)'
  },
  {
    id: 'train',
    name: 'Tàu hỏa Bắc - Nam (Train)',
    icon: '🚆',
    shortDesc: 'Trải nghiệm ngắm cảnh ven biển tuyệt mỹ',
    speedKmh: 50,
    costPerKmVND: 950,
    advantages: ['Ngắm cảnh qua đèo Hải Vân kỳ vĩ', 'Rộng rãi, an toàn, có giường nằm', 'Trải nghiệm hoài niệm'],
    disadvantages: ['Tốc độ chậm hơn xe khách/máy bay', 'Ít chuyến cố định trong ngày'],
    suitableFor: 'Cung đường ngắm cảnh di sản: Huế ↔ Đà Nẵng, Hà Nội ↔ Ninh Bình'
  },
  {
    id: 'motorbike',
    name: 'Xe máy (Motorbike)',
    icon: '🛵',
    shortDesc: 'Phượt tự do, chinh phục các cung đèo hùng vĩ',
    speedKmh: 45,
    costPerKmVND: 500,
    advantages: ['Chi phí tiết kiệm nhất', 'Cảm nhận trọn vẹn thiên nhiên và không khí', 'Linh hoạt mọi ngõ ngách'],
    disadvantages: ['Phụ thuộc vào thời tiết mưa nắng', 'Đòi hỏi tay lái vững và thể lực tốt'],
    suitableFor: 'Các cung đường đèo ngắn & phượt mạo hiểm (Hà Giang, đèo Hải Vân, Đà Lạt)'
  },
  {
    id: 'bus',
    name: 'Xe buýt liên tỉnh / Nội thành (Local Bus)',
    icon: '🚎',
    shortDesc: 'Phương tiện công cộng kinh tế',
    speedKmh: 35,
    costPerKmVND: 400,
    advantages: ['Chi phí rẻ nhất', 'Thân thiện với môi trường'],
    disadvantages: ['Phải đi bộ ra bến', 'Thời gian chờ và đón trả khách lâu'],
    suitableFor: 'Di chuyển cự ly ngắn trong thành phố hoặc các điểm du lịch lân cận'
  }
];

export default function Step4Transportation() {
  const {
    selectedDestinations,
    transportSegments,
    overallTransportMode,
    setOverallTransportMode,
    updateSegmentMode,
    nextStep,
    prevStep
  } = useTripWizard();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200 dark:border-pink-800 mb-3">
          <TruckIcon className="w-4 h-4" />
          <span>Bước 4 trên 6 • Lựa chọn di chuyển</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Lựa chọn phương tiện di chuyển
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Tùy chỉnh phương tiện cho toàn bộ hành trình hoặc thiết lập riêng cho từng chặng di chuyển (VD: Máy bay cho chặng xa, Ô tô riêng hoặc Xe máy cho chặng ngắn khám phá).
        </p>
      </div>

      {/* Multi-segment Route Details (If 2 or more destinations) */}
      {transportSegments.length > 0 && (
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-pink-600" />
            <span>Chi tiết từng chặng di chuyển ({transportSegments.length} chặng)</span>
          </h3>

          <div className="space-y-3">
            {transportSegments.map((segment, index) => {
              const currentMode = TRANSPORT_OPTIONS.find(o => o.id === segment.selectedMode) || TRANSPORT_OPTIONS[1];

              return (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                      <span>Chặng {index + 1}:</span>
                      <span className="text-pink-600 dark:text-pink-400">{segment.from}</span>
                      <span>→</span>
                      <span className="text-pink-600 dark:text-pink-400">{segment.to}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Khoảng cách: <strong>~{segment.estimatedDistanceKm} km</strong></span>
                      <span>Thời gian ước tính: <strong>~{segment.estimatedDurationHours} giờ</strong></span>
                      <span>Chi phí dự kiến: <strong>{segment.estimatedCostVND.toLocaleString('vi-VN')} đ</strong></span>
                    </div>
                  </div>

                  {/* Mode Selector for this segment */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {TRANSPORT_OPTIONS.slice(0, 5).map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateSegmentMode(index, opt.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          segment.selectedMode === opt.id
                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span>{opt.icon}</span>
                        <span>{opt.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6 Transport Mode Cards Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Phương tiện ưu tiên chính cho chuyến đi:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRANSPORT_OPTIONS.map(opt => {
            const isSelected = overallTransportMode === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => setOverallTransportMode(opt.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/40 dark:bg-pink-950/30 ring-2 ring-pink-500/20 shadow-sm'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{opt.icon}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-500 to-rose-600 border-pink-500 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {isSelected && <CheckIcon className="w-4 h-4" />}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    {opt.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {opt.shortDesc}
                  </p>
                </div>

                {/* Pros and Cons */}
                <div className="space-y-2 text-xs pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="space-y-1">
                    <span className="font-semibold text-pink-700 dark:text-pink-400 text-[11px] block">
                      Ưu điểm:
                    </span>
                    {opt.advantages.map((adv, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 text-[11px]">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="font-semibold text-rose-600 dark:text-rose-400 text-[11px] block">
                      Lưu ý:
                    </span>
                    {opt.disadvantages.map((dis, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                        <XMarkIcon className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span>{dis}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-[11px] text-gray-600 dark:text-gray-400">
                  <strong>Phù hợp nhất:</strong> {opt.suitableFor}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Summary */}
      <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-pink-800 dark:text-pink-200">
          <CheckCircleIcon className="w-5 h-5 text-pink-600" />
          <span>
            Phương tiện ưu tiên chính đã chọn: <strong>{TRANSPORT_OPTIONS.find(o => o.id === overallTransportMode)?.name}</strong>
          </span>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-[11px]">
          Có thể yêu cầu AI trợ lý đổi phương tiện bất kỳ lúc nào bằng lệnh chat.
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Quay lại Bước 3</span>
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white transition-all shadow-md shadow-pink-500/25 cursor-pointer"
        >
          <span>Tiếp tục: Bản đồ tiện ích & Nhà thuốc gần nhất</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

