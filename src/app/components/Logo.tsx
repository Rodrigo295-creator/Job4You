import { useAppSettings } from '../context/AppSettings';

/*
  Icon concept:
  - Black (#0F172A) rounded square
  - Orange arc/zone rising from bottom-right corner (like a spotlight)
  - Bold white J cutting across both zones → white reads on both black and orange
  - Three colors used naturally: black bg, orange zone, white letter
*/
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="j4y-clip">
          <rect width="40" height="40" rx="11" />
        </clipPath>
      </defs>

      {/* ── Black base ── */}
      <rect width="40" height="40" rx="11" fill="#0F172A" />

      {/* ── Orange spotlight zone: large circle anchored at bottom-right ── */}
      {/* r=20, center (36,36) → arc cuts diagonally from ~(36,16) to ~(16,36) */}
      <circle
        cx="36"
        cy="36"
        r="20"
        fill="#F97316"
        clipPath="url(#j4y-clip)"
      />

      {/* ── Subtle edge blend between black and orange ── */}
      <circle
        cx="36"
        cy="36"
        r="20.5"
        fill="none"
        stroke="#0F172A"
        strokeWidth="1"
        clipPath="url(#j4y-clip)"
        opacity="0.4"
      />

      {/* ── White J spanning both zones ── */}
      {/*
          Top bar + right stem (passes through black → orange)
          Bottom hook (ends back in black zone on the left)
          White reads crisp on both backgrounds
      */}
      <path
        d="M 11,13 H 26 V 25 Q 26,33 18,33 Q 10,33 10,25"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ── Small white dot accent (top-right, inside dark zone) ── */}
      <circle cx="31" cy="9" r="2.8" fill="white" />
    </svg>
  );
}

/* ─── Full sidebar logo: icon + wordmark ─── */
export function Logo() {
  const { resolvedTheme, t } = useAppSettings();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-3 select-none">
      <LogoMark size={40} />
      <div className="flex flex-col leading-none gap-0.5">
        <span className="text-[20px] font-black tracking-tight leading-none">
          <span className="text-[#F97316]">Job</span>
          <span className={isDark ? 'text-white' : 'text-[#0F172A]'}>4You</span>
        </span>
        <span className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {t('brand.tagline')}
        </span>
      </div>
    </div>
  );
}

/* ─── Inline brand name only (no icon) ─── */
export function BrandName({
  size = 'md',
  onDark = false,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  /** Force white "4You" regardless of theme (use when bg is always dark) */
  onDark?: boolean;
  className?: string;
}) {
  const { resolvedTheme } = useAppSettings();
  const isDark = onDark || resolvedTheme === 'dark';

  const sizeClass =
    size === 'lg' ? 'text-[26px]' : size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <span className={`font-black tracking-tight leading-none ${sizeClass} ${className}`}>
      <span className="text-[#F97316]">Job</span>
      <span className={isDark ? 'text-white' : 'text-[#0F172A]'}>4You</span>
    </span>
  );
}
