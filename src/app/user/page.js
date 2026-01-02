'use client';
import React, { useState, useEffect } from 'react';
import { Package, LogOut, Settings, ArrowLeft, Truck, Shield, Palette, Trophy, EyeOff } from 'lucide-react';

// --- SETTINGS VIEW ---
const SettingsView = ({ onBack, isBeastMode, settings, onToggle }) => {
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const highlightColor = isBeastMode ? "bg-red-600" : "bg-cyan-500";

    return (
        <div className="fixed inset-0 z-[1000] bg-[#0b0b15] text-white overflow-y-auto p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="max-w-3xl mx-auto">
                <button onClick={onBack} className={`flex items-center gap-2 mb-8 font-bold ${themeColor} uppercase text-xs tracking-widest`}><ArrowLeft size={18} /> BACK</button>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-10">System <span className={themeColor}>Configs</span></h2>
                <div className="space-y-6">
                    <div className="bg-[#1f2937]/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Interface Mods</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                                <span>Performance HUD</span>
                                <button onClick={() => onToggle('performanceHud')} className={`w-12 h-6 rounded-full relative ${settings.performanceHud ? highlightColor : 'bg-gray-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.performanceHud ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                                <span>Cyber Scanlines</span>
                                <button onClick={() => onToggle('scanlines')} className={`w-12 h-6 rounded-full relative ${settings.scanlines ? highlightColor : 'bg-gray-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.scanlines ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1f2937]/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Privacy</p>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                            <span>Incognito Mode</span>
                            <button onClick={() => onToggle('incognito')} className={`w-12 h-6 rounded-full relative ${settings.incognito ? highlightColor : 'bg-gray-700'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.incognito ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- RESTORED DETAILED MY ORDERS VIEW ---
const MyOrdersView = ({ onBack, orders, isBeastMode, settings }) => {
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const btnColor = isBeastMode ? "border-red-600 text-red-500" : "border-orange-600 text-orange-500";

    return (
      <div className="fixed inset-0 z-[1000] bg-[#0b0b15] text-white overflow-y-auto p-8 animate-in slide-in-from-bottom-10">
        <div className="max-w-5xl mx-auto">
            <button onClick={onBack} className={`flex items-center gap-2 mb-8 font-bold ${themeColor} uppercase text-xs tracking-widest`}><ArrowLeft size={16}/> BACK</button>
            <h2 className="text-3xl font-bold mb-8">My Orders</h2>
            <div className="space-y-6">
                {orders.map((order, idx) => (
                    <div key={idx} className="bg-[#1f2937]/50 rounded-[20px] p-6 border border-white/5 shadow-xl">
                        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-4">
                                <span className="bg-[#2d3748] px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400">Order #{order.id || idx + 101}</span>
                                <span className="text-xs text-gray-500 font-medium">Placed: Jan 01, 2026</span>
                            </div>
                            <button className={`flex items-center gap-2 px-5 py-2 rounded-full border ${btnColor} text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all`}>
                                <Truck size={14} /> TRACK ORDER
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="w-24 h-28 bg-[#2d3748]/50 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {settings.incognito ? <Package className={themeColor} size={32}/> : <img src={order.image} className="w-full h-full object-contain p-2" onError={(e) => { e.target.style.display = 'none'; }}/>}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">{settings.incognito ? "SYSTEM GEAR" : (order.items || "Equipment Item")}</h3>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-400 font-bold text-sm">Qty: {order.quantity || 1}</span>
                                    <span className={`text-lg font-black ${themeColor}`}>₱{(order.price || 0).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-12 w-full md:w-auto">
                                <div>
                                    <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest mb-1">Status</p>
                                    <p className="font-black text-sm text-orange-500 uppercase tracking-tighter">{order.status || 'Processing'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
};

// --- MAIN PROFILE ---
const UserProfile = ({ onBack, username, onLogout, orders, isBeastMode, totalPoints, tierData }) => {
    const [view, setView] = useState('menu');
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const highlightColor = isBeastMode ? "bg-red-600" : "bg-cyan-500";
    const progressPercent = Math.min(100, Math.floor((totalPoints / (tierData.next || 1000)) * 100));

    const [settings, setSettings] = useState({ performanceHud: false, scanlines: false, incognito: false });

    useEffect(() => {
        const saved = localStorage.getItem('adrenaline_hub_settings');
        if (saved) {
            const parsed = JSON.parse(saved);
            setSettings(parsed);
            if (parsed.scanlines) document.body.classList.add('scanlines-active');
        }
    }, []);

    const handleToggle = (key) => {
        setSettings(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            localStorage.setItem('adrenaline_hub_settings', JSON.stringify(newState));
            if (key === 'scanlines') document.body.classList.toggle('scanlines-active', newState.scanlines);
            return newState;
        });
    };

    if (view === 'orders') return <MyOrdersView onBack={() => setView('menu')} orders={orders} isBeastMode={isBeastMode} settings={settings} />;
    if (view === 'settings') return <SettingsView onBack={() => setView('menu')} isBeastMode={isBeastMode} settings={settings} onToggle={handleToggle} />;

    return (
      <div className="max-w-5xl mx-auto p-8 animate-in fade-in duration-700 relative">
         {settings.performanceHud && (
            <div className={`fixed top-10 right-10 z-[5000] bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl font-mono text-[10px] w-48 shadow-2xl border-t-2 ${isBeastMode ? 'hud-glow-red' : 'hud-glow-cyan'}`}>
                <div className="flex justify-between mb-2 border-b border-white/10 pb-1">
                    <span className="text-gray-500 uppercase tracking-widest text-[8px]">ADRLN_OS</span>
                    <span className={`animate-pulse ${themeColor}`}>ACTIVE</span>
                </div>
                <div className="flex justify-between"><span>TIER:</span> <span>{tierData.name}</span></div>
                <div className="flex justify-between"><span>AP:</span> <span className={themeColor}>{totalPoints}</span></div>
            </div>
         )}

         <button onClick={onBack} className={`flex items-center gap-2 mb-10 ${themeColor} font-black text-xs uppercase tracking-widest`}><ArrowLeft size={16}/> RETURN TO SHOP</button>
         
         {/* HEADER SECTION */}
         <div className="bg-[#1f2937]/80 backdrop-blur-xl p-8 md:p-10 rounded-[40px] border border-white/10 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
             <div className={`w-24 h-44 rounded-full bg-gradient-to-b ${isBeastMode ? 'from-red-600 via-red-900 to-black' : 'from-cyan-400 via-blue-600 to-blue-900'} flex items-center justify-center border-4 border-white/10 flex-shrink-0 shadow-2xl`}>
                 <span className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{username?.charAt(0).toUpperCase()}</span>
             </div>
             <div className="flex-1 w-full text-center md:text-left z-10 overflow-hidden">
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-white break-words">{settings.incognito ? "AGENT_HIDDEN" : username}</h1>
                    {!settings.incognito && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md ${themeColor}`}>
                            <Trophy size={20} /><span className="font-black text-lg">{totalPoints}</span>
                        </div>
                    )}
                 </div>
                 <div className="bg-black/40 backdrop-blur-md rounded-3xl p-5 border border-white/5 w-full max-w-md mx-auto md:mx-0">
                     <p className={`text-[10px] uppercase font-black tracking-widest mb-2 ${themeColor}`}>{tierData.name} Rank</p>
                     <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden"><div className={`h-full ${isBeastMode ? 'bg-red-600' : 'bg-cyan-500'}`} style={{width:`${progressPercent}%`}}></div></div>
                 </div>
             </div>
         </div>

         {/* NAV GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
             <button onClick={()=>setView('orders')} className="group bg-[#1f2937]/60 p-10 rounded-[40px] border border-white/5 hover:border-white/20 flex items-center gap-8 transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-3xl ${isBeastMode ? 'bg-red-600/10' : 'bg-cyan-400/10'} flex items-center justify-center`}><Package className={themeColor} size={32}/></div>
                <div className="text-left"><p className="font-black italic uppercase text-3xl tracking-tighter">Orders</p><p className="text-[10px] text-gray-500 font-black uppercase mt-1">Transaction History</p></div>
             </button>
             <button onClick={()=>setView('settings')} className="group bg-[#1f2937]/60 p-10 rounded-[40px] border border-white/5 hover:border-white/20 flex items-center gap-8 transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-3xl ${isBeastMode ? 'bg-red-600/10' : 'bg-cyan-400/10'} flex items-center justify-center`}><Settings className={themeColor} size={32}/></div>
                <div className="text-left"><p className="font-black italic uppercase text-3xl tracking-tighter">Settings</p><p className="text-[10px] text-gray-500 font-black uppercase mt-1">Modify System UI</p></div>
             </button>
             <button onClick={onLogout} className="md:col-span-2 group bg-red-600/5 p-8 rounded-[32px] border border-red-600/20 hover:bg-red-600 transition-all flex items-center justify-center gap-4">
                <LogOut className="text-red-500 group-hover:text-white" size={24}/> <span className="font-black uppercase tracking-[0.4em] text-red-500 group-hover:text-white">Abort Session</span>
             </button>
         </div>
      </div>
    );
};

export default UserProfile;