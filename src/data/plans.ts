export type PlanTierId = 'basic' | 'pro' | 'premium';

/**
 * Planos mensais para profissionais.
 * O app é gratuito; o plano define a taxa sobre serviços concluídos e benefícios extras.
 * Sem limite de pedidos ou conversas em nenhum plano.
 */
export interface PlanDefinition {
  id: PlanTierId;
  nameKey: string;
  descriptionKey: string;
  priceBrl: number;
  priceLabel: string;
  feePercent: number;
  feeLabelKey: string;
  /** Resumo “inclui plano anterior” — omitir no Básico */
  includesPreviousKey?: string;
  featureKeys: string[];
  popular?: boolean;
}

export const PLANS: PlanDefinition[] = [
  {
    id: 'basic',
    nameKey: 'plans.basic.name',
    descriptionKey: 'plans.basic.desc',
    priceBrl: 19.99,
    priceLabel: 'R$ 19,99',
    feePercent: 7,
    feeLabelKey: 'plans.fee.basic',
    featureKeys: [
      'plans.f.freeUse',
      'plans.f.fee7',
      'plans.f.unlimited',
      'plans.f.chat',
      'plans.f.contracts',
      'plans.f.financial',
      'plans.f.support',
      'plans.f.badgeBasic',
    ],
  },
  {
    id: 'pro',
    nameKey: 'plans.pro.name',
    descriptionKey: 'plans.pro.desc',
    priceBrl: 35.99,
    priceLabel: 'R$ 35,99',
    feePercent: 5,
    feeLabelKey: 'plans.fee.pro',
    includesPreviousKey: 'plans.includesBasic',
    featureKeys: ['plans.f.fee5', 'plans.f.badgePro', 'plans.f.searchBoost'],
    popular: true,
  },
  {
    id: 'premium',
    nameKey: 'plans.premium.name',
    descriptionKey: 'plans.premium.desc',
    priceBrl: 45.99,
    priceLabel: 'R$ 45,99',
    feePercent: 1.5,
    feeLabelKey: 'plans.fee.premium',
    includesPreviousKey: 'plans.includesPro',
    featureKeys: ['plans.f.fee15', 'plans.f.badgePremium', 'plans.f.supportPriority'],
  },
];
