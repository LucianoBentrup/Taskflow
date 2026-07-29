import { z } from 'zod';

// Schemas espelhando os validators do backend
// (apps/api/src/validators/user.validator.ts).

export const updateProfileFormSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  email: z.string().trim().toLowerCase().email('Email inválido'),
});

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[a-z]/, 'Senha deve conter ao menos uma letra minúscula')
      .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
      .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
    confirmNewPassword: z.string().min(1, 'Confirme a nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  });

export type UpdateProfileFormValues = z.infer<typeof updateProfileFormSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
