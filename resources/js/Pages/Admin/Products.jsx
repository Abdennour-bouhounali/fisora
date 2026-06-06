import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit3, Trash2, Package, Eye, X, AlertCircle
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import { getImageUrl } from '../../utils/formatters';
import AdminProductForm from '../../components/admin/AdminProductForm';

const Products = ({ products }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      router.delete(`/admin/products/${id}`, {
        onSuccess: () => toast.success('Produit supprimé avec succès'),
        onError: () => toast.error('Erreur lors de la suppression')
      });
    }
  };

  const productList = products.data || [];

  return (
    <div className="space-y-12 pb-24">
      <Head title="Gestion des Produits | FISORA Admin" />
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-nature-green tracking-tighter">Catalogue <span className="italic font-light">produits</span></h1>
          <p className="text-nature-green/40 font-bold uppercase tracking-widest text-[10px] mt-2">Gérez votre inventaire et vos stocks</p>
        </div>
        <Button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} 
          className="rounded-2xl px-8 py-4 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouveau Produit
        </Button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Produits', value: productList.length, icon: Package, color: 'bg-blue-500' },
          { label: 'En Rupture', value: productList.filter(p => p.stock === 0).length, icon: AlertCircle, color: 'bg-nature-orange' },
          { label: 'Actifs', value: productList.filter(p => p.is_active).length, icon: Eye, color: 'bg-nature-green' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-nature-beige/50 shadow-sm flex items-center gap-6">
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-nature-green/40">{stat.label}</p>
              <p className="text-2xl font-black text-nature-green">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-nature-beige/50 overflow-hidden">
        <div className="p-8 border-b border-nature-beige/50 flex flex-col md:flex-row justify-between gap-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nature-green/30" />
            <input 
              type="text" 
              placeholder="Rechercher un produit..." 
              className="w-full bg-nature-beige/20 border-none rounded-xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-nature-green transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-nature-beige/10">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-green/40">Produit</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-green/40">Catégorie</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-green/40">Prix</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-green/40">Stock</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-green/40">Statut</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-green/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nature-beige/30">
              {productList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                <tr key={product.id} className="hover:bg-nature-beige/5 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-nature-beige rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                        {product.images && product.images[0] ? (
                          <img src={getImageUrl(product.images[0])} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-nature-beige flex items-center justify-center">
                            <Package className="w-6 h-6 text-nature-green/30" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-nature-green">{product.name}</p>
                        <p className="text-[10px] text-nature-green/40 uppercase font-black tracking-widest">{product.weight || '-'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-medium text-nature-green/60 capitalize">{product.category}</td>
                  <td className="px-6 py-6 font-black text-nature-green italic">{product.price} DA</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-nature-green' : product.stock > 0 ? 'bg-nature-orange' : 'bg-red-500'}`} />
                      <span className="text-sm font-bold text-nature-green">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      product.is_active ? 'bg-nature-green/10 text-nature-green' : 'bg-nature-orange/10 text-nature-orange'
                    }`}>
                      {product.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                        className="p-3 bg-nature-white border border-nature-beige rounded-xl text-nature-green hover:bg-nature-green hover:text-nature-white transition-all shadow-sm"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-3 bg-nature-white border border-nature-beige rounded-xl text-nature-orange hover:bg-nature-orange hover:text-nature-white transition-all shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-nature-green/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-nature-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-nature-beige flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="text-2xl font-black text-nature-green uppercase tracking-tighter">
                  {editingProduct ? 'Modifier le produit' : 'Nouveau Produit'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-nature-beige rounded-full transition-colors">
                  <X className="w-6 h-6 text-nature-green" />
                </button>
              </div>
              
              <div className="p-10 overflow-y-auto space-y-12">
                <AdminProductForm 
                  product={editingProduct} 
                  onSuccess={() => { setIsModalOpen(false); }} 
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
