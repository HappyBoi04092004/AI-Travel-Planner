'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WizardStep,
  TripWizardState,
  VietnamDestination,
  AttractionItem,
  LocalSpecialty,
  TransportMode,
  TransportSegment,
  POIItem
} from '@/types/wizard';
import { VIETNAM_DESTINATIONS } from '@/data/vietnamData';

interface TripWizardContextType extends TripWizardState {
  setCurrentStep: (step: WizardStep) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  goToStep: (step: WizardStep) => boolean;
  
  // Step 1 Actions
  setDates: (startDate: string, returnDate: string) => void;
  setOriginCity: (city: string) => void;
  setTripPace: (pace: 'relaxed' | 'balanced' | 'fast') => void;
  canProceedStep1: boolean;

  // Step 2 Actions
  toggleDestination: (dest: VietnamDestination) => void;
  removeDestination: (destId: string) => void;
  canProceedStep2: boolean;

  // Step 3 Actions
  toggleAttraction: (attraction: AttractionItem) => void;
  toggleSpecialty: (specialty: LocalSpecialty) => void;

  // Step 4 Actions
  setOverallTransportMode: (mode: TransportMode) => void;
  updateSegmentMode: (index: number, mode: TransportMode) => void;

  // Step 5 Actions
  setSelectedPOICategory: (cat: TripWizardState['selectedPOICategory']) => void;
  setActivePOIList: (pois: POIItem[]) => void;

  // Step 6 Actions
  setGeneratedItinerary: (itinerary: any) => void;
  setBudgetEstimate: (budget: any) => void;
  setIsGeneratingItinerary: (loading: boolean) => void;

  // Fullscreen Map State
  isMapFullscreen: boolean;
  setIsMapFullscreen: (val: boolean) => void;

  // Global
  resetWizard: () => void;
}

const STORAGE_KEY = 'vietnam_trip_wizard_v3_34provinces';

// Calculate days between two dates
function calculateDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = d2.getTime() - d1.getTime();
  if (diffTime < 0) return 0;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

const defaultState: TripWizardState = {
  currentStep: 1,
  startDate: '',
  returnDate: '',
  totalDays: 0,
  originCity: 'Hà Nội',
  tripPace: 'balanced',
  selectedDestinations: [VIETNAM_DESTINATIONS[0]], // TP. Hà Nội as default
  selectedAttractions: [],
  selectedSpecialties: [],
  transportSegments: [],
  overallTransportMode: 'car',
  selectedPOICategory: 'all',
  activePOIList: [],
  isGeneratingItinerary: false,
  generatedItinerary: null,
  budgetEstimate: null,
  isMapFullscreen: false
};

const TripWizardContext = createContext<TripWizardContextType | undefined>(undefined);

