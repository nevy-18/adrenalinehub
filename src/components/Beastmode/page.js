'use client';
import React from 'react';
import { Flame, Lock } from 'lucide-react';

export const BeastModeToggle = ({ isBeastMode, setIsBeastMode, totalPoints }) => {
    // UNLOCK LOGIC: Gold Tier (1000 AP)
    const isUnlocked = totalPoints >= 1000;

    const handleClick = () => {
        if (isUnlocked) {
            setIsBeastMode(!isBeastMode);
        } else {
            alert("🔒 LOCKED! You need to reach GOLD Tier (1000 AP) to unlock Beast Mode!");
        }
    };

    return (
        <button 
            onClick={handleClick} 
            className={`flex items-center gap-2 ${isUnlocked ? (isBeastMode ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30' : 'bg-gray-800 hover:bg-gray-700 text-gray-300') : 'bg-gray-900 text-gray-500 cursor-not-allowed'} px-4 py-2 rounded-full font-bold shadow-lg transition-all hover:scale-105`}
        >
            {isUnlocked ? <Flame className={`w-4 h-4 ${isBeastMode ? 'fill-current' : ''}`} /> : <Lock className="w-4 h-4" />}
            {isBeastMode ? "BEAST MODE ON" : isUnlocked ? "Beast Mode Off" : "Locked (Need Gold)"}
        </button>
    );
};

export const getBeastTheme = (isBeastMode) => ({
    text: isBeastMode ? "text-red-500" : "text-cyan-400",
    bgGradient: isBeastMode ? "from-black via-red-950 to-black" : "from-[#1a1a40] to-[#22d3ee]",
    button: isBeastMode ? "bg-red-600 hover:bg-red-500" : "bg-cyan-500 hover:bg-cyan-400",
    border: isBeastMode ? "border-red-500/30" : "border-cyan-500/30",
    shadow: isBeastMode ? "shadow-red-500/20" : "shadow-cyan-500/20"
});