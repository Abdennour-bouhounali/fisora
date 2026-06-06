import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Truck, 
  Leaf, 
  Sparkles, 
  Info,
  Package
} from 'lucide-react';

import Section from '../components/ui/Section';
import SEO from '../components/ui/SEO';
import Button from '../components/common/Button';
import ProductCard from '../components/ui/ProductCard';
import MainLayout from '../components/layout/MainLayout';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/formatters';

const ProductDetail = ({ product, related }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nature-white space-y-6">
      <Head title="Produit introuvable" />
        <h2 className="text-3xl font-black text-nature-green uppercase">Produit introuvable</h2>
        <Link href="/products">
          <Button>Retour aux produits</Button>
        </Link>
      </div>
  );

  const name = product.name || 'Produit';
  const description = product.description || '';
  
  // Try parsing images JSON if it's a string, otherwise use the array
  let images = [];
  if (typeof product.images === 'string') {
    try { images = JSON.parse(product.images); } catch(e) {}
  } else {
    images = product.images || [];
  }
  
  // For the moment we don't have ingredients or usage_instructions in Laravel DB natively, but we can display if they exist
  const ingredients = product.ingredients || '';
  const usageInstructions = product.usage_instructions || '';

  return (
    <div className="pt-24 pb-12 bg-nature-white">
      <Head title={`${name} | FISORA`} />
        <SEO 
          title={`${name} | FISORA`}
          description={description}
        />

        {/* Breadcrumbs & Navigation */}
        <Section className="py-6 md:py-8">
          <nav className="flex items-center gap-2 text-sm text-nature-green/40 font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-nature-orange transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-nature-orange transition-colors">Produits</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-nature-green">{name}</span>
          </nav>
        </Section>

        {/* Main Product Info */}
        <Section className="py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Gallery */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square bg-nature-beige/10 rounded-[3rem] overflow-hidden shadow-premium relative border border-nature-beige/50"
              >
                <img 
                  src={images.length > 0 ? getImageUrl(images[activeImage]) : ''} 
                  alt={name} 
                  className="w-full h-full object-cover p-12 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-8 left-8 bg-nature-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                  <Leaf className="w-4 h-4 text-nature-green" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-nature-green">100% Naturel</span>
                </div>
              </motion.div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square bg-nature-beige/10 rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-nature-orange opacity-100' : 'border-transparent opacity-40'
                      }`}
                    >
                      <img src={getImageUrl(img)} alt="thumbnail" className="w-full h-full object-cover p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Content */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-black text-nature-green mb-4 tracking-tighter leading-tight uppercase">
                  {name}
                </h1>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-bold italic text-nature-orange">{product.price} DA</span>
                  {product.badges && product.badges.map((badge, i) => (
                    <span key={i} className="bg-nature-green/10 text-nature-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{badge}</span>
                  ))}
                </div>

                <p className="text-xl text-nature-green/60 font-light leading-relaxed mb-10">
                  {description}
                </p>

                {/* Selector & Cart */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                  <div className="flex items-center bg-nature-beige/30 p-2 rounded-2xl w-full sm:w-auto">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-nature-green hover:bg-nature-white rounded-xl transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-bold text-xl text-nature-green">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-nature-green hover:bg-nature-white rounded-xl transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <Button 
                    onClick={() => addToCart(product, quantity)}
                    className="w-full py-5 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Ajouter au panier
                  </Button>
                </div>

                {/* Info Sections */}
                <div className="mt-16 space-y-6">
                  {ingredients && ingredients.length > 0 && (
                    <div className="p-8 bg-nature-white border border-nature-beige rounded-[2.5rem] group">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-nature-green/10 rounded-2xl flex items-center justify-center text-nature-green">
                          <Info className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-nature-green uppercase tracking-widest text-sm">Ingrédients</h3>
                      </div>
                      <p className="text-nature-green/60 font-light leading-relaxed italic">
                        {ingredients}
                      </p>
                    </div>
                  )}

                  {usageInstructions && (
                    <div className="p-8 bg-nature-white border border-nature-beige rounded-[2.5rem]">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-nature-orange/10 rounded-2xl flex items-center justify-center text-nature-orange">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-nature-green uppercase tracking-widest text-sm">Utilisation</h3>
                      </div>
                      <p className="text-nature-green/60 font-light italic leading-relaxed">
                        {usageInstructions}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Specifications & Delivery */}
        <Section className="py-24">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-nature-beige/20 p-12 rounded-[3.5rem] border border-nature-beige/50">
              <h2 className="text-3xl font-black text-nature-green mb-10 tracking-tighter uppercase">Détails Techniques</h2>
              <div className="space-y-6">
                {[
                  { label: "Poids", val: product.weight || 'N/A' },
                  { label: "Catégorie", val: product.category },
                  { label: "Disponibilité", val: product.stock > 0 ? "En stock" : "Rupture de stock" },
                  { label: "Format", val: "Poudre déshydratée" },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-5 border-b border-nature-green/10">
                    <span className="text-nature-green/40 font-black uppercase text-[10px] tracking-widest">{spec.label}</span>
                    <span className="text-nature-green font-bold text-sm">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-nature-green p-12 rounded-[3.5rem] text-nature-white shadow-premium">
              <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">Logistique Oula</h2>
              <div className="space-y-10">
                <div className="flex gap-8">
                  <div className="w-14 h-14 bg-nature-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest mb-3">Expédition Algérie 58 Wilayas</h4>
                    <p className="text-nature-white/60 font-light text-sm leading-relaxed">Nous expédions vos commandes sous 24h avec nos partenaires logistiques de confiance.</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="w-14 h-14 bg-nature-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest mb-3">Pack Doypack Premium</h4>
                    <p className="text-nature-white/60 font-light text-sm leading-relaxed">Emballage hermétique avec zip refermable pour garantir une fraîcheur absolue pendant 12 mois.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Related Products */}
        {related && related.length > 0 && (
          <Section className="py-24 border-t border-nature-beige/50">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-nature-green tracking-tighter uppercase">Explorer davantage</h2>
              <Link href="/products" className="text-nature-orange font-black border-b-2 border-nature-orange text-xs uppercase tracking-[0.2em] pb-1 hover:text-nature-green hover:border-nature-green transition-all">Tout voir</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        )}

        {/* Sticky Mobile Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-nature-white/95 backdrop-blur-xl border-t border-nature-beige md:hidden z-40">
          <div className="flex gap-4">
            <div className="flex items-center bg-nature-beige/30 p-1 rounded-2xl">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-nature-green"><Minus className="w-5 h-5" /></button>
               <span className="w-10 text-center font-bold text-nature-green">{quantity}</span>
               <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-nature-green"><Plus className="w-5 h-5" /></button>
            </div>
            <Button 
              onClick={() => addToCart(product, quantity)}
              className="flex-grow py-5 text-[10px] font-black uppercase tracking-widest"
            >
              Ajouter • {product.price * quantity} DA
            </Button>
          </div>
        </div>
      </div>
  );
};

export default ProductDetail;
