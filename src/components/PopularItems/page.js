'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/app/data/Product';
import { getBeastTheme } from '@/components/Beastmode/page';

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
        <div className="space-y-6 mb-16">
            {/* Added theme.text for consistent branding on the heading */}
            <h2 className="text-xl md:text-2xl font-bold italic text-white uppercase">
                Popular <span className={theme.text}>Gear</span>
            </h2>
            <div className="flex w-full h-[300px] md:h-[400px] gap-4">
                {popularProducts.map((item, index) => (
                    <div 
                        key={item.id} 
                        onClick={() => setActiveSlide(index)} 
                        className={`relative rounded-[20px] bg-cover bg-center cursor-pointer transition-[flex] duration-700 ease-in-out group overflow-hidden ${activeSlide === index ? `flex-[5] shadow-2xl border-white/20 border` : 'flex-[1] opacity-60'}`} 
                        style={{ backgroundImage: `url('${item.image}')` }}
                    >
                        {/* Darker overlay to help text pop */}
                        <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 ${activeSlide === index ? 'bg-black/20' : 'group-hover:bg-black/30'}`}></div>
                        
                        <div className={`absolute bottom-0 left-0 p-8 transition-all duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                            {/* Added drop-shadow-md for readability on bright images */}
                            <h3 className="text-white text-3xl font-black italic uppercase drop-shadow-md">{item.name}</h3>
                            <p className="text-white font-bold mb-4 drop-shadow-md">₱{item.price.toLocaleString()}</p>
                            <button 
                                onClick={(e) => {e.stopPropagation(); setSelectedProduct(item);}} 
                                className="bg-white/20 px-4 py-2 rounded-full text-xs font-bold text-white backdrop-blur-md hover:bg-white/40 transition-all"
                            >
                                Quick View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}