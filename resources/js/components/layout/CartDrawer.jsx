import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import { router } from '@inertiajs/react';
import { getImageUrl } from '../../utils/formatters';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQty, cartTotal } = useCart();
  const { t, i18n } = useTranslation();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.visit('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-nature-green/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-nature-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-nature-beige flex justify-between items-center bg-nature-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-nature-green text-nature-white rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-nature-green uppercase tracking-tighter italic">Votre panier</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 border border-nature-beige rounded-xl flex items-center justify-center text-nature-green hover:bg-nature-beige transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-nature-beige/20 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-nature-green/20" />
                  </div>
                  <div>
                    <p className="text-nature-green/40 font-bold uppercase tracking-widest text-xs mb-2">Le panier est vide</p>
                    <p className="text-nature-green/60 text-sm italic">Ajoutez des poudres pour commencer.</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6 group"
                  >
                    <div className={`w-24 h-24 ${item.color || 'bg-nature-beige/10'} rounded-2xl overflow-hidden flex-shrink-0 p-2`}>
                      <img src={getImageUrl(item.image)} alt={item.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-nature-green uppercase tracking-tighter">
                          {typeof item.name === 'object' ? (item.name[i18n.language] || item.name.fr) : item.name}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-nature-green/20 hover:text-nature-orange transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-nature-green/40 mb-4">{item.weight}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-nature-beige/30 p-1 rounded-xl">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 hover:bg-nature-white rounded-lg transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-xs font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 hover:bg-nature-white rounded-lg transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="font-bold text-nature-green italic">{item.price * item.qty} DA</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-nature-white border-t border-nature-beige space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-nature-green/40 font-bold uppercase tracking-widest text-xs">Sous-total</span>
                  <span className="text-4xl font-black text-nature-green tracking-tighter italic">{cartTotal} DA</span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full py-6 flex items-center justify-center gap-4 group"
                >
                  Passer la commande
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
                <p className="text-[10px] text-center text-nature-green/40 font-bold uppercase tracking-widest">
                  Livraison gratuite à partir de 5000 DA
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
