import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Circle } from 'lucide-react';
import { useAppSettings } from '../context/AppSettings';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'pro';
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  image: string;
  isOnline: boolean;
  unread: number;
  lastMessage: string;
  lastTime: string;
  messages: Message[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Roberto Alves',
    role: 'Eletricista Residencial',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    unread: 2,
    lastMessage: 'Posso passar amanhã às 9h, tudo certo?',
    lastTime: '10:42',
    messages: [
      { id: 'm1', text: 'Olá! Vi seu perfil e gostaria de contratar seu serviço.', sender: 'user', time: 'Ontem 14:20' },
      { id: 'm2', text: 'Oi! Claro, pode me contar o que precisa?', sender: 'pro', time: 'Ontem 14:23' },
      { id: 'm3', text: 'Preciso trocar o disjuntor do quadro elétrico e instalar duas tomadas na sala.', sender: 'user', time: 'Ontem 14:25' },
      { id: 'm4', text: 'Entendido! Consigo fazer isso sim. Qual seria o melhor dia pra você?', sender: 'pro', time: 'Ontem 14:28' },
      { id: 'm5', text: 'Amanhã de manhã seria ótimo, se puder.', sender: 'user', time: 'Ontem 14:30' },
      { id: 'm6', text: 'Posso passar amanhã às 9h, tudo certo?', sender: 'pro', time: '10:42' },
    ],
  },
  {
    id: '2',
    name: 'Ana Beatriz',
    role: 'Diarista Especializada',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    isOnline: false,
    unread: 0,
    lastMessage: 'Serviço concluído! Obrigada pela confiança 😊',
    lastTime: 'Sex',
    messages: [
      { id: 'm1', text: 'Boa tarde! Preciso de uma faxina pesada no apartamento.', sender: 'user', time: 'Sex 09:10' },
      { id: 'm2', text: 'Oi! Posso te atender. Quantos cômodos são?', sender: 'pro', time: 'Sex 09:15' },
      { id: 'm3', text: 'São 3 quartos, 2 banheiros, sala e cozinha.', sender: 'user', time: 'Sex 09:17' },
      { id: 'm4', text: 'Perfeito, consigo em um dia. Cobro R$150. Quando quer?', sender: 'pro', time: 'Sex 09:20' },
      { id: 'm5', text: 'Hoje mesmo seria possível?', sender: 'user', time: 'Sex 09:22' },
      { id: 'm6', text: 'Sim! Posso chegar às 14h.', sender: 'pro', time: 'Sex 09:25' },
      { id: 'm7', text: 'Ótimo, te aguardo então!', sender: 'user', time: 'Sex 09:26' },
      { id: 'm8', text: 'Serviço concluído! Obrigada pela confiança 😊', sender: 'pro', time: 'Sex 18:05' },
    ],
  },
  {
    id: '3',
    name: 'João Oliveira',
    role: 'Encanador Certificado',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    unread: 0,
    lastMessage: 'O orçamento ficou em R$280 com peças inclusas.',
    lastTime: 'Qua',
    messages: [
      { id: 'm1', text: 'Oi João, tenho um vazamento embaixo da pia.', sender: 'user', time: 'Qua 11:00' },
      { id: 'm2', text: 'Entendo, pode me mandar uma foto?', sender: 'pro', time: 'Qua 11:03' },
      { id: 'm3', text: '[foto enviada]', sender: 'user', time: 'Qua 11:05' },
      { id: 'm4', text: 'Precisa trocar o sifão e um trecho de tubulação. O orçamento ficou em R$280 com peças inclusas.', sender: 'pro', time: 'Qua 11:12' },
    ],
  },
  {
    id: '4',
    name: 'Renata Melo',
    role: 'Pintora Residencial',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&q=80',
    isOnline: false,
    unread: 0,
    lastMessage: 'Você: Combinado, até segunda então!',
    lastTime: 'Ter',
    messages: [
      { id: 'm1', text: 'Renata, quero pintar o quarto de azul. Você trabalha com grafiato?', sender: 'user', time: 'Ter 16:00' },
      { id: 'm2', text: 'Trabalho sim! Tenho várias texturas disponíveis.', sender: 'pro', time: 'Ter 16:05' },
      { id: 'm3', text: 'Qual o valor médio por m²?', sender: 'user', time: 'Ter 16:07' },
      { id: 'm4', text: 'Fica em torno de R$25/m² já com tinta e mão de obra.', sender: 'pro', time: 'Ter 16:10' },
      { id: 'm5', text: 'Combinado, até segunda então!', sender: 'user', time: 'Ter 16:12' },
    ],
  },
];

