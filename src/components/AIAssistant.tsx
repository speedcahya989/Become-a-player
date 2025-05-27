
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message when first expanded
    if (isExpanded && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        text: language === 'en' 
          ? "Hello! I'm your AI Assistant. I can help you with quest strategies, progress analysis, and motivation tips. How can I help you today?"
          : "Halo! Saya AI Assistant Anda. Saya bisa membantu dengan strategi quest, analisis progress, dan tips motivasi. Bagaimana saya bisa membantu Anda hari ini?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isExpanded, language]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (language === 'en') {
      if (lowerMessage.includes('quest') || lowerMessage.includes('task')) {
        return "Based on your current progress, I recommend focusing on daily quests first to maintain your streak. Try breaking larger goals into smaller, manageable tasks!";
      }
      if (lowerMessage.includes('motivation') || lowerMessage.includes('tired')) {
        return "I see you're feeling tired! Remember, small progress is still progress. Take a break if needed, and come back stronger. Your 5-day streak shows great dedication!";
      }
      if (lowerMessage.includes('level') || lowerMessage.includes('xp')) {
        return "You're doing great at Level 15! Your XP gain of 850 this week is impressive. Keep up the consistent effort and you'll reach the next level soon!";
      }
      if (lowerMessage.includes('stats') || lowerMessage.includes('progress')) {
        return "Your stats are well-balanced! Consider focusing on Charisma and Dexterity to round out your character. Your Strength and Intelligence are already quite good!";
      }
      return "That's an interesting question! As your AI assistant, I'm here to help you optimize your gamified life. Feel free to ask about quests, progress, or motivation!";
    } else {
      if (lowerMessage.includes('quest') || lowerMessage.includes('tugas')) {
        return "Berdasarkan progress Anda saat ini, saya sarankan fokus pada quest harian dulu untuk menjaga streak. Coba pecah goal besar menjadi tugas-tugas kecil yang mudah dikelola!";
      }
      if (lowerMessage.includes('motivasi') || lowerMessage.includes('lelah')) {
        return "Saya lihat Anda merasa lelah! Ingat, progress kecil tetap progress. Istirahat kalau perlu, dan kembali lebih kuat. Streak 5 hari Anda menunjukkan dedikasi yang luar biasa!";
      }
      if (lowerMessage.includes('level') || lowerMessage.includes('xp')) {
        return "Anda luar biasa di Level 15! XP gain 850 minggu ini sangat mengesankan. Terus pertahankan effort yang konsisten dan Anda akan segera naik level!";
      }
      if (lowerMessage.includes('stats') || lowerMessage.includes('progress')) {
        return "Stats Anda sudah seimbang! Coba fokus pada Charisma dan Dexterity untuk melengkapi karakter Anda. Strength dan Intelligence sudah cukup bagus!";
      }
      return "Pertanyaan yang menarik! Sebagai AI assistant Anda, saya di sini untuk membantu mengoptimalkan kehidupan gamifikasi Anda. Silakan tanya tentang quest, progress, atau motivasi!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="glass">
      <CardHeader 
        className="pb-2 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-sm font-orbitron flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            {language === 'en' ? 'AI Assistant' : 'AI Assistant'}
            <Sparkles className="w-3 h-3 text-yellow-400" />
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          {/* Chat Messages */}
          <div className="h-40 overflow-y-auto mb-3 space-y-2 scrollbar-thin scrollbar-thumb-primary/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-xs ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-2 rounded-lg rounded-bl-none text-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-1 mb-3 flex-wrap">
            <Badge 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setInputValue(language === 'en' ? 'Give me quest tips' : 'Beri saya tips quest')}
            >
              {language === 'en' ? 'Quest Tips' : 'Tips Quest'}
            </Badge>
            <Badge 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setInputValue(language === 'en' ? 'Analyze my progress' : 'Analisis progress saya')}
            >
              {language === 'en' ? 'Progress' : 'Progress'}
            </Badge>
            <Badge 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setInputValue(language === 'en' ? 'I need motivation' : 'Saya butuh motivasi')}
            >
              {language === 'en' ? 'Motivation' : 'Motivasi'}
            </Badge>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'en' ? 'Ask me anything...' : 'Tanya apa saja...'}
              className="text-xs h-8"
              disabled={isTyping}
            />
            <Button 
              size="sm" 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="h-8 w-8 p-0"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AIAssistant;
