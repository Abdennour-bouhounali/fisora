import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { Save, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';
import { getImageUrl } from '../../utils/formatters';

const AdminProductForm = ({ product, onSuccess, onClose }) => {
  const [activeTab, setActiveTab] = useState('FR');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    is_active: true,
    weight: '50g',
    images: []
  });

  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        ...product,
        name: product.name || '',
        description: product.description || '',
        stock: product.stock || 0,
        is_active: product.is_active ?? true,
      }));
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (product) {
      router.patch(`/admin/products/${product.id}`, formData, {
        onSuccess: () => {
          toast.success('Produit mis à jour');
          setLoading(false);
          onSuccess();
        },
        onError: (err) => {
          toast.error(Object.values(err)[0] || 'Erreur de mise à jour');
          setLoading(false);
        }
      });
    } else {
      router.post('/admin/products', formData, {
        onSuccess: () => {
          toast.success('Produit créé');
          setLoading(false);
          onSuccess();
        },
        onError: (err) => {
          toast.error(Object.values(err)[0] || 'Erreur de création');
          setLoading(false);
        }
      });
    }
  };

  const tabs = ['INFO', 'SEO'];

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-10">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-2 bg-nature-beige/10 rounded-2xl sticky top-0 z-20 backdrop-blur-sm border border-nature-beige/50">
        {tabs.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`
              flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${activeTab === tab ? 'bg-nature-green text-nature-white shadow-lg' : 'text-nature-green/40 hover:bg-nature-beige/30'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {/* General Info */}
        {activeTab === 'INFO' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Nom du produit</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-white border border-nature-beige rounded-2xl py-4 px-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Description</label>
              <textarea 
                rows="5"
                value={formData.description} 
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-white border border-nature-beige rounded-2xl py-4 px-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Catégorie</label>
              <select 
                value={formData.category} 
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-white border border-nature-beige rounded-2xl py-4 px-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green appearance-none"
                required
              >
                <option value="">Sélectionner</option>
                <option value="wellness">Wellness</option>
                <option value="culinary">Culinary</option>
                <option value="solutions">Solutions</option>
                <option value="general">Général</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Prix (DA)</label>
              <input 
                type="number" 
                value={formData.price} 
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full bg-white border border-nature-beige rounded-2xl py-4 px-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Stock</label>
              <input 
                type="number" 
                value={formData.stock} 
                onChange={(e) => handleChange('stock', e.target.value)}
                className="w-full bg-white border border-nature-beige rounded-2xl py-4 px-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Statut Actif</label>
              <select 
                value={formData.is_active} 
                onChange={(e) => handleChange('is_active', e.target.value === 'true')}
                className="w-full bg-white border border-nature-beige rounded-2xl py-4 px-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green appearance-none"
              >
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
              </select>
            </div>
            
            {/* Image Manager Section */}
            <div className="md:col-span-2">
               <div className="flex gap-2 mt-4">
                 {formData.images && formData.images.map((img, i) => (
                   <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-nature-beige">
                     <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                     <button type="button" onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))} className="absolute top-0 right-0 p-1 bg-nature-orange text-white rounded-bl-lg">
                       <Trash2 className="w-3 h-3" />
                     </button>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* SEO Tab */}
        {activeTab === 'SEO' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <p className="text-sm text-nature-green/40">SEO configuration à venir...</p>
          </motion.div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md pt-6 pb-2 border-t border-nature-beige flex justify-end gap-4 z-20">
        <button 
          type="button" 
          onClick={onClose}
          className="px-8 py-4 border border-nature-beige rounded-2xl text-xs font-black uppercase tracking-widest text-nature-green/40 hover:bg-nature-beige/30 transition-all"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-10 py-4 bg-nature-green text-nature-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:shadow-nature-green/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              {product ? 'Enregistrer les modifications' : 'Créer le produit'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
