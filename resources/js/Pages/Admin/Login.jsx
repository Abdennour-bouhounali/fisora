import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Leaf } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    post('/admin/login', {
      onSuccess: () => toast.success('Connexion réussie'),
      onError: () => toast.error('Identifiants invalides'),
    });
  };

  return (
    <div className="min-h-screen bg-nature-white flex items-center justify-center p-4">
      <Head title="Admin Login | FISORA" />
      <Toaster position="top-right" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-nature-beige/50 space-y-10"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-nature-green rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Leaf className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-nature-green tracking-tighter uppercase">Administration</h1>
            <p className="text-[10px] font-black text-nature-green/40 uppercase tracking-widest">FISORA</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Email professionnel</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nature-green/20" />
              <input 
                type="email" 
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className={`w-full bg-nature-beige/10 border ${errors.email ? 'border-red-500' : 'border-nature-beige'} rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green`}
                placeholder="admin@fisora.shop"
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs ml-4">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-nature-green/40 ml-4">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nature-green/20" />
              <input 
                type="password" 
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className={`w-full bg-nature-beige/10 border ${errors.password ? 'border-red-500' : 'border-nature-beige'} rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-nature-green outline-none focus:ring-2 focus:ring-nature-green`}
                placeholder="••••••••"
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs ml-4">{errors.password}</p>}
          </div>

          <button 
            type="submit"
            disabled={processing}
            className="w-full bg-nature-green text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {processing ? 'Connexion...' : 'Se connecter'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[10px] text-nature-green/40 font-bold uppercase tracking-widest">
          Accès réservé au personnel autorisé
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
