import { z } from 'zod';

export const registerFormSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  email: z.string().trim().toLowerCase().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[a-z]/, 'Senha deve conter ao menos uma letra minúscula')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
});

export const loginFormSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
