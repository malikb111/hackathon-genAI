"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { Input } from '../../../components/ui/input'; // Composant Input basé sur shadcn/ui
import { Button } from '../../../components/ui/button';  // Composant Button basé sur shadcn/ui
import { useRouter } from 'next/navigation';

type Step1FormValues = {
  name: string;
  email: string;
};

export default function Step1() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormValues>({
    defaultValues: data.step1 || {},
  });

  const onSubmit = async (values: Step1FormValues) => {
    setData({ step1: values });
    router.push('/onboarding/step2');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Informations personnelles</h1>
        <p className="text-muted-foreground">
          Commençons par les informations de base
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nom
          </label>
          <Input
            id="name"
            placeholder="Votre nom"
            {...register('name', { 
              required: 'Ce champ est requis',
              minLength: {
                value: 2,
                message: 'Le nom doit contenir au moins 2 caractères'
              }
            })}
          />
          {errors.name && <span className="text-sm text-destructive">{errors.name.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            {...register('email', {
              required: 'Ce champ est requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Adresse email invalide'
              }
            })}
          />
          {errors.email && <span className="text-sm text-destructive">{errors.email.message}</span>}
        </div>

        <div className="pt-4 flex gap-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Chargement...' : 'Continuer'}
          </Button>
        </div>
      </form>
	  <div className="pt-4 flex gap-2">
		<Button variant="outline" onClick={() => router.push('/onboarding')}>
			Page d'accueil
		</Button>
	  </div>
    </div>
  );
}
