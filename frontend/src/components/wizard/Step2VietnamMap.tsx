'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTripWizard } from '@/context/TripWizardContext';
import { VietnamDestination, TouristSpot, DestinationWeather } from '@/types/wizard';
import { VIETNAM_DESTINATIONS } from '@/data/vietnamData';
import { fetchDestinationWeather } from '@/services/WeatherService';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CloudIcon,
  SparklesIcon,
  InformationCircleIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

// Dynamically import Leaflet Map to avoid SSR issues
const VietnamMapLeaflet = dynamic(() => import('./VietnamMapLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[580px] bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-500 animate-pulse border border-gray-200 dark:border-gray-700">
      <MapPinIcon className="w-12 h-12 text-pink-500 mb-2 animate-bounce" />
      <span className="font-semibold text-sm">Đang tải bản đồ địa hình tương tác Việt Nam...</span>
    </div>
  )
});

export default function Step2VietnamMap() {
  const {
    startDate,
    selectedDestinations,
    toggleDestination,
    removeDestination,
    canProceedStep2,
    nextStep,
    prevStep
  } = useTripWizard();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'North' | 'Central' | 'South'>('All');
  const [activeDestination, setActiveDestination] = useState<VietnamDestination>(VIETNAM_DESTINATIONS[0]);
  const [activeSpot, setActiveSpot] = useState<TouristSpot | null>(null);
  const [activeWeather, setActiveWeather] = useState<DestinationWeather | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [compareWeatherMap, setCompareWeatherMap] = useState<Record<string, DestinationWeather>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedClusterId, setExpandedClusterId] = useState<string | null>(null);

  // Filter destinations based on search query and region
  const filteredDestinations = useMemo(() => {
    return VIETNAM_DESTINATIONS.filter((d) => {
      const matchRegion = selectedRegion === 'All' || d.region === selectedRegion;
      const matchQuery =
        searchQuery.trim() === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.mergedFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.touristSpots || []).some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (d.touristSpots || []).some(s => (s.subLocations || []).some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (d.touristSpots || []).some(s => (s.activities || []).some(act => act.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchRegion && matchQuery;
    });
  }, [searchQuery, selectedRegion]);

  // Fetch weather for active destination
  useEffect(() => {
    let isCancelled = false;
    setLoadingWeather(true);

    fetchDestinationWeather(activeDestination.name, activeDestination.lat, activeDestination.lng, startDate)
      .then((weather) => {
        if (!isCancelled) {
          setActiveWeather(weather);
          setCompareWeatherMap(prev => ({ ...prev, [activeDestination.id]: weather }));
          setLoadingWeather(false);
        }
      })
      .catch(() => {
        if (!isCancelled) setLoadingWeather(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeDestination, startDate]);

  // Prefetch weather for all selected destinations for comparison
  useEffect(() => {
    selectedDestinations.forEach(dest => {
      if (!compareWeatherMap[dest.id]) {
        fetchDestinationWeather(dest.name, dest.lat, dest.lng, startDate)
          .then(w => {
            setCompareWeatherMap(prev => ({ ...prev, [dest.id]: w }));
          })
          .catch(() => {});
      }
    });
  }, [selectedDestinations, startDate, compareWeatherMap]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Handle selecting a tourist cluster
  const handleSelectCluster = useCallback((spot: TouristSpot, dest: VietnamDestination) => {
    if (activeDestination.id !== dest.id) {
      setActiveDestination(dest);
    }
    setActiveSpot(spot);
    setExpandedClusterId(prev => prev === spot.id ? null : spot.id);
  }, [activeDestination]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200 dark:border-pink-800 mb-3">
          <MapPinIcon className="w-4 h-4" />
          <span>Bước 2 trên 6 • Bản đồ số Địa hình & 34 Tỉnh thành mới</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Bản đồ Địa hình 3D Việt Nam (34 Tỉnh Thành Sau Sáp Nhập)
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Khám phá 34 tỉnh thành với các tụ điểm du lịch & hoạt động ăn chơi chi tiết (Cố đô Hoa Lư, Tràng An, Sa Pa, Pác Bó, Bà Nà Hills...). Hỗ trợ chế độ toàn màn hình.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <ArrowsPointingOutIcon className="w-4 h-4" />
            <span>Phóng to Toàn Màn hình</span>
          </button>
        </div>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm 34 tỉnh thành, tụ điểm du lịch hoặc hoạt động (Hoa Lư, đi thuyền, ăn thịt dê, Sa Pa, Pác Bó...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'All', label: 'Tất cả (34 tỉnh thành)' },
            { id: 'North', label: 'Miền Bắc (19)' },
            { id: 'Central', label: 'Miền Trung (9)' },
            { id: 'South', label: 'Miền Nam (6)' }
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRegion(r.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRegion === r.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Left Side Panel + Center/Right Terrain Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side Panel: Selected Destinations, Active Card, Compact Weather & Tụ Điểm Du Lịch */}
        <div className="lg:col-span-5 space-y-5">
          {/* Selected Destinations Basket */}
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-pink-600" />
                <span>Điểm đến đã chọn ({selectedDestinations.length})</span>
              </h3>
              <span className="text-[11px] text-gray-500">
                {selectedDestinations.length > 1 ? 'Chuyến đi liên tỉnh' : 'Điểm đơn lẻ'}
              </span>
            </div>

            {selectedDestinations.length === 0 ? (
              <p className="text-xs text-gray-500 py-3 text-center border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                Chưa chọn điểm nào. Hãy bấm vào marker trên bản đồ để thêm điểm đến!
              </p>
            ) : (
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {selectedDestinations.map((dest, idx) => (
                  <div
                    key={dest.id}
                    onClick={() => setActiveDestination(dest)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      activeDestination.id === dest.id
                        ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/30 font-semibold'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-gray-900 dark:text-white font-bold">{dest.name}</div>
                        <div className="text-[10px] text-gray-500">{dest.regionName} • {dest.mergedFrom}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {compareWeatherMap[dest.id]?.forecastAvailable && (
                        <span className="text-xs font-semibold text-pink-600" title={compareWeatherMap[dest.id].condition}>
                          {compareWeatherMap[dest.id].conditionIcon} {compareWeatherMap[dest.id].tempMax}°C
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDestination(dest.id);
                        }}
                        className="p-1 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded-lg text-rose-500 transition-colors"
                        title="Xóa khỏi lịch trình"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Destination Card with Compact Weather & Detailed Clusters / Activities */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs">
            <div className="relative h-44 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeDestination.image}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-gradient-to-r from-pink-500 to-rose-600">
                      {activeDestination.regionName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                      {activeDestination.provinceType === 'city' ? '⭐ TP Trực thuộc TW' : '📍 Tỉnh mới'}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold">{activeDestination.name}</h3>
                  <p className="text-[11px] text-white/80">{activeDestination.mergedFrom}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleDestination(activeDestination)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                    selectedDestinations.some(d => d.id === activeDestination.id)
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white'
                  }`}
                >
                  {selectedDestinations.some(d => d.id === activeDestination.id) ? (
                    <>
                      <TrashIcon className="w-3.5 h-3.5" />
                      <span>Bỏ chọn</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-3.5 h-3.5" />
                      <span>Chọn tỉnh này</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3.5">
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {activeDestination.description}
              </p>

              {/* COMPACT WEATHER PILL (Streamlined & Minimalist) */}
              <div className="px-3 py-2 rounded-xl bg-pink-50/70 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/50 flex items-center justify-between text-xs">
                {loadingWeather ? (
                  <div className="text-xs text-gray-400 py-0.5 flex items-center gap-1.5 animate-pulse">
                    <SparklesIcon className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                    <span>Đang cập nhật dự báo...</span>
                  </div>
                ) : activeWeather?.forecastAvailable ? (
                  <>
                    <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                      <span className="text-sm">{activeWeather.conditionIcon}</span>
                      <span>{activeWeather.tempMin}° - {activeWeather.tempMax}°C</span>
                      <span className="text-[11px] font-normal text-gray-500">({activeWeather.condition})</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] text-gray-600 dark:text-gray-400">
                      <span>🌧️ Mưa: <strong className="text-sky-600">{activeWeather.rainProbability}%</strong></span>
                      <span>💨 {activeWeather.windSpeed} km/h</span>
                    </div>
                  </>
                ) : (
                  <div className="text-[11px] text-gray-500 flex items-center gap-1">
                    <InformationCircleIcon className="w-3.5 h-3.5 text-amber-500" />
                    <span>Dự báo thời tiết ngoài cửa sổ 16 ngày</span>
                  </div>
                )}
              </div>

              {/* TỤ ĐIỂM DU LỊCH & HOẠT ĐỘNG ĂN CHƠI CHI TIẾT */}
              {activeDestination.touristSpots && activeDestination.touristSpots.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
                      <span>Các Tụ Điểm Du Lịch & Hoạt Động ({activeDestination.touristSpots.length}):</span>
                    </span>
                    <span className="text-[10px] text-gray-400">Bấm để xem chi tiết hoạt động</span>
                  </div>

                  <div className="space-y-2.5">
                    {activeDestination.touristSpots.map((spot) => {
                      const isExpanded = expandedClusterId === spot.id || activeSpot?.id === spot.id;

                      return (
                        <div
                          key={spot.id}
                          className={`rounded-xl border transition-all overflow-hidden ${
                            isExpanded
                              ? 'border-pink-500 bg-pink-50/30 dark:bg-pink-950/20 shadow-xs'
                              : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 hover:border-gray-300'
                          }`}
                        >
                          {/* Cluster Header */}
                          <div
                            onClick={() => handleSelectCluster(spot, activeDestination)}
                            className="p-2.5 flex items-center justify-between cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-base">{spot.icon}</span>
                              <div>
                                <div className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1.5">
                                  <span>{spot.name}</span>
                                  {spot.highlightTag && (
                                    <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
                                      {spot.highlightTag}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-gray-500">{spot.category}</div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-600 p-1"
                            >
                              {isExpanded ? (
                                <ChevronUpIcon className="w-4 h-4 text-pink-600" />
                              ) : (
                                <ChevronDownIcon className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {/* Expanded Details: Sub-locations, Activities, Food */}
                          {isExpanded && (
                            <div className="px-3 pb-3 pt-1 space-y-2.5 text-xs border-t border-gray-100 dark:border-gray-800/80 animate-fadeIn">
                              <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                                {spot.description}
                              </p>

                              {/* Specific Sub-locations Inside This Cluster */}
                              {spot.subLocations && spot.subLocations.length > 0 && (
                                <div className="p-2.5 rounded-lg bg-white/90 dark:bg-gray-900/90 border border-gray-100 dark:border-gray-800 space-y-1">
                                  <div className="font-bold text-[10.5px] text-gray-800 dark:text-gray-200 flex items-center gap-1">
                                    <span>📍</span>
                                    <span>Từng địa điểm tham quan bên trong:</span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-1">
                                    {spot.subLocations.map((loc, i) => (
                                      <div key={i} className="text-[11px] text-gray-700 dark:text-gray-300 flex items-start gap-1">
                                        <span className="text-pink-500 font-bold">•</span>
                                        <span className="font-medium">{loc}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Specific Activities / Experiences Inside This Cluster */}
                              {spot.activities && spot.activities.length > 0 && (
                                <div className="p-2.5 rounded-lg bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 space-y-1.5">
                                  <div className="font-bold text-[10.5px] text-sky-900 dark:text-sky-200 flex items-center gap-1">
                                    <span>🎯</span>
                                    <span>Hoạt động vui chơi & trải nghiệm cụ thể:</span>
                                  </div>
                                  <div className="space-y-1 pl-1">
                                    {spot.activities.map((act, i) => (
                                      <div key={i} className="text-[11px] text-sky-800 dark:text-sky-300 flex items-start gap-1.5">
                                        <span className="text-sky-500 font-bold">✓</span>
                                        <span>{act}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Local Food Specialties */}
                              {spot.foodSpecialties && spot.foodSpecialties.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1 pt-1">
                                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300">Đặc sản ăn chơi:</span>
                                  {spot.foodSpecialties.map((f, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/80 text-[10px] font-semibold text-amber-800 dark:text-amber-200"
                                    >
                                      🍲 {f}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center/Right: Interactive Vietnam Terrain Leaflet Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <VietnamMapLeaflet
              destinations={filteredDestinations}
              selectedDestinations={selectedDestinations}
              activeDestination={activeDestination}
              activeSpot={activeSpot}
              weatherMap={compareWeatherMap}
              isFullscreen={isFullscreen}
              onSelectMarker={(dest) => {
                setActiveDestination(dest);
                setActiveSpot(null);
              }}
              onToggleDestination={(dest) => toggleDestination(dest)}
              onSelectSpot={(spot, dest) => handleSelectCluster(spot, dest)}
              onToggleFullscreen={() => setIsFullscreen(prev => !prev)}
            />
          </div>

          {/* Multi-destination Weather Comparison Table */}
          {selectedDestinations.length > 1 && (
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <CloudIcon className="w-4 h-4 text-sky-500" />
                <span>So sánh thời tiết các tỉnh thành đã chọn ({selectedDestinations.length} điểm)</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {selectedDestinations.map(dest => {
                  const w = compareWeatherMap[dest.id];
                  return (
                    <div
                      key={dest.id}
                      className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 text-xs"
                    >
                      <div className="font-bold text-gray-900 dark:text-white truncate">{dest.name}</div>
                      {w?.forecastAvailable ? (
                        <div className="mt-1 space-y-0.5">
                          <div className="flex items-center gap-1 font-semibold text-pink-600 dark:text-pink-400">
                            <span>{w.conditionIcon}</span>
                            <span>{w.tempMin}° - {w.tempMax}°C</span>
                          </div>
                          <div className="text-[10px] text-gray-500 truncate">{w.condition}</div>
                          <div className="text-[10px] text-sky-600">Mưa: {w.rainProbability}% ({w.rainfallMm}mm)</div>
                        </div>
                      ) : (
                        <div className="text-[10px] text-gray-400 mt-1">Dự báo ngoài 16 ngày</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN MAP OVERLAY */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-gray-950 flex flex-col animate-fadeIn">
          {/* Fullscreen Top Glass Bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between gap-3 px-4 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-md">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 text-gray-800 dark:text-gray-200 text-xs font-bold transition-all cursor-pointer"
                title="Thu nhỏ bản đồ (hoặc bấm phím ESC)"
              >
                <XMarkIcon className="w-4 h-4 text-rose-500" />
                <span>Thu nhỏ (Esc)</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <span>Bản đồ Địa hình 3D Toàn cảnh Việt Nam (34 Tỉnh thành)</span>
              </div>
            </div>

            {/* Fullscreen Search bar */}
            <div className="relative w-64 sm:w-80">
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tỉnh, tụ điểm, hoạt động..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Region pills in Fullscreen */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { id: 'All', label: 'Tất cả 34' },
                { id: 'North', label: 'Miền Bắc' },
                { id: 'Central', label: 'Miền Trung' },
                { id: 'South', label: 'Miền Nam' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRegion(r.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedRegion === r.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fullscreen Map Canvas */}
          <div className="w-full h-full pt-14">
            <VietnamMapLeaflet
              destinations={filteredDestinations}
              selectedDestinations={selectedDestinations}
              activeDestination={activeDestination}
              activeSpot={activeSpot}
              weatherMap={compareWeatherMap}
              isFullscreen={true}
              onSelectMarker={(dest) => {
                setActiveDestination(dest);
                setActiveSpot(null);
              }}
              onToggleDestination={(dest) => toggleDestination(dest)}
              onSelectSpot={(spot, dest) => handleSelectCluster(spot, dest)}
              onToggleFullscreen={() => setIsFullscreen(false)}
            />
          </div>

          {/* Floating Bottom Drawer in Fullscreen Mode */}
          <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-[420px] max-h-[360px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200/90 dark:border-gray-800/90 shadow-2xl overflow-y-auto space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                  {activeDestination.regionName} • {activeDestination.provinceType === 'city' ? '⭐ TP Trực thuộc TW' : '📍 Tỉnh mới'}
                </span>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                  {activeDestination.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => toggleDestination(activeDestination)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  selectedDestinations.some(d => d.id === activeDestination.id)
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-pink-500/25'
                }`}
              >
                {selectedDestinations.some(d => d.id === activeDestination.id) ? 'Bỏ chọn' : '+ Chọn tỉnh này'}
              </button>
            </div>

            {/* Compact Weather in Drawer */}
            {activeWeather?.forecastAvailable && (
              <div className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900 text-xs flex items-center justify-between">
                <span>{activeWeather.conditionIcon} {activeWeather.tempMin}° - {activeWeather.tempMax}°C ({activeWeather.condition})</span>
                <span className="text-sky-600 font-bold">Mưa: {activeWeather.rainProbability}%</span>
              </div>
            )}

            {/* Clusters List in Drawer */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
                Tụ điểm du lịch & Ăn chơi ({activeDestination.touristSpots?.length || 0}):
              </div>

              <div className="space-y-1.5">
                {(activeDestination.touristSpots || []).map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => handleSelectCluster(spot, activeDestination)}
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                      activeSpot?.id === spot.id
                        ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/50'
                        : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white">
                      <span>{spot.icon} {spot.name}</span>
                      {spot.highlightTag && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                          {spot.highlightTag}
                        </span>
                      )}
                    </div>
                    {spot.activities && spot.activities.length > 0 && (
                      <div className="text-[10.5px] text-sky-700 dark:text-sky-300 mt-1 truncate">
                        🎯 {spot.activities[0]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Navigation Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Bước 1: Chọn ngày</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 hidden sm:inline">
            Đã chọn {selectedDestinations.length} điểm đến
          </span>
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceedStep2}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all ${
              canProceedStep2
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white cursor-pointer shadow-pink-500/25'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            <span>Bước 3: Khám phá ẩm thực & văn hóa</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
