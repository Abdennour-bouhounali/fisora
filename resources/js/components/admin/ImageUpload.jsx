import React, { useState } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ImageUpload = ({ onUploadSuccess, folder = 'products' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);

        const { data } = await axios.post(`/api/upload?folder=${folder}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        const imageUrl = data.image;
        if (imageUrl) {
          onUploadSuccess(imageUrl);
        }
      }
    } catch (err) {
      setError('Erreur lors du téléchargement. Réessayez.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative group">
        <label className="flex flex-col items-center justify-center aspect-square w-full max-w-[200px] border-2 border-dashed border-nature-beige rounded-3xl bg-nature-beige/10 cursor-pointer hover:bg-nature-beige/20 transition-all group">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-nature-green animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-nature-green/20 group-hover:text-nature-green/40 transition-colors mb-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 group-hover:text-nature-green/60 text-center px-4">
                Ajouter des photos
              </span>
            </>
          )}
          <input 
            type="file" 
            className="hidden" 
            onChange={uploadFileHandler} 
            accept="image/*" 
            multiple 
            disabled={uploading}
          />
        </label>

        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-[10px] text-nature-orange font-bold uppercase tracking-widest"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageUpload;
