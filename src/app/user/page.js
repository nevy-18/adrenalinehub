'use client';
import React, { useState } from 'react';
import { User, Package, LogOut, Settings, ArrowLeft, Truck, Mail, X, Zap } from 'lucide-react';

const MyOrdersView = ({ onBack, orders, isBeastMode }) => { /* ... (Same as before) ... */
    // ... (Keep existing code from previous steps, no logic changes needed inside Orders View) ...
    // To save space in this response, assume the code for MyOrdersView and SettingsView is the same as the previous response.
    // I will just reprint the UserProfile main component to show how it handles the new tierData.
    
    // ... Copy MyOrdersView & SettingsView from previous response ...
    return <div className="text-white p-10">Orders View Placeholder (Use previous code)</div>; 
};

// ... SettingsView (Same as previous) ...

// --- MAIN COMPONENT ---
const UserProfile = ({ onBack, username, onLogout, orders, isBeastMode, totalPoints, tierData }) => {
    const [subView, setSubView] = useState('menu'); 
    
    // Theme Variables
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const bgGradient = isBeastMode ? "from-red-900/40 to-black" : "from-cyan-900/40 to-blue-900/40";
    const progressColor = isBeastMode ? "bg-red-500" : "bg-cyan-400";
    const btnHoverBorder = isBeastMode ? "hover:border-red-500/50" : "hover:border-cyan-400/50";
    const iconBgGroup = isBeastMode ? "group-hover:bg-red-400/20" : "group-hover:bg-cyan-400/20";

    // Use passed tierData
    const pointsToNext = tierData.next - totalPoints;
    const progressPercent = Math.min(100, Math.floor((totalPoints / tierData.next) * 100));

    // ... (Views Logic) ...
    
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
                 <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition-all mt-2 border border-white/5">Edit Profile</button>
                 
                 {/* --- GAMIFICATION CARD --- */}
                 <div className={`bg-gradient-to-r ${bgGradient} p-4 rounded-xl border border-white/5 mt-4 relative overflow-hidden w-full max-w-md shadow-lg group`}>
                      <div className="flex justify-between items-center mb-2 relative z-10">
                          <div>
                              <h3 className="text-white font-black italic text-sm">ADRENALINE <span className={tierData.color}>TIER</span></h3>
                              <p className="text-gray-400 text-xs">You have <span className="text-white font-bold">{totalPoints.toLocaleString()} AP</span></p>
                          </div>
                          <span className={`bg-white text-black text-[10px] font-black px-2 py-1 rounded-full uppercase`}>{tierData.name}</span>
                      </div>
                      
                      <div className="w-full h-3 bg-gray-900/50 rounded-full overflow-hidden relative z-10 border border-white/10">
                          <div className={`h-full ${progressColor} shadow-[0_0_15px_currentColor] transition-all duration-1000 ease-out`} style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      
                      <p className="text-right text-[10px] text-gray-400 mt-1 relative z-10">
                          {tierData.discount > 0 && <span className="text-green-400 font-bold mr-2">{Math.floor(tierData.discount * 100)}% Discount Active</span>}
                          {pointsToNext.toLocaleString()} AP to next rank
                      </p>
                      <Zap className={`absolute right-[-10px] bottom-[-10px] w-16 h-16 ${isBeastMode ? 'text-orange-500/20' : 'text-cyan-500/20'} z-0 group-hover:scale-110 transition-transform duration-500`} />
                  </div>
             </div>
         </div>
         {/* ... (Grid Buttons - same as before) ... */}
      </div>
    );
};

export default UserProfile;