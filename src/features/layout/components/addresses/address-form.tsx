'use client';

import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { LatLngLiteral } from 'leaflet';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import type { Address, AddressFormInput, AddressPayload } from '../../lib/types/address';
import { createAddressSchema } from '../../lib/schemas/address.schema';
import { useCreateAddress } from '../../hooks/use-create-address';
import { useUpdateAddress } from '../../hooks/use-update-address';
import AddressStepOne from './address-step-one';
import Stepper from './stepper';

const AddressMap = dynamic(() => import('./address-map'), {
  ssr: false,
});

interface AddressFormProps {
  address: Address | null;
  onBack: () => void;
}

export default function AddressForm({ address, onBack }: AddressFormProps) {
  // Translation
  const t = useTranslations('address');
  const tAddressValidation = useTranslations('address.validation');
  const tRegisterValidation = useTranslations('auth.register.validation');

  // State
  const [step, setStep] = useState<1 | 2>(1);
  const [location, setLocation] = useState<LatLngLiteral | null>(
    address
      ? {
          lat: Number(address.latitude),
          lng: Number(address.longitude),
        }
      : null,
  );

  // Custom hooks
  const addAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();

  // Form
  const addressSchema = createAddressSchema(tAddressValidation, tRegisterValidation);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: address?.city ?? '',
      street: address?.street ?? '',
      phone: address?.phone ?? '',
    },
  });

  // Variables
  const isEditing = !!address;
  const isPending = addAddress.isPending || updateAddress.isPending;
  const goToStepTwo = handleSubmit(() => {
    setStep(2);
  });

  // Functions
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      return;
    }

    onBack();
  };

  const submitAddress = handleSubmit((values) => {
    if (!location) {
      toast.error(t('validation.addressRequired'));
      return;
    }

    const payload: AddressPayload = {
      title: address?.title ?? 'Home',
      isPrimary: address?.isPrimary ?? false,
      city: values.city,
      street: values.street,
      phone: values.phone,
      latitude: location.lat,
      longitude: location.lng,
    };

    if (isEditing) {
      updateAddress.mutate(
        {
          id: address.id,
          payload,
        },
        {
          onSuccess: () => {
            toast.success(t('messages.updated'));
            setStep(1);
            onBack();
          },
        },
      );

      return;
    }

    addAddress.mutate(payload, {
      onSuccess: () => {
        toast.success(t('messages.added'));
        setStep(1);
        onBack();
      },
    });
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Step indicator */}
      <Stepper step={step} />

      {/* Subheader*/}
      <div className="flex gap-4">
        {/* Back */}
        <Button size="icon-rounded" onClick={handleBack}>
          <ArrowLeft className="rtl:rotate-180" />
        </Button>

        {/* Form title */}
        <p className="text-ds-primary text-2xl font-medium">
          {step === 1 ? t('form.step1Title') : t('form.step2Title')}
        </p>
      </div>

      <Separator />

      {step === 1 ? (
        // Step 1
        <AddressStepOne
          register={register}
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          goToStepTwo={goToStepTwo}
        />
      ) : (
        // Step 2
        <div className="flex flex-col gap-6">
          <AddressMap location={location} onLocationChange={setLocation} />

          <Button type="button" onClick={submitAddress} loading={isPending}>
            {isEditing ? t('actions.save') : t('actions.add')}
          </Button>
        </div>
      )}
    </div>
  );
}