export function ChatScreen() {
  const { t } = useAppSettings();
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = conversations.find(c => c.id === selectedId) ?? null;

  useEffect(() => {
    if (selected) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selected?.messages.length, selectedId]);

  const openConversation = (id: string) => {
    setSelectedId(id);
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, unread: 0 } : c)
    );
  };

  const sendMessage = () => {
    if (!inputText.trim() || !selectedId) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: inputText.trim(),
      sender: 'user',
      time: timeStr,
    };
    setConversations(prev =>
      prev.map(c =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: `${t('common.you')}: ${newMsg.text}`, lastTime: timeStr }
          : c
      )
    );
    setInputText('');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

    // Simulated reply after 1.2s
    setTimeout(() => {
      const replies = [
        t('chat.reply1'),
        t('chat.reply2'),
        t('chat.reply3'),
        t('chat.reply4'),
        t('chat.reply5'),
      ];
      const reply: Message = {
        id: `m${Date.now()}`,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'pro',
        time: timeStr,
      };
      setConversations(prev =>
        prev.map(c =>
          c.id === selectedId
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, lastTime: timeStr }
            : c
        )
      );
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }, 1200);
  };

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  /* ── Conversation list ─────────────────────────────────────── */
  const ConversationList = (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">{t('chat.title')}</h2>
        {totalUnread > 0 && (
          <p className="text-xs text-slate-400 mt-0.5">
            {totalUnread > 1 ? t('chat.unreadPlural', { count: totalUnread }) : t('chat.unread', { count: totalUnread })}
          </p>
        )}
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => openConversation(conv.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left border-b border-slate-50 ${
              selectedId === conv.id ? 'bg-[#FEF0E6]' : 'hover:bg-slate-50'
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={conv.image}
                alt={conv.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conv.isOnline ? 'bg-green-500' : 'bg-slate-300'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-sm truncate ${conv.unread > 0 ? 'font-semibold text-slate-800' : 'font-medium text-slate-700'}`}>
                  {conv.name}
                </span>
                <span className="text-[11px] text-slate-400 flex-shrink-0">{conv.lastTime}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className={`text-xs truncate ${conv.unread > 0 ? 'text-slate-700' : 'text-slate-400'}`}>
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-[#F97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  /* ── Chat window ───────────────────────────────────────────── */
  const ChatWindow = selected ? (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white flex-shrink-0">
        <button
          onClick={() => setSelectedId(null)}
          className="sm:hidden p-1 -ml-1 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="relative">
          <img src={selected.image} alt={selected.name} className="w-9 h-9 rounded-full object-cover" />
          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selected.isOnline ? 'bg-green-500' : 'bg-slate-300'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-tight">{selected.name}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            {selected.isOnline
              ? <><Circle className="w-2 h-2 fill-green-500 text-green-500" /> {t('chat.onlineNow')}</>
              : selected.role
            }
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {selected.messages.map((msg, i) => {
          const isUser = msg.sender === 'user';
          const prevSender = i > 0 ? selected.messages[i - 1].sender : null;
          const showAvatar = !isUser && msg.sender !== prevSender;
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              {!isUser && (
                <div className="w-7 h-7 flex-shrink-0">
                  {showAvatar && (
                    <img src={selected.image} alt={selected.name} className="w-7 h-7 rounded-full object-cover" />
                  )}
                </div>
              )}
              <div className={`max-w-[72%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#F97316] text-white rounded-br-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-100 bg-white flex-shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus-within:border-[#F97316] focus-within:ring-2 focus-within:ring-[#F97316]/15 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={t('chat.messagePh', { name: selected.name.split(' ')[0] })}
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              inputText.trim()
                ? 'bg-[#F97316] hover:bg-[#EA6A0A] text-white shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    /* Empty state when no chat selected (desktop) */
    <div className="hidden sm:flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-16 h-16 bg-[#FEF0E6] rounded-2xl flex items-center justify-center mb-4">
        <Send className="w-7 h-7 text-[#F97316]" />
      </div>
      <p className="font-semibold text-slate-700 mb-1">{t('chat.selectTitle')}</p>
      <p className="text-sm text-slate-400">{t('chat.selectHint')}</p>
    </div>
  );

  return (
    <div className="flex h-full overflow-hidden">
      {/* Conversation list — hidden on mobile when chat is open */}
      <div className={`${selectedId ? 'hidden sm:flex' : 'flex'} sm:w-[260px] w-full border-r border-slate-100 bg-white flex-col flex-shrink-0`}>
        {ConversationList}
      </div>

      {/* Chat area — hidden on mobile when list is shown */}
      <div className={`${selectedId ? 'flex' : 'hidden sm:flex'} flex-1 flex-col bg-[#F8F8F6] overflow-hidden`}>
        {ChatWindow}
      </div>
    </div>
  );
}
