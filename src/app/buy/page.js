'use client';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1a1a40] text-white p-8 flex flex-col items-center justify-center">
      
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-2xl border border-cyan-500/30 shadow-2xl">
        <h1 className="text-3xl font-black italic mb-6 text-center">CHECKOUT</h1>
        
        <p className="text-gray-400 text-center mb-8">
          This is the buy page. You can add your payment form here.
        </p>

        {/* This button takes you BACK to the homepage */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-600 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>

    </div>
  );
}