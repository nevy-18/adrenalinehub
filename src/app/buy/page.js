'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BuyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Read data from URL
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const quantity = searchParams.get('quantity');
    const size = searchParams.get('selectedSize');
   

    if (id && name) {
      setProduct({ id, name, price, quantity, size });
    }
  }, [searchParams]);

  if (!product) return <div className="p-10 text-white">Loading checkout...</div>;

  return (
    <div className="min-h-screen bg-[#1a1a40] text-white p-8 flex flex-col items-center">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-2xl border border-cyan-500/30">
        <h1 className="text-3xl font-black italic mb-6">CHECKOUT</h1>
        
        {/* ORDER SUMMARY */}
        <div className="bg-black/20 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-cyan-400 mb-2">Order Summary</h3>
            <p className="text-xl font-bold">{product.name}</p>
            <p className="text-sm text-gray-400">Size: {product.size}</p>
            <p className="text-sm text-gray-400">Qty: {product.quantity}</p>
            <div className="mt-4 pt-4 border-t border-gray-600 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${parseInt(product.price) * parseInt(product.quantity)}</span>
            </div>
        </div>

        {/* Payment Form Placeholder */}
        <form className="space-y-4 mb-8">
            <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-900 rounded border border-gray-700" />
            <input type="text" placeholder="Card Number" className="w-full p-3 bg-gray-900 rounded border border-gray-700" />
            <button type="button" className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl">
                PAY NOW
            </button>
        </form>

        <button 
          onClick={() => router.back()} 
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-600 hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
          Cancel
        </button>
      </div>
    </div>
  );
}