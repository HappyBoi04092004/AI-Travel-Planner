'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTripWizard } from '@/context/TripWizardContext';
import { POIItem } from '@/types/wizard';
import { fetchPOIsNearLocation } from '@/services/PharmacyAndPOIService';
import {
  HeartIcon,
  MapPinIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const POIMapLeaflet = dynamic(() => import('./POIMapLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-500 animate-pulse border border-gray-200 dark:border-gray-700">
      <HeartIcon className="w-10 h-10 text-rose-500 mb-2 animate-bounce" />
      <span className="font-semibold text-sm">Đang tải bản đồ tiện ích & nhà thuốc...</span>
    </div>
  )
});

type CategoryType = 'all' | 'pharmacy' | 'hospital' | 'restaurant' | 'hotel' | 'gas_station';

export default function Step5POIMap() {
  const {
    selectedDestinations,
    selectedAttractions,
    selectedPOICategory,
    setSelectedPOICategory,
    nextStep,
    prevStep
  } = useTripWizard();

  const [activeDestId, setActiveDestId] = useState<string>(
    selectedDestinations[0]?.id || ''
  );

  const [pois, setPois] = useState<POIItem[]>([]);
  const [loadingPOIs, setLoadingPOIs] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState<POIItem | null>(null);

  const currentDestination = useMemo(() => {
    return selectedDestinations.find(d => d.id === activeDestId) || selectedDestinations[0];
  }, [selectedDestinations, activeDestId]);

  // Load POIs when destination or category changes
  useEffect(() => {
    if (!currentDestination) return;

    let isCancelled = false;
    setLoadingPOIs(true);

    fetchPOIsNearLocation(
      currentDestination.lat,
      currentDestination.lng,
      selectedPOICategory as CategoryType
    )
      .then(res => {
        if (!isCancelled) {
          setPois(res);
          setSelectedPOI(res[0] || null);
          setLoadingPOIs(false);
        }
      })
      .catch(() => {
        if (!isCancelled) setLoadingPOIs(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [currentDestination, selectedPOICategory]);

  const categories: { id: CategoryType; label: string; icon: string; countBadge?: number }[] = [
    { id: 'pharmacy', label: 'Nhà thuốc & Hiệu thuốc', icon: '💊' },
    { id: 'hospital', label: 'Bệnh viện & Cấp cứu', icon: '🏥' },
    { id: 'restaurant', label: 'Quán ăn & Nhà hàng', icon: '🍲' },
    { id: 'hotel', label: 'Khách sạn & Homestay', icon: '🏨' },
    { id: 'gas_station', label: 'Trạm xăng dầu', icon: '⛽' },
    { id: 'all', label: 'Tất cả tiện ích', icon: '📍' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-pink-200/80 dark:border-gray-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-100 text-pink-800 dark:bg-pink-950/70 dark:text-pink-300 border-2 border-pink-300 dark:border-pink-800 mb-3 shadow-2xs">
          <HeartIcon className="w-4 h-4 text-pink-600" />
          <span>Bước 5 trên 6 • Bản đồ tiện ích & An toàn sức khỏe</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Bản đồ tiện ích & <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">Tìm nhà thuốc gần nhất</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700 dark:text-gray-300">
          Tra cứu nhanh nhà thuốc GPP, trạm y tế, bệnh viện, cây xăng và quán ăn quanh các điểm tham quan để chuyến đi luôn an tâm và thuận lợi.
        </p>
      </div>

      {/* Destination Switcher Tabs */}
      {selectedDestinations.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Khu vực:</span>
          {selectedDestinations.map(dest => (
            <button
              key={dest.id}
              type="button"
              onClick={() => setActiveDestId(dest.id)}
              style={
                currentDestination.id === dest.id
                  ? {
                      backgroundColor: '#db2777',
                      backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
                      color: '#ffffff'
                    }
                  : {}
              }
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                currentDestination.id === dest.id
                  ? 'text-white shadow-sm shadow-rose-900/30'
                  : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-500'
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedPOICategory(cat.id)}
            style={
              selectedPOICategory === cat.id
                ? {
                    backgroundColor: '#db2777',
                    backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
                    color: '#ffffff'
                  }
                : {}
            }
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedPOICategory === cat.id
                ? 'text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 2-Column Layout: Left POI List + Right POI Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List of POIs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>Danh sách kết quả ({pois.length})</span>
              </h3>
              {loadingPOIs && (
                <div className="flex items-center gap-1 text-[11px] text-pink-600">
                  <SparklesIcon className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang dò toạ độ...</span>
                </div>
              )}
            </div>

            {pois.length === 0 && !loadingPOIs ? (
              <div className="py-8 text-center text-xs text-gray-500 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                Không tìm thấy tiện ích trong bán kính này. Hãy chọn danh mục khác!
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {pois.map(poi => {
                  const isSelected = selectedPOI?.id === poi.id;
                  const isPharma = poi.category === 'pharmacy';

                  return (
                    <div
                      key={poi.id}
                      onClick={() => setSelectedPOI(poi)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-1 ring-rose-500/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/40 dark:bg-gray-800/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">
                              {isPharma ? '💊' : poi.category === 'hospital' ? '🏥' : '📍'}
                            </span>
                            <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                              {poi.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                            <MapPinIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span>{poi.address}</span>
                          </p>
                        </div>

                        {poi.distanceFromCenter && (
                          <span className="px-2 py-0.5 rounded-md bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-300 font-bold text-[10px] whitespace-nowrap">
                            {poi.distanceFromCenter}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80 text-[11px] text-gray-500">
                        {poi.phone ? (
                          <span className="flex items-center gap-1 text-pink-600 dark:text-pink-400 font-semibold">
                            <PhoneIcon className="w-3.5 h-3.5" />
                            <span>{poi.phone}</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400">
                            <ClockIcon className="w-3.5 h-3.5" />
                            <span>{poi.openingHours || 'Mở cửa cả ngày'}</span>
                          </span>
                        )}

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold hover:underline"
                        >
                          <span>Chỉ đường</span>
                          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Map View */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <POIMapLeaflet
            destination={currentDestination}
            attractions={selectedAttractions}
            pois={pois}
            selectedPOI={selectedPOI}
            onSelectPOI={(poi) => setSelectedPOI(poi)}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-pink-200/80 dark:border-gray-800">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-gray-700 border-2 border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Quay lại Bước 4</span>
        </button>

        <button
          type="button"
          onClick={nextStep}
          style={{
            backgroundColor: '#db2777',
            backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
            color: '#ffffff'
          }}
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base font-black text-white transition-all shadow-xl shadow-pink-600/35 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>Tiếp tục: Xác nhận chuyến đi & Sinh lịch trình</span>
          <ArrowRightIcon className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

