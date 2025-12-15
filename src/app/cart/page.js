'use client';

import React from 'react';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';

// Helper to clean price strings
const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    const basePriceStr = price.split('-')[0];
    const cleanString = basePriceStr.replace(/[^0-9.]/g, '');
    return parseFloat(cleanString) || 0;
  }
  return 0;
};

const CartPage = ({ onBack, cartItems, onRemoveItem, onCheckout }) => {
  const items = cartItems || [];
  
  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => {
    const price = parsePrice(item.price);
    const qty = item.quantity || 1;
    return acc + (price * qty);
  }, 0);

  const renderCartImage = (item) => {
    const img = item.image || "";
    const isImage = img.startsWith('http') || img.startsWith('/') || img.includes('.');

    if (isImage) {
      return (
        <img 
          src={img} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200?text=No+Image"; }}
        />
      );
    } else {
      return (
        <div className={`w-full h-full rounded-xl ${img} flex items-center justify-center`}>
            <span className="text-xs font-black text-white/20 italic">{item.name?.charAt(0)}</span>
        </div>
      );
    }
  };

  // --- TRIGGER CHECKOUT TO PARENT ---
  const handleCheckoutClick = () => {
    if (items.length === 0) return;

    // Send cart data back to the Homepage
    if (onCheckout) {
        onCheckout({
            items: items,
            total: subtotal
        });
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center pt-10 text-center space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="bg-white/5 p-6 rounded-full shadow-lg shadow-cyan-500/10">
        <ShoppingCart className="w-12 h-12 text-cyan-400" />
      </div>
      <h2 className="text-4xl md:text-3xl 2xl:text-5xl font-bold">Your Cart</h2>
      
      {items.length === 0 ? (
        <div className="text-4xl md:text-6xl lg:text-8xl text-gray-500 font-bold leading-tight py-10">
           <p>Your cart is currently empty.</p>
        </div>
      ) : (
        <>
            <p className="text-gray-400 max-w-md">You have {items.length} items in your cart ready for checkout.</p>
            
            <div className="w-full max-w-2xl bg-white/5 rounded-2xl p-6 text-left border border-white/10 max-h-[400px] overflow-y-auto custom-scrollbar">
                {items.map((item, index) => {
                   const itemPrice = parsePrice(item.price);
                   const itemTotal = itemPrice * (item.quantity || 1);

                   return (
                    <div key={`${item.id}-${index}`} className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
                        <div className="w-20 h-20 shrink-0 bg-gray-800 rounded-xl relative">
                            {renderCartImage(item)}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
                                <button onClick={() => onRemoveItem(index)} className="text-gray-500 hover:text-red-400 transition-colors p-1">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                                <span className="bg-white/10 px-2 py-0.5 rounded text-xs border border-white/10">
                                    Qty: <b className="text-white">{item.quantity || 1}</b>
                                </span>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-sm text-cyan-400 font-mono">${itemPrice.toFixed(2)}</p>
                                <p className="font-bold text-white">${itemTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                   );
                })}
            </div>

            <div className="w-full max-w-2xl flex justify-between items-center px-4 pt-4 border-t border-white/10">
                 <span className="text-white-400">Subtotal</span>
                 <span className="text-3xl font-bold text-cyan-400">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl pt-4">
                {onBack && (
                  <button onClick={onBack} className="text-gray-400 hover:text-white hover:underline flex items-center justify-center gap-2 mx-auto text-sm group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Continue Shopping
                  </button>
                )}
                
                {/* THIS BUTTON TRIGGERS THE POPUP LOGIC */}
                <button 
                    onClick={handleCheckoutClick}
                    className="flex-1 bg-cyan-500 text-[#1a1a40] font-bold py-4 px-8 rounded-xl hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  Proceed to Checkout
                </button>
            </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
