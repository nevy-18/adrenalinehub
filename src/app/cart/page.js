'use client';

import React from 'react';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';

const CartPage = ({ onBack, cartItems, onRemoveItem }) => {

  const items = cartItems || [];
  const subtotal = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  


  return (
    <div className="min-h-[60vh] flex flex-col items-center pt-10 text-center space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="bg-white/5 p-6 rounded-full shadow-lg shadow-cyan-500/10">
        <ShoppingCart className="w-12 h-12 text-cyan-400" />
      </div>
      <h2 className="text-4xl md:text-3xl 2xl:text-5xl font-bold">Your Cart</h2>
      
      {items.length === 0 ? (
            <div className="text-4xl md:text-6xl lg:text-8xl text-gray-500 font-bold leading-tight">
           <p>Your cart is currently empty.</p>
        </div>
      ) : (
        <>
            <p className="text-gray-400 max-w-md">You have {items.length} items in your cart ready for checkout.</p>
            
            <div className="w-full max-w-2xl bg-white/5 rounded-2xl p-6 text-left border border-white/10 max-h-[400px] overflow-y-auto">
                {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
                    <div className={`w-16 h-16 ${item.image || 'bg-gray-700'} rounded-lg shrink-0 flex items-center justify-center`}>
                        <span className="text-xs font-black text-white/30 italic">{item.name?.charAt(0)}</span>
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <p className="font-bold text-lg">{item.name}</p>
                            <button 
                                onClick={() => onRemoveItem(index)}
                                className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                title="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="text-sm text-cyan-400">${item.price}</p>
                    </div>
                </div>
                ))}
            </div>

            <div className="w-full max-w-2xl flex justify-between items-center px-4">
                 <span className="text-gray-400">Subtotal</span>
                 <span className="text-2xl font-bold text-white">${subtotal}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
                <button 
                  onClick={onBack}
                  className="text-cyan-400 hover:text-white underline flex items-center justify-center gap-2 mx-auto"
                >
                  <ArrowLeft size={16} className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Continue Shopping
                </button>
                <button className="flex-1 bg-cyan-500 text-[#1a1a40] font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  Proceed to Checkout
                </button>
            </div>
        </>
      )}
    </div>
  );
};

export default CartPage;