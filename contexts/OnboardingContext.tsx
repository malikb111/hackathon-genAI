"use client";

import React, { createContext, useContext, useState } from 'react';

type OnboardingData = {
  step1?: {
    name: string;
    email: string;
  };
  step2?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  step3?: {
    // Informations professionnelles
    company: string;
    position: string;
    experience: string;
  };
  step4?: {
    // Préférences de communication
    phoneNumber: string;
    preferredContact: 'email' | 'phone';
    newsletter: boolean;
  };
  step5?: {
    // Compétences et intérêts
    skills: string[];
    interests: string[];
  };
  step6?: {
    // Configuration du compte
    username: string;
    timezone: string;
    language: string;
  };
  // Ajoute d'autres étapes au besoin...
};

interface OnboardingContextProps {
  data: OnboardingData;
  setData: (data: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setFormData] = useState<OnboardingData>({});

  const setData = (newData: Partial<OnboardingData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
