export type AuthUserType = 'client' | 'pro';
export type AuthProvider = 'email' | 'google' | 'apple';

export interface AuthSession {
  userType: AuthUserType;
  provider: AuthProvider;
  email?: string;
  name?: string;
  /** Supabase Auth user id when using backend auth */
  userId?: string;
}

const AUTH_STORAGE_KEY = 'job4you-auth';
/** Legacy key from older builds that used localStorage */
const LEGACY_AUTH_STORAGE_KEY = 'job4you-auth-local';
const LOGIN_INTENT_KEY = 'job4you-login-intent';

function clearLegacyAuth() {
  try {
    localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export interface LoginIntent {
  userType: AuthUserType;
  mode?: 'login' | 'signup';
}

export function setLoginIntent(intent: LoginIntent) {
  try {
    sessionStorage.setItem(LOGIN_INTENT_KEY, JSON.stringify(intent));
  } catch {
    /* ignore */
  }
}

export function consumeLoginIntent(): LoginIntent | null {
  try {
    const raw = sessionStorage.getItem(LOGIN_INTENT_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(LOGIN_INTENT_KEY);
    const parsed = JSON.parse(raw) as LoginIntent;
    if (parsed.userType !== 'client' && parsed.userType !== 'pro') return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Returns session only for the current browser tab; new visit requires login again. */
export function readAuthSession(): AuthSession | null {
  clearLegacyAuth();
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed.userType !== 'client' && parsed.userType !== 'pro') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAuthSession(session: AuthSession) {
  try {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function clearAuthSession() {
  clearLegacyAuth();
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
