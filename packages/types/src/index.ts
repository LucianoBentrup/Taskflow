// Tipos compartilhados entre apps/web e apps/api.
// Serão adicionados conforme as entidades forem criadas (Sprint 1+).

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};
