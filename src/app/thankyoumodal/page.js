'use client';
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Product } from '@/app/data/Product';

const ThankYouModal = ({ onClose, onViewOrders }) => {
  const suggestions = typeof Product !== 'undefined' ? Product.slice(0, 3) : [];
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
       <div className="bg-[#1f2937] border border-cyan-500/30 p-8 rounded-3xl max-w-2xl w-full text-center relative shadow-2xl shadow-cyan-500/20">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500 animate-in zoom-in spin-in-180 duration-500"><CheckCircle className="w-10 h-10 text-green-500" /></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase italic tracking-wider">Order Confirmed!</h2>
          <p className="text-gray-400 mb-8 text-lg">Thank you for your purchase. Your gear is on the way.</p>
          <div className="text-left mb-8 bg-white/5 p-6 rounded-2xl border border-white/5">
             <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">You might also need</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions.map((item) => (
                   <div key={item.id} className="bg-[#111827] p-3 rounded-xl border border-white/10 group cursor-pointer hover:border-cyan-400/50 transition-all">
                      <div className="h-24 w-full bg-gray-800 rounded-lg mb-3 overflow-hidden relative">
                          {item.image && (item.image.includes('http') || item.image.includes('/')) ? <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className={`w-full h-full ${item.image}`}></div>}
                      </div>
                      <p className="text-xs text-gray-300 font-bold truncate">{item.name}</p>
                      <p className="text-white font-bold text-sm mt-1">{item.price}</p>
                   </div>
                ))}
             </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <button onClick={onClose} className="bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all active:scale-95 flex-1">Continue Shopping</button>
             <button onClick={onViewOrders} className="bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white font-bold py-4 px-8 rounded-xl transition-all active:scale-95 flex-1">View My Orders</button>
          </div>
       </div>
    </div>
  );
};
export default ThankYouModal;