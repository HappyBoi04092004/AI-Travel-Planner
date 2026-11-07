'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useTripWizard } from '@/context/TripWizardContext';
import { API_ENDPOINTS } from '@/config/api';
import { VIETNAM_DESTINATIONS, VIETNAM_ATTRACTIONS, VIETNAM_SPECIALTIES } from '@/data/vietnamData';
import {
  SparklesIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  CheckIcon,
  MicrophoneIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  TrashIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export interface ChatAction {
  type: 'add_destination' | 'remove_destination' | 'change_transport' | 'search_pharmacy' | 'go_to_step' | 'change_pace' | 'add_attraction' | 'add_specialty';
  data?: any;
  label?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: ChatAction[];
  suggestions?: string[];
  timestamp: Date;
}

export default function WizardAIChatbot() {
  const {
    currentStep,
    startDate,
    returnDate,
    totalDays,
    originCity,
    tripPace,
    selectedDestinations,
    selectedAttractions,
    selectedSpecialties,
    transportSegments,
    overallTransportMode,
    setOverallTransportMode,
    setTripPace,
    toggleDestination,
    toggleAttraction,
    toggleSpecialty,
    setSelectedPOICategory,
    goToStep
  } = useTripWizard();

  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [appliedActionKeys, setAppliedActionKeys] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '👋 **Xin chào! Tôi là Trợ lý AI Du lịch Việt Nam.**\n\nTôi đồng hành cùng bạn xuyên suốt 6 bước lập kế hoạch: theo dõi dự báo thời tiết thực tế, gợi ý đặc sản ẩm thực, điều chỉnh phương tiện di chuyển và định vị nhà thuốc gần nhất.\n\n✨ *Bạn có thể bấm vào các gợi ý bên dưới hoặc trò chuyện trực tiếp bằng giọng nói!*',
      actions: [
        {
          type: 'go_to_step',
          data: 2,
          label: '🗺️ Mở Bản đồ Địa hình 3D (34 Tỉnh thành)'
        }
      ],
      suggestions: [
        'Dự báo thời tiết những ngày tôi chọn',
        'Món ăn đặc sản tại điểm đến này',
        'Đổi phương tiện sang Xe máy'
      ],
      timestamp: new Date()
    }
  ]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, scrollToBottom]);

  // Dynamic contextual prompt chips tailored to current wizard step & selected places
  const samplePrompts = useMemo(() => {
    const destName = selectedDestinations[0]?.name || 'Ninh Bình';
    switch (currentStep) {
      case 1:
        return [
          `Ngày này đi ${destName} có mưa không?`,
          `Nên đi ${destName} vào tháng mấy đẹp nhất?`,
          'Gợi ý lịch trình 5 ngày 4 đêm phù hợp'
        ];
      case 2:
        return [
          `Ở ${destName} có tụ điểm vui chơi nào?`,
          'So sánh thời tiết các tỉnh tôi đã chọn',
          'Thêm Sa Pa vào chuyến đi'
        ];
      case 3:
        return [
          `Ở ${destName} có món gì đặc sản ngon?`,
          `Lễ hội & văn hóa đặc trưng tại ${destName}`,
          'Lưu các món ăn bản địa vào lịch trình'
        ];
      case 4:
        return [
          'Đổi phương tiện sang Xe máy',
          'Khoảng cách và thời gian di chuyển',
          'Chặng này nên đi Ô tô hay Tàu hỏa?'
        ];
      case 5:
        return [
          `Tìm nhà thuốc gần ${selectedAttractions[0]?.name || destName}`,
          'Bệnh viện hoặc trạm y tế gần nhất',
          'Quán ăn ngon gần các điểm tham quan'
        ];
      default:
        return [
          'Nếu trời mưa thì đổi địa điểm trong nhà giúp tôi',
          'Tối ưu lại ngân sách chi tiêu',
          'Những điều cần lưu ý cho hành trình'
        ];
    }
  }, [currentStep, selectedDestinations, selectedAttractions]);

  // Send query to AI Agent
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    // Build rich trip context for AI
    const currentTripContext = {
      country: 'Vietnam',
      currentStep,
      startDate,
      returnDate,
      days: totalDays,
      origin: originCity,
      pace: tripPace,
      destinations: selectedDestinations.map(d => ({ id: d.id, name: d.name, province: d.province, region: d.regionName })),
      attractions: selectedAttractions.map(a => a.name),
      specialties: selectedSpecialties.map(s => s.name),
      transport: overallTransportMode,
      segments: transportSegments
    };

    try {
      const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          currentTrip: currentTripContext
        })
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      const data = await response.json();

      // Normalize actions
      let normalizedActions: ChatAction[] = [];
      if (Array.isArray(data.actions) && data.actions.length > 0) {
        normalizedActions = data.actions;
      } else if (data.action) {
        normalizedActions = [data.action];
      }

      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.response || 'Tôi đã tiếp nhận ý kiến của bạn về chuyến đi.',
        actions: normalizedActions,
        suggestions: Array.isArray(data.suggestions) && data.suggestions.length > 0 ? data.suggestions : undefined,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('API chat fallback:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: `Tôi đã ghi nhận yêu cầu về hành trình của bạn. Bạn có thể bấm vào các tùy chọn nhanh bên dưới để tôi hỗ trợ ngay!`,
        actions: [
          { type: 'go_to_step', data: 2, label: '🗺️ Xem Bản đồ 34 Tỉnh thành' },
          { type: 'search_pharmacy', data: 'pharmacy', label: '💊 Tìm Nhà thuốc gần nhất' }
        ],
        suggestions: [
          'Dự báo thời tiết các điểm đã chọn',
          'Gợi ý ẩm thực đặc sản',
          'Đổi sang phương tiện khác'
        ],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute interactive smart action directly into TripWizardContext
  const handleApplyAction = (actionKey: string, action: ChatAction) => {
    setAppliedActionKeys(prev => [...prev, actionKey]);

    switch (action.type) {
      case 'add_destination': {
        const destKey = String(action.data || '').toLowerCase();
        const found = VIETNAM_DESTINATIONS.find(
          d => d.id === destKey || d.name.toLowerCase().includes(destKey) || destKey.includes(d.id)
        );
        if (found) {
          if (!selectedDestinations.some(d => d.id === found.id)) {
            toggleDestination(found);
          }
          setActionFeedback(`Đã thêm ${found.name} vào chuyến đi!`);
        }
        break;
      }
      case 'change_transport': {
        if (action.data) {
          setOverallTransportMode(action.data);
          const modeName = action.data === 'motorbike' ? 'Xe máy' : action.data === 'car' ? 'Ô tô riêng' : action.data === 'plane' ? 'Máy bay' : action.data === 'train' ? 'Tàu hỏa' : 'Xe khách';
          setActionFeedback(`Đã đổi phương tiện sang ${modeName}!`);
        }
        break;
      }
      case 'change_pace': {
        if (action.data) {
          setTripPace(action.data);
          setActionFeedback(`Đã đổi nhịp độ chuyến đi sang ${action.data === 'relaxed' ? 'Thư thả' : action.data === 'fast' ? 'Khám phá nhiều' : 'Cân bằng'}!`);
        }
        break;
      }
      case 'search_pharmacy': {
        setSelectedPOICategory(action.data || 'pharmacy');
        goToStep(5);
        setActionFeedback('Đã chuyển đến Bản đồ Tiện ích & Nhà thuốc (Bước 5)!');
        break;
      }
      case 'go_to_step': {
        const targetStep = Number(action.data) || 1;
        goToStep(targetStep as any);
        setActionFeedback(`Đã chuyển đến Bước ${targetStep}!`);
        break;
      }
      case 'add_attraction': {
        const attrKey = String(action.data || '').toLowerCase();
        const foundAttr = VIETNAM_ATTRACTIONS.find(
          a => a.id === attrKey || a.name.toLowerCase().includes(attrKey)
        );
        if (foundAttr) {
          toggleAttraction(foundAttr);
          setActionFeedback(`Đã thêm ${foundAttr.name} vào lịch trình!`);
        }
        break;
      }
      case 'add_specialty': {
        const specKey = String(action.data || '').toLowerCase();
        const foundSpec = VIETNAM_SPECIALTIES.find(
          s => s.id === specKey || s.name.toLowerCase().includes(specKey)
        );
        if (foundSpec) {
          toggleSpecialty(foundSpec);
          setActionFeedback(`Đã lưu món ${foundSpec.name} vào danh mục ẩm thực!`);
        }
        break;
      }
      default:
        break;
    }

    // Auto-dismiss toast feedback after 3.5 seconds
    setTimeout(() => {
      setActionFeedback(null);
    }, 3500);
  };

  // Web Speech API Voice Recognition (Speech-to-Text) in Vietnamese
  const handleToggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói. Hãy sử dụng Google Chrome hoặc gõ tin nhắn trực tiếp!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Cannot start speech recognition:', e);
      setIsListening(false);
    }
  };

  // Copy message text to clipboard
  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Clear chat history
  const handleClearChat = () => {
    if (confirm('Bạn có chắc muốn xóa lịch sử trò chuyện và bắt đầu lại?')) {
      setMessages([
        {
          id: 'welcome_reset',
          role: 'assistant',
          content: 'Cuộc trò chuyện đã được làm mới. Tôi sẵn sàng hỗ trợ bạn bất kỳ thông tin nào về chuyến đi!',
          timestamp: new Date()
        }
      ]);
      setAppliedActionKeys([]);
    }
  };

  return (
    <div
      className={`fixed right-3 sm:right-5 bottom-3 sm:bottom-5 z-40 transition-all duration-300 flex flex-col ${
        isOpen
          ? isMinimized
            ? 'w-80 h-14'
            : 'w-[calc(100vw-24px)] sm:w-96 md:w-[420px] h-[580px] max-h-[85vh]'
          : 'w-auto h-auto'
      }`}
    >
      {/* Toast Feedback Notification */}
      {actionFeedback && (
        <div className="absolute -top-12 left-2 right-2 z-50 p-2.5 rounded-xl bg-gray-900/95 text-white text-xs font-bold text-center shadow-lg border border-pink-500/50 flex items-center justify-center gap-1.5 animate-fadeIn">
          <SparklesIcon className="w-4 h-4 text-pink-400 animate-spin" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border border-white/20"
          title="Mở Trợ lý AI Du lịch Việt Nam"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-pink-300 animate-pulse" />
          <SparklesIcon className="w-5 h-5 text-white" />
          <span className="text-sm">Hỏi Trợ lý AI Du lịch</span>
        </button>
      ) : (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold leading-tight flex items-center gap-1.5">
                  <span>Trợ lý AI Du lịch Việt Nam</span>
                </h4>
                <div className="text-[10.5px] text-pink-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-pulse" />
                  <span>Trực tuyến • Am hiểu 34 tỉnh thành</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                title="Làm mới cuộc trò chuyện"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                title={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}
              >
                {isMinimized ? (
                  <ArrowsPointingOutIcon className="w-4 h-4" />
                ) : (
                  <ArrowsPointingInIcon className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                title="Đóng chatbox"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-gray-50/60 dark:bg-gray-950/40 text-xs">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`group relative max-w-[90%] p-3.5 rounded-2xl leading-relaxed ${
                          isUser
                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-br-xs shadow-xs'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 text-gray-800 dark:text-gray-100 rounded-bl-xs shadow-xs'
                        }`}
                      >
                        {/* Copy button for assistant message */}
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="absolute top-2 right-2 p-1 rounded-md bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-300 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Sao chép nội dung"
                          >
                            {copiedMsgId === msg.id ? (
                              <ClipboardDocumentCheckIcon className="w-3.5 h-3.5 text-pink-600" />
                            ) : (
                              <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        {/* Message content with line break support */}
                        <div className="whitespace-pre-wrap space-y-1">
                          {msg.content.split('\n').map((line, i) => {
                            if (!line) return <div key={i} className="h-1.5" />;
                            // Simple markdown bold formatting **text**
                            const boldFormatted = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className="font-extrabold">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            });

                            return (
                              <p key={i} className="leading-relaxed">
                                {boldFormatted}
                              </p>
                            );
                          })}
                        </div>

                        {/* Interactive Smart Action Buttons */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/80 flex flex-wrap gap-1.5">
                            {msg.actions.map((act, actIdx) => {
                              const actionKey = `${msg.id}_${act.type}_${actIdx}`;
                              const isApplied = appliedActionKeys.includes(actionKey);

                              return isApplied ? (
                                <div
                                  key={actionKey}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 font-bold text-[10.5px]"
                                >
                                  <CheckIcon className="w-3.5 h-3.5 text-pink-600" />
                                  <span>Đã áp dụng</span>
                                </div>
                              ) : (
                                <button
                                  key={actionKey}
                                  type="button"
                                  onClick={() => handleApplyAction(actionKey, act)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/80 dark:hover:bg-pink-900 border border-pink-300 dark:border-pink-700 text-pink-800 dark:text-pink-200 text-[11px] font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                                >
                                  <BoltIcon className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                                  <span>{act.label || 'Thực hiện ngay'}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <span
                        className="text-[10px] text-gray-400 mt-1 px-1 flex items-center gap-1"
                        suppressHydrationWarning
                      >
                        {isMounted ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Vừa xong'}
                      </span>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl max-w-[80%] shadow-xs">
                    <ArrowPathIcon className="w-4 h-4 text-pink-600 animate-spin flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-xs font-semibold">
                      AI đang tra cứu dữ liệu địa lý & phân tích...
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Dynamic Suggested Prompts */}
              <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex gap-1.5 overflow-x-auto no-scrollbar">
                {(messages[messages.length - 1]?.suggestions || samplePrompts).map((promptText, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(promptText)}
                    className="flex-shrink-0 px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-[11px] font-semibold hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors whitespace-nowrap"
                  >
                    💡 {promptText}
                  </button>
                ))}
              </div>

              {/* Input Area with Voice & Send Button */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-2.5 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-1.5"
              >
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={handleToggleVoiceInput}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/30'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50'
                  }`}
                  title={isListening ? 'Đang nghe... Bấm để dừng' : 'Nói để nhập tin nhắn tiếng Việt'}
                >
                  <MicrophoneIcon className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isListening
                      ? 'Đang lắng nghe giọng nói của bạn...'
                      : 'Hỏi về thời tiết, ẩm thực, nhà thuốc, đổi xe...'
                  }
                  className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 disabled:opacity-40 transition-colors shadow-pink-500/20 cursor-pointer"
                  title="Gửi câu hỏi"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
