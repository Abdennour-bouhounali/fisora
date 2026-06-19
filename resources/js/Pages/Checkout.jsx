import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  ChevronLeft,
  ShieldCheck,
  Package
} from 'lucide-react';

import Section from '../components/ui/Section';
import SEO from '../components/ui/SEO';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import MainLayout from '../components/layout/MainLayout';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/formatters';
import { useCurrency } from '../context/CurrencyContext';


const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
  "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane"
];

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const { cart, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const { formatPrice } = useCurrency();

  const { data, setData, post, processing, errors } = useForm({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    wilaya: 'Alger',
    city: 'Alger', // default to match wilaya
    address: '',
    notes: '',
    payment_method: 'cash_on_delivery',
    items: [],
  });

  const deliveryFee = 600;
  const grandTotal = cartTotal + deliveryFee;

  // Sync cart with form data
  useEffect(() => {
    setData('items', cart.map(item => ({
      product_id: item.id || item._id,
      quantity: item.qty
    })));
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'wilaya') {
      setData({ ...data, wilaya: value, city: value });
    } else {
      setData(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    post('/checkout', {
      onSuccess: () => {
        setIsSuccess(true);
        clearCart();
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-nature-white flex items-center justify-center">
        <Head title="Commande Confirmée" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center p-12 bg-nature-white rounded-[4rem] shadow-premium border border-nature-beige"
          >
            <div className="w-24 h-24 bg-nature-green text-nature-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-nature-green mb-4 tracking-tighter italic">Merci pour votre confiance !</h2>
            <p className="text-nature-green/60 font-light mb-10 leading-relaxed">
              Votre commande a été enregistrée avec succès. Notre équipe vous contactera par téléphone pour confirmer la livraison.
            </p>
            <Link href="/">
              <Button className="w-full">Retour à l'accueil</Button>
            </Link>
          </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-nature-white min-h-screen">
      <Head title="Checkout | FISORA" />
        <SEO title="Checkout | FISORA" description="Finalisez votre commande de produits naturels." />
        
        <Section>
          <div className="mb-16">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-nature-green/40 hover:text-nature-orange font-bold uppercase tracking-widest text-xs transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour à la boutique
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-nature-green tracking-tighter">Finalisez votre <span className="italic font-light">commande</span></h1>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-12">
              <div className="bg-nature-white p-10 rounded-[3rem] border border-nature-beige shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-nature-orange text-nature-white rounded-xl flex items-center justify-center font-bold">1</div>
                  <h2 className="text-2xl font-black text-nature-green uppercase tracking-tighter">Informations personnelles</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Input 
                      label="Nom complet" 
                      name="customer_name" 
                      value={data.customer_name}
                      onChange={handleInputChange}
                      placeholder="Votre nom et prénom" 
                      required 
                    />
                    {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>}
                  </div>
                  <div>
                    <Input 
                      label="Téléphone" 
                      name="customer_phone" 
                      type="tel"
                      value={data.customer_phone}
                      onChange={handleInputChange}
                      placeholder="05 55 00 00 00" 
                      required 
                    />
                    {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{errors.customer_phone}</p>}
                  </div>
                </div>
                <div className="mt-8">
                  <Input 
                    label="Adresse email (optionnel)" 
                    name="customer_email" 
                    type="email"
                    value={data.customer_email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com" 
                  />
                  {errors.customer_email && <p className="text-red-500 text-xs mt-1">{errors.customer_email}</p>}
                </div>
              </div>

              <div className="bg-nature-white p-10 rounded-[3rem] border border-nature-beige shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-nature-orange text-nature-white rounded-xl flex items-center justify-center font-bold">2</div>
                  <h2 className="text-2xl font-black text-nature-green uppercase tracking-tighter">Livraison</h2>
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-nature-green/60 ml-4">Wilaya</label>
                    <select 
                      name="wilaya"
                      value={data.wilaya}
                      onChange={handleInputChange}
                      className="w-full bg-nature-white border-none rounded-2xl p-6 focus:ring-2 focus:ring-nature-orange transition-all shadow-premium outline-none text-nature-green appearance-none cursor-pointer"
                    >
                      {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                    {errors.wilaya && <p className="text-red-500 text-xs mt-1">{errors.wilaya}</p>}
                  </div>
                  <div>
                    <Input 
                      label="Adresse précise" 
                      name="address" 
                      value={data.address}
                      onChange={handleInputChange}
                      placeholder="Quartier, N° de porte, Bâtiment..." 
                      required 
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <Input 
                      label="Notes de livraison" 
                      name="notes" 
                      textarea 
                      rows={3}
                      value={data.notes}
                      onChange={handleInputChange}
                      placeholder="Instructions pour le livreur (optionnel)..." 
                    />
                    {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-nature-white p-10 rounded-[3rem] border border-nature-beige shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-nature-orange text-nature-white rounded-xl flex items-center justify-center font-bold">3</div>
                  <h2 className="text-2xl font-black text-nature-green uppercase tracking-tighter">Paiement</h2>
                </div>
                <label className="flex items-center gap-6 p-6 border-2 border-nature-green rounded-[2rem] bg-nature-green/5 cursor-pointer">
                  <input type="radio" name="payment_method" value="cash_on_delivery" checked className="w-6 h-6 accent-nature-green" readOnly />
                  <div className="flex-grow">
                    <span className="block font-bold text-nature-green uppercase text-sm tracking-widest mb-1">Paiement à la livraison</span>
                    <span className="text-sm text-nature-green/60 font-light italic">Payez en espèces lorsque vous recevez vos produits.</span>
                  </div>
                  <div className="w-12 h-12 bg-nature-white rounded-xl flex items-center justify-center text-nature-green shadow-sm">
                    <Truck className="w-6 h-6" />
                  </div>
                </label>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <div className="bg-nature-green text-nature-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -z-10" />
                  
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-10 border-b border-white/10 pb-6 flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6" />
                    Résumé du panier
                  </h2>

                  <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/20">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 ${item.color || 'bg-white/10'} rounded-2xl flex items-center justify-center p-2 flex-shrink-0`}>
                            <img src={getImageUrl(item.image)} alt={item.id} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-tighter line-clamp-1">
                              {typeof item.name === 'object' ? (item.name[i18n.language] || item.name.fr) : item.name}
                            </h4>
                            <span className="text-xs opacity-60 font-light tracking-widest">{item.qty} x {formatPrice(item.price)}</span>
                          </div>
                        </div>
                        <span className="font-bold italic text-sm">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                    {cart.length === 0 && <p className="opacity-60 italic font-light">Votre panier est vide.</p>}
                  </div>

                  <div className="space-y-4 border-t border-white/10 pt-8">
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60 uppercase tracking-[0.2em] font-bold">Sous-total</span>
                      <span className="font-bold italic">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60 uppercase tracking-[0.2em] font-bold">Livraison</span>
                      <span className="font-bold italic">{formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-3xl font-black pt-4 border-t border-white/20">
                      <span className="uppercase tracking-tighter">Total</span>
                      <span className="italic">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={processing || cart.length === 0}
                    className="w-full mt-10 py-6 bg-nature-white text-nature-green hover:bg-nature-orange hover:text-nature-white shadow-xl flex items-center justify-center gap-4 group"
                  >
                    {processing ? 'Traitement...' : 'Confirmer la commande'}
                    <CheckCircle2 className={`w-6 h-6 ${processing ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-nature-beige/20 rounded-3xl border border-nature-beige/50 text-center">
                    <ShieldCheck className="w-8 h-8 text-nature-orange mx-auto mb-4" />
                    <span className="block text-[10px] font-black uppercase tracking-widest text-nature-green/60">Paiement 100% Sécurisé</span>
                  </div>
                  <div className="p-6 bg-nature-beige/20 rounded-3xl border border-nature-beige/50 text-center">
                    <Package className="w-8 h-8 text-nature-orange mx-auto mb-4" />
                    <span className="block text-[10px] font-black uppercase tracking-widest text-nature-green/60">Qualité Premium</span>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </Section>
      </div>
  );
};

export default Checkout;
