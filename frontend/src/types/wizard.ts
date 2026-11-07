export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

export type VietnamRegion = 'North' | 'Central' | 'South';

export interface TouristSpot {
  id: string;
  name: string;
  category: string;
  icon: string;
  lat: number;
  lng: number;
  description: string;
  highlightTag?: string;
  activities?: string[]; // Specific activities/experiences: Đi thuyền, Ăn dê núi, Đi chùa, Đi đền thờ...
  subLocations?: string[]; // Specific attractions/monuments inside this cluster
  foodSpecialties?: string[]; // Local specialties to enjoy at this cluster
}

export interface VietnamDestination {
  id: string;
  name: string;
  province: string;
  provinceType: 'city' | 'province';
  mergedFrom: string; // e.g. "Hợp nhất Ninh Bình, Hà Nam, Nam Định" or "Giữ nguyên"
  region: VietnamRegion;
  regionName: string; // 'Miền Bắc' | 'Miền Trung' | 'Miền Nam'
  lat: number;
  lng: number;
  image: string;
  description: string;
  tags: string[];
  bestSeason: string;
  weather?: DestinationWeather;
  touristSpots?: TouristSpot[];
}

export interface DestinationWeather {
  location: string;
  forecastAvailable: boolean;
  date?: string;
  condition: string;
  conditionIcon: string;
  tempMin: number;
  tempMax: number;
  rainProbability: number;
  rainfallMm: number;
  windSpeed: number;
  dailyForecast?: {
    date: string;
    condition: string;
    conditionIcon: string;
    tempMin: number;
    tempMax: number;
    rainProbability: number;
    rainfallMm: number;
  }[];
  note?: string;
}

export interface LocalSpecialty {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  category: 'dish' | 'drink' | 'gift';
  categoryName: string;
  description: string;
  recommendedPlaces: string[];
  image: string;
}

export interface CulturalHighlight {
  id: string;
  destinationId: string;
  destinationName: string;
  title: string;
  type: 'festival' | 'custom' | 'history' | 'lifestyle';
  typeName: string;
  description: string;
  periodOrTime?: string;
}

export interface AttractionItem {
  id: string;
  destinationId: string;
  destinationName: string;
  name: string;
  category: 'nature' | 'heritage' | 'entertainment' | 'culture';
  categoryName: string;
  description: string;
  estimatedDuration: string; // e.g. "2 - 3 giờ"
  recommendedTime: string; // e.g. "Buổi sáng, 8:00 - 11:00"
  lat: number;
  lng: number;
  image: string;
}

export type TransportMode = 'motorbike' | 'car' | 'bus' | 'train' | 'plane' | 'sleeper_bus';

export interface TransportSegment {
  from: string;
  to: string;
  selectedMode: TransportMode;
  estimatedDistanceKm: number;
  estimatedDurationHours: number;
  estimatedCostVND: number;
  advantages: string[];
  disadvantages: string[];
  suitableFor: string;
}

export interface POIItem {
  id: string;
  name: string;
  category: 'pharmacy' | 'hospital' | 'restaurant' | 'hotel' | 'gas_station' | 'attraction';
  categoryName: string;
  address: string;
  lat: number;
  lng: number;
  distanceFromCenter?: string;
  phone?: string;
  openingHours?: string;
}

export interface TripWizardState {
  currentStep: WizardStep;
  // Step 1: Dates
  startDate: string;
  returnDate: string;
  totalDays: number;
  originCity: string;
  tripPace: 'relaxed' | 'balanced' | 'fast';
  
  // Step 2: Selected Destinations
  selectedDestinations: VietnamDestination[];
  
  // Step 3: Culture & Attractions
  selectedAttractions: AttractionItem[];
  selectedSpecialties: LocalSpecialty[];
  
  // Step 4: Transportation
  transportSegments: TransportSegment[];
  overallTransportMode: TransportMode;
  
  // Step 5: POI & Map
  selectedPOICategory: 'all' | 'pharmacy' | 'hospital' | 'restaurant' | 'hotel' | 'gas_station';
  activePOIList: POIItem[];
  
  // Step 6: Summary & Generated Itinerary
  isGeneratingItinerary: boolean;
  generatedItinerary: any | null;
  budgetEstimate: any | null;

  // Fullscreen Map State
  isMapFullscreen: boolean;
}

