import React, { useState } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '../../utils/formatters';
import axios from 'axios';

const ImageUpload = ({ onUploadSuccess, currentImage, folder = 'products' }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    setError('');

    try {
      const { data } = await axios.post(`/api/upload?folder=${folder}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const imageUrl = data.image;
      setPreview(getImageUrl(imageUrl));
      onUploadSuccess(imageUrl);
    } catch (err) {
      setError('Erreur lors du téléchargement. Réessayez.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploadSuccess('');
  };

  return (
    <div className="space-y-4">
      <label className="text-xs font-black uppercase tracking-widest text-nature-green/60 ml-4">Photo du produit</label>
      
      <div className="relative group">
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative aspect-square w-full max-w-[200px] bg-nature-white rounded-3xl overflow-hidden border-2 border-nature-beige shadow-premium"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-nature-orange text-nature-white rounded-xl shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.label 
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center aspect-square w-full max-w-[200px] border-2 border-dashed border-nature-beige rounded-3xl bg-nature-beige/10 cursor-pointer hover:bg-nature-beige/20 transition-all group"
            >
              {uploading ? (
                <Loader2 className="w-8 h-8 text-nature-green animate-spin" />
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-nature-green/20 group-hover:text-nature-green/40 transition-colors mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 group-hover:text-nature-green/60">Ajouter une photo</span>
                </>
              )}
              <input type="file" className="hidden" onChange={uploadFileHandler} accept="image/*" />
            </motion.label>
          )}
        </AnimatePresence>

        {error && (
          <p className="mt-2 text-[10px] text-nature-orange font-bold uppercase tracking-widest">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
