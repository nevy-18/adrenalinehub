'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Users, Package, LayoutDashboard, Loader2, CheckCircle } from 'lucide-react';

const AdminDashboard = ({ onBack, username }) => {
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [sRes, oRes] = await Promise.all([
                fetch('http://localhost:3001/admin/stats'),
                fetch('http://localhost:3001/admin/all-orders')
            ]);
            setStats(await sRes.json());
            setOrders(await oRes.json());
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const completeOrder = async (id) => {
        await fetch(`http://localhost:3001/admin/orders/${id}/complete`, { method: 'PATCH' });
        fetchData();
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-cyan-400" /></div>;

    const cards = [
        { label: "Revenue", val: `₱${Number(stats?.totalRevenue || 0).toLocaleString()}`, icon: TrendingUp, color: "text-green-400" },
        { label: "Users", val: stats?.totalUsers || 0, icon: Users, color: "text-blue-400" },
        { label: "Pending", val: stats?.pendingOrders || 0, icon: Package, color: "text-orange-400" },
    ];

    return (
        <div className="max-w-7xl mx-auto p-10 animate-in fade-in">
            <button onClick={onBack} className="text-cyan-400 flex items-center gap-2 mb-8"><ArrowLeft /> BACK</button>
            <h1 className="text-4xl font-black italic uppercase mb-8">Admin <span className="text-cyan-400">Dashboard</span></h1>
            
            <div className="grid grid-cols-3 gap-6 mb-10">
                {cards.map((c, i) => (
                    <div key={i} className="bg-[#1f2937] p-6 rounded-2xl border border-white/5 flex items-center gap-6">
                        <div className={`p-4 rounded-xl bg-white/5 ${c.color}`}><c.icon /></div>
                        <div><p className="text-gray-400 text-xs uppercase font-bold">{c.label}</p><h3 className="text-3xl font-black">{c.val}</h3></div>
                    </div>
                ))}
            </div>

            <div className="bg-[#1f2937] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase font-bold">
                        <tr><th className="p-4">ID</th><th className="p-4">User</th><th className="p-4">Status</th><th className="p-4 text-right">Amount</th><th className="p-4">Action</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.map((o) => (
                            <tr key={o.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-cyan-400">#{o.id}</td>
                                <td className="p-4 font-bold">{o.user}</td>
                                <td className="p-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold ${o.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>{o.status}</span></td>
                                <td className="p-4 text-right font-bold">₱{o.amount}</td>
                                <td className="p-4">
                                    {o.status === 'Processing' && <button onClick={()=>completeOrder(o.id)} className="bg-green-500 text-black px-3 py-1 rounded-lg text-[10px] font-bold">Complete</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;