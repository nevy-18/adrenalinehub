'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/app/data/Product';
import { ArrowLeft, ShoppingCart, Star, X, Shield, Activity, CheckCircle, Scale } from 'lucide-react';

import Topbar from '@/components/Topbar';
import CartPage from '../cart/page';
import AdminDashboard from '../admindashboard/page';
import UserProfile from '../user/page';

// --- NEW IMPORTS ---
import { SelectionModal, CompareResultModal, FloatingCompareButton } from '@/components/Comparemodule/page';
import { BeastModeToggle, getBeastTheme } from '@/components/Beastmode/page';

// --- HELPER: PRICE CALCULATION ---
const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    const match = price.toString().match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
};

const calculateFinalPrice = (originalPrice, isBeastMode) => {
    const num = getNumericPrice(originalPrice);
    return isBeastMode ? Math.floor(num * 0.85) : num; // 15% Discount
};

// ==========================================
// 1. THANK YOU MODAL
// ==========================================
const ThankYouModal = ({ onClose, onViewOrders, isBeastMode, pointsEarned }) => {
    const theme = getBeastTheme(isBeastMode);
    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
             <div className={`bg-[#1f2937] border ${theme.border} ${theme.shadow} p-8 rounded-3xl max-w-2xl w-full text-center relative shadow-2xl`}>
                <div className="flex justify-center mb-6"><CheckCircle className="w-20 h-20 text-green-500" /></div>
                <h2 className="text-3xl font-black text-white mb-2 uppercase italic">Order Confirmed!</h2>
                <p className="text-gray-400 mb-8 text-lg">Thank you. You earned <span className={`${theme.text} font-bold text-2xl`}>+{pointsEarned} AP</span>!</p>
                <div className="flex gap-4 justify-center">
                   <button onClick={onClose} className={`${theme.button} text-[#1a1a40] font-bold py-4 px-8 rounded-xl flex-1`}>Continue Shopping</button>
                   <button onClick={onViewOrders} className="bg-transparent border border-gray-600 text-gray-300 hover:text-white font-bold py-4 px-8 rounded-xl flex-1">View Orders</button>
                </div>
             </div>
        </div>
    );
};

