import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Headphones,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface FloatingChatButtonProps {
  onOpenActivationModal: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: 'open_activation';
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onOpenActivationModal }) => {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      sender: 'bot',
      text: t('chatbot.welcomeMsg'),
      timestamp: t('chatbot.justNow', 'Just now')
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // When language changes, refresh the initial greeting if it's the only message
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'msg-init') {
        return [{
          id: 'msg-init',
          sender: 'bot',
          text: t('chatbot.welcomeMsg'),
          timestamp: t('chatbot.justNow', 'Just now')
        }];
      }
      return prev;
    });
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: t('chatbot.justNow', 'Just now')
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = t('chatbot.replyDefault');
      let action: 'open_activation' | undefined = undefined;

      const lower = text.toLowerCase();

      // Multi-lingual keyword matching
      const activateKeywords = ['activ', 'card', 'ticket', 'carte', 'aktivi', 'tattiv', 'voucher', 'how', 'comment', 'como', 'wie', 'come', 'hoe', 'كيف', '激活', '有効', '활성화', 'активир', 'etkin', 'सक्रिय', 'buka'];
      const delayKeywords = ['delay', 'time', 'délai', 'temps', 'zeit', 'tempo', 'tiempo', 'tijd', 'durat', 'combien', 'cuanto', 'quante', 'وقت', '时间', '時間', 'время', 'zaman', 'समय', 'kapan'];
      const securityKeywords = ['secur', 'safe', 'sécur', 'sicher', 'sicur', 'segur', 'veilig', 'scam', 'arnaque', 'безопас', 'guaran', 'güven', 'सुरक्षा', 'aman', 'अमानत'];
      const humanKeywords = ['human', 'agent', 'support', 'conseiller', 'humain', 'kontakt', 'contact', 'ayuda', 'contatto', 'помощь', 'destek', 'सहायता', 'bantuan'];

      if (activateKeywords.some(kw => lower.includes(kw))) {
        botResponse = t('chatbot.replyActivation');
        action = 'open_activation';
      } else if (delayKeywords.some(kw => lower.includes(kw))) {
        botResponse = t('chatbot.replyDelay');
      } else if (securityKeywords.some(kw => lower.includes(kw))) {
        botResponse = t('chatbot.replySecurity');
      } else if (humanKeywords.some(kw => lower.includes(kw))) {
        botResponse = t('chatbot.replyHuman');
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          timestamp: t('chatbot.justNow', 'Just now'),
          action
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Chat Pop-up Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-900/25 border border-slate-200/90 overflow-hidden flex flex-col h-[480px] max-h-[75vh] animate-fadeIn">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>{t('chatbot.headerTitle', 'CARD CHECK Support')}</span>
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t('chatbot.onlineStatus', 'Online • Reply in 1 min')}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label={t('chatbot.closeChat', 'Close chat')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <button
              type="button"
              onClick={() => handleSendMessage(t('chatbot.quickActivate', 'How to activate?'))}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer font-medium"
            >
              {t('chatbot.quickActivate', 'How to activate?')}
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(t('chatbot.quickDelay', 'Processing time'))}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer font-medium"
            >
              {t('chatbot.quickDelay', 'Processing time')}
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(t('chatbot.quickSecurity', 'Security of funds'))}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer font-medium"
            >
              {t('chatbot.quickSecurity', 'Security of funds')}
            </button>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.action === 'open_activation' && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onOpenActivationModal();
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer active:scale-98 shadow-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t('chatbot.openActivationBtn', 'Open «Activate Voucher»')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 max-w-[80px] bg-white rounded-2xl border border-slate-200/80 text-slate-400 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chatbot.placeholder', 'Type your question...')}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition cursor-pointer shrink-0"
              aria-label={t('chatbot.send', 'Send')}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        id="floating-chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer active:scale-95 border border-slate-800"
        aria-label={t('chatbot.triggerTitle', 'Need help?')}
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse"></span>
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold leading-tight">{t('chatbot.triggerTitle', 'Need help?')}</span>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-100 leading-tight">{t('chatbot.triggerSubtitle', '7/7 advisor')}</span>
        </div>
      </button>
    </>
  );
};
