import type { AuthError, Session, User } from '@supabase/supabase-js';
import type { AuthProvider, AuthSession, AuthUserType } from '@/lib/auth-session';
import { supabase, supabaseConfigured } from '@/lib/supabase';

const USER_TYPE_KEY = 'user_type';

function parseUserType(value: unknown): AuthUserType {
  return value === 'pro' ? 'pro' : 'client';
}

export function sessionFromSupabaseUser(
  user: User,
  provider: AuthProvider,
): AuthSession {
  const meta = user.user_metadata ?? {};
  return {
    userId: user.id,
    userType: parseUserType(meta[USER_TYPE_KEY]),
    provider,
    email: user.email ?? undefined,
    name:
      (typeof meta.full_name === 'string' && meta.full_name.trim()) ||
      (typeof meta.name === 'string' && meta.name.trim()) ||
      undefined,
  };
}

export function sessionFromSupabaseSession(
  session: Session,
  provider: AuthProvider = 'email',
): AuthSession {
  return sessionFromSupabaseUser(session.user, provider);
}

export function authErrorKey(error: AuthError | null): string {
  if (!error) return 'auth.error.generic';
  const msg = error.message.toLowerCase();
  if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
    return 'auth.error.invalidCredentials';
  }
  if (msg.includes('already registered') || msg.includes('already exists')) {
    return 'auth.error.emailTaken';
  }
  if (msg.includes('email not confirmed')) return 'auth.error.emailNotConfirmed';
  if (msg.includes('password')) return 'auth.error.passwordWeak';
  return 'auth.error.generic';
}

export async function getSupabaseAuthSession(): Promise<AuthSession | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) return null;
  const provider =
    (data.session.user.app_metadata?.provider as AuthProvider | undefined) ?? 'email';
  return sessionFromSupabaseSession(data.session, provider);
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ session: AuthSession | null; error: AuthError | null; needsConfirmation?: boolean }> {
  if (!supabase) return { session: null, error: null };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { session: null, error };
  if (!data.session) return { session: null, error: null };
  return { session: sessionFromSupabaseSession(data.session, 'email'), error: null };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  userType: AuthUserType,
): Promise<{ session: AuthSession | null; error: AuthError | null; needsConfirmation?: boolean }> {
  if (!supabase) return { session: null, error: null };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name.trim(),
        [USER_TYPE_KEY]: userType,
      },
    },
  });
  if (error) return { session: null, error };
  if (!data.session) {
    return { session: null, error: null, needsConfirmation: true };
  }
  return {
    session: sessionFromSupabaseSession(data.session, 'email'),
    error: null,
  };
}

export async function signInWithOAuth(provider: 'google' | 'apple', userType: AuthUserType) {
  if (!supabase) return { error: null };
  try {
    sessionStorage.setItem('job4you-oauth-user-type', userType);
  } catch {
    /* ignore */
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/`,
      queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined,
    },
  });
  return { error };
}

export function consumeOAuthUserType(): AuthUserType {
  try {
    const v = sessionStorage.getItem('job4you-oauth-user-type');
    sessionStorage.removeItem('job4you-oauth-user-type');
    return v === 'pro' ? 'pro' : 'client';
  } catch {
    return 'client';
  }
}

export async function ensureOAuthUserType(user: User): Promise<User> {
  const current = user.user_metadata?.[USER_TYPE_KEY];
  if (current === 'client' || current === 'pro') return user;
  const userType = consumeOAuthUserType();
  if (!supabase) return user;
  const { data } = await supabase.auth.updateUser({
    data: { [USER_TYPE_KEY]: userType },
  });
  return data.user ?? user;
}

export async function signOutSupabase() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function resetPasswordForEmail(email: string) {
  if (!supabase) return { error: null };
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/`,
  });
  return { error };
}

export { supabaseConfigured };
