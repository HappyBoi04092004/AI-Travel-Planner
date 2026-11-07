import { DestinationWeather } from '@/types/wizard';
import { logClientEvent } from '@/utils/logger';

// Weather code to Vietnamese condition mapping for Open-Meteo
const WEATHER_CODES: Record<number, { text: string; icon: string }> = {
  0: { text: 'Trời quang đãng, nắng đẹp', icon: '☀️' },
  1: { text: 'Ít mây, trời nắng nhẹ', icon: '🌤️' },
  2: { text: 'Có mây rải rác', icon: '⛅' },
  3: { text: 'Nhiều mây, âm u', icon: '☁️' },
  45: { text: 'Sương mù', icon: '🌫️' },
  48: { text: 'Sương mù đọng sương', icon: '🌫️' },
  51: { text: 'Mưa phùn nhẹ', icon: '🌦️' },
  53: { text: 'Mưa phùn vừa', icon: '🌦️' },
  55: { text: 'Mưa phùn dày hạt', icon: '🌧️' },
  61: { text: 'Mưa rào nhẹ', icon: '🌧️' },
  63: { text: 'Mưa vừa', icon: '🌧️' },
  65: { text: 'Mưa to đến rất to', icon: '🌧️' },
  71: { text: 'Tuyết rơi nhẹ', icon: '🌨️' },
  73: { text: 'Tuyết rơi vừa', icon: '❄️' },
  75: { text: 'Tuyết rơi dày', icon: '❄️' },
  77: { text: 'Mưa tuyết', icon: '🌨️' },
  80: { text: 'Mưa rào thoáng qua', icon: '🌦️' },
  81: { text: 'Mưa rào rải rác', icon: '🌧️' },
  82: { text: 'Mưa rào xối xả', icon: '⛈️' },
  85: { text: 'Mưa tuyết nhẹ', icon: '🌨️' },
  86: { text: 'Mưa tuyết lớn', icon: '❄️' },
  95: { text: 'Giông bão sấm sét', icon: '⛈️' },
  96: { text: 'Giông kèm mưa đá nhỏ', icon: '⛈️' },
  99: { text: 'Giông bão kèm mưa đá lớn', icon: '⛈️' },
};

// In-memory weather cache
const _weatherCache: Map<string, { data: DestinationWeather; timestamp: number }> = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes for successful responses

// Helper: Estimate seasonal climate in Vietnam when API is unavailable (503/timeout) or outside 16 days
function getSeasonalClimateFallback(
  destinationName: string,
  lat: number,
  lng: number,
  targetDateStr?: string,
  noteMessage?: string
): DestinationWeather {
  let tempMin = 22;
  let tempMax = 29;
  let rainProbability = 15;
  let rainfallMm = 0;
  let windSpeed = 10;
  let condition = 'Thời tiết thuận lợi (Theo mùa)';
  let icon = '⛅';

  if (lat >= 20.0) {
    // Northern Vietnam (Hà Nội, Sa Pa, Hạ Long, Ninh Bình)
    if (lat > 22.0) {
      tempMin = 14;
      tempMax = 22;
      condition = 'Mát mẻ vùng cao';
      icon = '🌤️';
    } else {
      tempMin = 20;
      tempMax = 28;
      condition = 'Nắng ráo dịu mát';
      icon = '⛅';
    }
  } else if (lat >= 14.0) {
    // Central Vietnam (Huế, Đà Nẵng, Quảng Nam, Bình Định)
    tempMin = 23;
    tempMax = 30;
    condition = 'Nắng ấm, gió biển';
    icon = '🌤️';
  } else if (lat >= 11.5 && lng < 108.6) {
    // Central Highlands (Đà Lạt, Gia Lai)
    tempMin = 16;
    tempMax = 24;
    condition = 'Se lạnh, trong lành';
    icon = '⛅';
  } else {
    // Southern Vietnam (TP. Hồ Chí Minh, Cần Thơ, Phú Quốc)
    tempMin = 25;
    tempMax = 33;
    condition = 'Nắng ấm nhiệt đới';
    icon = '☀️';
  }

  // Generate 7-day realistic fallback forecast
  const baseDate = targetDateStr ? new Date(targetDateStr) : new Date();
  const dailyForecast = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    return {
      date: dateStr,
      condition,
      conditionIcon: icon,
      tempMin,
      tempMax,
      rainProbability,
      rainfallMm
    };
  });

  return {
    location: destinationName,
    forecastAvailable: false,
    date: targetDateStr || new Date().toISOString().split('T')[0],
    condition,
    conditionIcon: icon,
    tempMin,
    tempMax,
    rainProbability,
    rainfallMm,
    windSpeed,
    dailyForecast,
    note:
      noteMessage ||
      'Dữ liệu vệ tinh thời tiết thực tế chỉ khả dụng trong vòng 16 ngày tới. Đang hiển thị nhiệt độ tham khảo theo mùa.'
  };
}

