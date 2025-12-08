'use client';
import React, { useState } from 'react';
import Topbar from '@/components/Topbar';
import { Product } from '@/app/data/Product';
import CartPage from '@/app/cart/page';
import { ArrowLeft, ShoppingCart, Star, X } from 'lucide-react';

// --- QUICK VIEW MODAL COMPONENT ---
const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  // 1. DYNAMIC SIZES: Read from product data or default to empty
  const sizes = product.sizes || [];
  
  // 2. STATE: Default to the first available size option if it exists
  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({ 
      ...product, 
      selectedSize,
      quantity 
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-[#1e293b] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 hover:bg-white/10 p-1 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8 relative">
           <span className="absolute text-white/5 text-6xl font-black uppercase -rotate-12 select-none">{product.category || "GYM"}</span>
           <div className={`w-full h-64 md:h-full ${product.image?.includes('http') ? '' : product.image} bg-contain bg-center bg-no-repeat relative z-10`} style={product.image?.includes('http') ? { backgroundImage: `url(${product.image})` } : {}}></div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-left">
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">{product.category || "Equipment"}</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">{product.name}</h2>
          
          <div className="flex items-center gap-2 mb-6 text-yellow-400">
             <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-600"}`} />))}</div>
             <span className="text-gray-300 text-sm ml-2">({product.rating} Reviews)</span>
          </div>
          
          <p className="text-gray-300 text-base leading-relaxed mb-8">{product.description || "Take your workout to the next level with this premium equipment."}</p>
          
          <div className="flex items-end gap-4 mb-8 border-b border-gray-700 pb-8">
             <span className="text-4xl font-bold text-white">{product.price}</span>
             <span className="text-gray-500 line-through mb-1 text-lg">${Math.floor(parseInt(product.price.replace(/\D/g,'') || 100) * 1.2)}</span>
          </div>

          <div className="flex flex-col gap-6 mb-8">
            
            {/* 3. DYNAMIC OPTIONS RENDER: Only show if sizes exist */}
            {sizes.length > 0 && (
              <div>
                <span className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-3 block">
                  Select Option
                </span>
                <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                        <button 
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-3 rounded-lg font-bold border transition-all text-sm ${
                                selectedSize === size 
                                ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                                : "bg-transparent text-gray-400 border-gray-600 hover:border-white hover:text-white"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
                <span className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-3 block">Quantity</span>
                <div className="flex items-center bg-[#111827] rounded-lg w-fit border border-gray-700">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-xl font-bold"
                    >-</button>
                    <span className="px-4 text-white font-mono text-lg w-12 text-center">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-xl font-bold"
                    >+</button>
                </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={handleAddToCart} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all active:scale-95">BUY NOW</button>
            <button onClick={handleAddToCart} className="w-full bg-transparent border border-gray-600 hover:border-white text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-white/5">
               <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN HOMEPAGE ---
export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); 
 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  

  // dito yung Checking ng ID AND Sizes para ma check kung kg ba flavor or etc
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {

      const isMatch = (item) => 
        item.id === productToAdd.id && item.selectedSize === productToAdd.selectedSize;

      const existingItem = prevItems.find(isMatch);
      
      if (existingItem) {
        return prevItems.map((item) =>
          isMatch(item)
            ? { ...item, quantity: (item.quantity || 1) + (productToAdd.quantity || 1) }
            : item
        );
      } else {
        return [...prevItems, { 
          ...productToAdd, 
          // Default quantity to 1 if coming from the card "Quick Add" button
          quantity: productToAdd.quantity || 1,
          // Default size to first option if coming from card "Quick Add" button
          selectedSize: productToAdd.selectedSize || (productToAdd.sizes ? productToAdd.sizes[0] : null) 
        }];
      }
    });
    setSelectedProduct(null);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const categories = ["All", "Strength", "Cardio", "Accessories", "Recovery"];

  const filteredProducts = Product.filter(item => {
    const matchesCategory = selectedCategory === "All" ? true : item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[#1a1a40] to-[#22d3ee] text-white overflow-y-auto overflow-x-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart} 
        />
      )}

      <div className="py-4 text-white">
        <Topbar 
          onCartClick={() => setCurrentView("cart")}
          onHomeClick={() => setCurrentView("home")}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
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
             <CartPage cartItems={cartItems} onRemoveItem={removeFromCart} />
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
                          <button 
                             onClick={() => setSelectedProduct(item)} 
                             className="bg-white text-black text-xs 2xl:text-base font-bold px-3 py-1 2xl:px-5 2xl:py-2 rounded-full cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors"
                          >
                            Quick View
                          </button>
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
                          
                          <button 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                addToCart(item);
                            }}
                            className="bg-white/10 hover:bg-cyan-500 hover:text-[#1a1a40] p-2 2xl:p-3 rounded-lg transition-colors"
                          >
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