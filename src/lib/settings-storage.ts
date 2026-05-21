export type Theme = 'light' | 'dark' | 'system';
export type FontSize = 'sm' | 'md' | 'lg';
export type Currency = 'BRL' | 'USD' | 'EUR';

const THEME_KEY = 'job4you-theme';
const FONT_KEY = 'job4you-font-size';
const CURRENCY_KEY = 'job4you-currency';
const NOTIF_KEY = 'job4you-notif-prefs';
const PRIVACY_KEY = 'job4you-privacy-prefs';

export type NotificationPrefs = {
  push: boolean;
  email: boolean;
  sms: boolean;
  quietHours: boolean;
  sound: boolean;
  newOffers: boolean;
  messages: boolean;
  payments: boolean;
  reminders: boolean;
  reviews: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  marketing: boolean;
};

export type PrivacyPrefs = {
  visibility: 'public' | 'contacts' | 'private';
  locationAccess: boolean;
  onlineStatus: boolean;
  analytics: boolean;
  personalizedAds: boolean;
};

const DEFAULT_NOTIF: NotificationPrefs = {
  push: true,
  email: true,
  sms: false,
  quietHours: true,
  sound: true,
  newOffers: true,
  messages: true,
  payments: true,
  reminders: true,
  reviews: true,
  orderUpdates: true,
  promotions: false,
  marketing: false,
};

const DEFAULT_PRIVACY: PrivacyPrefs = {
  visibility: 'public',
  locationAccess: true,
  onlineStatus: true,
  analytics: true,
  personalizedAds: false,
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function readStoredTheme(): Theme {
  const v = localStorage.getItem(THEME_KEY);
  return v === 'dark' || v === 'system' || v === 'light' ? v : 'light';
}

export function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function readStoredFontSize(): FontSize {
  const v = localStorage.getItem(FONT_KEY);
  return v === 'sm' || v === 'lg' || v === 'md' ? v : 'md';
}

export function writeStoredFontSize(size: FontSize) {
  try {
    localStorage.setItem(FONT_KEY, size);
  } catch {
    /* ignore */
  }
}

export function readStoredCurrency(): Currency {
  const v = localStorage.getItem(CURRENCY_KEY);
  return v === 'USD' || v === 'EUR' || v === 'BRL' ? v : 'BRL';
}

export function writeStoredCurrency(currency: Currency) {
  try {
    localStorage.setItem(CURRENCY_KEY, currency);
  } catch {
    /* ignore */
  }
}

export function readNotificationPrefs(): NotificationPrefs {
  return readJson(NOTIF_KEY, DEFAULT_NOTIF);
}

export function writeNotificationPrefs(prefs: NotificationPrefs) {
  writeJson(NOTIF_KEY, prefs);
}

export function readPrivacyPrefs(): PrivacyPrefs {
  return readJson(PRIVACY_KEY, DEFAULT_PRIVACY);
}

export function writePrivacyPrefs(prefs: PrivacyPrefs) {
  writeJson(PRIVACY_KEY, prefs);
}
