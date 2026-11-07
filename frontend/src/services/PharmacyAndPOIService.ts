import { POIItem } from '@/types/wizard';

// Curated verified POIs for major Vietnam destinations (Real pharmacies, hospitals, hotels, gas stations)
const VERIFIED_VIETNAM_POIS: POIItem[] = [
  // --- NINH BÌNH ---
  {
    id: 'poi_nb_pharma_1',
    name: 'Nhà thuốc FPT Long Châu - Ninh Bình',
    category: 'pharmacy',
    categoryName: 'Nhà thuốc GPP',
    address: 'Số 104 Lê Hồng Phong, P. Đông Thành, TP. Ninh Bình',
    lat: 20.2562,
    lng: 105.9754,
    phone: '1800 6928',
    openingHours: '06:30 - 22:00',
    distanceFromCenter: '1.2 km'
  },
  {
    id: 'poi_nb_pharma_2',
    name: 'Nhà thuốc Pharmacity Tràng An',
    category: 'pharmacy',
    categoryName: 'Nhà thuốc chuỗi',
    address: 'Đường Xuân Thành, P. Tân Thành, TP. Ninh Bình (Gần lối vào Tràng An)',
    lat: 20.2520,
    lng: 105.9620,
    phone: '1800 6821',
    openingHours: '06:00 - 23:00',
    distanceFromCenter: '2.5 km'
  },
  {
    id: 'poi_nb_hosp_1',
    name: 'Bệnh viện Đa khoa tỉnh Ninh Bình',
    category: 'hospital',
    categoryName: 'Bệnh viện & Cấp cứu',
    address: 'Đường Tuệ Tĩnh, P. Nam Thành, TP. Ninh Bình',
    lat: 20.2415,
    lng: 105.9710,
    phone: '0229 3871 030',
    openingHours: 'Cấp cứu 24/7',
    distanceFromCenter: '2.0 km'
  },
  {
    id: 'poi_nb_rest_1',
    name: 'Nhà hàng Thăng Long - Đặc sản Dê núi & Cơm cháy',
    category: 'restaurant',
    categoryName: 'Quán ăn đặc sản',
    address: 'Chi Phong, Trường Yên, Hoa Lư, Ninh Bình (Cạnh Tràng An)',
    lat: 20.2642,
    lng: 105.9125,
    phone: '0975 155 458',
    openingHours: '08:00 - 21:30',
    distanceFromCenter: '350 m'
  },
  {
    id: 'poi_nb_fuel_1',
    name: 'Cửa hàng Xăng dầu Petrolimex số 08 Ninh Bình',
    category: 'gas_station',
    categoryName: 'Trạm xăng',
    address: 'Quốc lộ 1A, P. Thanh Bình, TP. Ninh Bình',
    lat: 20.2480,
    lng: 105.9810,
    phone: '0229 3872 114',
    openingHours: '24/24',
    distanceFromCenter: '1.8 km'
  },

  // --- ĐÀ NẴNG ---
  {
    id: 'poi_dn_pharma_1',
    name: 'Nhà thuốc FPT Long Châu - Mỹ Khê',
    category: 'pharmacy',
    categoryName: 'Nhà thuốc GPP',
    address: 'Số 42 Võ Văn Kiệt, P. An Hải Đông, Q. Sơn Trà, TP. Đà Nẵng',
    lat: 16.0615,
    lng: 108.2380,
    phone: '1800 6928',
    openingHours: '06:00 - 22:30',
    distanceFromCenter: '600 m từ bãi biển Mỹ Khê'
  },
  {
    id: 'poi_dn_pharma_2',
    name: 'Nhà thuốc Pharmacity Trần Hưng Đạo',
    category: 'pharmacy',
    categoryName: 'Nhà thuốc chuỗi',
    address: 'Số 280 Trần Hưng Đạo, P. An Hải Tây, Q. Sơn Trà, TP. Đà Nẵng',
    lat: 16.0592,
    lng: 108.2310,
    phone: '1800 6821',
    openingHours: '24/24',
    distanceFromCenter: '400 m từ Cầu Rồng'
  },
  {
    id: 'poi_dn_hosp_1',
    name: 'Bệnh viện Hoàn Mỹ Đà Nẵng',
    category: 'hospital',
    categoryName: 'Bệnh viện đa khoa quốc tế',
    address: 'Số 291 Nguyễn Văn Linh, P. Thạc Gián, Q. Thanh Khê, TP. Đà Nẵng',
    lat: 16.0608,
    lng: 108.2085,
    phone: '0236 3650 676',
    openingHours: 'Cấp cứu 24/7',
    distanceFromCenter: '1.5 km'
  },
  {
    id: 'poi_dn_hotel_1',
    name: 'Khách sạn Sala Danang Beach Hotel',
    category: 'hotel',
    categoryName: 'Khách sạn ven biển',
    address: 'Số 36 - 38 Lâm Hoành, P. Phước Mỹ, Q. Sơn Trà, TP. Đà Nẵng',
    lat: 16.0645,
    lng: 108.2452,
    phone: '0236 3658 555',
    openingHours: 'Nhận phòng 24/24',
    distanceFromCenter: '150 m'
  },
  {
    id: 'poi_dn_fuel_1',
    name: 'Trạm xăng dầu Petrolimex số 05 Đà Nẵng',
    category: 'gas_station',
    categoryName: 'Trạm xăng',
    address: 'Đường Nguyễn Văn Linh, Q. Hải Châu, TP. Đà Nẵng',
    lat: 16.0620,
    lng: 108.2160,
    phone: '0236 3582 312',
    openingHours: '24/24',
    distanceFromCenter: '800 m'
  },

  // --- HÀ NỘI ---
  {
    id: 'poi_hn_pharma_1',
    name: 'Nhà thuốc Long Châu - Phố Cổ Hà Nội',
    category: 'pharmacy',
    categoryName: 'Nhà thuốc GPP',
    address: 'Số 54 Hàng Gai, P. Hàng Gai, Q. Hoàn Kiếm, Hà Nội',
    lat: 21.0315,
    lng: 105.8505,
    phone: '1800 6928',
    openingHours: '06:30 - 22:30',
    distanceFromCenter: '250 m từ Hồ Hoàn Kiếm'
  },
  {
    id: 'poi_hn_hosp_1',
    name: 'Bệnh viện Hữu nghị Việt Đức',
    category: 'hospital',
    categoryName: 'Bệnh viện ngoại khoa tuyến đầu',
    address: 'Số 40 Tràng Thi, P. Hàng Bông, Q. Hoàn Kiếm, Hà Nội',
    lat: 21.0280,
    lng: 105.8470,
    phone: '024 3825 3531',
    openingHours: 'Cấp cứu 24/7',
    distanceFromCenter: '500 m'
  },
  {
    id: 'poi_hn_rest_1',
    name: 'Bún chả Đắc Kim - Hàng Mành',
    category: 'restaurant',
    categoryName: 'Quán ăn truyền thống',
    address: 'Số 1 Hàng Mành, P. Hàng Gai, Q. Hoàn Kiếm, Hà Nội',
    lat: 21.0330,
    lng: 105.8490,
    phone: '024 3828 7056',
    openingHours: '09:00 - 21:00',
    distanceFromCenter: '400 m'
  },

  // --- ĐÀ LẠT ---
  {
    id: 'poi_dl_pharma_1',
    name: 'Nhà thuốc Pharmacity Chợ Đà Lạt',
    category: 'pharmacy',
    categoryName: 'Nhà thuốc chuỗi',
    address: 'Số 1 Nguyễn Thị Minh Khai, P. 1, TP. Đà Lạt',
    lat: 11.9425,
    lng: 108.4370,
    phone: '1800 6821',
    openingHours: '06:00 - 23:00',
    distanceFromCenter: '100 m từ Chợ Đà Lạt'
  },
  {
    id: 'poi_dl_hosp_1',
    name: 'Bệnh viện Đa khoa tỉnh Lâm Đồng',
    category: 'hospital',
    categoryName: 'Bệnh viện tỉnh',
    address: 'Số 01 Phạm Ngọc Thạch, P. 6, TP. Đà Lạt',
    lat: 11.9510,
    lng: 108.4285,
    phone: '0263 3827 528',
    openingHours: 'Cấp cứu 24/7',
    distanceFromCenter: '1.8 km'
  }
];

