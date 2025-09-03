import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { UserProfile } from '../types/user';

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  userProfile: UserProfile;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle, userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${userProfile.name}! I'm your AI career advisor. I can help you with career guidance, college information, exam preparation, and more. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'Tell me about engineering careers',
        'Which colleges are best for my interests?',
        'What exams should I prepare for?',
        'How to choose the right stream?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const responses = {
      engineering: {
        text: "Engineering is a fantastic choice! Based on your interests in Science & Technology, here are some popular engineering branches:\n\n• Computer Science Engineering - High demand, excellent salary prospects\n• Mechanical Engineering - Core engineering with diverse opportunities\n• Electrical Engineering - Power, automation, and electronics\n• Civil Engineering - Infrastructure and construction\n\nFor admission, you'll need to appear for JEE Main and possibly state-level entrance exams. Would you like specific information about any branch?",
        suggestions: ['Tell me about Computer Science', 'JEE Main preparation tips', 'Best engineering colleges near me']
      },
      colleges: {
        text: `Great question! Based on your location in ${userProfile.location}, here are some recommendations:\n\n• Government College of Engineering - Excellent for technical courses\n• State University - Multiple stream options\n• Regional Medical College - If you're interested in healthcare\n\nI can help you find colleges specific to your preferred course. What stream are you most interested in?`,
        suggestions: ['Show engineering colleges', 'Medical colleges near me', 'Commerce colleges list']
      },
      exams: {
        text: "Here are the key exams you should know about:\n\n• JEE Main - For engineering admissions\n• NEET - For medical courses\n• CLAT - For law programs\n• State CETs - State-specific entrance tests\n\nBased on your current class and interests, I'd recommend focusing on specific exams. Would you like a detailed preparation strategy?",
        suggestions: ['JEE Main syllabus', 'NEET preparation plan', 'State CET information']
      },
      stream: {
        text: "Choosing the right stream is crucial! Based on your quiz results and interests, here's my advice:\n\n• Science - If you enjoy problem-solving and logical thinking\n• Commerce - If you're interested in business and economics\n• Arts - If you're drawn to creativity and social sciences\n\nYour interests suggest you'd excel in Science stream. Would you like detailed information about subject combinations?",
        suggestions: ['Science stream subjects', 'PCM vs PCB difference', 'Career options after science']
      },
      default: {
        text: "I understand you're looking for guidance. I'm here to help with:\n\n• Career advice and stream selection\n• College recommendations\n• Exam preparation strategies\n• Timeline planning\n\nCould you be more specific about what you'd like to know? I have detailed information about your interests and can provide personalized advice.",
        suggestions: ['Career options for my interests', 'Best colleges in my area', 'Important exam dates']
      }
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = responses.default;

    if (lowerMessage.includes('engineering') || lowerMessage.includes('engineer')) {
      response = responses.engineering;
    } else if (lowerMessage.includes('college') || lowerMessage.includes('university')) {
      response = responses.colleges;
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('preparation')) {
      response = responses.exams;
    } else if (lowerMessage.includes('stream') || lowerMessage.includes('subject') || lowerMessage.includes('choose')) {
      response = responses.stream;
    }

    return {
      id: Date.now().toString(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: response.suggestions
    };
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 sm:w-96 w-[19.5rem] h-[600px] bg-slate-900/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-white">AI Career Advisor</h3>
              <p className="text-sm text-gray-300">Online <a className='text-green-600'>•</a> Ready to help</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                : 'bg-white/10 text-gray-100 border border-white/20'
            }`}>
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <Bot className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="sm:text-sm text-xs leading-relaxed whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left p-2 bg-white/10 rounded-lg sm:text-sm text-xs text-blue-300 hover:bg-white/20 transition-all duration-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about careers..."
            className="flex-1 px-4 py-3 bg-white/5 border sm:text-base text-xs border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};