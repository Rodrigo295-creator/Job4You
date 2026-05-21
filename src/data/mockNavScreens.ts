/** Mock data for sidebar feature screens (no backend) */

export type OrderTab = 'open' | 'progress' | 'done' | 'cancelled';

export interface MockOrder {
  id: string;
  title: string;
  category: string;
  status: OrderTab;
  proposals: number;
  professionalName?: string;
  date: string;
  budget?: string;
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: 'o1',
    title: 'Instalação de ar-condicionado split',
    category: 'Climatização',
    status: 'open',
    proposals: 3,
    date: 'Hoje, 09:42',
    budget: 'R$ 350 – R$ 600',
  },
  {
    id: 'o2',
    title: 'Pintura de quarto (15 m²)',
    category: 'Pintura',
    status: 'progress',
    proposals: 1,
    professionalName: 'Marcos Pinturas',
    date: 'Agendado: 20 mai.',
    budget: 'R$ 480',
  },
  {
    id: 'o3',
    title: 'Desentupimento de pia da cozinha',
    category: 'Encanamento',
    status: 'done',
    proposals: 2,
    professionalName: 'Ana Hidráulica',
    date: 'Concluído em 10 mai.',
    budget: 'R$ 120',
  },
  {
    id: 'o4',
    title: 'Montagem de guarda-roupa',
    category: 'Marcenaria',
    status: 'cancelled',
    proposals: 0,
    date: 'Cancelado em 5 mai.',
  },
];

export interface MockOpportunity {
  id: string;
  title: string;
  category: string;
  clientName: string;
  distanceKm: number;
  postedAgo: string;
  budget: string;
  /** Valor de referência para cálculo da taxa (R$) */
  budgetAmount: number;
  description: string;
}

export const MOCK_OPPORTUNITIES: MockOpportunity[] = [
  {
    id: 'op1',
    title: 'Troca de tomadas e disjuntor',
    category: 'Elétrica',
    clientName: 'Fernanda L.',
    distanceKm: 2.3,
    postedAgo: 'há 12 min',
    budget: 'R$ 150 – R$ 280',
    budgetAmount: 220,
    description: 'Preciso trocar 4 tomadas e um disjuntor no quadro. Apartamento.',
  },
  {
    id: 'op2',
    title: 'Faxina completa apartamento 2 quartos',
    category: 'Limpeza',
    clientName: 'Ricardo M.',
    distanceKm: 4.1,
    postedAgo: 'há 1 h',
    budget: 'R$ 200 – R$ 350',
    budgetAmount: 275,
    description: 'Faxina pesada, incluir cozinha e banheiros. Preferência sábado de manhã.',
  },
  {
    id: 'op3',
    title: 'Conserto de vazamento no banheiro',
    category: 'Encanamento',
    clientName: 'Juliana S.',
    distanceKm: 1.8,
    postedAgo: 'há 3 h',
    budget: 'A combinar',
    budgetAmount: 150,
    description: 'Vazamento embaixo da pia, gotejando no armário.',
  },
];

export interface MockFavorite {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

export const MOCK_FAVORITES: MockFavorite[] = [
  {
    id: 'f1',
    name: 'Roberto Alves',
    role: 'Eletricista',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'f2',
    name: 'Carla Mendes',
    role: 'Diarista',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
];

export interface MockPendingReview {
  id: string;
  service: string;
  professionalName: string;
  date: string;
}

export interface MockPastReview {
  id: string;
  service: string;
  professionalName: string;
  rating: number;
  comment: string;
  date: string;
}

export const MOCK_PENDING_REVIEWS: MockPendingReview[] = [
  {
    id: 'r1',
    service: 'Desentupimento de pia',
    professionalName: 'Ana Hidráulica',
    date: '10 mai. 2026',
  },
];

export const MOCK_PAST_REVIEWS: MockPastReview[] = [
  {
    id: 'r2',
    service: 'Troca de disjuntor',
    professionalName: 'Roberto Alves',
    rating: 5,
    comment: 'Rápido, educado e resolveu tudo na primeira visita.',
    date: '2 abr. 2026',
  },
];

export interface MockAgendaItem {
  id: string;
  title: string;
  clientName: string;
  when: string;
  time: string;
  address: string;
  confirmed: boolean;
  isToday: boolean;
}

export const MOCK_AGENDA: MockAgendaItem[] = [
  {
    id: 'a1',
    title: 'Instalação elétrica — tomadas',
    clientName: 'Fernanda L.',
    when: 'Hoje',
    time: '14:00 – 16:00',
    address: 'Vila Mariana, SP',
    confirmed: true,
    isToday: true,
  },
  {
    id: 'a2',
    title: 'Pintura quarto',
    clientName: 'Marcos Pinturas (cliente)',
    when: '20 mai.',
    time: '09:00 – 12:00',
    address: 'Moema, SP',
    confirmed: false,
    isToday: false,
  },
  {
    id: 'a3',
    title: 'Orçamento presencial — ar-condicionado',
    clientName: 'Paulo T.',
    when: '22 mai.',
    time: '15:30',
    address: 'Pinheiros, SP',
    confirmed: true,
    isToday: false,
  },
];
