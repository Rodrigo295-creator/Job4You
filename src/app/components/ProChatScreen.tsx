import { useState, useRef, useEffect } from 'react';
import { useAppSettings } from '../context/AppSettings';
import { ProPayoutBreakdown } from './ProPayoutBreakdown';
import {
  Send, ArrowLeft, Circle, CheckCircle,
  Clock, MapPin, DollarSign, X, ClipboardList, ChevronRight,
} from 'lucide-react';

/* ── types ───────────────────────────────────────────────────────── */

type MsgType = 'text' | 'proposal' | 'proposal_accepted' | 'service_done';

interface Proposal {
  service: string;
  date: string;
  time: string;
  price: number;
  location: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface Message {
  id: string;
  text?: string;
  sender: 'pro' | 'client';
  time: string;
  type: MsgType;
  proposal?: Proposal;
}

interface PastService {
  id: string;
  service: string;
  date: string;
  value: number;
  rating: number;
}

interface ClientConvo {
  id: string;
  clientName: string;
  clientImage: string;
  isOnline: boolean;
  unread: number;
  lastMessage: string;
  lastTime: string;
  tag?: 'novo' | 'agendado' | 'concluido';
  messages: Message[];
  pastServices: PastService[];
}

const INITIAL_CONVOS: ClientConvo[] = [
  {
    id: '1',
    clientName: 'Carlos Eduardo',
    clientImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80',
    isOnline: true,
    unread: 2,
    lastMessage: 'Ótimo! Pode confirmar o horário?',
    lastTime: '10:47',
    tag: 'novo',
    pastServices: [],
    messages: [
      { id: 'm1', sender: 'client', time: '10:30', type: 'text', text: 'Oi Roberto! Vi seu perfil e gostaria de contratar para instalar um ar-condicionado.' },
      { id: 'm2', sender: 'pro',    time: '10:33', type: 'text', text: 'Olá Carlos! Claro, posso sim. Qual a capacidade do aparelho e o endereço?' },
      { id: 'm3', sender: 'client', time: '10:35', type: 'text', text: '12.000 BTUs, split. Estou em Pinheiros, Rua Teodoro Sampaio.' },
      { id: 'm4', sender: 'pro',    time: '10:38', type: 'text', text: 'Perfeito! Mando uma proposta para você confirmar.' },
      {
        id: 'm5', sender: 'pro', time: '10:40', type: 'proposal',
        proposal: { service: 'Instalação de Ar-condicionado Split 12.000 BTUs', date: '15 mai. 2026', time: '14:00', price: 250, location: 'Pinheiros, SP', status: 'pending' },
      },
      { id: 'm6', sender: 'client', time: '10:47', type: 'text', text: 'Ótimo! Pode confirmar o horário?' },
    ],
  },
];

export function ProChatScreen() {
  const { t } = useAppSettings();
  return <div>{t('prochat.title')}</div>;
}
