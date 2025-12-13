'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/Topbar';
import { Product } from '@/app/data/Product';
import CartPage from '@/app/cart/page';
import { ArrowLeft, ShoppingCart, Star, X, Package, Heart, Settings, LogOut, User, ChevronRight } from 'lucide-react';

// --- QUICK VIEW MODAL COMPONENT ---
const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const router = useRouter(); 

  if (!product) return null;

  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0] : null);
  const [quantity, setQuantity] = useState(1);

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    const match = priceStr.match(/(\d+)/); 
    return match ? parseInt(match[0]) : 0;
  };

  const currentPrice = selectedVariant ? selectedVariant.price : parsePrice(product.price);
  const originalPrice = Math.floor(currentPrice * 1.2);

  const handleAddToCart = () => {
    onAddToCart({ 
      ...product, 
      price: currentPrice, 
      selectedSize: selectedVariant ? selectedVariant.name : "One Size",
      quantity 
    });
    onClose();
  };

  const handleBuyNow = () => {
   const buyData = {
        id: product.id,
        name: product.name,
        price: currentPrice,
        image: product.image,
        selectedSize: selectedVariant ? selectedVariant.name : "One Size",
        quantity: quantity
      };
    const queryString = new URLSearchParams(buyData).toString();
    router.push(`/buy?${queryString}`);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-[#1e293b] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 hover:bg-white/10 p-1 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
        {/* Image Section */}
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
             <span className="text-4xl font-bold text-white">${currentPrice}</span>
             <span className="text-gray-500 line-through mb-1 text-lg">${originalPrice}</span>
          </div>
          <div className="flex flex-col gap-6 mb-8">
            {variants.length > 0 && (
              <div>
                <span className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-3 block">Select Option</span>
                <div className="flex flex-wrap gap-3">
                    {variants.map((variant, index) => (
                        <button 
                            key={index}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-3 rounded-lg font-bold border transition-all text-sm ${
                                selectedVariant && selectedVariant.name === variant.name
                                ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                                : "bg-transparent text-gray-400 border-gray-600 hover:border-white hover:text-white"
                            }`}
                        >
                            {variant.name}
                        </button>
                    ))}
                </div>
              </div>
            )}
            <div>
                <span className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-3 block">Quantity</span>
                <div className="flex items-center bg-[#111827] rounded-lg w-fit border border-gray-700">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-xl font-bold">-</button>
                    <span className="px-4 text-white font-mono text-lg w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-xl font-bold">+</button>
                </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={handleBuyNow} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all active:scale-95">BUY NOW</button>
            <button onClick={handleAddToCart} className="w-full bg-transparent border border-gray-600 hover:border-white text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-white/5">
               <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- USER PROFILE COMPONENT ---
const UserProfile = ({ onBack, username, onLogout }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="text-xl md:text-2xl flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Shop
      </button>

      <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
           <span className="text-4xl font-black text-[#1a1a40]">{username ? username.charAt(0).toUpperCase() : "U"}</span>
        </div>
        <div className="text-center md:text-left space-y-2">
           <h1 className="text-4xl font-bold text-white">{username || "Guest User"}</h1>
           <p className="text-gray-400">Member since 2024 • Pro Athlete</p>
           <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition-all mt-2">
             Edit Profile
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Package, label: "My Orders", desc: "Track active shipments" },
          { icon: Settings, label: "Settings", desc: "Account preferences" },
          { icon: LogOut, label: "Log Out", desc: "Sign out of account", color: "text-red-400" },
        ].map((item, idx) => (
          <button 
            key={idx} 
            onClick={() => {
                if (item.label === "Log Out") {
                    onLogout(); 
                } else {
                    console.log(`Clicked ${item.label}`);
                }
            }} 
            className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-cyan-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6"
          >
             <div className={`p-4 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 ${item.color || "text-cyan-400"}`}>
               <item.icon className="w-8 h-8" />
             </div>
             <div>
               <h3 className={`text-xl font-bold ${item.color || "text-white"}`}>{item.label}</h3>
               <p className="text-gray-400 text-sm">{item.desc}</p>
             </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MAIN HOMEPAGE ---
export default function Homepage({ onLogout, username }) {
  const router = useRouter(); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Data for the expanding cards (Popular Items)
  const popularItemsSlides = [
    {
        id: 1,
        title: "HEAVY DUTY",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
    },
    {
        id: 2,
        title: "PERFORMANCE",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "ESSENTIALS",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "CARDIO",
        image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "RECOVERY",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop"
    }
  ];

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
          quantity: productToAdd.quantity || 1,
          selectedSize: productToAdd.selectedSize || "One Size"
        }];
      }
    });
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
          onAddToCart={(item) => {
             addToCart(item);
             setSelectedProduct(null);
          }} 
        />
      )}

      <div className="py-4 text-white">
        <Topbar 
          onCartClick={() => setCurrentView("cart")}
          onHomeClick={() => setCurrentView("home")}
          onUserClick={() => setCurrentView("user")} 
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        />
      </div>
      
      <main className="pt-20 md:pt-24 2xl:pt-32 pb-10 px-4 md:px-8 2xl:px-16 max-w-[2000px] mx-auto space-y-10 2xl:space-y-20">
        
        {/* VIEW 1: CART PAGE */}
        {currentView === 'cart' && (
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
        )}

        {/* VIEW 2: USER PROFILE PAGE */}
        {currentView === 'user' && (
           <UserProfile 
              onBack={() => setCurrentView("home")}
              onLogout={onLogout}
              username={username}
           />
        )}

        {/* VIEW 3: HOME PAGE */}
        {currentView === 'home' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            
            {/* 1. STATIC HERO BANNER (TOP) */}
            <div className="relative w-full h-[250px] md:h-[400px] 2xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-cyan-500/20 bg-gradient-to-r from-blue-900 to-cyan-900 flex items-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
                
                {/* Content Layer */}
                <div className="relative z-10 px-8 md:px-16 2xl:px-32 w-full max-w-4xl">
                    <h3 className="text-cyan-400 font-bold tracking-widest text-sm md:text-lg 2xl:text-2xl mb-2 uppercase">
                        Heavy Duty Gear
                    </h3>
                    <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-black italic mb-6 leading-none tracking-tighter">
                        BUILD YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                            DREAM GYM
                        </span>
                    </h1>
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all hover:scale-105">
                        Shop Equipment
                    </button>
                </div>
            </div>

            {/* 2. EXPANDING CARDS (MIDDLE - Labeled Popular Items) */}
            <div className="mt-16">
               <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide mb-6">Popular Items</h2>
               
               {/* Flex Container for Animation */}
               <div className="flex w-full h-[400px] gap-2 md:gap-4">
                  {popularItemsSlides.map((slide) => (
                    <div
                      key={slide.id}
                      // flex-1 is default (collapsed). hover:flex-[5] expands it.
                      className="relative flex-1 rounded-[20px] bg-cover bg-center cursor-pointer transition-[flex] duration-500 ease-in-out hover:flex-[5] group overflow-hidden" 
                      style={{ backgroundImage: `url('${slide.image}')` }}
                    >
                        {/* Overlay to darken background for text readability */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Text that appears on hover/always visible but styled */}
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-nowrap">
                            <h3 className="text-white text-3xl font-black italic uppercase shadow-black drop-shadow-lg">{slide.title}</h3>
                            <div className="w-12 h-1 bg-cyan-400 mt-2"></div>
                        </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 3. CATEGORY FILTERS & PRODUCT GRID (BOTTOM) */}
            <div className="space-y-4 2xl:space-y-8 mt-16">
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
                      <div className={`w-full aspect-square rounded-xl mb-3 2xl:mb-5 relative overflow-hidden flex items-center justify-center bg-gray-800`}>
  
  {/* LOGIC CHECK: Is it an image file OR a CSS gradient? */}
  {item.image.startsWith('/') || item.image.includes('.') ? (
      /* If it is a file path, render an actual IMG tag */
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-full object-cover absolute inset-0"
      />
  ) : (
      /* If it is a CSS gradient (like your accessories), render it as a background DIV */
      <div className={`w-full h-full absolute inset-0 ${item.image}`}></div>
  )}

  {/* Keep your text overlay (optional, maybe hide it if there is a real image) */}
  <span className="text-white/20 font-black italic text-xl 2xl:text-3xl uppercase -rotate-12 select-none z-0 relative">
     {item.name.split(" ")[0]}
  </span>

  {/* Keep your hover overlay buttons exactly as they were */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 z-10">
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
                                if (item.variants && item.variants.length > 0) {
                                    setSelectedProduct(item);
                                } else {
                                    const priceStr = item.price.toString();
                                    const match = priceStr.match(/(\d+)/); 
                                    const safePrice = match ? parseInt(match[0]) : 0;

                                    addToCart({
                                        ...item,
                                        price: safePrice,
                                    });
                                }
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