'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/Topbar';
import { Product } from '@/app/data/Product';
import CartPage from '@/app/cart/page'; 
// Added MapPin to imports
import { ArrowLeft, ShoppingCart, Star, X, Package, Settings, LogOut, ChevronRight, Truck, Mail, Lock, Edit2, CheckCircle, LayoutDashboard, Users, TrendingUp, Shield, MapPin } from 'lucide-react';

// ==========================================
// 1. THANK YOU MODAL
// ==========================================
const ThankYouModal = ({ onClose, onViewOrders }) => {
  const suggestions = Product.slice(0, 3); 

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
       <div className="bg-[#1f2937] border border-cyan-500/30 p-8 rounded-3xl max-w-2xl w-full text-center relative shadow-2xl shadow-cyan-500/20">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500 animate-in zoom-in spin-in-180 duration-500">
                <CheckCircle className="w-10 h-10 text-green-500" />
             </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase italic tracking-wider">Order Confirmed!</h2>
          <p className="text-gray-400 mb-8 text-lg">Thank you for your purchase. Your gear is on the way.</p>

          <div className="text-left mb-8 bg-white/5 p-6 rounded-2xl border border-white/5">
             <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">You might also need</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions.map((item) => (
                   <div key={item.id} className="bg-[#111827] p-3 rounded-xl border border-white/10 group cursor-pointer hover:border-cyan-400/50 transition-all">
                      <div className="h-24 w-full bg-gray-800 rounded-lg mb-3 overflow-hidden relative">
                          {item.image && (item.image.includes('http') || item.image.includes('images/')) ? (
                             <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                          ) : (
                             <div className={`w-full h-full ${item.image}`}></div>
                          )}
                      </div>
                      <p className="text-xs text-gray-300 font-bold truncate">{item.name}</p>
                      <p className="text-white font-bold text-sm mt-1">{item.price}</p>
                   </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <button onClick={onClose} className="bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all active:scale-95 flex-1">
                Continue Shopping
             </button>
             <button onClick={onViewOrders} className="bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white font-bold py-4 px-8 rounded-xl transition-all active:scale-95 flex-1">
                View My Orders
             </button>
          </div>
       </div>
    </div>
  );
};

