'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { POIItem, VietnamDestination, AttractionItem } from '@/types/wizard';

// Fix Leaflet default marker icons
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface POIMapLeafletProps {
  destination: VietnamDestination;
  attractions: AttractionItem[];
  pois: POIItem[];
  selectedPOI: POIItem | null;
  onSelectPOI: (poi: POIItem) => void;
}

export default function POIMapLeaflet({
  destination,
  attractions,
  pois,
  selectedPOI,
  onSelectPOI
}: POIMapLeafletProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const poiMarkersRef = useRef<Record<string, L.Marker>>({});

  const [activeTileType, setActiveTileType] = useState<'standard' | 'opentopo'>('standard');

  // Reliable free basemap tile sources (NO API KEY REQUIRED, NO WATERMARKS)
  const TILE_CONFIG = {
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    },
    opentopo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; OpenTopoMap (CC-BY-SA), &copy; OpenStreetMap contributors',
      maxZoom: 17
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [destination.lat, destination.lng],
      zoom: 13,
      minZoom: 9,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true
    });

    const tileCfg = TILE_CONFIG.standard;
    const tileLayer = L.tileLayer(tileCfg.url, {
      subdomains: tileCfg.subdomains,
      attribution: tileCfg.attribution,
      maxZoom: tileCfg.maxZoom
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Tile Layer between OSM Standard and OpenTopo Terrain
  const switchTileLayer = (type: 'standard' | 'opentopo') => {
    setActiveTileType(type);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileCfg = TILE_CONFIG[type];
    const newLayer = L.tileLayer(tileCfg.url, {
      subdomains: tileCfg.subdomains,
      attribution: tileCfg.attribution,
      maxZoom: tileCfg.maxZoom
    }).addTo(map);

    tileLayerRef.current = newLayer;
  };

  // Update view when destination changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !destination) return;
    map.setView([destination.lat, destination.lng], 13);
  }, [destination]);

  // Update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(poiMarkersRef.current).forEach(m => m.remove());
    poiMarkersRef.current = {};

    // Destination Center Marker
    const centerIcon = L.divIcon({
      className: 'dest-center-marker',
      html: `
        <div style="
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          border: 2px solid white;
          box-shadow: 0 4px 14px rgba(5,150,105,0.4);
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>⭐</span>
          <span>${destination.name}</span>
        </div>
      `,
      iconSize: [120, 30],
      iconAnchor: [60, 15]
    });
    L.marker([destination.lat, destination.lng], { icon: centerIcon, zIndexOffset: 400 })
      .bindPopup(`<strong>${destination.name}</strong><br/>Khu vực trung tâm hành trình`)
      .addTo(map);

    // Attraction Markers
    attractions.forEach(attr => {
      if (!attr.lat || !attr.lng) return;
      const attrIcon = L.divIcon({
        className: 'attr-marker',
        html: `
          <div style="
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 4px 10px;
            border-radius: 14px;
            border: 2px solid white;
            box-shadow: 0 3px 10px rgba(37,99,235,0.35);
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>🏛️</span>
            <span>${attr.name.slice(0, 20)}</span>
          </div>
        `,
        iconSize: [110, 24],
        iconAnchor: [55, 12]
      });
      L.marker([attr.lat, attr.lng], { icon: attrIcon, zIndexOffset: 500 })
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; min-width: 180px;">
            <strong style="color: #1e40af; font-size: 13px;">🏛️ ${attr.name}</strong>
            <p style="margin: 4px 0 0; font-size: 11px; color: #475569;">${attr.description || 'Điểm tham quan đã chọn'}</p>
          </div>
        `)
        .addTo(map);
    });

    // POI Markers (Pharmacies, Hospitals, Restaurants, Hotels, Gas Stations)
    pois.forEach(poi => {
      const isSelected = selectedPOI?.id === poi.id;
      const isPharma = poi.category === 'pharmacy';
      const isHosp = poi.category === 'hospital';
      const isRest = poi.category === 'restaurant';
      const isHotel = poi.category === 'hotel';

      const bgGradient = isPharma
        ? 'linear-gradient(135deg, #e11d48, #be123c)'
        : isHosp
        ? 'linear-gradient(135deg, #dc2626, #991b1b)'
        : isRest
        ? 'linear-gradient(135deg, #f97316, #ea580c)'
        : isHotel
        ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
        : 'linear-gradient(135deg, #eab308, #ca8a04)';

      const iconEmoji = isPharma ? '💊' : isHosp ? '🏥' : isRest ? '🍲' : isHotel ? '🏨' : '⛽';
      const borderColor = isSelected ? '#ffffff' : 'rgba(255,255,255,0.85)';
      const shadowStyle = isSelected
        ? '0 0 16px rgba(225,29,72,0.6), 0 4px 12px rgba(0,0,0,0.35)'
        : '0 2px 8px rgba(0,0,0,0.22)';

      const poiIcon = L.divIcon({
        className: 'poi-custom-marker',
        html: `
          <div style="
            background: ${bgGradient};
            color: white;
            padding: ${isSelected ? '6px 12px' : '4px 8px'};
            border-radius: 16px;
            border: 2px solid ${borderColor};
            box-shadow: ${shadowStyle};
            font-size: ${isSelected ? '12px' : '11px'};
            font-weight: bold;
            white-space: nowrap;
            cursor: pointer;
            transform: translate(-50%, -50%) ${isSelected ? 'scale(1.18)' : 'scale(1)'};
            transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>${iconEmoji}</span>
            <span>${poi.name.length > 20 ? poi.name.slice(0, 18) + '...' : poi.name}</span>
          </div>
        `,
        iconSize: [120, 26],
        iconAnchor: [60, 13]
      });

      const marker = L.marker([poi.lat, poi.lng], {
        icon: poiIcon,
        zIndexOffset: isSelected ? 1200 : isPharma ? 800 : 600
      })
        .addTo(map)
        .on('click', () => {
          onSelectPOI(poi);
        });

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px; max-width: 240px;">
          <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: ${isPharma ? '#e11d48' : '#0284c7'}; margin-bottom: 2px;">
            ${iconEmoji} ${isPharma ? 'Hiệu thuốc / Nhà thuốc' : isHosp ? 'Bệnh viện & Y tế' : poi.category}
          </div>
          <h4 style="margin: 0 0 4px; font-size: 13px; font-weight: bold; color: #111827;">${poi.name}</h4>
          <p style="margin: 0 0 6px; font-size: 11px; color: #4b5563; line-height: 1.4;">📍 ${poi.address}</p>
          ${poi.phone ? `<p style="margin: 0 0 6px; font-size: 11px; color: #059669; font-weight: 600;">📞 ${poi.phone}</p>` : ''}
          <div style="margin-top: 6px;">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}"
              target="_blank"
              rel="noopener noreferrer"
              style="display: inline-flex; align-items: center; gap: 4px; background: #e11d48; color: white; padding: 5px 10px; border-radius: 6px; font-size: 11px; text-decoration: none; font-weight: bold; box-shadow: 0 1px 4px rgba(0,0,0,0.15);"
            >
              <span>Chỉ đường Google Maps</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      `);

      poiMarkersRef.current[poi.id] = marker;
    });
  }, [destination, attractions, pois, selectedPOI, onSelectPOI]);

  // Pan to selected POI
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPOI) return;
    map.flyTo([selectedPOI.lat, selectedPOI.lng], 15, {
      duration: 0.8,
      easeLinearity: 0.25
    });
    const marker = poiMarkersRef.current[selectedPOI.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedPOI]);

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Top Right: Tile Switcher */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-1 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-md">
        <button
          type="button"
          onClick={() => switchTileLayer('standard')}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            activeTileType === 'standard'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Bản đồ đường phố & địa chỉ (OpenStreetMap)"
        >
          <span>🗺️</span>
          <span>Đường phố</span>
        </button>

        <button
          type="button"
          onClick={() => switchTileLayer('opentopo')}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            activeTileType === 'opentopo'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Bản đồ Địa hình 3D (OpenTopoMap)"
        >
          <span>🏔️</span>
          <span>Địa hình</span>
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-md text-[11px] space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Trung tâm khu vực ({destination.name})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
          <span className="text-gray-700 dark:text-gray-300 font-bold">Nhà thuốc & Hiệu thuốc (Khẩn cấp)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Điểm tham quan đã chọn</span>
        </div>
      </div>
    </div>
  );
}
