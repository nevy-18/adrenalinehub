'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/app/data/Product';
import { ShoppingCart, Star, Shield, Activity, CheckCircle } from 'lucide-react';

// Custom Components
import Topbar from '@/components/Topbar';
import CartPage from '../cart/page';
import AdminDashboard from '../admindashboard/page';
import UserProfile from '../user/page';
import QuickviewModal from '../QuickviewModal/page'; 
import CheckoutView from './CheckoutView';

// Modular Sections
import HeroSection from '@/components/HeroSection/page';
import PopularItems from '@/components/PopularItems/page';

// Feature Components
import { SelectionModal, CompareResultModal, FloatingCompareButton } from '@/components/Comparemodule/page';
import { BeastModeToggle, getBeastTheme } from '@/components/Beastmode/page';

// Helper to handle currency strings safely
const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    const match = price.toString().replace(/[^0-9.]/g, ''); 
    return match ? parseFloat(match) : 0;
};

// --- THANK YOU MODAL ---
const ThankYouModal = ({ onClose, onViewOrders, isBeastMode, pointsEarned }) => {
    const theme = getBeastTheme(isBeastMode);
    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
             <div className={`bg-[#1f2937] border ${theme.border} p-8 rounded-3xl max-w-2xl w-full text-center shadow-2xl relative`}>
                <div className="flex justify-center mb-6"><CheckCircle className="w-20 h-20 text-green-500" /></div>
                <h2 className="text-3xl font-black text-white mb-2 uppercase italic">Order Confirmed!</h2>
                <p className="text-gray-400 mb-8 text-lg">Thank you. You earned <span className={`${theme.text} font-bold text-2xl`}>+{pointsEarned} AP</span>!</p>
                <div className="flex gap-4">
                   <button onClick={onClose} className={`${theme.button} text-[#1a1a40] font-bold py-4 rounded-xl flex-1 transition-all hover:scale-105`}>Continue Shopping</button>
                   <button onClick={onViewOrders} className="bg-transparent border border-gray-600 text-white font-bold py-4 rounded-xl flex-1 hover:bg-white/5 transition-all">View Orders</button>
                </div>
             </div>
        </div>
    );
};

