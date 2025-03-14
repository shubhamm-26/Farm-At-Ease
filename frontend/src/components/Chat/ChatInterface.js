"use client";

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('http://localhost:8000/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: input
        }),
      });

      const data = await response.json();
      const botMessage = {
        text: data.response,
        sender: 'bot',
        timestamp: new Date(data.timestamp)
      };

      setMessages(prev => [...prev, botMessage]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      setMessages(prev => [...prev, {
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format messages
  const formatMessage = (text) => {
    // Handle basic markdown-like formatting
    return text
      .split('\n')
      .map((line, i) => <p key={i} className="mb-1">{line}</p>);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
      {/* Chat header */}
      <div className="bg-primary text-white p-4 flex items-center">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <h2 className="font-semibold">Farm AI Assistant</h2>
      </div>
      
      <div className="h-[600px] flex flex-col">
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-400 p-6 text-center">
            <div>
              <svg 
                className="w-16 h-16 mx-auto mb-4 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
              <p className="text-lg">Ask me anything about farming!</p>
              <p className="text-sm mt-2">I can help with crop diseases, treatments, and best practices.</p>
            </div>
          </div>
        )}
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex-shrink-0 flex items-center justify-center">
                  <span className="text-primary text-xs font-bold">AI</span>
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : message.isError 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100'
                }`}
              >
                <div className="message-content">
                  {formatMessage(message.text)}
                </div>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 ml-2 flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-600 text-xs font-bold">You</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about farming..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-secondary transition-colors flex items-center justify-center"
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;