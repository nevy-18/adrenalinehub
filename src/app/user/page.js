import React, { useState } from 'react';
import { User, Package, LogOut, Settings, ArrowLeft, ChevronRight, Truck, Bell, Shield, Mail, X, Search, ShoppingBag } from 'lucide-react';

// --- 1. FULL SCREEN VIEW: MY ORDERS (Matches your reference image) ---
const MyOrdersView = ({ onBack }) => {
  const orders = [
    { 
        id: "ORD-0374915036", 
        date: "Thu, 17th Nov '24", 
        total: "Rs. 1,250", 
        status: "In - Transit", 
        items: "Netting Mykonos Tunic Dress", 
        brand: "Milly Thomas",
        deliveryDate: "24 December 2024",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    },
    { 
        id: "ORD-0229915012", 
        date: "Mon, 14th Nov '24", 
        total: "Rs. 1,760", 
        status: "In - Transit", 
        items: "Embroidered Sequin Mini Dress", 
        brand: "Sonia Agrawal",
        deliveryDate: "24 December 2024",
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop"
    },
  ];

  return (
    // FULL SCREEN OVERLAY
    <div className="fixed inset-0 z-[1000] bg-[#f8f9fa] text-gray-800 overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
      
      {/* Top Header (White) */}
      <div className="bg-white shadow-sm sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
         <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-widest uppercase">SHOPPING</h1>
            <div className="hidden md:flex gap-6 text-xs font-bold text-gray-500">
                <span className="cursor-pointer hover:text-black">Shop For MEN</span>
                <span className="cursor-pointer hover:text-black">Shop For WOMEN</span>
            </div>
         </div>
         
         <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
                <input type="text" placeholder="Search..." className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm outline-none focus:ring-1 focus:ring-gray-300" />
                <Search className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
            </div>
         </div>

         <div className="flex items-center gap-6">
             <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">
                <ArrowLeft className="w-4 h-4" /> BACK
             </button>
             <div className="flex items-center gap-1 text-gray-400"><Heart className="w-4 h-4" /> <span className="text-xs">0</span></div>
             <div className="flex items-center gap-1 text-gray-400"><ShoppingBag className="w-4 h-4" /> <span className="text-xs">0</span></div>
             <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">U</div>
         </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
            <h2 className="text-3xl font-light text-gray-800">My Orders</h2>
            <p className="text-gray-400 text-sm mt-1">View and edit all your pending, delivered, and returned orders here.</p>
        </div>

        {/* Order Cards */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {orders.map((order, index) => (
            <div key={index} className="p-8 border-b border-gray-200 last:border-0">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 px-4 py-1.5 rounded-full text-sm font-bold text-gray-700">
                            Order <span className="text-blue-500">#{order.id}</span>
                        </div>
                        <span className="text-gray-400 text-xs">Order Placed: {order.date}</span>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-3 px-8 rounded-full shadow-md transition-all uppercase tracking-wider flex items-center gap-2">
                        <Truck className="w-3 h-3" /> Track Order
                    </button>
                </div>

                {/* Body Row */}
                <div className="flex gap-6">
                    <img src={order.image} className="w-24 h-32 object-cover rounded-md bg-gray-100" />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{order.items}</h3>
                            <p className="text-gray-400 text-sm mb-4">By: {order.brand}</p>
                            <p className="text-gray-500 text-sm">Size: S <span className="mx-2 text-gray-300">|</span> Qty: 1 <span className="ml-4 font-bold text-black">{order.total}</span></p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold mb-1">Status</p>
                            <p className="text-orange-500 font-bold">{order.status}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold mb-1">Delivery Expected by:</p>
                            <p className="text-black font-bold">{order.deliveryDate}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Row */}
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                    <button className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase flex items-center gap-1 transition-colors">
                        <X className="w-4 h-4" /> Cancel Order
                    </button>
                    <div className="text-right">
                        <span className="text-gray-400 text-xs mr-4">Paid using credit card ending with 7343</span>
                        <span className="font-bold text-xl text-gray-900">Rs. 3,010</span>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- 2. SMALLER POPUP VIEW: SETTINGS ---
const SettingsView = ({ onBack, username }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1f2937] w-full max-w-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-200 relative">
        <button onClick={onBack} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
        </button>
        <div className="p-6 border-b border-white/5 bg-white/5">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-cyan-400" /> Settings
            </h2>
        </div>
        <div className="p-6 space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Display Name</label>
                    <div className="flex items-center bg-[#111827] rounded-xl border border-gray-700 px-4 py-3">
                        <User className="w-5 h-5 text-gray-500 mr-3" />
                        <input type="text" defaultValue={username || "Guest User"} className="bg-transparent w-full text-white outline-none text-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Email</label>
                    <div className="flex items-center bg-[#111827] rounded-xl border border-gray-700 px-4 py-3">
                        <Mail className="w-5 h-5 text-gray-500 mr-3" />
                        <input type="email" defaultValue="user@example.com" className="bg-transparent w-full text-white outline-none text-sm" />
                    </div>
                </div>
            </div>
            <button className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] font-bold rounded-xl shadow-lg transition-all text-sm">
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT (With State Logic Added) ---
const UserProfile = ({ onBack, username, onLogout }) => {
  // THIS IS THE MISSING PIECE: STATE TO TRACK WHICH VIEW IS OPEN
  const [subView, setSubView] = useState('menu'); 

  return (
    <>
      {/* Main Profile Menu */}
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-4xl mx-auto">
        <button onClick={onBack} className="text-xl md:text-2xl flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-6 h-6" /> Back to Shop
        </button>

        <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <span className="text-4xl font-black text-[#1a1a40]">{username ? username.charAt(0).toUpperCase() : "U"}</span>
            </div>
            <div className="text-center md:text-left space-y-2">
                <h1 className="text-4xl font-bold text-white">{username || "Guest User"}</h1>
                <p className="text-gray-400">Member since 2024 • Pro Athlete</p>
                <button onClick={() => setSubView('settings')} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition-all mt-2">
                    Edit Profile
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* HERE IS THE FIX: We use setSubView inside onClick */}
            <button onClick={() => setSubView('orders')} className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-cyan-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 text-cyan-400"><Package className="w-8 h-8" /></div>
                <div><h3 className="text-xl font-bold text-white">My Orders</h3><p className="text-gray-400 text-sm">Track active shipments</p></div>
            </button>

            <button onClick={() => setSubView('settings')} className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-cyan-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 text-cyan-400"><Settings className="w-8 h-8" /></div>
                <div><h3 className="text-xl font-bold text-white">Settings</h3><p className="text-gray-400 text-sm">Account preferences</p></div>
            </button>

            <button onClick={onLogout} className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-red-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6 col-span-1 md:col-span-2">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-red-400/20 text-red-400"><LogOut className="w-8 h-8" /></div>
                <div><h3 className="text-xl font-bold text-red-400">Log Out</h3><p className="text-gray-400 text-sm">Sign out of account</p></div>
            </button>
        </div>
      </div>

      {/* --- POPUPS RENDERED HERE BASED ON STATE --- */}
      {subView === 'orders' && <MyOrdersView onBack={() => setSubView('menu')} />}
      {subView === 'settings' && <SettingsView onBack={() => setSubView('menu')} username={username} />}
    </>
  );
};

export default UserProfile;