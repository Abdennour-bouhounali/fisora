import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Users, Mail, Globe, Sparkles, TrendingUp, Search, Calendar, Landmark, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

const Leads = ({ waitlistLeads = [], b2bLeads = [], analytics = {} }) => {
  const [activeTab, setActiveTab] = useState('waitlist');
  const [waitlistSearch, setWaitlistSearch] = useState('');
  const [b2bSearch, setB2bSearch] = useState('');

  const COLORS = ['#2D4A22', '#F2994A', '#2F80ED', '#9B51E0', '#EB5757', '#27AE60'];

  // Filter leads based on search terms
  const filteredWaitlist = waitlistLeads.filter(lead => 
    lead.name.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
    lead.email.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
    lead.product_interest.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
    lead.city.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
    lead.country.toLowerCase().includes(waitlistSearch.toLowerCase())
  );

  const filteredB2b = b2bLeads.filter(lead => 
    lead.business_name.toLowerCase().includes(b2bSearch.toLowerCase()) ||
    lead.contact_name.toLowerCase().includes(b2bSearch.toLowerCase()) ||
    lead.email.toLowerCase().includes(b2bSearch.toLowerCase()) ||
    lead.business_type.toLowerCase().includes(b2bSearch.toLowerCase())
  );

  // Prepare Chart Data
  const leadsByLanguageData = Object.keys(analytics.leadsByLanguage || {}).map(lang => ({
    name: lang.toUpperCase(),
    value: analytics.leadsByLanguage[lang]
  }));

  const b2bByLanguageData = Object.keys(analytics.b2bLeadsByLanguage || {}).map(lang => ({
    name: lang.toUpperCase(),
    value: analytics.b2bLeadsByLanguage[lang]
  }));

  const ctrByLanguageData = Object.keys(analytics.ctrByLanguage || {}).map(lang => ({
    name: lang.toUpperCase(),
    CTR: analytics.ctrByLanguage[lang]
  }));

  const productInterestData = (analytics.leadsByProduct || []).map(p => ({
    name: p.product_interest,
    Leads: p.count
  }));

  return (
    <div className="space-y-12 pb-24">
      <Head title="Waitlist & B2B Leads | FISORA Admin" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-nature-green tracking-tighter uppercase">
            Leads & <span className="italic font-light tracking-normal">Waitlist</span>
          </h1>
          <p className="text-[10px] font-black text-nature-green/40 uppercase tracking-[0.3em] mt-2">
            Collecte et conversion pendant la phase de pré-lancement
          </p>
        </div>

        {/* Tab Controls */}
        <div className="bg-nature-beige/20 p-2 rounded-2xl flex gap-2 border border-nature-beige/50">
          {[
            { id: 'waitlist', label: 'Waitlist', icon: Users },
            { id: 'b2b', label: 'B2B Leads', icon: Landmark },
            { id: 'analytics', label: 'Analytics & Conversion', icon: TrendingUp },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-nature-green text-nature-white shadow-premium'
                  : 'text-nature-green/60 hover:bg-nature-beige/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content: Consumer Waitlist */}
      {activeTab === 'waitlist' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-5 h-5 text-nature-green/35 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={waitlistSearch}
                onChange={(e) => setWaitlistSearch(e.target.value)}
                placeholder="Rechercher par nom, email, produit, ville..."
                className="w-full bg-white border border-nature-beige rounded-2xl pl-12 pr-6 py-4 text-sm outline-none focus:ring-2 focus:ring-nature-orange transition-all placeholder:text-nature-green/20 text-nature-green shadow-sm"
              />
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-nature-green/40">
              Total: {filteredWaitlist.length} / {waitlistLeads.length} leads
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-nature-beige/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-nature-beige/10 border-b border-nature-beige/40">
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Date</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Nom</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Email</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Téléphone</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Localisation</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Produit d'intérêt</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Langue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nature-beige/30">
                  {filteredWaitlist.length > 0 ? (
                    filteredWaitlist.map((lead, idx) => (
                      <tr key={lead.id || idx} className="hover:bg-nature-beige/5 transition-colors">
                        <td className="px-8 py-5 text-sm text-nature-green/60">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-nature-orange" />
                            {new Date(lead.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-nature-green">{lead.name}</td>
                        <td className="px-8 py-5 text-sm text-nature-green/80 font-medium">{lead.email}</td>
                        <td className="px-8 py-5 text-sm text-nature-green/60 font-medium">{lead.phone || 'N/A'}</td>
                        <td className="px-8 py-5 text-sm text-nature-green/60">
                          {lead.city}, {lead.country}
                        </td>
                        <td className="px-8 py-5 text-sm">
                          <span className="inline-block px-3 py-1.5 bg-nature-orange/10 text-nature-orange rounded-xl text-xs font-bold">
                            {lead.product_interest}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-nature-beige/30 rounded-xl text-xs font-black text-nature-green uppercase">
                            <Globe className="w-3.5 h-3.5 text-nature-green/40" />
                            {lead.language}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-8 py-16 text-center text-sm text-nature-green/45 uppercase tracking-widest font-bold">
                        Aucun inscrit à la liste d'attente trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: B2B Leads */}
      {activeTab === 'b2b' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-5 h-5 text-nature-green/35 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={b2bSearch}
                onChange={(e) => setB2bSearch(e.target.value)}
                placeholder="Rechercher par entreprise, contact, email..."
                className="w-full bg-white border border-nature-beige rounded-2xl pl-12 pr-6 py-4 text-sm outline-none focus:ring-2 focus:ring-nature-orange transition-all placeholder:text-nature-green/20 text-nature-green shadow-sm"
              />
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-nature-green/40">
              Total: {filteredB2b.length} / {b2bLeads.length} leads
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-nature-beige/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-nature-beige/10 border-b border-nature-beige/40">
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Date</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Entreprise</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Contact</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Type</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Consommation Mensuelle</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Produits Intérêt</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Langue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nature-beige/30">
                  {filteredB2b.length > 0 ? (
                    filteredB2b.map((lead, idx) => (
                      <tr key={lead.id || idx} className="hover:bg-nature-beige/5 transition-colors">
                        <td className="px-8 py-5 text-sm text-nature-green/60">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-nature-orange" />
                            {new Date(lead.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-nature-green">
                          <div>
                            <p>{lead.business_name}</p>
                            <p className="text-[10px] text-nature-green/40 uppercase font-black tracking-widest mt-1">{lead.email}</p>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm text-nature-green/80">
                          <div>
                            <p className="font-bold">{lead.contact_name}</p>
                            <p className="text-xs text-nature-green/60">{lead.phone || 'N/A'}</p>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-nature-green/70">{lead.business_type}</td>
                        <td className="px-8 py-5 text-sm text-nature-green/60 max-w-xs truncate" title={lead.monthly_usage}>
                          {lead.monthly_usage}
                        </td>
                        <td className="px-8 py-5 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(lead.products_of_interest) ? (
                              lead.products_of_interest.map((p, i) => (
                                <span key={i} className="inline-block px-2 py-1 bg-nature-orange/10 text-nature-orange rounded-lg text-[10px] font-bold">
                                  {p}
                                </span>
                              ))
                            ) : (
                              <span className="text-nature-green/40">N/A</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-nature-beige/30 rounded-xl text-xs font-black text-nature-green uppercase">
                            <Globe className="w-3.5 h-3.5 text-nature-green/40" />
                            {lead.language}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-8 py-16 text-center text-sm text-nature-green/45 uppercase tracking-widest font-bold">
                        Aucun lead B2B trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-12">
          {/* Top Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Leads breakdown by Language */}
            <div className="bg-white p-8 rounded-[3rem] border border-nature-beige/50 shadow-sm flex flex-col justify-between">
              <h3 className="text-lg font-black text-nature-green uppercase tracking-tighter mb-6">
                Leads par Langue
              </h3>
              <div className="h-[250px] w-full flex items-center justify-center relative">
                {leadsByLanguageData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadsByLanguageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {leadsByLanguageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <span className="text-sm text-nature-green/40">Pas de données</span>
                )}
              </div>
            </div>

            {/* CTR by Language */}
            <div className="bg-white p-8 rounded-[3rem] border border-nature-beige/50 shadow-sm flex flex-col justify-between">
              <h3 className="text-lg font-black text-nature-green uppercase tracking-tighter mb-6">
                CTR par Langue (%)
              </h3>
              <div className="h-[250px] w-full">
                {ctrByLanguageData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ctrByLanguageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#2D4A22', opacity: 0.5 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#2D4A22', opacity: 0.5 }} />
                      <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="CTR" fill="#F2994A" radius={[10, 10, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <span className="text-sm text-nature-green/40 flex items-center justify-center h-full">Pas de données</span>
                )}
              </div>
            </div>

            {/* Most requested products */}
            <div className="bg-white p-8 rounded-[3rem] border border-nature-beige/50 shadow-sm flex flex-col justify-between">
              <h3 className="text-lg font-black text-nature-green uppercase tracking-tighter mb-6">
                Intérêt par Produit (Leads)
              </h3>
              <div className="h-[250px] w-full">
                {productInterestData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productInterestData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#2D4A22', opacity: 0.5 }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 8, fontWeight: 900, fill: '#2D4A22', opacity: 0.5 }} />
                      <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="Leads" fill="#2D4A22" radius={[0, 10, 10, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <span className="text-sm text-nature-green/40 flex items-center justify-center h-full">Pas de données</span>
                )}
              </div>
            </div>
          </div>

          {/* Product-level conversion table */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-nature-green uppercase tracking-tighter">
              Performance de Conversion par Produit
            </h3>

            <div className="bg-white rounded-[3rem] border border-nature-beige/50 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-nature-beige/10 border-b border-nature-beige/40">
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50">Produit</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50 text-center">Vues Unique</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50 text-center">Clics CTA</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50 text-center">Waitlist Inscriptions</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50 text-center">CTR (%)</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-nature-green/50 text-center">Taux Conversion (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-nature-beige/30">
                    {analytics.productAnalytics && analytics.productAnalytics.length > 0 ? (
                      analytics.productAnalytics.map((p, idx) => (
                        <tr key={p.id || idx} className="hover:bg-nature-beige/5 transition-colors">
                          <td className="px-8 py-5 text-sm font-bold text-nature-green">{p.name?.fr || p.name}</td>
                          <td className="px-8 py-5 text-sm font-medium text-nature-green/80 text-center">{p.views}</td>
                          <td className="px-8 py-5 text-sm text-nature-green/80 text-center">{p.cta_clicks}</td>
                          <td className="px-8 py-5 text-sm text-nature-orange font-bold text-center">{p.registrations}</td>
                          <td className="px-8 py-5 text-sm text-center">
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold">
                              {p.ctr}%
                            </span>
                          </td>
                          <td className="px-8 py-5 text-sm text-center">
                            <span className="inline-block px-3 py-1 bg-nature-green/10 text-nature-green rounded-xl text-xs font-bold">
                              {p.conversion_rate}%
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-8 py-16 text-center text-sm text-nature-green/45 uppercase tracking-widest font-bold">
                          Aucune donnée analytique produit
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
