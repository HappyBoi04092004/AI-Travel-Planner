'use client';

import React, { useState, useMemo } from 'react';
import { useTripWizard } from '@/context/TripWizardContext';
import {
  VIETNAM_SPECIALTIES,
  VIETNAM_ATTRACTIONS,
  VIETNAM_CULTURE
} from '@/data/vietnamData';
import { AttractionItem, LocalSpecialty } from '@/types/wizard';
import {
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  FireIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function Step3LocalDiscovery() {
  const {
    selectedDestinations,
    selectedAttractions,
    selectedSpecialties,
    toggleAttraction,
    toggleSpecialty,
    nextStep,
    prevStep
  } = useTripWizard();

  // Active destination tab
  const [activeDestId, setActiveDestId] = useState<string>(
    selectedDestinations[0]?.id || 'ninhbinh'
  );

  // Active category tab: 'attractions' | 'specialties' | 'culture'
  const [activeTab, setActiveTab] = useState<'attractions' | 'specialties' | 'culture'>('attractions');

  const currentDestination = useMemo(() => {
    return selectedDestinations.find(d => d.id === activeDestId) || selectedDestinations[0];
  }, [selectedDestinations, activeDestId]);

  // Filter items for the active destination with rich automatic fallback from touristSpots
  const destAttractions = useMemo(() => {
    if (!currentDestination) return [];
    const directMatches = VIETNAM_ATTRACTIONS.filter(
      a => a.destinationId === currentDestination.id || currentDestination.name.includes(a.destinationName)
    );
    if (directMatches.length > 0) return directMatches;

    // Synthesize from destination touristSpots
    if (currentDestination.touristSpots && currentDestination.touristSpots.length > 0) {
      return currentDestination.touristSpots.map((spot, idx) => ({
        id: `att_${currentDestination.id}_${idx}`,
        destinationId: currentDestination.id,
        destinationName: currentDestination.name,
        name: spot.name,
        category: (spot.category || 'nature') as any,
        categoryName: spot.highlightTag || spot.category || 'Điểm nổi bật',
        description: spot.description,
        estimatedDuration: '2 - 3 giờ',
        recommendedTime: 'Buổi sáng hoặc chiều mát',
        entryFeeVND: 50000,
        tips: spot.activities ? spot.activities.join(' • ') : undefined,
        imageUrl: currentDestination.image
      }));
    }
    return [];
  }, [currentDestination]);

  const destSpecialties = useMemo(() => {
    if (!currentDestination) return [];
    const directMatches = VIETNAM_SPECIALTIES.filter(
      s => s.destinationId === currentDestination.id || currentDestination.name.includes(s.destinationName)
    );
    if (directMatches.length > 0) return directMatches;

    // Synthesize from destination touristSpots foodSpecialties
    const synthesized: LocalSpecialty[] = [];
    currentDestination.touristSpots?.forEach((spot, sIdx) => {
      spot.foodSpecialties?.forEach((food, fIdx) => {
        if (!synthesized.some(item => item.name === food)) {
          synthesized.push({
            id: `spec_${currentDestination.id}_${sIdx}_${fIdx}`,
            destinationId: currentDestination.id,
            destinationName: currentDestination.name,
            name: food,
            category: 'Ẩm thực đặc sản',
            description: `Món ngon đặc trưng khi ghé thăm ${spot.name} (${currentDestination.name})`,
            priceRangeVND: '45.000đ - 120.000đ',
            bestPlaces: [spot.name, 'Chợ địa phương', 'Khu phố ẩm thực'],
            mustTry: true
          });
        }
      });
    });
    return synthesized;
  }, [currentDestination]);

  const destCultures = useMemo(() => {
    if (!currentDestination) return [];
    const directMatches = VIETNAM_CULTURE.filter(
      c => c.destinationId === currentDestination.id || currentDestination.name.includes(c.destinationName)
    );
    if (directMatches.length > 0) return directMatches;

    return [
      {
        id: `cul_${currentDestination.id}_1`,
        destinationId: currentDestination.id,
        destinationName: currentDestination.name,
        name: `Văn hóa bản địa & Lễ hội ${currentDestination.name}`,
        category: 'Lễ hội & Phong tục',
        description: `Tìm hiểu các nét đẹp truyền thống và phong tục tập quán của ${currentDestination.name} (${currentDestination.mergedFrom}).`,
        seasonOrMonth: currentDestination.bestSeason || 'Quanh năm',
        highlight: 'Trải nghiệm giao lưu cộng đồng và không gian di sản.'
      }
    ];
  }, [currentDestination]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-pink-200/80 dark:border-gray-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-100 text-pink-800 dark:bg-pink-950/70 dark:text-pink-300 border-2 border-pink-300 dark:border-pink-800 mb-3 shadow-2xs">
          <SparklesIcon className="w-4 h-4 text-pink-600" />
          <span>Bước 3 trên 6 • Khám phá tinh hoa địa phương</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Văn hóa, Ẩm thực & Điểm tham quan <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">nổi bật</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700 dark:text-gray-300">
          Khám phá những món ăn đặc sản đậm chất vùng miền, các danh lam thắng cảnh và lễ hội truyền thống. Chọn các địa điểm bạn muốn ghé thăm để đưa vào lịch trình.
        </p>
      </div>

      {/* Destination Switcher Tabs */}
      {selectedDestinations.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Xem theo điểm:</span>
          {selectedDestinations.map(dest => (
            <button
              key={dest.id}
              type="button"
              onClick={() => setActiveDestId(dest.id)}
              style={
                activeDestId === dest.id
                  ? {
                      backgroundColor: '#db2777',
                      backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
                      color: '#ffffff'
                    }
                  : {}
              }
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeDestId === dest.id
                  ? 'text-white shadow-sm shadow-rose-900/30'
                  : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-500'
              }`}
            >
              {dest.name} ({dest.regionName})
            </button>
          ))}
        </div>
      )}

      {/* Category Tabs: Điểm tham quan / Ẩm thực đặc sản / Văn hóa truyền thống */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        {[
          { id: 'attractions', label: `Điểm tham quan (${destAttractions.length})`, icon: BuildingLibraryIcon },
          { id: 'specialties', label: `Ẩm thực & Đặc sản (${destSpecialties.length})`, icon: FireIcon },
          { id: 'culture', label: `Văn hóa & Lễ hội (${destCultures.length})`, icon: BookOpenIcon }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-extrabold border-b-2 transition-all ${
                isActive
                  ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: ATTRACTIONS */}
      {activeTab === 'attractions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {destAttractions.length === 0 ? (
            <div className="col-span-full py-12 text-center text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              Đang tổng hợp các điểm tham quan tiêu biểu cho khu vực này...
            </div>
          ) : (
            destAttractions.map(attraction => {
              const isSelected = selectedAttractions.some(a => a.id === attraction.id);
              return (
                <div
                  key={attraction.id}
                  className={`flex flex-col bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden shadow-xs transition-all ${
                    isSelected
                      ? 'border-pink-500 ring-2 ring-pink-500/20'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div className="relative h-44 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
                      {attraction.categoryName}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                        {attraction.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">
                        {attraction.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <ClockIcon className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                        <span>Thời lượng: <strong>{attraction.estimatedDuration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                        <span>Thời gian đẹp: {attraction.recommendedTime}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAttraction(attraction)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-300 dark:border-pink-700'
                          : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-xs shadow-rose-600/30'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircleIcon className="w-4 h-4 text-pink-600" />
                          <span>Đã thêm vào lịch trình</span>
                        </>
                      ) : (
                        <>
                          <PlusIcon className="w-4 h-4" />
                          <span>Thêm vào chuyến đi</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB CONTENT 2: SPECIALTIES */}
      {activeTab === 'specialties' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {destSpecialties.length === 0 ? (
            <div className="col-span-full py-12 text-center text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              Đang cập nhật danh mục ẩm thực đặc sản cho vùng này...
            </div>
          ) : (
            destSpecialties.map(spec => {
              const isSelected = selectedSpecialties.some(s => s.id === spec.id);
              return (
                <div
                  key={spec.id}
                  className={`flex flex-col bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden shadow-xs transition-all ${
                    isSelected
                      ? 'border-pink-500 ring-2 ring-pink-500/20'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div className="relative h-44 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={spec.image}
                      alt={spec.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-bold">
                      {spec.categoryName}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                        {spec.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                        Quán ngon gợi ý:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-gray-600 dark:text-gray-400">
                        {spec.recommendedPlaces.map((place, i) => (
                          <li key={i} className="truncate">{place}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSpecialty(spec)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200 border border-rose-300 dark:border-rose-700'
                          : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-xs shadow-rose-600/30'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircleIcon className="w-4 h-4 text-rose-600" />
                          <span>Đã lưu vào danh mục ẩm thực</span>
                        </>
                      ) : (
                        <>
                          <PlusIcon className="w-4 h-4" />
                          <span>Lưu món này</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB CONTENT 3: CULTURE & FESTIVALS */}
      {activeTab === 'culture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {destCultures.length === 0 ? (
            <div className="col-span-full py-12 text-center text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              Đang cập nhật lễ hội và truyền thống văn hóa...
            </div>
          ) : (
            destCultures.map(culture => (
              <div
                key={culture.id}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                      {culture.typeName}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                      {culture.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {culture.description}
                </p>

                {culture.periodOrTime && (
                  <div className="p-2.5 rounded-xl bg-pink-50/60 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-800 text-[11px] text-pink-900 dark:text-pink-200 font-medium flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-pink-600 flex-shrink-0" />
                    <span>Thời gian diễn ra: <strong>{culture.periodOrTime}</strong></span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Selection Summary Basket */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-pink-50/90 via-rose-50/60 to-white dark:from-slate-900 dark:via-pink-950/20 dark:to-slate-900 border-2 border-pink-300 dark:border-pink-800 shadow-md shadow-pink-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <span className="font-extrabold text-pink-950 dark:text-pink-200">
            Tổng kết lựa chọn cho lịch trình:
          </span>
          <div className="text-slate-700 dark:text-slate-300 font-medium">
            • <strong className="text-pink-700 dark:text-pink-300 font-black">{selectedAttractions.length}</strong> điểm tham quan đã chọn &nbsp;|&nbsp; • <strong className="text-pink-700 dark:text-pink-300 font-black">{selectedSpecialties.length}</strong> món ăn đặc sản đã lưu
          </div>
        </div>
        <div className="text-[11px] text-pink-800 dark:text-pink-300 font-bold bg-pink-100/80 dark:bg-pink-950/70 px-3 py-1.5 rounded-xl border border-pink-200">
          AI sẽ tự động sắp xếp thời gian biểu phù hợp cho các điểm bạn đã chọn.
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
          <span>Quay lại Bước 2</span>
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
          <span>Tiếp tục: Chọn phương tiện di chuyển</span>
          <ArrowRightIcon className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

