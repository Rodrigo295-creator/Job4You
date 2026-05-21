import { useState } from 'react';
import { X, Info } from 'lucide-react';
import type { PlanDefinition } from '@/data/plans';
import { useAppSettings } from '../context/AppSettings';
import { PlanBadge } from './PlanBadge';
import { saveProPlanSubscription } from '@/lib/pro-plan-session';

interface Props {
  plan: PlanDefinition;
  onClose: () => void;
  onSubscribed: () => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2 pb-3 border-b border-slate-100 dark:border-slate-800">
      {children}
    </h4>
  );
}

export function PlanSubscribeModal({ plan, onClose, onSubscribed }: Props) {
  const { t } = useAppSettings();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [billingStreet, setBillingStreet] = useState('');
  const [billingNumber, setBillingNumber] = useState('');
  const [billingComplement, setBillingComplement] = useState('');
  const [billingNeighborhood, setBillingNeighborhood] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZip, setBillingZip] = useState('');

  const [error, setError] = useState<string | null>(null);

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40';

  const cardComplete =
    cardNumber.replace(/\D/g, '').length >= 13 &&
    cardName.trim() &&
    cardExpiry.trim() &&
    cardCvv.length >= 3;

  const billingComplete =
    billingStreet.trim() &&
    billingNumber.trim() &&
    billingNeighborhood.trim() &&
    billingCity.trim() &&
    billingState.trim().length >= 2 &&
    billingZip.replace(/\D/g, '').length >= 8;

  const handleSubmit = () => {
    if (!cardComplete) {
      setError(t('plans.pay.errorCard'));
      return;
    }
    if (!billingComplete) {
      setError(t('plans.pay.errorBilling'));
      return;
    }
    setError(null);
    saveProPlanSubscription({
      tier: plan.id,
      subscribedAt: new Date().toISOString(),
      frequency: 'monthly',
    });
    onSubscribed();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <PlanBadge tier={plan.id} size={36} />
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white">{t('plans.pay.title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {t(plan.nameKey)} · {plan.priceLabel}
                {t('plans.perMonth')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-5 mt-4 rounded-xl border-2 border-[#F97316]/40 bg-[#FEF0E6] dark:bg-[#F97316]/10 px-4 py-3.5 flex gap-3 shrink-0">
          <Info className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-[#EA6C10] dark:text-[#F97316]">{t('plans.pay.monthlyChargeTitle')}</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              {t('plans.pay.monthlyChargeBody', { price: plan.priceLabel })}
            </p>
          </div>
        </div>

        <p className="px-5 pt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed shrink-0">
          {t('plans.pay.manualNote')}
        </p>

        <div
          className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-4 min-h-0 space-y-6"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Cartão */}
          <section>
            <SectionTitle>{t('plans.pay.sectionCard')}</SectionTitle>
            <div className="space-y-3 mt-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('plans.pay.cardHint')}</p>
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                  {t('plans.pay.cardNumber')}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                  {t('plans.pay.cardName')}
                </span>
                <input
                  type="text"
                  autoComplete="cc-name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className={inputClass}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                    {t('plans.pay.cardExpiry')}
                  </span>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                    {t('plans.pay.cardCvv')}
                  </span>
                  <input
                    type="password"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>
            </div>
          </section>


          {/* Endereço de cobrança */}
          <section>
            <SectionTitle>{t('plans.pay.sectionBilling')}</SectionTitle>
            <div className="space-y-3 mt-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('plans.pay.billingHint')}</p>
              <div className="grid grid-cols-3 gap-3">
                <label className="block col-span-2">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                    {t('plans.pay.billingStreet')}
                  </span>
                  <input
                    type="text"
                    autoComplete="street-address"
                    value={billingStreet}
                    onChange={(e) => setBillingStreet(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                    {t('plans.pay.billingNumber')}
                  </span>
                  <input
                    type="text"
                    value={billingNumber}
                    onChange={(e) => setBillingNumber(e.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                  {t('plans.pay.billingComplement')}
                </span>
                <input
                  type="text"
                  value={billingComplement}
                  onChange={(e) => setBillingComplement(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                  {t('plans.pay.billingNeighborhood')}
                </span>
                <input
                  type="text"
                  value={billingNeighborhood}
                  onChange={(e) => setBillingNeighborhood(e.target.value)}
                  className={inputClass}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                    {t('plans.pay.billingCity')}
                  </span>
                  <input
                    type="text"
                    autoComplete="address-level2"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                    {t('plans.pay.billingState')}
                  </span>
                  <input
                    type="text"
                    autoComplete="address-level1"
                    placeholder="UF"
                    maxLength={2}
                    value={billingState}
                    onChange={(e) => setBillingState(e.target.value.toUpperCase())}
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                  {t('plans.pay.billingZip')}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000-000"
                  value={billingZip}
                  onChange={(e) => setBillingZip(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </section>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 text-xs text-slate-600 dark:text-slate-400 pb-2">
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{t('plans.pay.feeReminder')}</p>
            <p>
              {t('plans.pay.feeReminderBody', {
                percent: plan.feePercent,
                plan: t(plan.nameKey),
              })}
            </p>
          </div>

          {error && <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 shrink-0 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-[#F97316] text-white text-sm font-bold hover:bg-[#EA6C10] shadow-md shadow-[#F97316]/20"
          >
            {t('plans.pay.submit')}
          </button>
        </div>
      </div>
    </div>
  );
}