// ==========================================
// 2. QUICK VIEW MODAL
// ==========================================
const QuickViewModal = ({ product, onClose, onAddToCart, onBuyNow, onOpenCompare, isBeastMode }) => {
  if (!product) return null;
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0] : null);
  const [quantity, setQuantity] = useState(1);
  const theme = getBeastTheme(isBeastMode);

  const parsePrice = (priceInput) => { if (priceInput === undefined || priceInput === null) return 0; if (typeof priceInput === 'number') return priceInput; const match = priceInput.toString().match(/(\d+)/); return match ? parseInt(match[0]) : 0; };
  const currentPrice = selectedVariant && selectedVariant.price !== undefined ? parsePrice(selectedVariant.price) : parsePrice(product.price);
  
  // Apply Beast Mode Discount Logic
  const finalPrice = calculateFinalPrice(currentPrice, isBeastMode);
  const originalPrice = Math.floor(currentPrice * 1.2);

  const currentImage = selectedVariant?.image || product.image;
  const handleAddToCart = () => { onAddToCart({ ...product, price: finalPrice, image: currentImage, selectedSize: selectedVariant ? selectedVariant.name : "One Size", quantity }); onClose(); };
  const handleBuy = () => { onBuyNow({ id: Math.floor(Math.random() * 10000).toString(), items: product.name, price: finalPrice * quantity, image: currentImage, selectedSize: selectedVariant ? selectedVariant.name : "One Size", quantity: quantity, date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' }), status: "Processing", deliveryDate: "Pending" }); onClose(); };
  const isUrl = (str) => str && (str.includes('http') || str.includes('/') || str.includes('.'));

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`relative bg-[#1e293b] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border ${theme.border} animate-in fade-in zoom-in-95 duration-200`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 hover:bg-white/10 p-1 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8 relative overflow-hidden group">
           <span className="absolute text-white/5 text-6xl font-black uppercase -rotate-12 select-none z-0">{product.category || "GYM"}</span>
           <div className="relative z-10 w-full h-64 md:h-full flex items-center justify-center transition-all duration-500">
              {isUrl(currentImage) ? <img key={currentImage} src={currentImage} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in zoom-in-90 duration-300" /> : <div className={`w-full h-full ${currentImage} bg-contain bg-center bg-no-repeat`}></div>}
           </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-left bg-[#1e293b]">
          <span className={`${theme.text} text-sm font-bold tracking-widest uppercase mb-2`}>{product.category || "Equipment"}</span>
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
                  <button onClick={handleBuy} className={`flex-1 ${theme.button} text-[#1a1a40] font-bold text-lg py-3 rounded-xl shadow-lg transition-all active:scale-95`}>BUY NOW</button>
              </div>
              <button onClick={handleAddToCart} className="w-full bg-transparent border border-gray-600 hover:border-white text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-white/5"><ShoppingCart className="w-5 h-5" /> Add to Cart</button>
              
              <button onClick={() => { onClose(); onOpenCompare(product.id); }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-all">
                  <Scale className="w-4 h-4" /> Compare with other items
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN HOMEPAGE COMPONENT
// ==========================================
export default function Homepage({ onLogout, username, isAdmin }) {
  const router = useRouter(); 
  
  // --- STATES ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  
  // New States
  const [isBeastMode, setIsBeastMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [compareList, setCompareList] = useState([]); 
  const [preSelectedId, setPreSelectedId] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [lastEarnedPoints, setLastEarnedPoints] = useState(0);

  const theme = getBeastTheme(isBeastMode);

  // --- CALCULATE TOTAL POINTS ---
  const totalPoints = useMemo(() => {
        const basePoints = 0; 
        const orderPoints = pastOrders.reduce((total, order) => total + getNumericPrice(order.price), 0);
        return Math.floor(basePoints + orderPoints);
  }, [pastOrders]);

  const categories = ["All", "Strength", "Cardio", "Accessories", "Recovery"];
  const heroSlides = [
    { id: 1, subtitle: "HEAVY DUTY GEAR", title: "BUILD YOUR", highlight: "DREAM GYM", gradient: isBeastMode ? "from-red-900 to-black" : "from-blue-900 to-cyan-900", texture: "https://www.transparenttextures.com/patterns/diagmonds-light.png" },
    { id: 2, subtitle: "PERFORMANCE WEAR", title: "UNLEASH YOUR", highlight: "TRUE POWER", gradient: isBeastMode ? "from-orange-900 to-black" : "from-purple-900 to-pink-900", texture: "https://www.transparenttextures.com/patterns/carbon-fibre.png" },
    { id: 3, subtitle: "HOME ESSENTIALS", title: "TRAIN HARD", highlight: "STAY STRONG", gradient: "from-gray-800 to-black", texture: "https://www.transparenttextures.com/patterns/cubes.png" }
  ];

  // --- EFFECTS ---
  useEffect(() => { const timer = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % heroSlides.length); }, 5000); return () => clearInterval(timer); }, [heroSlides.length]);
  useEffect(() => { const interval = setInterval(() => { setPastOrders(currentOrders => { return currentOrders.map(order => { if (order.status === "Processing") return { ...order, status: "Shipped", deliveryDate: "Est: 5 Days" }; else if (order.status === "Shipped") return { ...order, status: "In - Transit", deliveryDate: "Est: 2 Days" }; else if (order.status === "In - Transit") return { ...order, status: "Delivered", deliveryDate: "Arrived" }; return order; }); }); }, 10000); return () => clearInterval(interval); }, []);
  useEffect(() => { const messages = [ { text: "Alex from Cebu bought a Dumbbell Set", time: "2m ago" }, { text: "Sarah from Makati ordered a Yoga Mat", time: "Just now" }, { text: "Mark from Davao bought Protein Powder", time: "5m ago" }, { text: "GymRat99 upgraded to Beast Mode", time: "1m ago" } ]; const interval = setInterval(() => { const randomMsg = messages[Math.floor(Math.random() * messages.length)]; setNotification(randomMsg); setTimeout(() => setNotification(null), 4000); }, 15000); return () => clearInterval(interval); }, []);

  const popularItems = [
    { id: 1, name: "Olympic Barbell", category: "Strength", price: 299, rating: 5, image: "images/Olympic_Barbell.jpg" },
    { id: 26, name: "Elite Treadmill", category: "Cardio", price: 1200, rating: 4.8, image: "images/Elite Treadmill.jpg" },
    { id: 5, name: "Dumbbell Set", category: "Strength", price: 150, rating: 4.9, image: "images/Dumbell Set.jpg" },
    { id: 51, name: "Yoga Mat Pro", category: "Accessories", price: 45, rating: 4.5, image: "images/Yoga Mat Pro.jpg" },
    { id: 76, name: "Massage Gun", category: "Recovery", price: 120, rating: 4.7, image: "images/Massage Gun.jpg" }
  ];

  const addToCart = (productToAdd) => { setCartItems((prevItems) => { const isMatch = (item) => item.id === productToAdd.id && item.selectedSize === productToAdd.selectedSize; const existingItem = prevItems.find(isMatch); if (existingItem) { return prevItems.map((item) => isMatch(item) ? { ...item, quantity: (item.quantity || 1) + (productToAdd.quantity || 1) } : item); } else { return [...prevItems, { ...productToAdd, quantity: productToAdd.quantity || 1, selectedSize: productToAdd.selectedSize || "One Size" }]; } }); };
  const removeFromCart = (indexToRemove) => { setCartItems(cartItems.filter((_, index) => index !== indexToRemove)); };
  
  const handleCartCheckout = (checkoutData) => { 
      const transactionTotal = checkoutData.items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
      setLastEarnedPoints(Math.floor(transactionTotal));
      const newOrders = checkoutData.items.map(item => ({ id: Math.floor(Math.random() * 10000).toString(), date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' }), items: item.name, price: item.price * (item.quantity || 1), status: "Processing", deliveryDate: "Pending", image: item.image, quantity: item.quantity || 1, selectedSize: item.selectedSize || "One Size" })); 
      setPastOrders(prev => [...newOrders, ...prev]); setCartItems([]); setShowThankYou(true); 
  };
  
  const handleBuyNow = (orderData) => { 
      setLastEarnedPoints(Math.floor(orderData.price));
      setPastOrders(prev => [orderData, ...prev]); setShowThankYou(true); 
  };
  
  const openCompareSelector = (initialId = null) => { setPreSelectedId(initialId); setShowSelectorModal(true); };
  const handleConfirmComparison = (selectedProducts) => { setCompareList(selectedProducts); setShowSelectorModal(false); setShowCompareModal(true); };

  const filteredProducts = Product.filter(item => { return (selectedCategory === "All" || item.category === selectedCategory) && item.name.toLowerCase().includes(searchQuery.toLowerCase()); });
  const renderProductImage = (item) => { const img = item.image || ""; const isImage = img.startsWith('http') || img.startsWith('images/') || img.includes('.'); if (isImage) { return <img src={img} alt={item.name} className="w-full h-full object-cover absolute inset-0" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />; } else { return <div className={`w-full h-full absolute inset-0 ${img}`}></div>; } };

  return (
    <div className={`h-[100dvh] w-full bg-gradient-to-b ${theme.bgGradient} text-white overflow-y-auto overflow-x-hidden transition-colors duration-1000`}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      {showThankYou && <ThankYouModal onClose={() => { setShowThankYou(false); setCurrentView('home'); }} onViewOrders={() => { setShowThankYou(false); setCurrentView('user'); }} isBeastMode={isBeastMode} pointsEarned={lastEarnedPoints} />}
      
      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} onBuyNow={handleBuyNow} onOpenCompare={openCompareSelector} isBeastMode={isBeastMode} compareList={[]} toggleCompare={()=>{}} />}
      
      {/* SELECTION MODAL & RESULT */}
      <SelectionModal isOpen={showSelectorModal} onClose={() => setShowSelectorModal(false)} allProducts={Product} onConfirmSelection={handleConfirmComparison} preSelectedId={preSelectedId} isBeastMode={isBeastMode} />
      {showCompareModal && compareList.length === 2 && <CompareResultModal products={compareList} onClose={() => { setShowCompareModal(false); setCompareList([]); }} isBeastMode={isBeastMode} />}

      {/* NOTIFICATION */}
      {notification && (
        <div className={`fixed bottom-4 left-4 z-[200] bg-[#1f2937] border ${theme.border} p-4 rounded-xl shadow-2xl animate-in slide-in-from-left duration-500 flex items-center gap-4`}>
            <div className={`w-10 h-10 ${isBeastMode ? 'bg-red-500/20 text-red-500' : 'bg-cyan-500/20 text-cyan-400'} rounded-full flex items-center justify-center`}><Activity className="w-5 h-5" /></div>
            <div><p className="text-white text-sm font-bold">{notification.text}</p><p className="text-gray-500 text-xs">{notification.time}</p></div>
        </div>
      )}

      {/* TOPBAR */}
      <div className="py-4 text-white relative z-50">
        <Topbar onCartClick={() => setCurrentView("cart")} onUserClick={() => setCurrentView("user")} searchValue={searchQuery} onSearchChange={setSearchQuery} cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        
        {/* ACTION BUTTONS: ADMIN, BEAST MODE, COMPARE */}
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2 animate-in fade-in duration-500">
             {currentView === 'home' && <FloatingCompareButton onClick={() => openCompareSelector()} isBeastMode={isBeastMode} />}
             {isAdmin && <button onClick={() => setCurrentView("admin")} className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-full font-bold shadow-lg shadow-red-600/30 transition-all hover:scale-105"><Shield className="w-4 h-4" /> Admin</button>}
             <BeastModeToggle isBeastMode={isBeastMode} setIsBeastMode={setIsBeastMode} totalPoints={totalPoints} />
        </div>
      </div>
      
      <main className="pt-20 md:pt-24 2xl:pt-32 pb-10 px-4 md:px-8 2xl:px-16 max-w-[2000px] mx-auto space-y-10 2xl:space-y-20">
        {currentView === 'cart' && <div className="animate-in fade-in slide-in-from-right-4 duration-300"><button onClick={() => setCurrentView('home')} className={`text-xl md:text-2xl 2xl:text-4xl flex items-center gap-2 ${theme.text} hover:text-white mb-6 transition-colors`}><ArrowLeft className=" w-5 h-5" /> Back to Shop</button><CartPage cartItems={cartItems} onRemoveItem={removeFromCart} onCheckout={handleCartCheckout} onBack={() => setCurrentView("home")} /></div>}
        {currentView === 'user' && <UserProfile onBack={() => setCurrentView("home")} onLogout={onLogout} username={username} orders={pastOrders} isBeastMode={isBeastMode} totalPoints={totalPoints} />}
        {currentView === 'admin' && isAdmin && <AdminDashboard onBack={() => setCurrentView("home")} username={username} />}

        {currentView === 'home' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            {/* HERO SLIDER */}
            <div className={`relative w-full h-[250px] md:h-[400px] 2xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-${isBeastMode ? 'red' : 'cyan'}-500/20 mb-16`}>
                {heroSlides.map((slide, index) => (
                    <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-r ${slide.gradient} flex items-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('${slide.texture}')` }}></div>
                        <div className="relative z-10 px-8 md:px-16 2xl:px-32 w-full max-w-2x1">
                            <h3 className={`${theme.text} font-bold tracking-widest text-sm md:text-lg 2xl:text-2xl mb-2 uppercase`}>{slide.subtitle}</h3>
                            <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-black italic mb-6 leading-none tracking-tighter">{slide.title} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{slide.highlight}</span></h1>
                        </div>
                    </div>
                ))}
                <div className="absolute bottom-6 left-8 md:left-16 z-20 flex gap-3">
                    {heroSlides.map((_, index) => ( <button key={index} onClick={() => setCurrentSlide(index)} className={`transition-all duration-300 rounded-full shadow-lg ${currentSlide === index ? `w-8 h-3 ${isBeastMode ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'}` : "w-3 h-3 bg-white/30 hover:bg-white"}`} /> ))}
                </div>
            </div>

            {/* EXPANDING CARDS */}
            <div className="space-y-6">
               <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">Popular Items</h2>
               <div className="flex w-full h-[300px] md:h-[400px] 2xl:h-[500px] gap-2 md:gap-4">
                  {popularItems.map((item, index) => {
                      const finalPrice = calculateFinalPrice(item.price, isBeastMode);
                      return (
                        <div key={item.id} onClick={() => setActiveSlide(index)} className={`relative rounded-[20px] bg-cover bg-center cursor-pointer transition-[flex] duration-700 ease-in-out group overflow-hidden border border-white/10 ${activeSlide === index ? `flex-[5] shadow-[0_0_20px_${isBeastMode ? 'rgba(239,68,68,0.3)' : 'rgba(34,211,238,0.3)'}]` : 'flex-[1] opacity-60 hover:opacity-100 hover:flex-[1.5]'}`} style={{ backgroundImage: `url('${item.image}')` }}>
                            <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 ${activeSlide === index ? 'bg-black/10' : 'group-hover:bg-black/20'}`}></div>
                            <div className={`absolute bottom-0 left-0 p-4 md:p-8 transition-all duration-500 ${activeSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                {activeSlide === index && ( <> <span className={`${theme.text} font-bold text-sm tracking-widest uppercase`}>{item.category}</span> <h3 className="text-white text-2xl md:text-4xl font-black italic uppercase shadow-black drop-shadow-lg mb-2">{item.name}</h3> <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold transition-all">View Details</button> </> )}
                            </div>
                            {activeSlide !== index && ( <div className="absolute inset-0 flex items-center justify-center hidden md:flex"><span className="text-white/80 font-bold text-xl uppercase -rotate-90 tracking-widest whitespace-nowrap">{item.name}</span></div> )}
                        </div>
                      )
                  })}
               </div>
            </div>

            {/* PRODUCTS */}
            <div className="space-y-4 2xl:space-y-8 mt-16">
              <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">Browse by Category</h2>
              <div className="flex gap-4 2xl:gap-8 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((cat, index) => ( <button key={index} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 2xl:px-10 2xl:py-4 2xl:text-xl rounded-full border whitespace-nowrap transition-all ${selectedCategory === cat ? `bg-white text-[#1a1a40] border-white font-bold scale-105` : `bg-transparent border-white/30 hover:border-${isBeastMode ? 'red' : 'cyan'}-400 hover:text-${isBeastMode ? 'red' : 'cyan'}-400 text-gray-300`}`}>{cat}</button> ))}
              </div>
            </div>

            <div className="space-y-4 2xl:space-y-8 mt-10">
              <div className="flex justify-between items-end">
                <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">{selectedCategory === "All" ? "Best Sellers" : `${selectedCategory} Equipment`}</h2>
                <button onClick={() => setSelectedCategory("All")} className={`${theme.text} text-sm 2xl:text-xl hover:underline`}>View All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 2xl:gap-8">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => {
                    const finalPrice = calculateFinalPrice(item.price, isBeastMode);
                    return (
                        <div key={index} className={`bg-[#1f2937]/60 backdrop-blur-sm rounded-2xl p-3 md:p-4 2xl:p-6 border border-white/10 hover:border-${isBeastMode ? 'red' : 'cyan'}-400/50 hover:-translate-y-2 transition-all duration-300 group shadow-lg flex flex-col justify-between relative`}>
                            <div className={`w-full aspect-square rounded-xl mb-3 2xl:mb-5 relative overflow-hidden flex items-center justify-center bg-gray-800`}>
                                {renderProductImage(item)}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 z-10">
                                    <button onClick={() => setSelectedProduct(item)} className={`bg-white text-black text-xs 2xl:text-base font-bold px-3 py-1 2xl:px-5 2xl:py-2 rounded-full cursor-pointer hover:bg-${isBeastMode ? 'red' : 'cyan'}-400 transition-colors`}>Quick View</button>
                                </div>
                            </div>
                            <div className="space-y-1 2xl:space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-sm md:text-base 2xl:text-xl truncate w-3/4">{item.name}</h3>
                                    <div className="flex items-center text-yellow-400 text-xs 2xl:text-base"><Star className="w-3 h-3 2xl:w-5 2xl:h-5 fill-current" /><span className="ml-1">{item.rating}</span></div>
                                </div>
                                <p className="text-gray-400 text-xs 2xl:text-sm">Pro Equipment</p>
                                <div className="flex justify-between items-center mt-2 2xl:mt-4">
                                    <span className={`${theme.text} font-bold text-lg 2xl:text-2xl`}>${finalPrice}</span>
                                    <button onClick={(e) => { e.stopPropagation(); if (item.variants && item.variants.length > 0) { setSelectedProduct(item); } else { addToCart({ ...item, price: finalPrice }); } }} className={`bg-white/10 hover:bg-${isBeastMode ? 'red' : 'cyan'}-500 hover:text-[#1a1a40] p-2 2xl:p-3 rounded-lg transition-colors`}><ShoppingCart className="w-4 h-4 2xl:w-6 2xl:h-6" /></button>
                                </div>
                            </div>
                        </div>
                    )
                  })
                ) : ( <div className="col-span-full text-center text-gray-400 py-10 italic">No products found in this category.</div> )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}