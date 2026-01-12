const ACCESS_TOKEN_KEY = 'accessToken';

const isBrowser = () => typeof window !== 'undefined';

/**
 * Set cookie with expiration date (default: 7 days)
 */
const setCookie = (name: string, value: string, days: number = 7): void => {
  if (!isBrowser()) return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

/**
 * Get cookie value by name
 */
const getCookie = (name: string): string | null => {
  if (!isBrowser()) return null;
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Remove cookie by name
 */
const removeCookie = (name: string): void => {
  if (!isBrowser()) return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const saveAccessToken = (token: string) => {
  setCookie(ACCESS_TOKEN_KEY, token);
};

/**
 * Get access token from cookies
 */
export const getAccessToken = (): string | null => {
  return getCookie(ACCESS_TOKEN_KEY);
};

/**
 * Remove access token from cookies
 */
export const removeAccessToken = (): void => {
  removeCookie(ACCESS_TOKEN_KEY);
};
