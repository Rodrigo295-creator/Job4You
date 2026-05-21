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

/* ── data ────────────────────────────────────────────────────────── */

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
  {
    id: '2',
    clientName: 'Juliana Melo',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80',
    isOnline: true,
    unread: 0,
    lastMessage: 'Até amanhã então, obrigada!',
    lastTime: '09:15',
    tag: 'agendado',
    pastServices: [
      { id: 'ps1', service: 'Instalação de tomadas', date: 'Mar 2026', value: 160, rating: 5 },
    ],
    messages: [
      { id: 'm1', sender: 'client', time: 'Ontem 16:00', type: 'text', text: 'Boa tarde Roberto, preciso de um reparo no painel elétrico.' },
      { id: 'm2', sender: 'pro',    time: 'Ontem 16:05', type: 'text', text: 'Boa tarde Juliana! Sem problema. Quando você quer que eu passe?' },
      { id: 'm3', sender: 'client', time: 'Ontem 16:08', type: 'text', text: 'Amanhã pela manhã está bom?' },
      {
        id: 'm4', sender: 'pro', time: 'Ontem 16:12', type: 'proposal',
        proposal: { service: 'Reparo em Painel Elétrico', date: '15 mai. 2026', time: '09:00', price: 220, location: 'Itaim Bibi, SP', status: 'accepted' },
      },
      { id: 'm5', sender: 'client', time: 'Ontem 16:14', type: 'proposal_accepted', text: '✅ Proposta aceita!' },
      { id: 'm6', sender: 'client', time: '09:15', type: 'text', text: 'Até amanhã então, obrigada!' },
    ],
  },
  {
    id: '3',
    clientName: 'Marcos Vinicius',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    isOnline: false,
    unread: 0,
    lastMessage: 'Ficou perfeito! Já deixei a avaliação.',
    lastTime: 'Ter',
    tag: 'concluido',
    pastServices: [
      { id: 'ps1', service: 'Instalação de tomadas externas', date: 'Mai 2026', value: 160, rating: 5 },
      { id: 'ps2', service: 'Troca de disjuntor', date: 'Jan 2026', value: 120, rating: 5 },
    ],
    messages: [
      { id: 'm1', sender: 'client', time: 'Ter 08:00', type: 'text', text: 'Bom dia Roberto! O serviço de ontem ficou excelente.' },
      { id: 'm2', sender: 'pro',    time: 'Ter 08:10', type: 'text', text: 'Que bom saber, Marcos! Qualquer coisa pode me chamar.' },
      { id: 'm3', sender: 'client', time: 'Ter 08:12', type: 'service_done', text: '✅ Serviço confirmado como concluído.' },
      { id: 'm4', sender: 'client', time: 'Ter 08:15', type: 'text', text: 'Ficou perfeito! Já deixei a avaliação.' },
    ],
  },
  {
    id: '4',
    clientName: 'Fernanda Souza',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    isOnline: false,
    unread: 0,
    lastMessage: 'Você: Obrigado! Pode entrar em contato quando quiser.',
    lastTime: 'Sex',
    pastServices: [
      { id: 'ps1', service: 'Fiação completa apartamento', date: 'Abr 2026', value: 900, rating: 5 },
    ],
    messages: [
      { id: 'm1', sender: 'client', time: 'Sex 17:00', type: 'text', text: 'Roberto, sua equipe fez um trabalho incrível na fiação!' },
      { id: 'm2', sender: 'pro',    time: 'Sex 17:10', type: 'text', text: 'Muito obrigado Fernanda! Foi um prazer trabalhar no seu apartamento.' },
      { id: 'm3', sender: 'client', time: 'Sex 17:12', type: 'text', text: 'Com certeza vou indicar para todo mundo.' },
      { id: 'm4', sender: 'pro',    time: 'Sex 17:15', type: 'text', text: 'Obrigado! Pode entrar em contato quando quiser.' },
    ],
  },
];

const TAG_CONFIG = {
  novo:      { label: 'Novo',      color: 'bg-[#FEF0E6] text-[#F97316]' },
  agendado:  { label: 'Agendado',  color: 'bg-blue-50 text-blue-600' },
  concluido: { label: 'Concluído', color: 'bg-green-50 text-green-600' },
};

function ProposalModal({ onSend, onClose }: {
  onSend: (p: Proposal) => void;
  onClose: () => void;
}) {
  const { t } = useAppSettings();
  const [form, setForm] = useState<Omit<Proposal, 'status'>>({
    service: '', date: '', time: '', price: 0, location: '',
  });
  const set = (k: keyof typeof form, v: string | number) =>
    setForm(f => ({ ...f, [k]: v }));
  const valid = form.service && form.date && form.time && form.price > 0;

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-base">{t('prochat.newProposal')}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">{t('prochat.service')}</label>
            <input
              value={form.service}
              onChange={e => set('service', e.target.value)}
              placeholder={t('prochat.servicePh')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProChatScreen() {
  const { t } = useAppSettings();
  const [convos, setConvos] = useState<ClientConvo[]>(INITIAL_CONVOS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selected = convos.find(c => c.id === selectedId) ?? null;
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.messages.length, selectedId]);
  return (
    <div className="flex h-full overflow-hidden">
      <p>{t('prochat.title')}</p>
    </div>
  );
}

function now() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
