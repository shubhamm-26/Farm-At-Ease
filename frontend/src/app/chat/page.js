"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatInterface from '@/components/Chat/ChatInterface';
import Image from 'next/image';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Farm Assistant Chat
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Get expert advice on crop diseases, treatments, and farming best practices
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg">FarmAIssistant</h2>
              <p className="text-xs text-gray-500">Agricultural Expert</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            I'm your dedicated farming assistant. I can help identify plant diseases, recommend treatments, 
            and provide advice on growing healthy crops. What farming question can I help with today?
          </p>
        </div>
        
        <ChatInterface />
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2025 Farm At Ease. All responses are AI-generated and should be verified with proper agricultural experts.</p>
        </div>
      </div>
    </div>
  );
}