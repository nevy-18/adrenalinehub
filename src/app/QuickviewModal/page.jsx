'use client';
import React, { useState } from 'react';
import { X, Star, ShoppingCart, Scale } from 'lucide-react';

// --- HELPERS ---
const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    const match = price.toString().match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
};

const calculateFinalPrice = (originalPrice, isBeastMode) => {
    const num = getNumericPrice(originalPrice);
    return isBeastMode ? Math.floor(num * 0.85) : num;
};

const QuickViewModal = ({ product, onClose, onAddToCart, onBuyNow, compareList, toggleCompare, onOpenCompare, isBeastMode }) => {
  if (!product) return null;
  
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0] : null);
  const [quantity, setQuantity] = useState(1);
  
  // Theme vars
  const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
  const btnColor = isBeastMode ? "bg-red-600 hover:bg-red-500" : "bg-cyan-500 hover:bg-cyan-400";

  // Compare Logic
  const isComparing = compareList.some(p => p.id === product.id);

  const parsePrice = (priceInput) => { if (priceInput === undefined || priceInput === null) return 0; if (typeof priceInput === 'number') return priceInput; const match = priceInput.toString().match(/(\d+)/); return match ? parseInt(match[0]) : 0; };
  
  // Calculate Prices
  const currentPrice = selectedVariant && selectedVariant.price !== undefined ? parsePrice(selectedVariant.price) : parsePrice(product.price);
  const finalPrice = calculateFinalPrice(currentPrice, isBeastMode);
  const originalPrice = Math.floor(currentPrice * 1.2);
  
  const currentImage = selectedVariant?.image || product.image;
  const isUrl = (str) => str && (str.includes('http') || str.includes('/') || str.includes('.'));

  // Handlers
  const handleAddToCart = () => { onAddToCart({ ...product, price: finalPrice, image: currentImage, selectedSize: selectedVariant ? selectedVariant.name : "One Size", quantity }); onClose(); };
  const handleBuy = () => { onBuyNow({ id: Math.floor(Math.random() * 10000).toString(), items: product.name, price: finalPrice * quantity, image: currentImage, selectedSize: selectedVariant ? selectedVariant.name : "One Size", quantity: quantity, date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' }), status: "Processing", deliveryDate: "Pending" }); onClose(); };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`relative bg-[#1e293b] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border ${isBeastMode ? 'border-red-500/30' : 'border-cyan-500/30'} animate-in fade-in zoom-in-95 duration-200`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 hover:bg-white/10 p-1 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        
        {/* IMAGE SIDE */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8 relative overflow-hidden group">
           <span className="absolute text-white/5 text-6xl font-black uppercase -rotate-12 select-none z-0">{product.category || "GYM"}</span>
           <div className="relative z-10 w-full h-64 md:h-full flex items-center justify-center transition-all duration-500">
              {isUrl(currentImage) ? <img key={currentImage} src={currentImage} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in zoom-in-90 duration-300" /> : <div className={`w-full h-full ${currentImage} bg-contain bg-center bg-no-repeat`}></div>}
           </div>
        </div>

        {/* DETAILS SIDE */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-left bg-[#1e293b]">
          <span className={`${themeColor} text-sm font-bold tracking-widest uppercase mb-2`}>{product.category || "Equipment"}</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4 text-yellow-400"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-600"}`} />)}</div><span className="text-gray-300 text-sm ml-2">({product.rating} Reviews)</span></div>
          <p className="text-gray-300 text-base leading-relaxed mb-6">{product.description || "Take your workout to the next level with this premium equipment."}</p>
          
          {variants.length > 0 && (
            <div className="mb-6"><p className="text-gray-400 text-xs font-bold uppercase mb-3">Select Option:</p><div className="flex flex-wrap gap-2">{variants.map((variant, idx) => <button key={idx} onClick={() => setSelectedVariant(variant)} className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${selectedVariant === variant ? `${isBeastMode ? 'bg-red-500 border-red-500' : 'bg-cyan-500 border-cyan-500'} text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]` : "bg-transparent text-gray-300 border-gray-600 hover:border-white"}`}>{variant.name}</button>)}</div></div>
          )}
          
          <div className="flex items-end gap-4 mb-8 border-b border-gray-700 pb-8">
              <span key={finalPrice} className={`text-4xl font-bold ${isBeastMode ? 'text-red-500 animate-pulse' : 'text-white'}`}>${finalPrice}</span>
              <span className="text-gray-500 line-through mb-1 text-lg">${originalPrice}</span>
          </div>
          
          <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                  <div className="flex items-center bg-[#111827] rounded-xl border border-gray-700 px-2"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-full text-gray-400 hover:text-white font-bold">-</button><span className="w-8 text-center text-white font-bold">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="w-8 h-full text-gray-400 hover:text-white font-bold">+</button></div>
                  <button onClick={handleBuy} className={`flex-1 ${btnColor} text-[#1a1a40] font-bold text-lg py-3 rounded-xl shadow-lg transition-all active:scale-95`}>BUY NOW</button>
              </div>
              <button onClick={handleAddToCart} className="w-full bg-transparent border border-gray-600 hover:border-white text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-white/5"><ShoppingCart className="w-5 h-5" /> Add to Cart</button>
              
              {/* --- COMPARE BUTTON (INSIDE MODAL) --- */}
              <button 
                onClick={() => { onClose(); onOpenCompare(product.id); }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-all ${isComparing ? (isBeastMode ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-cyan-500/20 border-cyan-500 text-cyan-400') : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
              >
                  <Scale className="w-4 h-4" /> Compare with other items
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;