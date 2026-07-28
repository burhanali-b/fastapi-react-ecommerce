import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { chatbotService } from '@/services/chatbot.service';
import { getErrorMessage } from '@/services/api';
import type { ChatbotMessage } from '@/types';

const DEFAULT_MESSAGES: ChatbotMessage[] = [
  { role: 'assistant', text: 'Hello! I can help you find products, answer order questions, and guide you through checkout.' },
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatbotMessage[]>(DEFAULT_MESSAGES);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages: ChatbotMessage[] = [...messages, { role: 'user', text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await chatbotService.ask(trimmed, nextMessages);
      setMessages((current) => [...current, { role: 'assistant', text: response.reply }]);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      setMessages((current) => [...current, { role: 'assistant', text: message || 'Sorry, I could not answer that right now. Try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const widget = (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-auto">
      {open && (
        <div className="w-[340px] max-w-full bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden mb-3">
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">CHEMISTO Assistant</p>
              <p className="text-xs text-slate-300">Ask about products, orders, or shipping.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-slate-800 p-2 hover:bg-slate-700 transition-colors"
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-6 ${
                    message.role === 'assistant'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-white text-sm font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? 'Sending...' : <PaperAirplaneIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5" />
        Chat
      </button>
    </div>
  );

  if (!mounted) return null;
  return createPortal(widget, document.body);
}
