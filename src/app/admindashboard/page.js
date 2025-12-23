'use client';
import React from 'react';
import { ArrowLeft, TrendingUp, Users, Package, LayoutDashboard } from 'lucide-react';

const AdminDashboard = ({ onBack, username }) => {
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
                    <p className="text-gray-400 mt-2">Welcome back, {username}.</p>
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] font-bold py-2 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]">Add New Product</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#1f2937]/60 border border-white/5 p-6 rounded-2xl flex items-center gap-6 shadow-lg">
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon className="w-8 h-8" /></div>
                        <div><p className="text-gray-400 text-sm font-bold uppercase">{stat.label}</p><h3 className="text-3xl font-black text-white">{stat.value}</h3></div>
                    </div>
                ))}
            </div>
            <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-cyan-400" /> Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold">
                            <tr><th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Items</th><th className="p-4">Status</th><th className="p-4 text-right">Amount</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentOrders.map((order, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-cyan-400">{order.id}</td>
                                    <td className="p-4 font-bold text-white">{order.user}</td>
                                    <td className="p-4">{order.items}</td>
                                    <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>{order.status}</span></td>
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
export default AdminDashboard;