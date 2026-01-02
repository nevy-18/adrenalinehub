'use client';
import { ArrowLeft, CheckCircle, X, Activity } from 'lucide-react';
import { useState } from 'react';

export default function CheckoutView({ onBack, checkoutData, onConfirmOrder }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const renderImage = (item) => {
    const img = item.image || "";
    const isImage = img.startsWith('http') || img.startsWith('/') || img.includes('.');
    if (isImage) {
        return <img src={img} alt={item.name} className="w-12 h-12 object-cover rounded-md border border-white/10" onError={(e) => {e.target.src="https://placehold.co/100"}} />;
    }
    return <div className={`w-12 h-12 rounded-md border border-white/10 ${img} flex items-center justify-center bg-gray-800`}><span className="text-white/20 font-black text-xs">{item.name?.charAt(0)}</span></div>;
  };

  if (!checkoutData) return null;

  const orderItems = checkoutData.items ? checkoutData.items : [checkoutData];
  
  const totalAmount = orderItems.reduce((acc, item) => {
      let price = item.price;
      // Robust regex to remove any non-numeric characters (including ₱ or $)
      if (typeof price === 'string') price = parseFloat(price.replace(/[^0-9.]/g, ''));
      return acc + (price * (item.quantity || 1));
  }, 0);

  const handlePayment = (e) => {
      e.preventDefault();
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          onConfirmOrder(); 
      }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={onBack}></div>

      <div className="relative bg-[#1e293b] w-full max-w-md p-8 rounded-3xl border border-cyan-500/30 shadow-2xl animate-in zoom-in-95 duration-200">
        <button onClick={onBack} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
        </button>

        <h1 className="text-2xl font-black italic mb-6 text-center text-white flex items-center justify-center gap-2">
            CHECKOUT <span className="text-cyan-400 text-sm not-italic font-normal bg-cyan-400/10 px-2 py-1 rounded">Secure</span>
        </h1>
        
        <div className="bg-[#0f172a]/60 p-4 rounded-xl mb-6 border border-white/5 max-h-[200px] overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
                {orderItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        {renderImage(item)}
                        <div className="flex-1">
                            <p className="font-bold leading-tight text-sm text-white truncate">{item.name}</p>
                            <div className="flex justify-between mt-1">
                                <p className="text-xs text-gray-400">Qty: {item.quantity || 1}</p>
                                {/* Currency changed to ₱ */}
                                <p className="text-xs text-cyan-400 font-bold">₱{item.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="mb-6 flex justify-between items-end border-b border-white/10 pb-4">
            <span className="text-gray-400 text-sm font-bold uppercase">Total Due</span>
            {/* Currency changed to ₱ */}
            <span className="text-3xl font-black text-white">₱{totalAmount.toLocaleString()}</span>
        </div>

        <form onSubmit={handlePayment} className="space-y-3 mb-6">
            <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Cardholder Name</label>
                <input required type="text" placeholder="Juan Dela Cruz" className="w-full p-3 bg-gray-900 rounded-xl border border-gray-700 text-white focus:border-cyan-500 outline-none transition-colors text-sm" />
            </div>
            <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Card Number</label>
                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 bg-gray-900 rounded-xl border border-gray-700 text-white focus:border-cyan-500 outline-none transition-colors text-sm" />
            </div>
            <div className="flex gap-3">
                <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Expiry</label>
                    <input required type="text" placeholder="MM/YY" className="w-full p-3 bg-gray-900 rounded-xl border border-gray-700 text-white focus:border-cyan-500 outline-none text-sm" />
                </div>
                <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">CVC</label>
                    <input required type="text" placeholder="123" className="w-full p-3 bg-gray-900 rounded-xl border border-gray-700 text-white focus:border-cyan-500 outline-none text-sm" />
                </div>
            </div>
            
            <button 
                disabled={isProcessing}
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-400 text-[#0f172a] font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] mt-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg"
            >
                {isProcessing ? <Activity className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                {/* Currency changed to ₱ */}
                {isProcessing ? "Processing..." : `CONFIRM PAYMENT (₱${totalAmount.toLocaleString()})`}
            </button>
        </form>

        <button type="button" onClick={onBack} className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="w-3 h-3" /> Cancel Transaction
        </button>
      </div>
    </div>
  );
}