"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';

type Step2FormValues = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function Step2() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2FormValues>({
    defaultValues: data.step2 || {},
  });

  const onSubmit = async (values: Step2FormValues) => {
    setData({ step2: values });
    // Vous pouvez rediriger vers step3 ou une page de confirmation
    router.push('/onboarding/step3');
  };

  const goBack = () => {
    router.push('/onboarding/step1');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Adresse</h1>
        <p className="text-muted-foreground">
          Où pouvons-nous vous contacter ?
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium">
            Adresse
          </label>
          <Input
            id="address"
            placeholder="123 rue Example"
            {...register('address', { required: 'Ce champ est requis' })}
          />
          {errors.address && <span className="text-sm text-destructive">{errors.address.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium">
              Ville
            </label>
            <Input
              id="city"
              placeholder="Votre ville"
              {...register('city', { required: 'Ce champ est requis' })}
            />
            {errors.city && <span className="text-sm text-destructive">{errors.city.message}</span>}
          </div>

          <div className="space-y-2">
            <label htmlFor="postalCode" className="block text-sm font-medium">
              Code postal
            </label>
            <Input
              id="postalCode"
              placeholder="75000"
              {...register('postalCode', { 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^\d{5}$/,
                  message: 'Code postal invalide'
                }
              })}
            />
            {errors.postalCode && <span className="text-sm text-destructive">{errors.postalCode.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium">
            Pays
          </label>
          <Input
            id="country"
            placeholder="France"
            {...register('country', { required: 'Ce champ est requis' })}
          />
          {errors.country && <span className="text-sm text-destructive">{errors.country.message}</span>}
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={goBack}
            className="w-full"
          >
            Retour
          </Button>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Chargement...' : 'Continuer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
