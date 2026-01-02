'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '@/app/data/Product';
import { getBeastTheme } from '@/components/Beastmode/page';

// Helper to ensure we only work with numbers (removes $ or other symbols)
const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    const match = price.toString().replace(/[^0-9.]/g, ''); 
    return match ? parseFloat(match) : 0;
};

export default function PopularItems({ isBeastMode, setSelectedProduct }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [popularProducts, setPopularProducts] = useState([]);
    const theme = getBeastTheme(isBeastMode);

    useEffect(() => {
        fetch('http://localhost:3001/api/popular-items')
            .then(res => res.json())
            .then(data => {
                const matched = data.map(dbItem => Product.find(p => p.id === dbItem.product_id)).filter(Boolean);
                setPopularProducts(matched.length > 0 ? matched : Product.slice(0, 5));
            })
            .catch(() => setPopularProducts(Product.slice(0, 5)));
    }, []);

    return (
        <div className="space-y-8 mb-20">
            {/* Added more space above the heading and a decorative accent */}
            <div className="flex items-center gap-4">
                <div className={`h-8 w-2 ${isBeastMode ? 'bg-red-600' : 'bg-cyan-500'} rounded-full`}></div>
                <h2 className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tighter">
                    Popular <span className={theme.text}>Gear</span>
                </h2>
            </div>

            <div className="flex w-full h-[350px] md:h-[450px] gap-4">
                {popularProducts.map((item, index) => {
                    // Logic to fix currency and apply Beast Mode discount (15%)
                    const basePrice = getNumericPrice(item.price);
                    const finalPrice = isBeastMode ? Math.floor(basePrice * 0.85) : basePrice;

                    return (
                        <div 
                            key={item.id} 
                            onClick={() => setActiveSlide(index)} 
                            className={`relative rounded-[32px] bg-cover bg-center cursor-pointer transition-all duration-700 ease-in-out group overflow-hidden ${
                                activeSlide === index 
                                ? `flex-[5] shadow-2xl border-2 ${isBeastMode ? 'border-red-500/50' : 'border-cyan-400/50'}` 
                                : 'flex-[1] opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                            }`} 
                            style={{ backgroundImage: `url('${item.image}')` }}
                        >
                            {/* Overlay for readability */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}></div>
                            
                            <div className={`absolute bottom-0 left-0 p-10 w-full transition-all duration-500 ${activeSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-white text-3xl md:text-5xl font-black italic uppercase tracking-tighter drop-shadow-2xl mb-2">
                                    {item.name}
                                </h3>
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <p className={`text-2xl font-black ${isBeastMode ? 'text-red-500' : 'text-cyan-400'} drop-shadow-md`}>
                                        ₱{finalPrice.toLocaleString()}
                                    </p>
                                    {isBeastMode && (
                                        <p className="text-gray-500 line-through text-sm font-bold">
                                            ₱{basePrice.toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                <button 
                                    onClick={(e) => {e.stopPropagation(); setSelectedProduct(item);}} 
                                    className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest backdrop-blur-md transition-all border-2 ${
                                        isBeastMode 
                                        ? 'bg-red-600/20 border-red-600 text-white hover:bg-red-600' 
                                        : 'bg-cyan-500/20 border-cyan-400 text-white hover:bg-cyan-500'
                                    }`}
                                >
                                    Quick View
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}