// ==========================================
// 2. MY ORDERS VIEW (Updated with Address)
// ==========================================
const MyOrdersView = ({ onBack, orders, address, username }) => {
  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-400";
    if (status === "In - Transit") return "text-orange-400";
    return "text-gray-400"; 
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-[#111827] text-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
      <div className="bg-[#1f2937] shadow-lg sticky top-0 z-10 px-8 py-4 flex items-center justify-between border-b border-white/5">
         <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">ADRENALINE<span className="text-cyan-400">HUB</span></h1>
         </div>
         <div className="flex items-center gap-6">
             <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> BACK TO PROFILE
             </button>
             <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-[#1a1a40] font-black">
                {username ? username.charAt(0).toUpperCase() : "U"}
             </div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        
        {/* NEW: Address Display Section */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 mb-8">
            <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Package className="w-8 h-8 text-cyan-400" /> My Orders
                </h2>
                <p className="text-gray-400 text-sm mt-1">Track your active shipments and past purchases.</p>
            </div>
            
            <div className="mt-4 md:mt-0 bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 max-w-sm w-full">
                <div className="bg-cyan-500/20 p-2 rounded-full text-cyan-400">
                    <MapPin className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Delivery Address</p>
                    <p className="text-white font-medium text-sm truncate">
                        {address || "No address set. Please edit profile."}
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            {orders && orders.length > 0 ? (
                orders.map((order, index) => (
                <div key={index} className="bg-[#1f2937]/60 border border-white/5 rounded-2xl p-6 hover:border-cyan-400/30 transition-all shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/5 px-4 py-1.5 rounded-full text-sm font-bold text-gray-300 border border-white/10">
                                Order <span className="text-cyan-400">#{order.id}</span>
                            </div>
                            <span className="text-gray-500 text-xs">Placed: {order.date}</span>
                        </div>
                        <button className="bg-orange-500/20 text-orange-400 border border-orange-500/50 hover:bg-orange-500 hover:text-white text-xs font-bold py-2 px-6 rounded-full transition-all uppercase tracking-wider flex items-center gap-2">
                            <Truck className="w-3 h-3" /> Track Order
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-24 h-32 rounded-lg bg-gray-800 overflow-hidden border border-white/10 flex-shrink-0">
                             {order.image?.startsWith('http') || order.image?.includes('images/') ? (
                                <img src={order.image} className="w-full h-full object-cover" alt={order.items} />
                             ) : (
                                <div className={`w-full h-full ${order.image}`}></div>
                             )}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-bold text-lg text-white mb-1">{order.items}</h3>
                                <p className="text-gray-500 text-sm mb-4">AdrenalineHub Official</p>
                                <p className="text-gray-400 text-sm">Qty: <span className="text-white">{order.quantity}</span> <span className="ml-4 font-bold text-cyan-400 text-lg">${order.price}</span></p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Status</p>
                                <p className={`${getStatusColor(order.status)} font-bold flex items-center gap-2 animate-pulse`}>
                                    <span className={`w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-green-400" : (order.status === "In - Transit" ? "bg-orange-400" : "bg-blue-400")}`}></span>
                                    {order.status}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Estimated Delivery:</p>
                                <p className="text-white font-bold text-lg">{order.deliveryDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="text-center py-20 bg-[#1f2937]/30 rounded-2xl border border-white/5">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400">No orders found</h3>
                    <button onClick={onBack} className="mt-6 text-cyan-400 hover:underline">Start Shopping</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. SETTINGS VIEW (Edit Profile)
// ==========================================
const SettingsView = ({ onBack, username }) => {
  const [viewMode, setViewMode] = useState('main'); 
  const [emailInput, setEmailInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); 

  const handleUpdate = async (updateType) => {
    if (!currentPassword) {
        setStatusMsg({ type: 'error', text: "Current password is required." });
        return;
    }
    setLoading(true);
    setStatusMsg(null);

    try {
        const res = await fetch('http://localhost:3001/api/update-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username || "Guest",
                type: updateType,
                newEmail: updateType === 'email' ? emailInput : undefined,
                newPassword: updateType === 'password' ? newPassword : undefined,
                currentPassword: currentPassword
            })
        });

        const data = await res.json();

        if (data.success) {
            setStatusMsg({ type: 'success', text: data.message });
            if (updateType === 'password') {
                setCurrentPassword("");
                setNewPassword("");
            }
        } else {
            setStatusMsg({ type: 'error', text: data.message || "Update failed." });
        }
    } catch (err) {
        setStatusMsg({ type: 'error', text: "Cannot connect to server." });
    } finally {
        setLoading(false);
    }
  };

  if (viewMode === 'password') {
    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1f2937] w-full max-w-lg rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden animate-in slide-in-from-right-8 duration-200 relative">
                <button onClick={() => { setViewMode('main'); setStatusMsg(null); }} className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center gap-1 text-sm font-bold transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="p-6 pt-12 border-b border-white/5 bg-white/5 text-center">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-3 text-cyan-400"><Lock className="w-6 h-6" /></div>
                    <h2 className="text-2xl font-bold text-white">Change Password</h2>
                </div>
                <div className="p-6 space-y-4">
                    {statusMsg && (
                        <div className={`p-3 rounded-lg text-sm font-bold text-center ${statusMsg.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {statusMsg.text}
                        </div>
                    )}
                    <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-[#111827] rounded-xl border border-gray-700 px-4 py-3 text-white outline-none focus:border-cyan-400 transition-colors" />
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-[#111827] rounded-xl border border-gray-700 px-4 py-3 text-white outline-none focus:border-cyan-400 transition-colors" />
                    <button onClick={() => handleUpdate('password')} disabled={loading} className={`w-full py-3.5 font-bold rounded-xl mt-4 transition-all ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40]'}`}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </div>
        </div>
    );
  }

  if (viewMode === 'email') {
    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1f2937] w-full max-w-lg rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden animate-in slide-in-from-right-8 duration-200 relative">
                <button onClick={() => { setViewMode('main'); setStatusMsg(null); }} className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center gap-1 text-sm font-bold transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="p-6 pt-12 border-b border-white/5 bg-white/5 text-center">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-400"><Mail className="w-6 h-6" /></div>
                    <h2 className="text-2xl font-bold text-white">Change Email</h2>
                </div>
                <div className="p-6 space-y-4">
                    {statusMsg && (
                        <div className={`p-3 rounded-lg text-sm font-bold text-center ${statusMsg.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {statusMsg.text}
                        </div>
                    )}
                    <input type="email" placeholder="New Email Address" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-[#111827] rounded-xl border border-gray-700 px-4 py-3 text-white outline-none focus:border-cyan-400 transition-colors" />
                    <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-[#111827] rounded-xl border border-gray-700 px-4 py-3 text-white outline-none focus:border-cyan-400 transition-colors" />
                    <button onClick={() => handleUpdate('email')} disabled={loading} className={`w-full py-3.5 font-bold rounded-xl mt-4 transition-all ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40]'}`}>
                        {loading ? "Saving..." : "Save New Email"}
                    </button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1f2937] w-full max-w-lg rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden animate-in zoom-in-95 duration-200 relative">
        <button onClick={onBack} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        <div className="p-6 border-b border-white/5 bg-white/5"><h2 className="text-2xl font-bold text-white flex items-center gap-2"><Settings className="w-6 h-6 text-cyan-400" /> Settings</h2></div>
        <div className="p-6 space-y-3">
            <button onClick={() => setViewMode('email')} className="w-full flex items-center justify-between p-4 bg-[#111827] rounded-xl border border-gray-700 hover:border-cyan-400/50">
                <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-purple-400" /> <span className="text-white text-sm font-bold">Change Email</span></div> <Edit2 className="w-4 h-4 text-gray-500" />
            </button>
            <button onClick={() => setViewMode('password')} className="w-full flex items-center justify-between p-4 bg-[#111827] rounded-xl border border-gray-700 hover:border-cyan-400/50">
                <div className="flex items-center gap-3"><Lock className="w-5 h-5 text-cyan-400" /> <span className="text-white text-sm font-bold">Change Password</span></div> <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
        </div>
        <div className="p-6 bg-white/5 border-t border-white/5 flex justify-end"><button onClick={onBack} className="text-gray-400 hover:text-white text-sm font-bold">Close</button></div>
      </div>
    </div>
  );
};

// ==========================================
// 4. QUICK VIEW MODAL (For Products)
// ==========================================
const QuickViewModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  if (!product) return null;

  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0] : null);
  const [quantity, setQuantity] = useState(1);

  const parsePrice = (priceInput) => {
    if (priceInput === undefined || priceInput === null) return 0;
    if (typeof priceInput === 'number') return priceInput;
    const match = priceInput.toString().match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  };

  const currentPrice = selectedVariant && selectedVariant.price !== undefined
    ? parsePrice(selectedVariant.price) 
    : parsePrice(product.price);

  const originalPrice = Math.floor(currentPrice * 1.2);
  const currentImage = selectedVariant?.image || product.image;

  const handleAddToCart = () => {
    onAddToCart({ 
      ...product, 
      price: currentPrice, 
      image: currentImage, 
      selectedSize: selectedVariant ? selectedVariant.name : "One Size", 
      quantity 
    });
    onClose();
  };

  const handleBuy = () => {
    onBuyNow({
      id: Math.floor(Math.random() * 10000).toString(),
      items: product.name,
      price: currentPrice * quantity,
      image: currentImage, 
      selectedSize: selectedVariant ? selectedVariant.name : "One Size",
      quantity: quantity,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' }),
      status: "Processing",
      deliveryDate: "Pending"
    });
    onClose();
  };

  const isUrl = (str) => str && (str.includes('http') || str.includes('/') || str.includes('.'));

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-[#1e293b] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 hover:bg-white/10 p-1 rounded-full transition-colors">
            <X className="w-6 h-6" />
        </button>

        {/* --- LEFT SIDE: IMAGE --- */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8 relative overflow-hidden group">
           <span className="absolute text-white/5 text-6xl font-black uppercase -rotate-12 select-none z-0">
             {product.category || "GYM"}
           </span>
           
           <div className="relative z-10 w-full h-64 md:h-full flex items-center justify-center transition-all duration-500">
              {isUrl(currentImage) ? (
                <img 
                    key={currentImage} 
                    src={currentImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in zoom-in-90 duration-300" 
                />
              ) : (
                <div className={`w-full h-full ${currentImage} bg-contain bg-center bg-no-repeat`}></div>
              )}
           </div>
        </div>

        {/* --- RIGHT SIDE: DETAILS --- */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-left bg-[#1e293b]">
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">
            {product.category || "Equipment"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
            {product.name}
          </h2>
          
          <div className="flex items-center gap-2 mb-4 text-yellow-400">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-600"}`} />
                ))}
            </div>
            <span className="text-gray-300 text-sm ml-2">({product.rating} Reviews)</span>
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-6">
            {product.description || "Take your workout to the next level with this premium equipment."}
          </p>

          {/* --- FLAVOR/VARIANT SELECTOR --- */}
          {variants.length > 0 && (
            <div className="mb-6">
                <p className="text-gray-400 text-xs font-bold uppercase mb-3">Select Option:</p>
                <div className="flex flex-wrap gap-2">
                    {variants.map((variant, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                                selectedVariant === variant 
                                ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                                : "bg-transparent text-gray-300 border-gray-600 hover:border-white"
                            }`}
                        >
                            {variant.name}
                        </button>
                    ))}
                </div>
            </div>
          )}

          <div className="flex items-end gap-4 mb-8 border-b border-gray-700 pb-8">
             <span key={currentPrice} className="text-4xl font-bold text-white animate-in fade-in duration-300">${currentPrice}</span>
             <span className="text-gray-500 line-through mb-1 text-lg">${originalPrice}</span>
          </div>

          <div className="flex flex-col gap-4">
             <div className="flex gap-4">
                 <div className="flex items-center bg-[#111827] rounded-xl border border-gray-700 px-2">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-full text-gray-400 hover:text-white font-bold">-</button>
                    <span className="w-8 text-center text-white font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-full text-gray-400 hover:text-white font-bold">+</button>
                 </div>
                 <button onClick={handleBuy} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg py-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all active:scale-95">
                    BUY NOW
                 </button>
             </div>
             <button onClick={handleAddToCart} className="w-full bg-transparent border border-gray-600 hover:border-white text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-white/5">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4.5. EDIT PROFILE MODAL (New Component)
// ==========================================
const EditProfileModal = ({ currentName, currentAddress, onClose, onSave }) => {
    const [name, setName] = useState(currentName || "");
    const [address, setAddress] = useState(currentAddress || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(name, address);
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1f2937] w-full max-w-md rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden animate-in zoom-in-95 duration-200 relative">
                <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Edit2 className="w-5 h-5 text-cyan-400" /> Edit Profile
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Display Name</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full bg-[#111827] rounded-xl border border-gray-700 px-4 py-3 pl-10 text-white outline-none focus:border-cyan-400 transition-colors"
                                placeholder="Your username"
                            />
                            <Users className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Shipping Address</label>
                        <div className="relative">
                            <textarea 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                className="w-full bg-[#111827] rounded-xl border border-gray-700 px-4 py-3 pl-10 text-white outline-none focus:border-cyan-400 transition-colors min-h-[100px] resize-none"
                                placeholder="Enter your full delivery address..."
                            />
                            <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-4" />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button type="button" onClick={onClose} className="flex-1 bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white font-bold py-3 rounded-xl transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ==========================================
// 5. USER PROFILE COMPONENT (Updated Logic)
// ==========================================
const UserProfile = ({ onBack, username, onLogout, orders }) => {
  const [subView, setSubView] = useState('menu'); 
  
  // Local state for profile details
  const [displayName, setDisplayName] = useState(username || "Guest User");
  const [shippingAddress, setShippingAddress] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSaveProfile = (newName, newAddress) => {
      setDisplayName(newName);
      setShippingAddress(newAddress);
      setShowEditModal(false);
  };

  if (subView === 'orders') {
      return (
        <MyOrdersView 
            onBack={() => setSubView('menu')} 
            orders={orders} 
            address={shippingAddress} // Pass the address here
            username={displayName}
        />
      );
  }
  
  if (subView === 'settings') return <SettingsView onBack={() => setSubView('menu')} username={displayName} />;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-4xl mx-auto">
        
        {/* Render the Modal if State is true */}
        {showEditModal && (
            <EditProfileModal 
                currentName={displayName} 
                currentAddress={shippingAddress} 
                onClose={() => setShowEditModal(false)} 
                onSave={handleSaveProfile} 
            />
        )}

        <button onClick={onBack} className="text-xl md:text-2xl flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors"><ArrowLeft className="w-6 h-6" /> Back to Shop</button>
        
        <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] z-10">
                <span className="text-4xl font-black text-[#1a1a40]">{displayName ? displayName.charAt(0).toUpperCase() : "U"}</span>
            </div>
            
            <div className="text-center md:text-left space-y-2 z-10 flex-1">
                <h1 className="text-4xl font-bold text-white">{displayName}</h1>
                <p className="text-gray-400">Member since 2024 • Pro Athlete</p>
                
                {/* Address Preview (Optional) */}
                {shippingAddress && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 mt-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span className="truncate max-w-xs">{shippingAddress}</span>
                    </div>
                )}

                {/* EDIT PROFILE BUTTON - Now opens Modal */}
                <button 
                    onClick={() => setShowEditModal(true)} 
                    className="bg-white/10 hover:bg-cyan-500 hover:text-[#1a1a40] px-6 py-2 rounded-full text-sm font-bold transition-all mt-4 border border-white/10"
                >
                    Edit Profile
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button onClick={() => setSubView('orders')} className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-cyan-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 text-cyan-400"><Package className="w-8 h-8" /></div>
                <div><h3 className="text-xl font-bold text-white">My Orders</h3><p className="text-gray-400 text-sm">Track active shipments</p></div>
            </button>
            <button onClick={() => setSubView('settings')} className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-cyan-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 text-cyan-400"><Settings className="w-8 h-8" /></div>
                <div><h3 className="text-xl font-bold text-white">Settings</h3><p className="text-gray-400 text-sm">Account security</p></div>
            </button>
            <button onClick={onLogout} className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-red-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6 col-span-1 md:col-span-2">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-red-400/20 text-red-400"><LogOut className="w-8 h-8" /></div>
                <div><h3 className="text-xl font-bold text-red-400">Log Out</h3><p className="text-gray-400 text-sm">Sign out of account</p></div>
            </button>
        </div>
    </div>
  );
};

// ==========================================
// 6. ADMIN DASHBOARD COMPONENT
// ==========================================
const AdminDashboard = ({ onBack, username }) => {
    // Mock Data for Admin View
    const stats = [
        { label: "Total Revenue", value: "$124,592", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
        { label: "Active Users", value: "1,842", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Pending Orders", value: "34", icon: Package, color: "text-orange-400", bg: "bg-orange-400/10" },
    ];

    const recentOrders = [
        { id: "#ORD-9921", user: "John Doe", items: "Olympic Barbell", status: "Pending", amount: "$299" },
        { id: "#ORD-9922", user: "Jane Smith", items: "Yoga Mat Pro", status: "Shipped", amount: "$45" },
        { id: "#ORD-9923", user: "Mike Ross", items: "Dumbbell Set", status: "Delivered", amount: "$150" },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-7xl mx-auto pb-10">
            <button onClick={onBack} className="text-xl md:text-2xl flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-6 h-6" /> Back to Shop
            </button>
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl font-black italic text-white uppercase tracking-wider">Admin <span className="text-cyan-400">Dashboard</span></h1>
                    <p className="text-gray-400 mt-2">Welcome back, {username}. Here is what's happening today.</p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] font-bold py-2 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                        Add New Product
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#1f2937]/60 border border-white/5 p-6 rounded-2xl flex items-center gap-6 shadow-lg hover:border-cyan-400/30 transition-all">
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm font-bold uppercase">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-cyan-400" /> Recent Orders
                    </h3>
                    <button className="text-sm text-cyan-400 hover:text-white">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Items</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {recentOrders.map((order, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors text-gray-300">
                                    <td className="p-4 font-mono text-cyan-400">{order.id}</td>
                                    <td className="p-4 font-bold text-white">{order.user}</td>
                                    <td className="p-4">{order.items}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                                            order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-orange-500/20 text-orange-400'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-bold text-white">{order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 7. MAIN HOMEPAGE COMPONENT
// ==========================================
export default function Homepage({ onLogout, username, isAdmin }) {
  const router = useRouter(); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const categories = ["All", "Strength", "Cardio", "Accessories", "Recovery"];
  
  // HERO SLIDES
  const heroSlides = [
    { id: 1, subtitle: "HEAVY DUTY GEAR", title: "BUILD YOUR", highlight: "DREAM GYM", gradient: "from-blue-900 to-cyan-900", texture: "https://www.transparenttextures.com/patterns/diagmonds-light.png" },
    { id: 2, subtitle: "PERFORMANCE WEAR", title: "UNLEASH YOUR", highlight: "TRUE POWER", gradient: "from-purple-900 to-pink-900", texture: "https://www.transparenttextures.com/patterns/carbon-fibre.png" },
    { id: 3, subtitle: "HOME ESSENTIALS", title: "TRAIN HARD", highlight: "STAY STRONG", gradient: "from-gray-800 to-black", texture: "https://www.transparenttextures.com/patterns/cubes.png" }
  ];

  useEffect(() => {
    const timer = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % heroSlides.length); }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // NEW: SIMULATE ORDER UPDATES EVERY 10 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
        setPastOrders(currentOrders => {
            return currentOrders.map(order => {
                if (order.status === "Processing") {
                    return { ...order, status: "Shipped", deliveryDate: "Est: 5 Days" };
                } else if (order.status === "Shipped") {
                    return { ...order, status: "In - Transit", deliveryDate: "Est: 2 Days" };
                } else if (order.status === "In - Transit") {
                    return { ...order, status: "Delivered", deliveryDate: "Arrived" };
                }
                return order; // Already Delivered
            });
        });
    }, 10000); // 10000ms = 10 seconds

    return () => clearInterval(interval);
  }, []);

  // POPULAR ITEMS
  const popularItems = [
    { id: 1, name: "Olympic Barbell", category: "Strength", image: "images/Olympic_Barbell.jpg" },
    { id: 26, name: "Elite Treadmill", category: "Cardio", image: "images/Elite Treadmill.jpg" },
    { id: 5, name: "Dumbbell Set", category: "Strength", image: "images/Dumbell Set.jpg" },
    { id: 51, name: "Yoga Mat Pro", category: "Accessories", image: "images/Yoga Mat Pro.jpg" },
    { id: 76, name: "Massage Gun", category: "Recovery", image: "images/Massage Gun.jpg" }
  ];

  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const isMatch = (item) => item.id === productToAdd.id && item.selectedSize === productToAdd.selectedSize;
      const existingItem = prevItems.find(isMatch);
      if (existingItem) {
        return prevItems.map((item) => isMatch(item) ? { ...item, quantity: (item.quantity || 1) + (productToAdd.quantity || 1) } : item);
      } else {
        return [...prevItems, { ...productToAdd, quantity: productToAdd.quantity || 1, selectedSize: productToAdd.selectedSize || "One Size" }];
      }
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const handleCartCheckout = (checkoutData) => {
      const newOrders = checkoutData.items.map(item => ({
          id: Math.floor(Math.random() * 10000).toString(),
          date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' }),
          items: item.name,
          price: item.price * (item.quantity || 1),
          status: "Processing",
          deliveryDate: "Pending",
          image: item.image,
          quantity: item.quantity || 1,
          selectedSize: item.selectedSize || "One Size"
      }));
      setPastOrders(prev => [...newOrders, ...prev]);
      setCartItems([]); 
      setShowThankYou(true);
  };

  const handleBuyNow = (orderData) => {
      setPastOrders(prev => [orderData, ...prev]); 
      setShowThankYou(true);
  };

  const closeThankYou = () => {
      setShowThankYou(false);
      setCurrentView('home');
  };

  const goToOrders = () => {
      setShowThankYou(false);
      setCurrentView('user');
  };

  const filteredProducts = Product.filter(item => {
    return (selectedCategory === "All" || item.category === selectedCategory) && 
           item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderProductImage = (item) => {
    const img = item.image || "";
    const isImage = img.startsWith('http') || img.startsWith('images/') || img.includes('.');
    if (isImage) {
      return <img src={img} alt={item.name} className="w-full h-full object-cover absolute inset-0" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400?text=No+Image"; }} />;
    } else {
      return <div className={`w-full h-full absolute inset-0 ${img}`}></div>;
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[#1a1a40] to-[#22d3ee] text-white overflow-y-auto overflow-x-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      {showThankYou && <ThankYouModal onClose={closeThankYou} onViewOrders={goToOrders} />}

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(item) => { addToCart(item); setSelectedProduct(null); }} onBuyNow={handleBuyNow} />}

      <div className="py-4 text-white relative z-50">
        <Topbar 
            onCartClick={() => setCurrentView("cart")} 
            onHomeClick={() => setCurrentView("home")} 
            onUserClick={() => setCurrentView("user")} 
            searchValue={searchQuery} 
            onSearchChange={setSearchQuery} 
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        />
        {/* ADMIN PANEL BUTTON IN TOP RIGHT IF ADMIN */}
        {isAdmin && (
            <div className="absolute top-20 right-4 md:right-8 z-50 animate-in fade-in duration-500">
                <button 
                    onClick={() => setCurrentView("admin")}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                    <Shield className="w-4 h-4" /> Admin Panel
                </button>
            </div>
        )}
      </div>
      
      <main className="pt-20 md:pt-24 2xl:pt-32 pb-10 px-4 md:px-8 2xl:px-16 max-w-[2000px] mx-auto space-y-10 2xl:space-y-20">
        
        {/* VIEW: CART */}
        {currentView === 'cart' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button onClick={() => setCurrentView('home')} className="text-xl md:text-2xl 2xl:text-4xl flex items-center gap-2 text-cyan-400 hover:text-white mb-6 transition-colors"><ArrowLeft className=" w-5 h-5" /> Back to Shop</button>
              <CartPage cartItems={cartItems} onRemoveItem={removeFromCart} onCheckout={handleCartCheckout} />
          </div>
        )}

        {/* VIEW: USER PROFILE */}
        {currentView === 'user' && <UserProfile onBack={() => setCurrentView("home")} onLogout={onLogout} username={username} orders={pastOrders} />}

        {/* VIEW: ADMIN DASHBOARD */}
        {currentView === 'admin' && isAdmin && (
            <AdminDashboard onBack={() => setCurrentView("home")} username={username} />
        )}

        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            {/* HERO SLIDER */}
            <div className="relative w-full h-[250px] md:h-[400px] 2xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-cyan-500/20 mb-16">
                {heroSlides.map((slide, index) => (
                    <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-r ${slide.gradient} flex items-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('${slide.texture}')` }}></div>
                        <div className="relative z-10 px-8 md:px-16 2xl:px-32 w-full max-w-2x1">
                            <h3 className="text-cyan-400 font-bold tracking-widest text-sm md:text-lg 2xl:text-2xl mb-2 uppercase">{slide.subtitle}</h3>
                            <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-black italic mb-6 leading-none tracking-tighter">{slide.title} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">{slide.highlight}</span></h1>
                            
                        </div>
                    </div>
                ))}
                <div className="absolute bottom-6 left-8 md:left-16 z-20 flex gap-3">
                    {heroSlides.map((_, index) => ( <button key={index} onClick={() => setCurrentSlide(index)} className={`transition-all duration-300 rounded-full shadow-lg ${currentSlide === index ? "w-8 h-3 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "w-3 h-3 bg-white/30 hover:bg-white"}`} /> ))}
                </div>
            </div>

            {/* EXPANDING CARDS */}
            <div className="space-y-6">
               <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">Popular Items</h2>
               <div className="flex w-full h-[300px] md:h-[400px] 2xl:h-[500px] gap-2 md:gap-4">
                  {popularItems.map((item, index) => (
                    <div key={item.id} onClick={() => setActiveSlide(index)} className={`relative rounded-[20px] bg-cover bg-center cursor-pointer transition-[flex] duration-700 ease-in-out group overflow-hidden border border-white/10 ${activeSlide === index ? 'flex-[5] shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'flex-[1] opacity-60 hover:opacity-100 hover:flex-[1.5]'}`} style={{ backgroundImage: `url('${item.image}')` }}>
                        <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 ${activeSlide === index ? 'bg-black/10' : 'group-hover:bg-black/20'}`}></div>
                        <div className={`absolute bottom-0 left-0 p-4 md:p-8 transition-all duration-500 ${activeSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                           {activeSlide === index && ( <> <span className="text-cyan-400 font-bold text-sm tracking-widest uppercase">{item.category}</span> <h3 className="text-white text-2xl md:text-4xl font-black italic uppercase shadow-black drop-shadow-lg mb-2">{item.name}</h3> <button className="bg-white/20 hover:bg-cyan-400 hover:text-black backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold transition-all">View Details</button> </> )}
                        </div>
                        {activeSlide !== index && ( <div className="absolute inset-0 flex items-center justify-center hidden md:flex"><span className="text-white/80 font-bold text-xl uppercase -rotate-90 tracking-widest whitespace-nowrap">{item.name}</span></div> )}
                    </div>
                  ))}
               </div>
            </div>

            {/* PRODUCTS */}
            <div className="space-y-4 2xl:space-y-8 mt-16">
              <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">Browse by Category</h2>
              <div className="flex gap-4 2xl:gap-8 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((cat, index) => ( <button key={index} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 2xl:px-10 2xl:py-4 2xl:text-xl rounded-full border whitespace-nowrap transition-all ${selectedCategory === cat ? "bg-white text-[#1a1a40] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-105" : "bg-transparent border-white/30 hover:border-cyan-400 hover:text-cyan-400 text-gray-300"}`}>{cat}</button> ))}
              </div>
            </div>

            <div className="space-y-4 2xl:space-y-8 mt-10">
              <div className="flex justify-between items-end">
                <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold italic tracking-wide">{selectedCategory === "All" ? "Best Sellers" : `${selectedCategory} Equipment`}</h2>
                <button onClick={() => setSelectedCategory("All")} className="text-cyan-400 text-sm 2xl:text-xl hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 2xl:gap-8">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => (
                    <div key={index} className="bg-[#1f2937]/60 backdrop-blur-sm rounded-2xl p-3 md:p-4 2xl:p-6 border border-white/10 hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300 group shadow-lg flex flex-col justify-between">
                      <div className={`w-full aspect-square rounded-xl mb-3 2xl:mb-5 relative overflow-hidden flex items-center justify-center bg-gray-800`}>
                        {renderProductImage(item)}
                        <span className="text-white/20 font-black italic text-xl 2xl:text-3xl uppercase -rotate-12 select-none z-0 relative">{item.name.split(" ")[0]}</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 z-10">
                          <button onClick={() => setSelectedProduct(item)} className="bg-white text-black text-xs 2xl:text-base font-bold px-3 py-1 2xl:px-5 2xl:py-2 rounded-full cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors">Quick View</button>
                        </div>
                      </div>
                      <div className="space-y-1 2xl:space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm md:text-base 2xl:text-xl truncate w-3/4">{item.name}</h3>
                          <div className="flex items-center text-yellow-400 text-xs 2xl:text-base"><Star className="w-3 h-3 2xl:w-5 2xl:h-5 fill-current" /><span className="ml-1">{item.rating}</span></div>
                        </div>
                        <p className="text-gray-400 text-xs 2xl:text-sm">Pro Equipment</p>
                        <div className="flex justify-between items-center mt-2 2xl:mt-4">
                          <span className="text-cyan-400 font-bold text-lg 2xl:text-2xl">{item.price}</span>
                          <button onClick={(e) => { e.stopPropagation(); if (item.variants && item.variants.length > 0) { setSelectedProduct(item); } else { const priceStr = item.price.toString(); const match = priceStr.match(/(\d+)/); const safePrice = match ? parseInt(match[0]) : 0; addToCart({ ...item, price: safePrice }); } }} className="bg-white/10 hover:bg-cyan-500 hover:text-[#1a1a40] p-2 2xl:p-3 rounded-lg transition-colors"><ShoppingCart className="w-4 h-4 2xl:w-6 2xl:h-6" /></button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : ( <div className="col-span-full text-center text-gray-400 py-10 italic">No products found in this category.</div> )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}