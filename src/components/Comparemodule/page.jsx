'use client';
import React, { useState, useEffect } from 'react';
import { X, Scale, Star, Search, CheckCircle } from 'lucide-react';

const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    const match = price.toString().match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
};

// --- 1. SELECTION MODAL ---
export const SelectionModal = ({ isOpen, onClose, allProducts, onConfirmSelection, preSelectedId, isBeastMode }) => {
    const [selectedIds, setSelectedIds] = useState(preSelectedId ? [preSelectedId] : []);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (isOpen && preSelectedId) setSelectedIds([preSelectedId]);
        else if (isOpen && !preSelectedId) setSelectedIds([]);
    }, [isOpen, preSelectedId]);

    if (!isOpen) return null;

    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    const bgHover = isBeastMode ? "hover:bg-red-500/20 hover:border-red-500" : "hover:bg-cyan-500/20 hover:border-cyan-400";
    const borderActive = isBeastMode ? "border-red-500 bg-red-500/10" : "border-cyan-400 bg-cyan-400/10";
    const btnColor = isBeastMode ? "bg-red-600 hover:bg-red-500" : "bg-cyan-500 hover:bg-cyan-400";

    const toggleSelection = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(item => item !== id));
        } else {
            if (selectedIds.length < 2) setSelectedIds(prev => [...prev, id]);
            else setSelectedIds(prev => [prev[0], id]); // Replace oldest
        }
    };

    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleConfirm = () => {
        const selectedProducts = allProducts.filter(p => selectedIds.includes(p.id));
        onConfirmSelection(selectedProducts);
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#1f2937] w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <div>
                        <h2 className="text-2xl font-black italic text-white flex items-center gap-2"><Scale className={themeColor} /> SELECT 2 ITEMS</h2>
                        <p className="text-gray-400 text-sm">Select products to compare specs ({selectedIds.length}/2)</p>
                    </div>
                    <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
                </div>
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center bg-[#111827] rounded-xl px-4 py-3 border border-white/10">
                        <Search className="w-5 h-5 text-gray-500 mr-3" />
                        <input type="text" placeholder="Search equipment..." className="bg-transparent w-full text-white outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filtered.map(item => {
                            const isSelected = selectedIds.includes(item.id);
                            return (
                                <div key={item.id} onClick={() => toggleSelection(item.id)} className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? borderActive : 'border-white/5 ' + bgHover}`}>
                                    <div className="aspect-square bg-gray-800 rounded-lg mb-2 overflow-hidden"><img src={item.image} className="w-full h-full object-cover" onError={(e)=>e.target.style.display='none'}/></div>
                                    <p className="text-white font-bold text-sm truncate">{item.name}</p>
                                    <p className="text-gray-400 text-xs">${getNumericPrice(item.price)}</p>
                                    {isSelected && <div className={`absolute top-2 right-2 w-6 h-6 ${isBeastMode ? 'bg-red-500' : 'bg-cyan-400'} rounded-full flex items-center justify-center text-black`}><CheckCircle className="w-4 h-4" /></div>}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="p-6 border-t border-white/10 flex justify-end gap-4 bg-black/20">
                    <button onClick={onClose} className="text-gray-400 hover:text-white px-6 py-3 font-bold">Cancel</button>
                    <button disabled={selectedIds.length !== 2} onClick={handleConfirm} className={`${btnColor} disabled:opacity-50 disabled:cursor-not-allowed text-[#1a1a40] font-bold py-3 px-8 rounded-xl shadow-lg transition-all active:scale-95`}>Analyze ({selectedIds.length}/2)</button>
                </div>
            </div>
        </div>
    );
};

// --- 2. COMPARE RESULT MODAL ---
export const CompareResultModal = ({ products, onClose, isBeastMode }) => {
    if (products.length < 2) return null;
    const [p1, p2] = products;
    const themeColor = isBeastMode ? "text-red-500" : "text-cyan-400";
    
    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
             <div className="bg-[#1f2937] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <h2 className="text-2xl font-black italic text-white flex items-center gap-2"><Scale className={themeColor} /> HEAD TO HEAD</h2>
                    <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
                </div>
                <div className="grid grid-cols-2 text-white">
                    {[p1, p2].map((p, i) => (
                        <div key={i} className={`p-8 ${i===0 ? 'border-r border-white/10' : ''} flex flex-col items-center text-center`}>
                            <div className="w-48 h-48 bg-gray-800 rounded-2xl mb-6 overflow-hidden"><img src={p.image} className="w-full h-full object-cover" onError={(e)=>e.target.style.display='none'}/></div>
                            <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                            <p className={`text-3xl font-black ${themeColor} mb-6`}>${getNumericPrice(p.price)}</p>
                            <div className="w-full space-y-4 text-left">
                                <div className="bg-white/5 p-4 rounded-xl"><p className="text-xs text-gray-400 uppercase font-bold">Category</p><p>{p.category}</p></div>
                                <div className="bg-white/5 p-4 rounded-xl"><p className="text-xs text-gray-400 uppercase font-bold">Rating</p><div className="flex text-yellow-400"><Star className="fill-current w-4 h-4"/> <span className="ml-2 text-white">{p.rating}</span></div></div>
                                <div className="bg-white/5 p-4 rounded-xl"><p className="text-xs text-gray-400 uppercase font-bold">Description</p><p className="text-sm text-gray-400">{p.description || "High performance gear for athletes."}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    )
};

// --- 3. FLOATING BUTTON ---
export const FloatingCompareButton = ({ onClick, isBeastMode }) => {
    const buttonStyle = isBeastMode ? "bg-red-600 hover:bg-red-500 shadow-red-600/30" : "bg-cyan-500 hover:bg-cyan-400 shadow-cyan-400/30";
    return (
        <button onClick={onClick} className={`flex items-center gap-2 ${buttonStyle} px-4 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105 text-white`}>
            <Scale className="w-4 h-4" /> ⚔️ Start Comparison
        </button>
    );
};