export default function Homepage({ onLogout, username, isAdmin }) {
  // --- STATES ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isBeastMode, setIsBeastMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [compareList, setCompareList] = useState([]); 
  const [preSelectedId, setPreSelectedId] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [lastEarnedPoints, setLastEarnedPoints] = useState(0);
  const [pendingCheckoutData, setPendingCheckoutData] = useState(null);

  useEffect(() => {
      if (username) {
          fetch(`http://localhost:3001/orders/${username}`)
            .then(res => res.json())
            .then(data => setPastOrders(data))
            .catch(err => console.error("Order fetch failed:", err));
      }
  }, [username]);

  const totalPoints = useMemo(() => {
        return Math.floor(pastOrders.reduce((total, order) => total + (getNumericPrice(order.price) || 0), 0));
  }, [pastOrders]);

  const tierData = useMemo(() => {
      if (totalPoints >= 1000) return { name: "Gold", discount: 0.15, color: "text-yellow-400" }; 
      return { name: "Newbie", discount: 0.00, color: "text-gray-500" };                                    
  }, [totalPoints]);

  const theme = getBeastTheme(isBeastMode);
  const categories = ["All", "Strength", "Cardio", "Accessories", "Recovery"];

  const handleConfirmOrder = async () => {
    if(!pendingCheckoutData) return;
    const itemsToProcess = pendingCheckoutData.items;
    const transactionTotal = itemsToProcess.reduce((acc, item) => acc + (getNumericPrice(item.price) * (item.quantity || 1)), 0);
    const earnedPoints = Math.floor(transactionTotal);
    setLastEarnedPoints(earnedPoints);

    try {
        const response = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, total_price: transactionTotal, points_earned: earnedPoints, items: itemsToProcess }),
        });

        const data = await response.json(); 

        if (response.ok) {
            setCartItems([]); 
            setPendingCheckoutData(null); 
            setCurrentView('home'); 
            setShowThankYou(true);
            fetch(`http://localhost:3001/orders/${username}`).then(res => res.json()).then(d => setPastOrders(d));
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        alert("Server error. Check your connection.");
    }
  };

  const handleDirectAddToCart = (e, item) => {
      e.stopPropagation(); 
      const base = getNumericPrice(item.price);
      const final = isBeastMode ? Math.floor(base * (1 - tierData.discount)) : base;
      setCartItems([...cartItems, { ...item, price: final, quantity: 1, selectedSize: "One Size" }]);
      setNotification({ text: `Added ${item.name}!`, time: "Just now" });
      setTimeout(() => setNotification(null), 3000);
  };

  const filteredProducts = Product.filter(item => 
    (selectedCategory === "All" || item.category === selectedCategory) && 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`h-[100dvh] w-full bg-gradient-to-b ${theme.bgGradient} text-white overflow-y-auto transition-colors duration-1000 scroll-smooth`}>
      
      {showThankYou && (
  <ThankYouModal 
    onClose={() => setShowThankYou(false)} 
    onViewOrders={() => {
      setCurrentView('user'); // Switches the page view
      setShowThankYou(false); // Closes the modal
    }} 
    isBeastMode={isBeastMode} 
    pointsEarned={lastEarnedPoints} 
  />
)}
      {selectedProduct && <QuickviewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(p) => setCartItems([...cartItems, p])} onBuyNow={(d) => setPendingCheckoutData({ items: [d] })} onOpenCompare={(id) => {setPreSelectedId(id); setShowSelectorModal(true);}} isBeastMode={isBeastMode} discountRate={tierData.discount} compareList={[]} toggleCompare={()=>{}} />}
      <SelectionModal isOpen={showSelectorModal} onClose={() => setShowSelectorModal(false)} allProducts={Product} onConfirmSelection={(list) => {setCompareList(list); setShowSelectorModal(false); setShowCompareModal(true);}} preSelectedId={preSelectedId} isBeastMode={isBeastMode} />
      {showCompareModal && compareList.length === 2 && <CompareResultModal products={compareList} onClose={() => { setShowCompareModal(false); setCompareList([]); }} isBeastMode={isBeastMode} />}
      {pendingCheckoutData && <CheckoutView onBack={() => setPendingCheckoutData(null)} checkoutData={pendingCheckoutData} onConfirmOrder={handleConfirmOrder} />}

      <Topbar onCartClick={() => setCurrentView("cart")} onUserClick={() => setCurrentView("user")} searchValue={searchQuery} onSearchChange={setSearchQuery} cartCount={cartItems.length} />
      
      {notification && (
        <div className={`fixed bottom-4 left-4 z-[200] bg-[#1f2937] border ${theme.border} p-4 rounded-xl shadow-2xl animate-in slide-in-from-left flex items-center gap-4`}>
            <div className={`w-10 h-10 ${isBeastMode ? 'bg-red-500/20 text-red-500' : 'bg-cyan-500/20 text-cyan-400'} rounded-full flex items-center justify-center`}><Activity className="w-5 h-5" /></div>
            <div><p className="text-white text-sm font-bold">{notification.text}</p><p className="text-gray-500 text-xs">{notification.time}</p></div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2">
           {currentView === 'home' && <FloatingCompareButton onClick={() => setShowSelectorModal(true)} isBeastMode={isBeastMode} />}
           {isAdmin && <button onClick={() => setCurrentView("admin")} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-all hover:scale-105"><Shield className="w-4 h-4 inline mr-2" /> Admin Panel</button>}
           <BeastModeToggle isBeastMode={isBeastMode} setIsBeastMode={setIsBeastMode} totalPoints={totalPoints} />
      </div>

      {/* --- SPACING FIX 1: Increased pt-24 to pt-36 to push content further below Topbar --- */}
      {/* --- SPACING FIX 2: Increased space-y-20 to space-y-32 for more room between sections --- */}
      <main className="pt-36 pb-10 px-4 md:px-8 max-w-[2000px] mx-auto space-y-32">
        
        {currentView === 'cart' && <CartPage cartItems={cartItems} onRemoveItem={(i) => setCartItems(cartItems.filter((_, idx) => idx !== i))} onCheckout={(d) => setPendingCheckoutData(d)} onBack={() => setCurrentView("home")} />}
        {currentView === 'user' && <UserProfile onBack={() => setCurrentView("home")} onLogout={onLogout} username={username} orders={pastOrders} isBeastMode={isBeastMode} totalPoints={totalPoints} tierData={tierData} />}
        {currentView === 'admin' && isAdmin && <AdminDashboard onBack={() => setCurrentView("home")} username={username} />}

        {currentView === 'home' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            
            {/* HERO SECTION - Added a small mt-4 for extra breathing room from the Topbar clearance */}
            <div className="mt-4">
              <HeroSection isBeastMode={isBeastMode} />
            </div>

            {/* POPULAR GEAR (DB DRIVEN) - Added mt-24 to separate from Hero */}
            <div className="mt-24">
              <PopularItems isBeastMode={isBeastMode} setSelectedProduct={setSelectedProduct} />
            </div>

            {/* BROWSE BY CATEGORY - Added mt-24 for separation */}
            <div className="space-y-4 mt-24">
              <h2 className="text-2xl md:text-3xl font-bold italic text-white uppercase tracking-tighter">Shop by Category</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {categories.map((cat, i) => (
                    <button 
                        key={i} 
                        onClick={() => setSelectedCategory(cat)} 
                        className={`px-8 py-2.5 rounded-full border transition-all whitespace-nowrap font-bold ${selectedCategory === cat ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'}`}
                    >
                        {cat}
                    </button>
                ))}
              </div>
            </div>

            {/* PRODUCT GRID - Added mt-12 for separation from categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
                {filteredProducts.map((item, index) => {
                    const base = getNumericPrice(item.price);
                    const applyDiscount = (p) => isBeastMode ? Math.floor(p * (1 - tierData.discount)) : p;
                    
                    let priceDisplay;
                    const variants = item.variants || [];
                    if (variants.length > 0) {
                        const variantPrices = variants.map(v => getNumericPrice(v.price));
                        const minPrice = Math.min(...variantPrices);
                        const maxPrice = Math.max(...variantPrices);
                        priceDisplay = minPrice === maxPrice 
                            ? `₱${applyDiscount(minPrice).toLocaleString()}` 
                            : `₱${applyDiscount(minPrice).toLocaleString()} - ₱${applyDiscount(maxPrice).toLocaleString()}`;
                    } else {
                        priceDisplay = `₱${applyDiscount(base).toLocaleString()}`;
                    }

                    return (
                        <div key={index} className="bg-[#1f2937]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10 group hover:-translate-y-2 transition-all duration-300 shadow-lg flex flex-col justify-between">
                            <div className="w-full aspect-square bg-gray-900 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center border border-white/5">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                    <button 
                                        onClick={() => setSelectedProduct(item)} 
                                        className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                                    >
                                        Quick View
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-sm md:text-base text-white truncate w-2/3">{item.name}</h3>
                                    <div className="flex items-center text-yellow-400 text-xs">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="ml-1">{item.rating || '4.5'}</span>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex flex-col">
                                        <div className={`text-lg font-black ${isBeastMode ? 'text-red-500' : 'text-cyan-400'}`}>
                                            {priceDisplay}
                                        </div>
                                        {isBeastMode && tierData.discount > 0 && (
                                            <div className="text-[10px] text-gray-500 line-through">₱{base.toLocaleString()}</div>
                                        )}
                                    </div>
                                    <button onClick={(e) => handleDirectAddToCart(e, item)} className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500 text-cyan-400 hover:text-black transition-all">
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}