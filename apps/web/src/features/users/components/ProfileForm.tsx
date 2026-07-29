'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useProfile, useUpdateProfile } from '@/features/users/hooks/use-profile';
import {
  updateProfileFormSchema,
  type UpdateProfileFormValues,
} from '@/features/users/schemas/user.schemas';
import { ProfileFormSkeleton } from '@/components/ui/skeletons/FormSkeletons';

export function ProfileForm() {
  const { data: profile, isLoading, isError } = useProfile();
  const updateProfile = useUpdateProfile();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormValues>({ resolver: zodResolver(updateProfileFormSchema) });

  useEffect(() => {
    if (profile) {
      reset({ name: profile.name, email: profile.email });
    }
  }, [profile, reset]);

  async function onSubmit(values: UpdateProfileFormValues) {
    setFormError(null);
    setSuccessMessage(null);
    try {
      await updateProfile.mutateAsync(values);
      setSuccessMessage('Perfil atualizado com sucesso');
    } catch {
      setFormError('Não foi possível atualizar o perfil. Verifique se o email já está em uso.');
    }
  }

  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  if (isError || !profile) {
    return <p className="text-sm text-red-600">Não foi possível carregar o perfil.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nome
        </label>
        <input
          id="name"
          type="text"
          className="rounded-md border px-3 py-2 text-sm"
          {...register('name')}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="rounded-md border px-3 py-2 text-sm"
          {...register('email')}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {formError && <p className="text-sm text-red-600">{formError}</p>}
      {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
      </button>
    </form>
  );
}
