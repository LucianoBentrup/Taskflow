// Módulo de estado em memória para o access token.
// Nunca persiste em localStorage/sessionStorage (mitigação de XSS).
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}