export async function fetchPOIsNearLocation(
  lat: number,
  lng: number,
  category: 'all' | 'pharmacy' | 'hospital' | 'restaurant' | 'hotel' | 'gas_station',
  radiusMeters: number = 5000
): Promise<POIItem[]> {
  try {
    // Attempt Overpass API with 4-second timeout
    const amenityFilter =
      category === 'pharmacy'
        ? 'node["amenity"="pharmacy"]'
        : category === 'hospital'
        ? 'node["amenity"~"hospital|clinic"]'
        : category === 'restaurant'
        ? 'node["amenity"="restaurant"]'
        : category === 'hotel'
        ? 'node["tourism"="hotel"]'
        : category === 'gas_station'
        ? 'node["amenity"="fuel"]'
        : 'node["amenity"~"pharmacy|hospital|restaurant|fuel"]';

    const overpassQuery = `[out:json][timeout:4];${amenityFilter}(around:${radiusMeters},${lat},${lng});out center 15;`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.elements && data.elements.length > 0) {
        const livePOIs: POIItem[] = data.elements.map((el: any) => {
          const tags = el.tags || {};
          const cat =
            tags.amenity === 'pharmacy'
              ? 'pharmacy'
              : tags.amenity === 'hospital' || tags.amenity === 'clinic'
              ? 'hospital'
              : tags.amenity === 'restaurant'
              ? 'restaurant'
              : tags.tourism === 'hotel'
              ? 'hotel'
              : tags.amenity === 'fuel'
              ? 'gas_station'
              : 'pharmacy';

          // Distance
          const dKm = calculateDistanceKm(lat, lng, el.lat, el.lon);

          return {
            id: `osm_${el.id}`,
            name: tags.name || tags['name:vi'] || tags['name:en'] || (cat === 'pharmacy' ? 'Nhà thuốc tây' : 'Điểm tiện ích'),
            category: cat,
            categoryName: getCategoryName(cat),
            address: [tags['addr:housenumber'], tags['addr:street'], tags['addr:district'], tags['addr:city']]
              .filter(Boolean)
              .join(', ') || 'Khu vực trung tâm địa phương',
            lat: el.lat,
            lng: el.lon,
            phone: tags.phone || tags['contact:phone'],
            openingHours: tags.opening_hours || 'Giờ hành chính',
            distanceFromCenter: `${dKm < 1 ? Math.round(dKm * 1000) + ' m' : dKm.toFixed(1) + ' km'}`
          };
        });

        return livePOIs;
      }
    }
  } catch (err) {
    // If Overpass API times out or fails, gracefully return verified local database
    console.warn('Overpass API query timed out or failed, using verified POI database:', err);
  }

  // Fallback to verified POIs, filtered by distance and category
  return VERIFIED_VIETNAM_POIS.filter(poi => {
    if (category !== 'all' && poi.category !== category) return false;
    const dist = calculateDistanceKm(lat, lng, poi.lat, poi.lng);
    return dist < 80; // Within reasonable radius of destination
  });
}

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function getCategoryName(cat: POIItem['category']): string {
  switch (cat) {
    case 'pharmacy':
      return 'Nhà thuốc / Hiệu thuốc';
    case 'hospital':
      return 'Bệnh viện / Phòng khám';
    case 'restaurant':
      return 'Quán ăn / Nhà hàng';
    case 'hotel':
      return 'Khách sạn / Lưu trú';
    case 'gas_station':
      return 'Trạm xăng dầu';
    default:
      return 'Địa điểm du lịch';
  }
}

