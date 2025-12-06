'use client';
import React, { useState } from 'react';
import Topbar from '@/components/Topbar';
import { Product } from '@/app/data/Product';
import CartPage from '@/app/cart/page';
const ArrowLeft = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

const ShoppingCart = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);
const Star = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); 

  const categories = ["All", "Strength", "Cardio", "Accessories", "Recovery"];

  const filteredProducts = selectedCategory === "All" 
    ? Product 
    : Product.filter(item => item.category === selectedCategory);

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[#1a1a40] to-[#22d3ee] text-white overflow-y-auto overflow-x-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      <div className="py-4 text-white">
        <Topbar 
          onCartClick={() => setCurrentView("cart")}
          onHomeClick={() => setCurrentView("home")}
        />
      </div>
      
      <main className="pt-20 md:pt-24 2xl:pt-32 pb-10 px-4 md:px-8 2xl:px-16 max-w-[2000px] mx-auto space-y-10 2xl:space-y-20">
        
        {currentView === 'cart' ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
             <button 
                onClick={() => setCurrentView('home')}
                className="text-xl md:text-2xl 2xl:text-4xl flex items-center gap-2 text-cyan-400 hover:text-white mb-6 transition-colors"
             >
                <ArrowLeft className=" w-5 h-5" />
                Back to Shop
             </button>
             <CartPage />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            {/* HERO SECTION */}
            <div className="relative w-full h-[200px] md:h-[400px] 2xl:h-[600px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 animate-gradient-x"></div>
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 2xl:px-24">
                <span className="text-cyan-400 font-bold tracking-widest text-sm md:text-lg 2xl:text-2xl mb-2">HEAVY DUTY GEAR</span>
                <h1 className="text-4xl md:text-6xl 2xl:text-8xl font-black italic mb-4 2xl:mb-8 drop-shadow-lg leading-tight py-4 pr-8">
                  BUILD YOUR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white pb-4 pr-4">DREAM GYM</span>
                </h1>
                <button className="w-fit bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] font-bold py-2 px-6 md:py-3 md:px-8 2xl:py-5 2xl:px-12 2xl:text-2xl rounded-full transition-transform active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]">
                  Shop Equipment
                </button>
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="space-y-4 2xl:space-y-8 mt-10">
              <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">Browse by Category</h2>
              <div className="flex gap-4 2xl:gap-8 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((cat, index) => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 2xl:px-10 2xl:py-4 2xl:text-xl rounded-full border whitespace-nowrap transition-all ${
                      selectedCategory === cat 
                      ? "bg-white text-[#1a1a40] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-105" 
                      : "bg-transparent border-white/30 hover:border-cyan-400 hover:text-cyan-400 text-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="space-y-4 2xl:space-y-8 mt-10">
              <div className="flex justify-between items-end">
                <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">
                  {selectedCategory === "All" ? "Best Sellers" : `${selectedCategory} Equipment`}
                </h2>
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="text-cyan-400 text-sm 2xl:text-xl hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 2xl:gap-8">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <div key={item.id} className="bg-[#1f2937]/60 backdrop-blur-sm rounded-2xl p-3 md:p-4 2xl:p-6 border border-white/10 hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300 group shadow-lg flex flex-col justify-between">
                      <div className={`w-full aspect-square ${item.image} rounded-xl mb-3 2xl:mb-5 relative overflow-hidden flex items-center justify-center`}>
                        <span className="text-white/20 font-black italic text-xl 2xl:text-3xl uppercase -rotate-12 select-none">{item.name.split(" ")[0]}</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <span className="bg-white text-black text-xs 2xl:text-base font-bold px-3 py-1 2xl:px-5 2xl:py-2 rounded-full cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors">Quick View</span>
                        </div>
                      </div>

                      <div className="space-y-1 2xl:space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm md:text-base 2xl:text-xl truncate w-3/4">{item.name}</h3>
                          <div className="flex items-center text-yellow-400 text-xs 2xl:text-base">
                            <Star className="w-3 h-3 2xl:w-5 2xl:h-5 fill-current" />
                            <span className="ml-1">{item.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs 2xl:text-sm">Pro Equipment</p>
                        <div className="flex justify-between items-center mt-2 2xl:mt-4">
                          <span className="text-cyan-400 font-bold text-lg 2xl:text-2xl">{item.price}</span>
                          <button className="bg-white/10 hover:bg-cyan-500 hover:text-[#1a1a40] p-2 2xl:p-3 rounded-lg transition-colors">
                            <ShoppingCart className="w-4 h-4 2xl:w-6 2xl:h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-10 italic">
                    No products found in this category.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}