export function TripWizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TripWizardState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore from sessionStorage on client load
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify selectedDestinations only contain valid 34 provinces
        const validDests = (parsed.selectedDestinations || []).filter((d: any) =>
          VIETNAM_DESTINATIONS.some(vd => vd.id === d.id)
        );

        setState(prev => ({
          ...prev,
          ...parsed,
          selectedDestinations: validDests.length > 0 ? validDests : [VIETNAM_DESTINATIONS[0]],
          currentStep: parsed.currentStep || 1
        }));
      } else {
        // Set default dates: tomorrow to +4 days (5 days trip)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(tomorrow);
        nextWeek.setDate(nextWeek.getDate() + 4);

        const startStr = tomorrow.toISOString().split('T')[0];
        const returnStr = nextWeek.toISOString().split('T')[0];
        setState(prev => ({
          ...prev,
          startDate: startStr,
          returnDate: returnStr,
          totalDays: 5,
          selectedDestinations: [VIETNAM_DESTINATIONS[0]]
        }));
      }
    } catch (e) {
      console.warn('Failed to parse wizard storage state:', e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to sessionStorage on state change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save wizard storage state:', e);
    }
  }, [state, isHydrated]);

  // Recalculate transport segments whenever selected destinations change
  useEffect(() => {
    const dests = state.selectedDestinations;
    if (dests.length < 2) {
      setState(prev => ({ ...prev, transportSegments: [] }));
      return;
    }

    const segments: TransportSegment[] = [];
    for (let i = 0; i < dests.length - 1; i++) {
      const from = dests[i];
      const to = dests[i + 1];
      
      // Calculate approximate Haversine distance in km
      const R = 6371; // Earth radius in km
      const dLat = ((to.lat - from.lat) * Math.PI) / 180;
      const dLon = ((to.lng - from.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((from.lat * Math.PI) / 180) *
          Math.cos((to.lat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distStraight = Math.round(R * c);
      // Actual road/route distance is typically 1.25x straight line
      const estDistance = Math.round(distStraight * 1.25);

      // Default mode based on distance
      let mode: TransportMode = 'car';
      let estHours = 2;
      let estCost = 500000;

      if (estDistance > 450) {
        mode = 'plane';
        estHours = 1.5;
        estCost = 1500000;
      } else if (estDistance > 150) {
        mode = 'sleeper_bus';
        estHours = Math.round(estDistance / 50);
        estCost = 300000;
      } else {
        mode = 'car';
        estHours = Math.round((estDistance / 60) * 10) / 10;
        estCost = 400000;
      }

      segments.push({
        from: from.name,
        to: to.name,
        selectedMode: mode,
        estimatedDistanceKm: estDistance,
        estimatedDurationHours: estHours,
        estimatedCostVND: estCost,
        advantages: ['Linh hoạt lịch trình', 'Thoải mái ngắm cảnh'],
        disadvantages: ['Phụ thuộc vào mật độ giao thông'],
        suitableFor: 'Nhóm gia đình hoặc bạn bè'
      });
    }

    setState(prev => ({ ...prev, transportSegments: segments }));
  }, [state.selectedDestinations]);

  // Validation rules
  const canProceedStep1 = Boolean(
    state.startDate &&
    state.returnDate &&
    state.totalDays >= 1 &&
    new Date(state.returnDate) >= new Date(state.startDate)
  );

  const canProceedStep2 = state.selectedDestinations.length > 0;

  // Step Navigation
  const setCurrentStep = (step: WizardStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const nextStep = (): boolean => {
    if (state.currentStep === 1 && !canProceedStep1) return false;
    if (state.currentStep === 2 && !canProceedStep2) return false;

    if (state.currentStep < 6) {
      setCurrentStep((state.currentStep + 1) as WizardStep);
      return true;
    }
    return false;
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setCurrentStep((state.currentStep - 1) as WizardStep);
    }
  };

  const goToStep = (step: WizardStep): boolean => {
    if (step > 1 && !canProceedStep1) return false;
    if (step > 2 && !canProceedStep2) return false;
    setCurrentStep(step);
    return true;
  };

  // Step 1 Actions
  const setDates = (startDate: string, returnDate: string) => {
    const days = calculateDays(startDate, returnDate);
    setState(prev => ({
      ...prev,
      startDate,
      returnDate,
      totalDays: days
    }));
  };

  const setOriginCity = (originCity: string) => {
    setState(prev => ({ ...prev, originCity }));
  };

  const setTripPace = (tripPace: 'relaxed' | 'balanced' | 'fast') => {
    setState(prev => ({ ...prev, tripPace }));
  };

  // Step 2 Actions
  const toggleDestination = (dest: VietnamDestination) => {
    setState(prev => {
      const exists = prev.selectedDestinations.some(d => d.id === dest.id);
      if (exists) {
        // Prevent deselecting if it's the last one
        if (prev.selectedDestinations.length <= 1) {
          return prev;
        }
        return {
          ...prev,
          selectedDestinations: prev.selectedDestinations.filter(d => d.id !== dest.id)
        };
      } else {
        return {
          ...prev,
          selectedDestinations: [...prev.selectedDestinations, dest]
        };
      }
    });
  };

  const removeDestination = (destId: string) => {
    setState(prev => {
      if (prev.selectedDestinations.length <= 1) return prev;
      return {
        ...prev,
        selectedDestinations: prev.selectedDestinations.filter(d => d.id !== destId)
      };
    });
  };

  // Step 3 Actions
  const toggleAttraction = (attraction: AttractionItem) => {
    setState(prev => {
      const exists = prev.selectedAttractions.some(a => a.id === attraction.id);
      if (exists) {
        return {
          ...prev,
          selectedAttractions: prev.selectedAttractions.filter(a => a.id !== attraction.id)
        };
      } else {
        return {
          ...prev,
          selectedAttractions: [...prev.selectedAttractions, attraction]
        };
      }
    });
  };

  const toggleSpecialty = (specialty: LocalSpecialty) => {
    setState(prev => {
      const exists = prev.selectedSpecialties.some(s => s.id === specialty.id);
      if (exists) {
        return {
          ...prev,
          selectedSpecialties: prev.selectedSpecialties.filter(s => s.id !== specialty.id)
        };
      } else {
        return {
          ...prev,
          selectedSpecialties: [...prev.selectedSpecialties, specialty]
        };
      }
    });
  };

  // Step 4 Actions
  const setOverallTransportMode = (overallTransportMode: TransportMode) => {
    setState(prev => ({ ...prev, overallTransportMode }));
  };

  const updateSegmentMode = (index: number, mode: TransportMode) => {
    setState(prev => {
      const updated = [...prev.transportSegments];
      if (updated[index]) {
        updated[index] = { ...updated[index], selectedMode: mode };
      }
      return { ...prev, transportSegments: updated };
    });
  };

  // Step 5 Actions
  const setSelectedPOICategory = (selectedPOICategory: TripWizardState['selectedPOICategory']) => {
    setState(prev => ({ ...prev, selectedPOICategory }));
  };

  const setActivePOIList = (activePOIList: POIItem[]) => {
    setState(prev => ({ ...prev, activePOIList }));
  };

  // Step 6 Actions
  const setGeneratedItinerary = (generatedItinerary: any) => {
    setState(prev => ({ ...prev, generatedItinerary }));
  };

  const setBudgetEstimate = (budgetEstimate: any) => {
    setState(prev => ({ ...prev, budgetEstimate }));
  };

  const setIsGeneratingItinerary = (isGeneratingItinerary: boolean) => {
    setState(prev => ({ ...prev, isGeneratingItinerary }));
  };

  const setIsMapFullscreen = (val: boolean) => {
    setState(prev => ({ ...prev, isMapFullscreen: val }));
  };

  const resetWizard = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  };

  return (
    <TripWizardContext.Provider
      value={{
        ...state,
        setCurrentStep,
        nextStep,
        prevStep,
        goToStep,
        setDates,
        setOriginCity,
        setTripPace,
        canProceedStep1,
        toggleDestination,
        removeDestination,
        canProceedStep2,
        toggleAttraction,
        toggleSpecialty,
        setOverallTransportMode,
        updateSegmentMode,
        setSelectedPOICategory,
        setActivePOIList,
        setGeneratedItinerary,
        setBudgetEstimate,
        setIsGeneratingItinerary,
        setIsMapFullscreen,
        resetWizard
      }}
    >
      {children}
    </TripWizardContext.Provider>
  );
}

export function useTripWizard() {
  const context = useContext(TripWizardContext);
  if (!context) {
    throw new Error('useTripWizard must be used within a TripWizardProvider');
  }
  return context;
}

