import { useState, useRef, useEffect } from 'react';
import { useAppSettings } from '../context/AppSettings';
import { ProPayoutBreakdown } from './ProPayoutBreakdown';
import {
  Send, ArrowLeft, Circle, CheckCircle,
  Clock, MapPin, DollarSign, X, ClipboardList, ChevronRight,
} from 'lucide-react';

export function ProChatScreen() {
  const { t } = useAppSettings();
  const [convos, setConvos] = useState([]);
  return (
    <div className="flex h-full overflow-hidden">
      <p>{t('prochat.title')}</p>
    </div>
  );
}
