import { useState } from 'react';
import { User, Globe, DollarSign, Camera, Mail, Phone, MapPin, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { useAppSettings, type AppLocale, type Currency } from '../../context/AppSettings';
import { Modal } from './SettingsUI';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
}

const LANGS: { value: AppLocale; label: string; flag: string }[] = [
  { value: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
  { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { value: 'es-ES', label: 'Español', flag: '🇪🇸' },
];

const CURRENCIES: { value: Currency; symbol: string }[] = [
  { value: 'BRL', symbol: 'R$' },
  { value: 'USD', symbol: '$' },
  { value: 'EUR', symbol: '€' },
];

export function PersonalModal({
  info,
  onSave,
  onClose,
}: {
  info: PersonalInfo;
  onSave: (i: PersonalInfo) => void;
  onClose: () => void;
}) {
  const { t } = useAppSettings();
  const [form, setForm] = useState(info);
  const set = (k: keyof PersonalInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Modal title={t('settings.modal.personal')} onClose={onClose}>
      <div className="flex justify-center mb-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center text-white text-2xl font-bold">
            {form.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <button type="button" className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#F97316] rounded-full flex items-center justify-center shadow">
            <Camera className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {[
          { key: 'name', label: t('settings.field.fullName'), icon: User, type: 'text' },
          { key: 'email', label: t('settings.field.email'), icon: Mail, type: 'email' },
          { key: 'phone', label: t('settings.field.phone'), icon: Phone, type: 'tel' },
          { key: 'city', label: t('settings.field.city'), icon: MapPin, type: 'text' },
        ].map(({ key, label, icon: Icon, type }) => (
          <div key={key}>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={type}
                value={form[key as keyof PersonalInfo]}
                onChange={set(key as keyof PersonalInfo)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
              />
            </div>
          </div>
        ))}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">{t('settings.field.bio')}</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={set('bio')}
            className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl resize-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            onSave(form);
            onClose();
          }}
          className="w-full py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#EA6C10] transition-colors"
        >
          {t('settings.save')}
        </button>
      </div>
    </Modal>
  );
}

export function PasswordModal({ onClose }: { onClose: () => void }) {
  const { t } = useAppSettings();
  const [show, setShow] = useState({ cur: false, nw: false, conf: false });
  const [saved, setSaved] = useState(false);
  const tog = (k: keyof typeof show) => setShow((p) => ({ ...p, [k]: !p[k] }));

  return (
    <Modal title={t('settings.modal.password')} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {[
          { key: 'cur', label: t('settings.password.current'), vis: show.cur },
          { key: 'nw', label: t('settings.password.new'), vis: show.nw },
          { key: 'conf', label: t('settings.password.confirm'), vis: show.conf },
        ].map(({ key, label, vis }) => (
          <div key={key}>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">{label}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={vis ? 'text' : 'password'}
                className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30"
              />
              <button type="button" onClick={() => tog(key as keyof typeof show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {vis ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-3 py-2.5 rounded-xl">
            <Check className="w-4 h-4" /> {t('settings.password.saved')}
          </div>
        )}
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="w-full py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#EA6C10] transition-colors"
        >
          {t('settings.password.submit')}
        </button>
      </div>
    </Modal>
  );
}

export function LangModal({
  current,
  onSelect,
  onClose,
}: {
  current: AppLocale;
  onSelect: (l: AppLocale) => void;
  onClose: () => void;
}) {
  const { t } = useAppSettings();
  return (
    <Modal title={t('settings.modal.language')} onClose={onClose}>
      <div className="flex flex-col gap-2">
        {LANGS.map((l) => (
          <button
            key={l.value}
            type="button"
            onClick={() => {
              onSelect(l.value);
              onClose();
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              current === l.value ? 'bg-[#FEF0E6] dark:bg-[#F97316]/15 border border-[#F97316]/30' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100'
            }`}
          >
            <span className="text-2xl">{l.flag}</span>
            <span className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100 text-left">{l.label}</span>
            {current === l.value && <Check className="w-4 h-4 text-[#F97316]" />}
          </button>
        ))}
      </div>
    </Modal>
  );
}

export function CurrencyModal({
  current,
  onSelect,
  onClose,
}: {
  current: Currency;
  onSelect: (c: Currency) => void;
  onClose: () => void;
}) {
  const { t } = useAppSettings();
  return (
    <Modal title={t('settings.modal.currency')} onClose={onClose}>
      <div className="flex flex-col gap-2">
        {CURRENCIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => {
              onSelect(c.value);
              onClose();
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              current === c.value ? 'bg-[#FEF0E6] dark:bg-[#F97316]/15 border border-[#F97316]/30' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg font-bold text-slate-600 dark:text-slate-300 w-8 text-center">{c.symbol}</span>
            <span className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100 text-left">
              {t(`settings.currency.${c.value}`)} ({c.value})
            </span>
            {current === c.value && <Check className="w-4 h-4 text-[#F97316]" />}
          </button>
        ))}
      </div>
    </Modal>
  );
}
