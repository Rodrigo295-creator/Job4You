import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Cpu,
  Droplets,
  HardHat,
  LayoutGrid,
  PaintBucket,
  Sparkles,
  Zap,
} from 'lucide-react';

/** Demo / fallback directory row used on home search + listings */
export interface DirectoryProfessional {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string;
  rating: number;
  price: number;
  priceUnit: string;
  image: string;
  isOnline: boolean;
  completedJobs: number;
}

export const ALL_PROFESSIONALS: DirectoryProfessional[] = [
  {
    id: '1',
    name: 'Roberto Alves',
    role: 'Eletricista Residencial',
    category: 'Elétrica',
    description: 'Especialista em instalação de chuveiros, fiação e painéis elétricos. Atendimento rápido em até 2h.',
    rating: 4.9,
    price: 80,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    completedJobs: 143,
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    role: 'Eletricista Industrial',
    category: 'Elétrica',
    description: 'Mais de 15 anos de experiência em instalações industriais e comerciais. CREA ativo.',
    rating: 4.7,
    price: 120,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    isOnline: false,
    completedJobs: 289,
  },
  {
    id: '3',
    name: 'Ana Beatriz',
    role: 'Diarista Especializada',
    category: 'Limpeza',
    description: 'Limpeza pesada, pós-obra e organização de armários. Levo meus próprios produtos ecológicos.',
    rating: 5.0,
    price: 150,
    priceUnit: '/dia',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    isOnline: false,
    completedJobs: 98,
  },
  {
    id: '4',
    name: 'Fernanda Lima',
    role: 'Faxineira Profissional',
    category: 'Limpeza',
    description: 'Especializada em limpeza residencial e comercial. Pontual, cuidadosa e com ótimas referências.',
    rating: 4.6,
    price: 100,
    priceUnit: '/dia',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    completedJobs: 67,
  },
  {
    id: '5',
    name: 'João Oliveira',
    role: 'Encanador Certificado',
    category: 'Hidráulica',
    description: 'Conserto de vazamentos, instalação de torneiras e reparos hidráulicos em geral. Atendo emergências.',
    rating: 4.8,
    price: 90,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    completedJobs: 211,
  },
  {
    id: '6',
    name: 'Marcos Silva',
    role: 'Hidráulico Residencial',
    category: 'Hidráulica',
    description: 'Instalação de aquecedores, caixas d\'água e sistemas de irrigação. Orçamento sem compromisso.',
    rating: 4.5,
    price: 75,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isOnline: false,
    completedJobs: 134,
  },
  {
    id: '7',
    name: 'Patricia Costa',
    role: 'Professora Particular',
    category: 'Aulas',
    description: 'Aulas de matemática e física para ensino médio e vestibular. Aprovação garantida em pré-vestibulares.',
    rating: 4.9,
    price: 60,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    completedJobs: 55,
  },
  {
    id: '8',
    name: 'Lucas Ferreira',
    role: 'Tutor de Programação',
    category: 'Aulas',
    description: 'Ensino Python, JavaScript e desenvolvimento web. Metodologia prática com projetos reais.',
    rating: 4.8,
    price: 80,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    completedJobs: 42,
  },
  {
    id: '9',
    name: 'Diego Santos',
    role: 'Pedreiro e Acabamentos',
    category: 'Construção',
    description: 'Reforma completa, assentamento de pisos e revestimentos. Trabalho limpo e pontual.',
    rating: 4.7,
    price: 200,
    priceUnit: '/dia',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=150&q=80',
    isOnline: false,
    completedJobs: 176,
  },
  {
    id: '10',
    name: 'Renata Melo',
    role: 'Pintora Residencial',
    category: 'Pintura',
    description: 'Pintura interna e externa, textura, grafiato e papel de parede. Materiais de alta qualidade inclusos.',
    rating: 4.8,
    price: 180,
    priceUnit: '/dia',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    completedJobs: 89,
  },
  {
    id: '11',
    name: 'Felipe Torres',
    role: 'Suporte em TI',
    category: 'TI',
    description: 'Configuração de redes, manutenção de computadores e instalação de sistemas. Atendo empresas e residências.',
    rating: 4.6,
    price: 100,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    completedJobs: 63,
  },
  {
    id: '12',
    name: 'Bruno Andrade',
    role: 'Desenvolvedor Freelancer',
    category: 'TI',
    description: 'Criação de sites, sistemas web e aplicativos mobile. Portfólio com mais de 50 projetos entregues.',
    rating: 4.9,
    price: 150,
    priceUnit: '/hora',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=150&q=80',
    isOnline: false,
    completedJobs: 51,
  },
];

export interface HomeCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const HOME_CATEGORIES: HomeCategory[] = [
  { id: 'eletrica', label: 'Elétrica', icon: Zap },
  { id: 'hidraulica', label: 'Hidráulica', icon: Droplets },
  { id: 'limpeza', label: 'Limpeza', icon: Sparkles },
  { id: 'aulas', label: 'Aulas', icon: BookOpen },
  { id: 'construcao', label: 'Construção', icon: HardHat },
  { id: 'pintura', label: 'Pintura', icon: PaintBucket },
  { id: 'ti', label: 'TI', icon: Cpu },
  { id: 'mais', label: 'Mais', icon: LayoutGrid },
];
