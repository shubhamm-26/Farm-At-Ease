"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatInterface from '@/components/Chat/ChatInterface';

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
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Farm Assistant Chat
        </h1>
        <ChatInterface />
      </div>
    </div>
  );
}