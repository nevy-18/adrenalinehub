'use client';
import React, { useState } from 'react';
import { User, Package, LogOut, Settings, ArrowLeft, Truck, Mail, X, Zap } from 'lucide-react';

// --- SUB-COMPONENT: ORDERS VIEW ---
const MyOrdersView = ({ onBack, orders, isBeastMode }) => {
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const highlightColor = isBeastMode ? "text-red-400" : "text-cyan-400";
    const borderColor = isBeastMode ? "hover:border-red-500/30" : "hover:border-cyan-400/30";
    const btnText = "text-orange-400";

    return (
      <div className="fixed inset-0 z-[1000] bg-[#111827] text-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <div className="bg-[#1f2937] shadow-sm sticky top-0 z-10 px-8 py-4 flex items-center justify-between border-b border-white/5">
           <div className="flex items-center gap-8"><h1 className="text-xl font-bold tracking-widest uppercase italic">ADRENALINE<span className={highlightColor}>HUB</span></h1></div>
           <button onClick={onBack} className={`flex items-center gap-2 text-sm font-bold ${highlightColor} hover:text-white transition-colors`}><ArrowLeft className="w-4 h-4" /> BACK TO PROFILE</button>
        </div>
  
        <div className="max-w-5xl mx-auto p-8">
          <h2 className="text-3xl font-bold text-white mb-8">My Orders</h2>
          <div className="space-y-6">
              {orders && orders.length > 0 ? orders.map((order, index) => (
              <div key={index} className={`bg-[#1f2937]/60 border border-white/5 rounded-2xl p-6 ${borderColor} transition-all shadow-lg`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <div className="flex items-center gap-4">
                          <div className="bg-white/5 px-4 py-1.5 rounded-full text-sm font-bold text-gray-300 border border-white/10">Order <span className={themeColor}>#{order.id}</span></div>
                          <span className="text-gray-500 text-xs">Placed: {order.date}</span>
                      </div>
                      <button className={`bg-orange-500/20 ${btnText} border border-orange-500/50 text-xs font-bold py-2 px-6 rounded-full uppercase tracking-wider flex items-center gap-2`}><Truck className="w-3 h-3" /> Track Order</button>
                  </div>
                  <div className="flex gap-6">
                      <div className="w-24 h-32 rounded-lg bg-gray-800 overflow-hidden border border-white/10 flex-shrink-0">
                           {order.image?.includes('http') || order.image?.includes('/') ? <img src={order.image} className="w-full h-full object-cover" onError={(e)=>e.target.style.display='none'}/> : <div className={`w-full h-full ${order.image}`}></div>}
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div>
                              <h3 className="font-bold text-lg text-white mb-1">{order.items}</h3>
                              <p className="text-gray-400 text-sm">Qty: <span className="text-white">{order.quantity || 1}</span> <span className={`ml-4 font-bold ${themeColor} text-lg`}>${order.price}</span></p>
                          </div>
                          <div>
                              <p className="text-gray-500 text-xs uppercase font-bold mb-1">Status</p>
                              <p className={`font-bold flex items-center gap-2 ${order.status === "Delivered" ? "text-green-400" : "text-orange-400"}`}>{order.status}</p>
                          </div>
                          <div>
                              <p className="text-gray-500 text-xs uppercase font-bold mb-1">Estimated Delivery:</p>
                              <p className="text-white font-bold text-lg">{order.deliveryDate}</p>
                          </div>
                      </div>
                  </div>
              </div>
              )) : <div className="text-center text-gray-400 py-10">No active orders found.</div>}
          </div>
        </div>
      </div>
    );
};

// --- SUB-COMPONENT: SETTINGS VIEW ---
const SettingsView = ({ onBack, username, isBeastMode }) => {
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const btnClass = isBeastMode ? "bg-red-600 hover:bg-red-500" : "bg-cyan-500 hover:bg-cyan-400";

    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-[#1f2937] w-full max-w-lg rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden animate-in zoom-in-95 duration-200 relative">
          <button onClick={onBack} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
          <div className="p-6 border-b border-white/5 bg-white/5"><h2 className="text-2xl font-bold text-white flex items-center gap-2"><Settings className={`w-6 h-6 ${themeColor}`} /> Settings</h2></div>
          <div className="p-6 space-y-4">
              <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Display Name</label>
                  <div className="flex items-center bg-[#111827] rounded-xl border border-gray-700 px-4 py-3"><User className="w-5 h-5 text-gray-500 mr-3" /><input type="text" defaultValue={username || "Guest User"} className="bg-transparent w-full text-white outline-none text-sm" /></div>
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Email</label>
                  <div className="flex items-center bg-[#111827] rounded-xl border border-gray-700 px-4 py-3"><Mail className="w-5 h-5 text-gray-500 mr-3" /><input type="email" defaultValue="user@example.com" className="bg-transparent w-full text-white outline-none text-sm" /></div>
              </div>
              <button className={`w-full py-3.5 ${btnClass} text-[#1a1a40] font-bold rounded-xl shadow-lg transition-all text-sm`}>Save Changes</button>
          </div>
        </div>
      </div>
    );
};

// --- MAIN COMPONENT ---
// Receives totalPoints from Homepage
const UserProfile = ({ onBack, username, onLogout, orders, isBeastMode, totalPoints }) => {
    const [subView, setSubView] = useState('menu'); 
    
    // Theme Variables
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const bgGradient = isBeastMode ? "from-red-900/40 to-black" : "from-cyan-900/40 to-blue-900/40";
    const progressColor = isBeastMode ? "bg-red-500" : "bg-cyan-400";
    const btnHoverBorder = isBeastMode ? "hover:border-red-500/50" : "hover:border-cyan-400/50";
    const iconBgGroup = isBeastMode ? "group-hover:bg-red-400/20" : "group-hover:bg-cyan-400/20";

    // --- TIER LOGIC (New Hierarchy) ---
    const getTierStats = (points) => {
        if (points >= 10000) return { name: "Adamantite", next: 20000, color: "text-red-600" };
        if (points >= 5000) return { name: "Diamond", next: 10000, color: "text-cyan-200" };
        if (points >= 2500) return { name: "Platinum", next: 5000, color: "text-cyan-400" };
        if (points >= 1000) return { name: "Gold", next: 2500, color: "text-yellow-400" }; // BEAST MODE UNLOCK
        if (points >= 500) return { name: "Silver", next: 1000, color: "text-gray-300" };
        if (points >= 200) return { name: "Bronze", next: 500, color: "text-orange-400" };
        return { name: "Newbie", next: 200, color: "text-gray-500" };
    };

    const tier = getTierStats(totalPoints);
    const pointsToNext = tier.next - totalPoints;
    const progressPercent = Math.min(100, Math.floor((totalPoints / tier.next) * 100));

    if (subView === 'orders') return <MyOrdersView onBack={() => setSubView('menu')} orders={orders} isBeastMode={isBeastMode} />;
    if (subView === 'settings') return <SettingsView onBack={() => setSubView('menu')} username={username} isBeastMode={isBeastMode} />;
  
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-4xl mx-auto">
         <button onClick={onBack} className={`text-xl md:text-2xl flex items-center gap-2 ${themeColor} hover:text-white mb-8 transition-colors`}><ArrowLeft className="w-6 h-6" /> Back to Shop</button>
         <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
             <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${isBeastMode ? 'from-red-600 to-orange-600' : 'from-cyan-400 to-blue-600'} flex items-center justify-center shadow-lg border-4 border-[#1f2937]`}>
                 <span className="text-4xl font-black text-[#1a1a40]">{username ? username.charAt(0).toUpperCase() : "U"}</span>
             </div>
             <div className="text-center md:text-left space-y-2 w-full">
                 <h1 className="text-4xl font-bold text-white">{username || "Guest User"}</h1>
                 <p className="text-gray-400">Member since 2024 • Pro Athlete</p>
                 <button onClick={() => setSubView('settings')} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition-all mt-2 border border-white/5">Edit Profile</button>
                 
                 {/* --- GAMIFICATION CARD --- */}
                 <div className={`bg-gradient-to-r ${bgGradient} p-4 rounded-xl border border-white/5 mt-4 relative overflow-hidden w-full max-w-md shadow-lg group`}>
                      <div className="flex justify-between items-center mb-2 relative z-10">
                          <div>
                              <h3 className="text-white font-black italic text-sm">ADRENALINE <span className={tier.color}>TIER</span></h3>
                              <p className="text-gray-400 text-xs">You have <span className="text-white font-bold">{totalPoints.toLocaleString()} AP</span></p>
                          </div>
                          <span className={`bg-white text-black text-[10px] font-black px-2 py-1 rounded-full uppercase`}>{tier.name}</span>
                      </div>
                      
                      <div className="w-full h-3 bg-gray-900/50 rounded-full overflow-hidden relative z-10 border border-white/10">
                          <div className={`h-full ${progressColor} shadow-[0_0_15px_currentColor] transition-all duration-1000 ease-out`} style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      
                      <p className="text-right text-[10px] text-gray-400 mt-1 relative z-10">{pointsToNext.toLocaleString()} AP to next rank</p>
                      <Zap className={`absolute right-[-10px] bottom-[-10px] w-16 h-16 ${isBeastMode ? 'text-orange-500/20' : 'text-cyan-500/20'} z-0 group-hover:scale-110 transition-transform duration-500`} />
                  </div>
             </div>
         </div>
  
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
             <button onClick={() => setSubView('orders')} className={`bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 ${btnHoverBorder} hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6`}>
                 <div className={`p-4 rounded-xl bg-white/5 ${iconBgGroup} ${themeColor}`}><Package className="w-8 h-8" /></div>
                 <div><h3 className="text-xl font-bold text-white">My Orders</h3><p className="text-gray-400 text-sm">Track active shipments</p></div>
             </button>
             <button onClick={() => setSubView('settings')} className={`bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 ${btnHoverBorder} hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6`}>
                 <div className={`p-4 rounded-xl bg-white/5 ${iconBgGroup} ${themeColor}`}><Settings className="w-8 h-8" /></div>
                 <div><h3 className="text-xl font-bold text-white">Settings</h3><p className="text-gray-400 text-sm">Account preferences</p></div>
             </button>
             <button onClick={onLogout} className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-red-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6 col-span-1 md:col-span-2">
                 <div className="p-4 rounded-xl bg-white/5 group-hover:bg-red-400/20 text-red-400"><LogOut className="w-8 h-8" /></div>
                 <div><h3 className="text-xl font-bold text-red-400">Log Out</h3><p className="text-gray-400 text-sm">Sign out of account</p></div>
             </button>
         </div>
      </div>
    );
};

export default UserProfile;