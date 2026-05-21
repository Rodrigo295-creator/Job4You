import { BrandName } from './Logo';
import { useAppSettings } from '../context/AppSettings';

export function WebsiteFooter() {
  const { t } = useAppSettings();
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-sm pb-24 sm:pb-10 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div>
          <p className="mb-1">
            <BrandName size="sm" />
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">{t('footer.tagline')}</p>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {t('footer.demo', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
