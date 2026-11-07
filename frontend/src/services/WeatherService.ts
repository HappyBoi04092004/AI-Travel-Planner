import { DestinationWeather } from '@/types/wizard';

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
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

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
    const fallbackResult: DestinationWeather = {
      location: destinationName,
      forecastAvailable: false,
      date: targetDateStr,
      condition: 'Chưa có dự báo thời gian thực',
      conditionIcon: '📅',
      tempMin: 20,
      tempMax: 28,
      rainProbability: 0,
      rainfallMm: 0,
      windSpeed: 0,
      note: 'Dự báo thời tiết chi tiết thực tế từ vệ tinh Open-Meteo chỉ khả dụng trong vòng 16 ngày tới. Ngày bạn chọn nằm ngoài phạm vi dự báo.'
    };
    return fallbackResult;
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

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }

    const data = await res.json();
    const daily = data.daily;
    if (!daily || !daily.time || daily.time.length === 0) {
      throw new Error('No daily forecast found in response');
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
  } catch (error) {
    console.error(`Failed to fetch weather for ${destinationName}:`, error);
    return {
      location: destinationName,
      forecastAvailable: false,
      date: targetDateStr,
      condition: 'Không thể kết nối dịch vụ thời tiết',
      conditionIcon: '⚠️',
      tempMin: 0,
      tempMax: 0,
      rainProbability: 0,
      rainfallMm: 0,
      windSpeed: 0,
      note: 'Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.'
    };
  }
}

