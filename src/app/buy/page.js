'use client';
import { ArrowLeft } from 'lucide-react';

// 1. Accept 'onBack' and 'checkoutData' as props
export default function CheckoutView({ onBack, checkoutData }) {

  // Helper to render images safely
  const renderImage = (item) => {
    const img = item.image || "";
    const isImage = img.startsWith('http') || img.startsWith('/') || img.includes('.');
    
    if (isImage) {
        return <img src={img} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-white/10" onError={(e) => {e.target.src="https://placehold.co/100"}} />;
    }
    return <div className={`w-16 h-16 rounded-md border border-white/10 ${img} flex items-center justify-center bg-gray-800`}><span className="text-white/20 font-black text-xs">{item.name?.charAt(0)}</span></div>;
  };

  // 2. Use the prop 'checkoutData' directly (No loading state needed usually, but good safety check)
  if (!checkoutData) return <div className="min-h-screen bg-[#1a1a40] flex items-center justify-center text-white">Loading checkout data...</div>;

  const orderItems = checkoutData.items || [checkoutData]; 
  
  const totalAmount = checkoutData.total || orderItems.reduce((acc, item) => {
     const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
     return acc + (price * (item.quantity || 1));
  }, 0);

  return (
    <div className="w-full min-h-screen bg-[#1a1a40] text-white p-8 flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-2xl border border-cyan-500/30 shadow-2xl">
        <h1 className="text-3xl font-black italic mb-6 text-center">CHECKOUT</h1>
        
        {/* ORDER SUMMARY */}
        <div className="bg-black/20 p-4 rounded-xl mb-6 border border-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
            <h3 className="font-bold text-cyan-400 mb-4 uppercase tracking-widest text-xs sticky top-0 bg-[#151b26] py-2 z-10">Order Summary ({orderItems.length} items)</h3>
            
            <div className="space-y-4">
                {orderItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        {renderImage(item)}
                        <div>
                            <p className="font-bold leading-tight text-sm">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-1">Opt: <span className="text-white">{item.selectedSize || "Default"}</span></p>
                            <p className="text-xs text-gray-400">Qty: <span className="text-white">{item.quantity}</span></p>
                             <p className="text-xs text-cyan-400 mt-1">${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* TOTAL */}
        <div className="mb-6 pt-4 border-t border-gray-600 flex justify-between text-xl font-bold">
            <span>Total to Pay:</span>
            <span className="text-cyan-400">${totalAmount.toFixed(2)}</span>
        </div>

        {/* Payment Form (Visual Only) */}
        <form className="space-y-4 mb-8">
            <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-900 rounded-xl border border-gray-700 text-white focus:border-cyan-500 outline-none" />
            <input type="text" placeholder="Card Number" className="w-full p-3 bg-gray-900 rounded-xl border border-gray-700 text-white focus:border-cyan-500 outline-none" />
            <button type="button" className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)] mt-4 transition-transform active:scale-95">
                PAY ${totalAmount.toFixed(2)}
            </button>
        </form>

        {/* 3. Button calls onBack prop instead of router */}
        <button 
            onClick={onBack} 
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-600 hover:bg-white/10 text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Cancel to Home
        </button>
      </div>
    </div>
  );
}