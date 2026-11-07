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
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center z-50 cursor-pointer"
          aria-label="Open chat"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-background border border-border-subtle rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-3 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span className="font-semibold">Trợ lý AI Du lịch Việt Nam</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-lg p-1 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                      : 'bg-card border border-border-subtle text-card-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-pink-100' : 'text-muted-foreground'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border-subtle rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border-subtle bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hỏi về thời tiết, ẩm thực, đổi điểm..."
                className="flex-1 px-4 py-2 border border-border-subtle rounded-xl bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl shadow-md shadow-pink-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
