'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useChangePassword } from '@/features/users/hooks/use-profile';
import {
  changePasswordFormSchema,
  type ChangePasswordFormValues,
} from '@/features/users/schemas/user.schemas';

export function ChangePasswordForm() {
  const changePassword = useChangePassword();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({ resolver: zodResolver(changePasswordFormSchema) });

  async function onSubmit(values: ChangePasswordFormValues) {
    setFormError(null);
    setSuccessMessage(null);
    try {
      await changePassword.mutateAsync(values);
      setSuccessMessage('Senha alterada com sucesso');
      reset();
    } catch {
      setFormError('Não foi possível trocar a senha. Verifique a senha atual.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="currentPassword" className="text-sm font-medium">
          Senha atual
        </label>
        <input
          id="currentPassword"
          type="password"
          className="rounded-md border px-3 py-2 text-sm"
          {...register('currentPassword')}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="newPassword" className="text-sm font-medium">
          Nova senha
        </label>
        <input
          id="newPassword"
          type="password"
          className="rounded-md border px-3 py-2 text-sm"
          {...register('newPassword')}
        />
        {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="confirmNewPassword" className="text-sm font-medium">
          Confirmar nova senha
        </label>
        <input
          id="confirmNewPassword"
          type="password"
          className="rounded-md border px-3 py-2 text-sm"
          {...register('confirmNewPassword')}
        />
        {errors.confirmNewPassword && (
          <p className="text-sm text-red-600">{errors.confirmNewPassword.message}</p>
        )}
      </div>

      {formError && <p className="text-sm text-red-600">{formError}</p>}
      {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {isSubmitting ? 'Salvando...' : 'Trocar senha'}
      </button>
    </form>
  );
}
