import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/** Usa ícones do Lucide quando `icon_name` no Supabase coincide com um export PascalCase (ex.: Zap, Hammer). */
export function lucideIconByName(iconName: string | null): LucideIcon {
  const key = iconName?.trim()
  if (!key) return Icons.LayoutGrid
  const Icon = Icons[key as keyof typeof Icons] as LucideIcon | undefined
  return typeof Icon === 'function' ? Icon : Icons.LayoutGrid
}
