import { useState, useRef, useEffect } from 'react';
import { SendIcon, XIcon, ThumbsUpIcon, ThumbsDownIcon, CopyIcon, UserIcon, BotIcon } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you with your code today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when sidebar opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple AI response generator (for demo purposes)
  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! How can I assist you with your code today?";
    } else if (lowerInput.includes('help')) {
      return "I'd be happy to help! What specific coding issue are you facing?";
    } else if (lowerInput.includes('error') || lowerInput.includes('bug')) {
      return "Could you share the error message or code snippet? That would help me diagnose the issue.";
    } else if (lowerInput.includes('javascript') || lowerInput.includes('js')) {
      return "JavaScript is a versatile language! What specific aspect are you working with?";
    } else if (lowerInput.includes('css') || lowerInput.includes('style')) {
      return "CSS can be tricky. Are you having issues with layout, responsiveness, or specific styling?";
    } else if (lowerInput.includes('html')) {
      return "For HTML, make sure your document structure is semantic and accessible. What specific HTML challenge are you facing?";
    } else if (lowerInput.includes('thanks') || lowerInput.includes('thank you')) {
      return "You're welcome! Feel free to ask if you need any more help.";
    } else {
      return "I understand you're working on that. Could you provide more details or share a code snippet so I can give you more specific guidance?";
    }
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col bg-[rgba(20,20,20,0.7)] border-r border-[#232323] rounded-r-xl shadow-2xl backdrop-blur-md overflow-hidden w-[420px] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#232323] bg-black/20">
        <div className="flex items-center">
          <BotIcon size={18} className="text-[#8cc700] mr-2" />
          <h2 className="text-white font-medium">AI Assistant</h2>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-[#222] transition-colors"
        >
          <XIcon size={18} />
        </button>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-[#1a1a1a] text-white' 
                  : 'bg-[#0d3a0d] text-white'
              }`}
            >
              <div className="flex items-center mb-1">
                <div className="w-5 h-5 rounded-full bg-[#333] flex items-center justify-center mr-2">
                  {message.sender === 'user' ? (
                    <UserIcon size={12} className="text-white" />
                  ) : (
                    <BotIcon size={12} className="text-[#8cc700]" />
                  )}
                </div>
                <span className="text-xs font-medium">
                  {message.sender === 'user' ? 'You' : 'AI Assistant'}
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {/* Message actions */}
              {message.sender === 'assistant' && (
                <div className="flex items-center mt-2 space-x-2 justify-end">
                  <button className="text-gray-500 hover:text-gray-300 p-1 rounded hover:bg-[#222] transition-colors">
                    <CopyIcon size={14} />
                  </button>
                  <button className="text-gray-500 hover:text-green-500 p-1 rounded hover:bg-[#222] transition-colors">
                    <ThumbsUpIcon size={14} />
                  </button>
                  <button className="text-gray-500 hover:text-red-500 p-1 rounded hover:bg-[#222] transition-colors">
                    <ThumbsDownIcon size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-[#232323] bg-black/20">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your code..."
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 pr-10 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-[#8cc700] focus:border-[#8cc700]"
            rows={3}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
            className={`absolute right-3 bottom-3 p-1 rounded-md ${
              inputValue.trim() === '' 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-[#8cc700] hover:bg-[#222]'
            }`}
          >
            <SendIcon size={18} />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
          <span>Press Shift + Enter for a new line</span>
          <span>{inputValue.length} characters</span>
        </div>
      </div>
    </div>
  );
}