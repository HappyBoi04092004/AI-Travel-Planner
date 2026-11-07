'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TripResponse, DayItinerary } from '@/types';
import { API_ENDPOINTS } from '@/config/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  currentTrip: TripResponse | null;
  onTripUpdate?: (updatedTrip: Partial<TripResponse>) => void;
}

export default function ChatBot({ currentTrip, onTripUpdate }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Xin chào! Tôi là Trợ lý AI Du lịch Việt Nam. Hãy cho tôi biết bạn muốn điều chỉnh gì về lịch trình (thêm điểm tham quan, tối ưu ngân sách, gợi ý quán ăn, đổi phương tiện...)?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          currentTrip: {
            country: currentTrip?.itinerary
              ? (Object.values(currentTrip.itinerary).filter((day): day is DayItinerary => typeof day === 'object' && day !== null).find(day => day.location)?.location || 'Unknown')
              : 'Unknown',
            days: currentTrip?.budget?.days || 0,
            locations: '',
            itinerary: currentTrip?.itinerary || {},
            budget: currentTrip?.budget || {}
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || "I understand. Let me help you with that.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If there are suggestions, add them as a follow-up message
      if (data.changes?.suggestions && data.changes.suggestions.length > 0) {
        setTimeout(() => {
          const suggestionsMessage: Message = {
            role: 'assistant',
            content: `Here are some suggestions:\n${data.changes.suggestions.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, suggestionsMessage]);
        }, 500);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Xin lỗi, hiện tại tôi gặp gián đoạn kết nối. Vui lòng thử lại sau giây lát!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#db2777',
            backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
            color: '#ffffff'
          }}
          className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-full shadow-2xl shadow-pink-600/40 hover:scale-110 transition-all flex items-center justify-center z-50 cursor-pointer border-2 border-white ring-2 ring-pink-500/50"
          aria-label="Open chat"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover object-top" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-slate-900 border-2 border-pink-300 dark:border-pink-800 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div
            style={{
              backgroundColor: '#db2777',
              backgroundImage: 'linear-gradient(135deg, #be123c 0%, #db2777 50%, #e11d48 100%)',
              color: '#ffffff'
            }}
            className="text-white px-4 py-3.5 flex items-center justify-between rounded-t-3xl shadow-md border-b-2 border-pink-700"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-xs">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <span className="font-black text-sm text-white drop-shadow-sm block leading-tight">Trợ lý AI Du lịch Việt Nam</span>
                <span className="text-[10px] text-pink-100 font-bold block">● Trực tuyến</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-lg p-1.5 transition-colors cursor-pointer text-white"
              aria-label="Close chat"
            >
              <XMarkIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50/20 dark:bg-slate-950/40">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 text-white font-bold shadow-md shadow-pink-600/25'
                      : 'bg-white dark:bg-slate-800 border-2 border-pink-200 dark:border-pink-900 text-slate-900 dark:text-slate-100 font-medium shadow-xs'
                  }`}
                >
                  <p className="text-xs whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <p className={`text-[10px] mt-1 font-semibold ${message.role === 'user' ? 'text-pink-100' : 'text-slate-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border-2 border-pink-200 dark:border-pink-900 rounded-2xl px-4 py-2.5">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-pink-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hỏi về thời tiết, ẩm thực, đổi điểm..."
                className="flex-1 px-3.5 py-2.5 border-2 border-pink-200 dark:border-slate-700 rounded-xl bg-pink-50/20 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs font-bold"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                style={{
                  backgroundColor: '#db2777',
                  backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
                  color: '#ffffff'
                }}
                className="px-4 py-2.5 text-white rounded-xl shadow-md shadow-pink-600/35 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
