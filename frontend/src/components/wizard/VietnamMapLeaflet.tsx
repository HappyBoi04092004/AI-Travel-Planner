'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VietnamDestination, TouristSpot, DestinationWeather } from '@/types/wizard';
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Fix Leaflet marker icon asset issue
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface VietnamMapLeafletProps {
  destinations: VietnamDestination[];
  selectedDestinations: VietnamDestination[];
  activeDestination: VietnamDestination;
  activeSpot?: TouristSpot | null;
  weatherMap?: Record<string, DestinationWeather>;
  isFullscreen?: boolean;
  onSelectMarker: (dest: VietnamDestination) => void;
  onToggleDestination: (dest: VietnamDestination) => void;
  onSelectSpot?: (spot: TouristSpot, dest: VietnamDestination) => void;
  onToggleFullscreen?: () => void;
}

export default function VietnamMapLeaflet({
  destinations,
  selectedDestinations,
  activeDestination,
  activeSpot,
  weatherMap = {},
  isFullscreen = false,
  onSelectMarker,
  onToggleDestination,
  onSelectSpot,
  onToggleFullscreen
}: VietnamMapLeafletProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const provinceMarkersRef = useRef<Record<string, L.Marker>>({});
  const spotMarkersRef = useRef<Record<string, L.Marker>>({});
  const polylineRef = useRef<L.Polyline | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [activeTileType, setActiveTileType] = useState<'opentopo' | 'cyclosm' | 'standard'>('opentopo');
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  // 100% Reliable Free High-Definition Tile Servers (NO API KEY REQUIRED, NO WATERMARKS)
  const TILE_SERVERS = {
    opentopo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      maxZoom: 17,
      attribution: '© OpenTopoMap (CC-BY-SA), © OpenStreetMap contributors'
    },
    cyclosm: {
      url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      maxZoom: 18,
      attribution: '© CyclOSM, © OpenStreetMap contributors'
    },
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Geographic center of Vietnam
    const map = L.map(mapContainerRef.current, {
      center: [16.2, 107.5],
      zoom: 6,
      minZoom: 5,
      maxZoom: 17,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Default to OpenTopoMap (True 3D Terrain & Shaded Relief)
    const tileCfg = TILE_SERVERS.opentopo;
    const tileLayer = L.tileLayer(tileCfg.url, {
      subdomains: tileCfg.subdomains,
      attribution: tileCfg.attribution,
      maxZoom: tileCfg.maxZoom
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    map.on('zoomend', () => {
      setIsZoomedIn(map.getZoom() >= 8.5);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Invalidate map size on fullscreen toggle
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // Switch Tile Layer (OpenTopoMap Terrain / CyclOSM Relief / OSM Standard)
  const switchTileLayer = (type: 'opentopo' | 'cyclosm' | 'standard') => {
    setActiveTileType(type);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileCfg = TILE_SERVERS[type];
    const newLayer = L.tileLayer(tileCfg.url, {
      subdomains: tileCfg.subdomains,
      attribution: tileCfg.attribution,
      maxZoom: tileCfg.maxZoom
    }).addTo(map);

    tileLayerRef.current = newLayer;
  };

  // Fly back to national overview (All 34 provinces)
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([16.2, 107.5], 6, {
      duration: 1.2,
      easeLinearity: 0.25
    });
    setIsZoomedIn(false);
  };

  // Slay smooth zoom into destination and its surrounding spots
  const flyToDestination = useCallback((dest: VietnamDestination) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const spots = dest.touristSpots || [];
    if (spots.length > 0) {
      const points: [number, number][] = [
        [dest.lat, dest.lng],
        ...spots.map(s => [s.lat, s.lng] as [number, number])
      ];
      const bounds = L.latLngBounds(points);
      map.flyToBounds(bounds, {
        padding: [60, 60],
        maxZoom: 10.5,
        duration: 1.4,
        easeLinearity: 0.25
      });
    } else {
      map.flyTo([dest.lat, dest.lng], 9.8, {
        duration: 1.4,
        easeLinearity: 0.25
      });
    }
    setIsZoomedIn(true);
  }, []);

  // Fly to spot when activeSpot changes
  useEffect(() => {
    if (!activeSpot || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([activeSpot.lat, activeSpot.lng], 12.5, {
      animate: true,
      duration: 1.2,
      easeLinearity: 0.25
    });
    setIsZoomedIn(true);
    // Open popup for this spot if marker exists
    const key = `${activeDestination?.id}_${activeSpot.id}`;
    const marker = spotMarkersRef.current[key];
    if (marker) {
      marker.openPopup();
    }
  }, [activeSpot, activeDestination]);

  // Fly to province when activeDestination changes from external click
  useEffect(() => {
    if (!activeDestination) return;
    flyToDestination(activeDestination);
  }, [activeDestination, flyToDestination]);

  // Render Markers (Prominent 34 Provinces + Rich Tourist Clusters with activities and sub-locations)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(provinceMarkersRef.current).forEach(m => m.remove());
    provinceMarkersRef.current = {};
    Object.values(spotMarkersRef.current).forEach(m => m.remove());
    spotMarkersRef.current = {};

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    // 1. PRIMARY PROVINCE MARKERS (34 Tỉnh Thành sau sáp nhập)
    destinations.forEach(dest => {
      const isSelected = selectedDestinations.some(d => d.id === dest.id);
      const isActive = activeDestination?.id === dest.id;
      const isCity = dest.provinceType === 'city';
      const w = weatherMap[dest.id];

      // Compact weather chip on marker (showing temperature & condition icon for selected dates)
      const weatherChip = w?.forecastAvailable
        ? `<span style="
            background: rgba(255,255,255,0.95);
            color: #0369a1;
            padding: 1px 6px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 800;
            margin-left: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.25);
            display: inline-flex;
            align-items: center;
            gap: 2px;
          ">${w.conditionIcon} ${w.tempMax}°</span>`
        : '';

      const badgeBg = isSelected
        ? 'linear-gradient(135deg, #e11d48, #be123c)'
        : isActive
        ? 'linear-gradient(135deg, #ec4899, #db2777)'
        : isCity
        ? 'linear-gradient(135deg, #f43f5e, #e11d48)'
        : 'linear-gradient(135deg, #ffffff, #fff1f2)';

      const badgeColor = isSelected || isActive || isCity ? '#ffffff' : '#9f1239';
      const borderColor = isSelected ? '#fda4af' : isActive ? '#fbcfe8' : isCity ? '#fecdd3' : '#f43f5e';
      const glowEffect = isSelected
        ? '0 0 20px rgba(225, 29, 72, 0.75), 0 4px 14px rgba(0,0,0,0.35)'
        : isActive
        ? '0 0 18px rgba(236, 72, 153, 0.7), 0 4px 14px rgba(0,0,0,0.3)'
        : isCity
        ? '0 0 14px rgba(244, 63, 94, 0.5), 0 3px 10px rgba(0,0,0,0.25)'
        : '0 3px 12px rgba(244, 63, 94, 0.2)';

      const scale = isActive ? 'scale(1.15)' : isSelected ? 'scale(1.08)' : 'scale(1)';

      const provinceIcon = L.divIcon({
        className: 'province-custom-marker',
        html: `
          <div style="
            display: flex;
            align-items: center;
            gap: 5px;
            background: ${badgeBg};
            color: ${badgeColor};
            border: 2px solid ${borderColor};
            box-shadow: ${glowEffect};
            padding: ${isActive || isSelected ? '5px 12px' : '4px 10px'};
            border-radius: 22px;
            font-size: ${isActive || isSelected ? '13px' : '12px'};
            font-weight: 800;
            white-space: nowrap;
            cursor: pointer;
            transform: translate(-50%, -50%) ${scale};
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            user-select: none;
          ">
            <span style="font-size: 13px;">${isCity ? '⭐' : isSelected ? '✓' : '📍'}</span>
            <span>${dest.name}</span>
            ${weatherChip}
          </div>
        `,
        iconSize: [110, 32],
        iconAnchor: [55, 16]
      });

      const marker = L.marker([dest.lat, dest.lng], {
        icon: provinceIcon,
        zIndexOffset: isSelected ? 1200 : isActive ? 1100 : isCity ? 900 : 700
      }).addTo(map);

      // Smooth hover (lướt qua) with dwell timer & instant click
      marker.on('mouseover', () => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => {
          onSelectMarker(dest);
          flyToDestination(dest);
        }, 220);
      });

      marker.on('mouseout', () => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      });

      marker.on('click', () => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        onSelectMarker(dest);
        flyToDestination(dest);
      });

      // Bind rich popup with compact weather and clusters overview
      const clustersSummary = (dest.touristSpots || [])
        .map(s => `<span style="display:inline-block; background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; padding: 2px 6px; border-radius: 6px; font-size: 10px; font-weight: bold; margin: 2px 2px;">${s.icon} ${s.name}</span>`)
        .join('');

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px; min-width: 240px; max-width: 290px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="background: linear-gradient(135deg, #f43f5e, #ec4899); color: white; padding: 2px 7px; border-radius: 6px; font-size: 10px; font-weight: bold;">
              ${dest.regionName}
            </span>
            <span style="font-size: 10px; color: #64748b; font-weight: 600;">${dest.mergedFrom}</span>
          </div>
          <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 800; color: #0f172a;">${dest.name}</h4>
          <p style="margin: 0 0 6px; font-size: 11px; color: #475569; line-height: 1.4;">${dest.description.slice(0, 95)}...</p>
          ${
            w?.forecastAvailable
              ? `
            <div style="background: #fff1f2; border: 1px solid #fecdd3; padding: 4px 8px; border-radius: 8px; font-size: 11px; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between;">
              <span><strong>Thời tiết:</strong> ${w.conditionIcon} ${w.tempMin}° - ${w.tempMax}°C</span>
              <span style="color: #be123c;">🌧️ ${w.rainProbability}%</span>
            </div>
            `
              : ''
          }
          <div style="margin-bottom: 6px;">
            <div style="font-size: 10px; font-weight: bold; color: #475569; margin-bottom: 3px;">TỤ ĐIỂM DU LỊCH & ĂN CHƠI:</div>
            ${clustersSummary}
          </div>
          <div style="font-size: 11px; font-weight: bold; color: ${isSelected ? '#e11d48' : '#e11d48'}; cursor: pointer;">
            ${isSelected ? '✓ Đã chọn trong hành trình (Bấm để xem các tụ điểm)' : '+ Bấm để chọn tỉnh này'}
          </div>
        </div>
      `);

      provinceMarkersRef.current[dest.id] = marker;
    });

    // 2. SECONDARY SUB-MARKERS: TOURIST & CHECK-IN CLUSTERS (Hoa Lư, Tràng An, Sa Pa, Pác Bó, Bà Nà, v.v.)
    destinations.forEach(dest => {
      const isParentActive = activeDestination?.id === dest.id;

      (dest.touristSpots || []).forEach(spot => {
        const isThisSpotActive = activeSpot?.id === spot.id;

        // High visual contrast: Subtle & small on country overview, vibrant & highlighted when active or zoomed
        const spotBg = isThisSpotActive
          ? 'linear-gradient(135deg, #e11d48, #be123c)'
          : isParentActive
          ? 'linear-gradient(135deg, #0284c7, #0369a1)'
          : isZoomedIn
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.78)';

        const spotColor = isThisSpotActive || isParentActive ? '#ffffff' : '#334155';
        const spotBorder = isThisSpotActive
          ? '2px solid #ffffff'
          : isParentActive
          ? '2px solid #38bdf8'
          : isZoomedIn
          ? '1.5px solid rgba(148, 163, 184, 0.7)'
          : '1px solid rgba(203, 213, 225, 0.6)';

        const spotShadow = isThisSpotActive
          ? '0 0 20px rgba(225, 29, 72, 0.75), 0 4px 12px rgba(0,0,0,0.4)'
          : isParentActive
          ? '0 0 16px rgba(56, 189, 248, 0.6), 0 4px 12px rgba(0,0,0,0.35)'
          : '0 2px 6px rgba(0,0,0,0.18)';

        const spotScale = isThisSpotActive ? 'scale(1.25)' : isParentActive ? 'scale(1.15)' : isZoomedIn ? 'scale(1)' : 'scale(0.85)';
        const spotOpacity = isParentActive || isThisSpotActive ? '1' : isZoomedIn ? '0.95' : '0.75';

        const spotIcon = L.divIcon({
          className: 'tourist-spot-marker',
          html: `
            <div style="
              display: flex;
              align-items: center;
              gap: 4px;
              background: ${spotBg};
              color: ${spotColor};
              border: ${spotBorder};
              box-shadow: ${spotShadow};
              padding: ${isParentActive || isThisSpotActive ? '5px 10px' : '2px 6px'};
              border-radius: 16px;
              font-size: ${isParentActive || isThisSpotActive ? '12px' : '10px'};
              font-weight: ${isParentActive || isThisSpotActive ? '800' : '600'};
              white-space: nowrap;
              cursor: pointer;
              opacity: ${spotOpacity};
              transform: translate(-50%, -50%) ${spotScale};
              transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            ">
              <span style="font-size: 12px;">${spot.icon}</span>
              <span>${spot.name}</span>
              ${spot.highlightTag && (isParentActive || isThisSpotActive) ? `<span style="background: #ef4444; color: white; padding: 1px 5px; border-radius: 4px; font-size: 9px; font-weight: 800; margin-left: 2px;">${spot.highlightTag}</span>` : ''}
            </div>
          `,
          iconSize: [100, 24],
          iconAnchor: [50, 12]
        });

        const spotMarker = L.marker([spot.lat, spot.lng], {
          icon: spotIcon,
          zIndexOffset: isThisSpotActive ? 1200 : isParentActive ? 1000 : 300
        })
          .addTo(map)
          .on('click', () => {
            onSelectMarker(dest);
            if (onSelectSpot) {
              onSelectSpot(spot, dest);
            }
          });

        // Sublocations list formatting
        const subLocsHtml = (spot.subLocations || [])
          .map(loc => `<li style="margin-bottom: 2px; color: #1e293b; font-weight: 600;">• ${loc}</li>`)
          .join('');

        // Activities list formatting (Đi thuyền, ăn dê núi, đi chùa, đi đền thờ...)
        const activitiesHtml = (spot.activities || [])
          .map(act => `<li style="margin-bottom: 3px; color: #0369a1;">✓ ${act}</li>`)
          .join('');

        // Food specialties formatting
        const foodHtml = (spot.foodSpecialties || [])
          .map(f => `<span style="display:inline-block; background: #fef3c7; color: #92400e; padding: 1px 5px; border-radius: 4px; font-size: 9.5px; font-weight: 700; margin: 1px;">🍲 ${f}</span>`)
          .join('');

        spotMarker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; min-width: 260px; max-width: 320px;">
            <div style="font-size: 10px; color: #0284c7; font-weight: 800; text-transform: uppercase;">
              ${spot.category} • Thuộc ${dest.name}
            </div>
            <h4 style="margin: 2px 0 4px; font-size: 14px; font-weight: 800; color: #0f172a;">
              ${spot.icon} ${spot.name}
            </h4>
            <p style="margin: 0 0 6px; font-size: 11px; color: #475569; line-height: 1.4;">
              ${spot.description}
            </p>
            ${spot.highlightTag ? `<span style="display: inline-block; background: #fee2e2; color: #b91c1c; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; margin-bottom: 6px;">✨ ${spot.highlightTag}</span>` : ''}

            ${
              spot.subLocations && spot.subLocations.length > 0
                ? `
              <div style="margin-top: 6px; padding: 6px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <div style="font-size: 10.5px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">📍 ĐỊA ĐIỂM THAM QUAN BÊN TRONG:</div>
                <ul style="margin: 0; padding-left: 8px; font-size: 10.5px; list-style: none;">
                  ${subLocsHtml}
                </ul>
              </div>
              `
                : ''
            }

            ${
              spot.activities && spot.activities.length > 0
                ? `
              <div style="margin-top: 6px; padding: 6px; background: #fff1f2; border-radius: 8px; border: 1px solid #fecdd3;">
                <div style="font-size: 10.5px; font-weight: 800; color: #be123c; margin-bottom: 4px;">🎯 HOẠT ĐỘNG ĂN CHƠI & TRẢI NGHIỆM:</div>
                <ul style="margin: 0; padding-left: 8px; font-size: 10.5px; list-style: none;">
                  ${activitiesHtml}
                </ul>
              </div>
              `
                : ''
            }

            ${
              spot.foodSpecialties && spot.foodSpecialties.length > 0
                ? `
              <div style="margin-top: 6px;">
                <div style="font-size: 10px; font-weight: 800; color: #78350f; margin-bottom: 3px;">ẨM THỰC ĐẶC SẢN TẠI TỤ ĐIỂM:</div>
                ${foodHtml}
              </div>
              `
                : ''
            }
          </div>
        `);

        spotMarkersRef.current[`${dest.id}_${spot.id}`] = spotMarker;
      });
    });

    // 3. Connect selected destinations in sequence
    if (selectedDestinations.length >= 2) {
      const latlngs = selectedDestinations.map(d => [d.lat, d.lng] as [number, number]);
      polylineRef.current = L.polyline(latlngs, {
        color: '#e11d48',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round'
      }).addTo(map);
    }
  }, [destinations, selectedDestinations, activeDestination, activeSpot, weatherMap, isZoomedIn, onSelectMarker, onSelectSpot, flyToDestination]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 ${
      isFullscreen ? 'h-full w-full rounded-none border-none shadow-none' : 'h-[580px] sm:h-[620px]'
    }`}>
      {/* Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Top Right: Terrain Layer Switcher & Fullscreen Toggle */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        {/* Layer Switcher */}
        <div className="flex items-center gap-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-1 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-md">
          <button
            type="button"
            onClick={() => switchTileLayer('opentopo')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTileType === 'opentopo'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Bản đồ Địa hình 3D (OpenTopoMap - Đường đồng mức & độ cao)"
          >
            <span>🏔️</span>
            <span>Địa hình 3D</span>
          </button>

          <button
            type="button"
            onClick={() => switchTileLayer('cyclosm')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTileType === 'cyclosm'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Địa hình dã ngoại & cảnh quan thiên nhiên"
          >
            <span>🌲</span>
            <span className="hidden sm:inline">Dã ngoại</span>
          </button>

          <button
            type="button"
            onClick={() => switchTileLayer('standard')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTileType === 'standard'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Bản đồ đường phố & địa lý chuẩn"
          >
            <span>🗺️</span>
            <span className="hidden sm:inline">Tiêu chuẩn</span>
          </button>
        </div>

        {/* Fullscreen Button Toggle */}
        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800/80 shadow-md text-xs font-bold hover:bg-pink-50 dark:hover:bg-pink-950/60 transition-all cursor-pointer"
            title={isFullscreen ? 'Thu nhỏ bản đồ' : 'Phóng to bản đồ toàn màn hình'}
          >
            {isFullscreen ? (
              <>
                <ArrowsPointingInIcon className="w-4 h-4 text-pink-600" />
                <span className="hidden sm:inline">Thu nhỏ</span>
              </>
            ) : (
              <>
                <ArrowsPointingOutIcon className="w-4 h-4 text-pink-600" />
                <span>Toàn màn hình</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Top Left: Reset View Button */}
      {isZoomedIn && (
        <button
          type="button"
          onClick={handleResetView}
          className="absolute top-3 left-14 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800/80 shadow-md text-xs font-bold hover:bg-pink-50 dark:hover:bg-pink-950/60 transition-all cursor-pointer animate-fadeIn"
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5 text-pink-600" />
          <span>Toàn cảnh (34 Tỉnh thành)</span>
        </button>
      )}

      {/* Bottom Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-md text-[11px] space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-500 inline-block" />
          <span className="text-gray-800 dark:text-gray-200 font-bold">6 TP Trực thuộc TW</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 inline-block" />
          <span className="text-gray-800 dark:text-gray-200 font-bold">28 Tỉnh sau sáp nhập</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px]">🏛️</span>
          <span className="text-gray-600 dark:text-gray-400 font-medium">Tụ điểm du lịch & Hoạt động ăn chơi</span>
        </div>
      </div>
    </div>
  );
}
