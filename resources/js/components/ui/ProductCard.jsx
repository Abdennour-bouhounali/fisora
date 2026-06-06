import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Leaf, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

import { getImageUrl } from '../../utils/formatters';

const ProductCard = ({ product, variants, view = 'grid' }) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();

  const lang = i18n.language;
  const name = product.name ? (product.name[lang] || product.name.fr) : 'Produit';
  const description = product.description ? (product.description[lang] || product.description.fr) : '';
  const id = product._id || product.id;
  const image = product.images ? getImageUrl(product.images[0]) : (product.image || product.img);

  return (
    <motion.div
      variants={variants}
      className="group cursor-pointer"
    >
      <Link href={`/products/${product.slug || id}`} className="block relative">
        <div className={`absolute -inset-4 bg-nature-beige/10 opacity-0 group-hover:opacity-40 rounded-[4rem] transition-opacity duration-700 -z-10`} />
        
        <div className={`aspect-[4/5] bg-nature-beige/10 rounded-[3rem] relative overflow-hidden flex items-center justify-center transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-nature-green/10 group-hover:-translate-y-4 border border-nature-beige/30`}>
          <img 
            src={image} 
            alt={`${name} - Premium Natural Powder`} 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute top-8 right-8 flex flex-col gap-2">
            <div className="w-12 h-12 bg-nature-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
              <Leaf className="w-5 h-5 text-nature-green" />
            </div>
          </div>
        </div>

        <div className="mt-10 px-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-bold text-nature-green group-hover:text-nature-orange transition-colors uppercase tracking-tighter">{name}</h3>
            <span className="text-xl font-bold italic text-nature-orange">{product.price} DA</span>
          </div>
          <p className="text-lg text-nature-green/60 font-light leading-relaxed mb-8 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              className="flex-grow py-4"
            >
              Commander
            </Button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              className="w-14 h-14 border border-nature-beige rounded-2xl flex items-center justify-center hover:bg-nature-beige transition-colors group/btn"
            >
              <Plus className="w-6 h-6 text-nature-green group-hover/btn:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
