import React from 'react';
import { Head } from '@inertiajs/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, Users, Package, ShoppingBag, AlertTriangle, 
  ChevronUp, ChevronDown, ArrowUpRight, Clock, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice, getImageUrl } from '../../utils/formatters';

const Dashboard = ({ stats, recent_orders, monthly_revenue = [], status_stats = [], top_products = [], low_stock_products = [] }) => {
  const COLORS = ['#2D4A22', '#F2994A', '#2F80ED', '#9B51E0', '#EB5757'];

  const statCards = [
    { label: 'Revenu Total', value: formatPrice(stats.total_revenue), icon: TrendingUp, change: '+12.5%', isUp: true, color: 'text-nature-green' },
    { label: 'Commandes', value: stats.total_orders, icon: ShoppingBag, change: '+5.2%', isUp: true, color: 'text-blue-600' },
    { label: 'Commandes en attente', value: stats.pending_orders, icon: Users, change: '-2.1%', isUp: false, color: 'text-purple-600' },
    { label: 'Produits Actifs', value: stats.total_products, icon: Package, change: '0%', isUp: true, color: 'text-nature-orange' },
  ];

  return (
    <div className="space-y-12 pb-24">
      <Head title="Admin Dashboard | FISORA" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-nature-green tracking-tighter uppercase">Analytics <span className="italic font-light tracking-normal">Dashboard</span></h1>
          <p className="text-[10px] font-black text-nature-green/40 uppercase tracking-[0.3em] mt-2">Vue d'ensemble de votre performance commerciale</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-nature-white border border-nature-beige rounded-xl text-[10px] font-black uppercase tracking-widest text-nature-green/60 hover:bg-nature-beige/30 transition-all flex items-center gap-2">
            <Clock className="w-4 h-4" />
            7 Derniers Jours
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-nature-beige/50 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-nature-beige/10 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black ${stat.isUp ? 'text-nature-green' : 'text-red-500'}`}>
                {stat.isUp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-nature-green">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sales Chart */}
        <div className="bg-white p-10 rounded-[3rem] border border-nature-beige/50 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-nature-green uppercase tracking-tighter">Évolution du Revenu</h3>
            <button className="text-nature-green/40 hover:text-nature-green"><ArrowUpRight className="w-5 h-5" /></button>
          </div>
          <div className="h-[400px] w-full">
            {monthly_revenue.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={monthly_revenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#2D4A22', opacity: 0.4 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#2D4A22', opacity: 0.4 }} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '20px' }} />
                  <Bar dataKey="revenue" fill="#2D4A22" radius={[10, 10, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-nature-green/40">Aucune donnée disponible</div>
            )}
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-white p-10 rounded-[3rem] border border-nature-beige/50 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-nature-green uppercase tracking-tighter">Répartition des Commandes</h3>
            <button className="text-nature-green/40 hover:text-nature-green"><ArrowUpRight className="w-5 h-5" /></button>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center relative">
            {status_stats.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <PieChart>
                    <Pie data={status_stats} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="count" nameKey="_id">
                      {status_stats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col gap-2 pointer-events-none">
                  {status_stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-nature-green/60">{s._id}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-nature-green/40">Aucune commande</div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-nature-beige/50 shadow-sm space-y-8">
          <h3 className="text-xl font-black text-nature-green uppercase tracking-tighter">Commandes Récentes</h3>
          <div className="space-y-6">
            {recent_orders.length > 0 ? recent_orders.map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-nature-beige/10 rounded-2xl transition-all">
                <div>
                  <p className="font-bold text-nature-green">Cmd #{order.id}</p>
                  <p className="text-[10px] font-black text-nature-green/40 uppercase tracking-widest">{order.first_name} {order.last_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-nature-green italic">{formatPrice(order.total)}</p>
                  <p className="text-[10px] font-black text-nature-green/40 uppercase tracking-widest">{order.status}</p>
                </div>
              </div>
            )) : (
              <p className="text-nature-green/40 text-sm">Aucune commande récente</p>
            )}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-nature-orange/5 p-10 rounded-[3rem] border border-nature-orange/20 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-nature-orange" />
            <h3 className="text-xl font-black text-nature-orange uppercase tracking-tighter">Alertes Stock</h3>
          </div>
          <div className="space-y-4">
            {low_stock_products.length > 0 ? low_stock_products.map((product, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-nature-orange/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-nature-green">{product.name}</p>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1">Seulement {product.stock} restants</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                <p className="text-xs font-bold text-nature-green/40 uppercase italic tracking-widest">Stock optimal ✅</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