export async function fetchDestinationWeather(
  destinationName: string,
  lat: number,
  lng: number,
  targetDateStr?: string
): Promise<DestinationWeather> {
  const cacheKey = `${lat.toFixed(3)},${lng.toFixed(3)}_${targetDateStr || 'today'}`;
  const cached = _weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // Check if targetDate is within 16 days from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let targetDate = today;
  let isWithin16Days = true;

  if (targetDateStr) {
    targetDate = new Date(targetDateStr);
    targetDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    if (diffDays < 0 || diffDays > 16) {
      isWithin16Days = false;
    }
  }

  if (!isWithin16Days) {
    return getSeasonalClimateFallback(
      destinationName,
      lat,
      lng,
      targetDateStr,
      'Dự báo thời tiết thực tế từ vệ tinh Open-Meteo khả dụng trong vòng 16 ngày tới. Ngày bạn chọn đang hiển thị nhiệt độ tham khảo mùa.'
    );
  }

  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', lat.toString());
    url.searchParams.set('longitude', lng.toString());
    url.searchParams.set(
      'daily',
      'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weathercode,windspeed_10m_max'
    );
    url.searchParams.set('timezone', 'Asia/Bangkok');
    url.searchParams.set('forecast_days', '16');

    // Add a reasonable timeout (6 seconds) to avoid freezing requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      logClientEvent('warn', `Open-Meteo returned status ${res.status} for ${destinationName}`);
      const fallback = getSeasonalClimateFallback(
        destinationName,
        lat,
        lng,
        targetDateStr,
        `Máy chủ thời tiết Open-Meteo đang bận hoặc bảo trì (${res.status}). Hệ thống tự động dùng dữ liệu nhiệt độ tham khảo mùa.`
      );
      _weatherCache.set(cacheKey, { data: fallback, timestamp: Date.now() });
      return fallback;
    }

    const data = await res.json();
    const daily = data.daily;
    if (!daily || !daily.time || daily.time.length === 0) {
      return getSeasonalClimateFallback(
        destinationName,
        lat,
        lng,
        targetDateStr,
        'Dữ liệu dự báo thời tiết tạm thời chưa có sẵn cho toạ độ này.'
      );
    }

    // Find the day matching targetDate or default to day 0
    let dayIndex = 0;
    if (targetDateStr) {
      const foundIdx = daily.time.findIndex((t: string) => t === targetDateStr);
      if (foundIdx >= 0) {
        dayIndex = foundIdx;
      }
    }

    const code = daily.weathercode[dayIndex];
    const conditionInfo = WEATHER_CODES[code] || { text: 'Có mây rải rác', icon: '⛅' };

    const dailyForecast = daily.time.slice(0, 7).map((t: string, i: number) => {
      const c = daily.weathercode[i];
      const cond = WEATHER_CODES[c] || { text: 'Có mây', icon: '⛅' };
      return {
        date: t,
        condition: cond.text,
        conditionIcon: cond.icon,
        tempMin: Math.round(daily.temperature_2m_min[i]),
        tempMax: Math.round(daily.temperature_2m_max[i]),
        rainProbability: daily.precipitation_probability_max[i] || 0,
        rainfallMm: Math.round((daily.precipitation_sum[i] || 0) * 10) / 10
      };
    });

    const weatherResult: DestinationWeather = {
      location: destinationName,
      forecastAvailable: true,
      date: daily.time[dayIndex],
      condition: conditionInfo.text,
      conditionIcon: conditionInfo.icon,
      tempMin: Math.round(daily.temperature_2m_min[dayIndex]),
      tempMax: Math.round(daily.temperature_2m_max[dayIndex]),
      rainProbability: daily.precipitation_probability_max[dayIndex] || 0,
      rainfallMm: Math.round((daily.precipitation_sum[dayIndex] || 0) * 10) / 10,
      windSpeed: Math.round((daily.windspeed_10m_max[dayIndex] || 0) * 10) / 10,
      dailyForecast
    };

    _weatherCache.set(cacheKey, { data: weatherResult, timestamp: Date.now() });
    return weatherResult;
  } catch (error: any) {
    logClientEvent('warn', `Notice for ${destinationName}`, error?.message || error);
    const fallback = getSeasonalClimateFallback(
      destinationName,
      lat,
      lng,
      targetDateStr,
      'Kết nối đến máy chủ thời tiết Open-Meteo tạm gián đoạn. Đang hiển thị nhiệt độ tham khảo mùa.'
    );
    _weatherCache.set(cacheKey, { data: fallback, timestamp: Date.now() });
    return fallback;
  }
}
