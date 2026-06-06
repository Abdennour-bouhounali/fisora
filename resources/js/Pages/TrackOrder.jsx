import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Info
} from 'lucide-react';

import Section from '../components/ui/Section';
import SEO from '../components/ui/SEO';
import Button from '../components/common/Button';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';
import { getImageUrl } from '../utils/formatters';

const STATUS_STEPS = [
  { id: 'pending', icon: Clock, label: 'En attente' },
  { id: 'processing', icon: CheckCircle2, label: 'Confirmée' },
  { id: 'shipped', icon: Truck, label: 'Expédiée' },
  { id: 'delivered', icon: CheckCircle2, label: 'Livrée' },
  { id: 'cancelled', icon: Info, label: 'Annulée' }
];

const TrackOrder = ({ order, filters }) => {
  const { t } = useTranslation();
  const [searchId, setSearchId] = useState(filters?.order_number || '');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId) {
      setLoading(true);
      router.visit(`/track?order_number=${searchId}`, {
        onFinish: () => setLoading(false)
      });
    }
  };

  const currentStatusIndex = order ? STATUS_STEPS.findIndex(s => s.id === order.status) : -1;
  const isCancelled = order?.status === 'cancelled';

  return (
    <div className="pt-32 pb-24 bg-nature-white min-h-screen">
      <Head title="Suivre ma commande | FISORA" />
        <SEO title="Suivre ma commande | FISORA" description="Suivez l'état de votre commande de produits naturels en temps réel." />
        
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-nature-green tracking-tighter mb-6">
                Suivez votre <span className="italic font-light">colis</span>
              </h1>
              <p className="text-nature-green/60 font-light max-w-lg mx-auto">
                Entrez votre numéro de commande pour connaître l'état d'avancement de votre livraison en temps réel.
              </p>
            </div>

            <form onSubmit={handleSearch} className="mb-20">
              <div className="flex flex-col md:flex-row gap-4 p-4 bg-nature-white rounded-[2.5rem] shadow-premium border border-nature-beige">
                <div className="flex-grow relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-nature-green/20" />
                  <input 
                    type="text" 
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Numéro de commande (ex: ORD-12345)" 
                    className="w-full bg-transparent border-none py-4 pl-16 pr-6 text-lg font-bold text-nature-green outline-none placeholder:text-nature-green/20"
                  />
                </div>
                <Button type="submit" disabled={loading} className="px-10 py-4 rounded-3xl">
                  {loading ? 'Recherche...' : 'Rechercher'}
                </Button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {filters?.order_number && !order && !loading ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-nature-orange/5 border-2 border-nature-orange/20 p-8 rounded-[2rem] text-center"
                >
                  <Info className="w-12 h-12 text-nature-orange mx-auto mb-4" />
                  <p className="text-nature-green font-bold">Commande introuvable. Veuillez vérifier votre numéro.</p>
                </motion.div>
              ) : order && !loading && (
                <motion.div 
                  key="order"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="flex flex-wrap justify-between items-end gap-6 border-b border-nature-beige pb-10">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-nature-green/40">Commande n°</span>
                      <h2 className="text-3xl font-black text-nature-green tracking-tighter uppercase">{order.order_number}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest text-nature-green/40">Statut actuel</span>
                      <div className={`flex items-center gap-2 font-black uppercase text-sm tracking-tighter ${isCancelled ? 'text-nature-orange' : 'text-nature-green'}`}>
                        {!isCancelled && <span className="w-2 h-2 bg-nature-orange rounded-full animate-pulse" />}
                        {STATUS_STEPS[currentStatusIndex]?.label || order.status}
                      </div>
                    </div>
                  </div>

                  {!isCancelled && (
                    <div className="relative py-12 px-4">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-nature-beige -translate-y-1/2 hidden md:block">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(Math.min(currentStatusIndex, 3) / 3) * 100}%` }}
                          className="h-full bg-nature-green"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                        {STATUS_STEPS.slice(0, 4).map((step, index) => {
                          const isCompleted = index <= currentStatusIndex;
                          const isCurrent = index === currentStatusIndex;
                          return (
                            <div key={step.id} className="flex flex-col items-center text-center space-y-4">
                              <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                                ${isCompleted ? 'bg-nature-green text-nature-white shadow-lg' : 'bg-nature-white text-nature-green/20 border-2 border-nature-beige'}
                                ${isCurrent ? 'ring-8 ring-nature-green/10 scale-110' : ''}
                              `}>
                                <step.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-nature-green' : 'text-nature-green/20'}`}>
                                  {step.label}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-nature-white p-10 rounded-[3rem] border border-nature-beige shadow-sm space-y-8">
                      <h3 className="text-xl font-black text-nature-green uppercase tracking-tighter border-b border-nature-beige pb-6">
                        Détails de livraison
                      </h3>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <MapPin className="w-5 h-5 text-nature-orange flex-shrink-0" />
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 mb-1">Adresse</p>
                            <p className="text-sm font-bold text-nature-green leading-relaxed">
                              {order.address}, {order.city}, {order.wilaya}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-nature-white p-10 rounded-[3rem] border border-nature-beige shadow-sm space-y-8">
                      <h3 className="text-xl font-black text-nature-green uppercase tracking-tighter border-b border-nature-beige pb-6">
                        Contenu du colis
                      </h3>
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-4 border-b border-nature-beige/30 last:border-0">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-nature-beige/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Package className="w-6 h-6 text-nature-green/40" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-nature-green">{item.product_name}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-nature-green/40">Quantité: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-bold italic text-sm">{item.subtotal} DA</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-nature-beige flex justify-between font-black uppercase tracking-tighter text-nature-green">
                         <span>Total</span>
                         <span>{order.total} DA</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>
      </div>
  );
};

export default TrackOrder;
