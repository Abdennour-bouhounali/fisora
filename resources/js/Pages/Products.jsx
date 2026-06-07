import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';

import Section from '../components/ui/Section';
import SEO from '../components/ui/SEO';
import ProductCard from '../components/ui/ProductCard';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';

const Products = ({ products }) => {
  const { t } = useTranslation();
  // products is now a paginated object from Laravel (e.g. products.data)
  const productList = products?.data || products || [];
  const loading = false; // Data is loaded server-side by Inertia

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <div className="pt-32 pb-24 bg-nature-white">
      <Head title={t('seo.products_title') || 'Nos Produits'} />
      <SEO
        title={t('seo.products_title') || 'Nos Produits'}
        description={t('seo.products_desc') || 'Découvrez nos poudres naturelles'}
      />
      <Section>
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-nature-orange" />
            <span className="text-nature-orange font-bold tracking-[0.2em] text-xs uppercase">Collection Pureté</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-[5.5rem] font-bold text-nature-green mb-8 tracking-tight leading-tight"
          >
            Nos produits <br />
            <span className="italic font-light">naturelles</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-nature-green/60 font-light max-w-2xl leading-relaxed"
          >
            Une gamme de saveurs authentiques, séchées avec soin pour préserver l'intensité de la nature.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
        >
          {productList.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-nature-green/40 font-bold uppercase tracking-widest">Aucun produit disponible pour le moment.</p>
            </div>
          ) : (
            productList.map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
                variants={itemVariants}
              />
            ))
          )}
        </motion.div>
      </Section>

      <Section className="bg-nature-beige/10 py-32 mt-24 rounded-[4rem] mx-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12"
        >
          {[
            { icon: Leaf, title: "100% Naturel", desc: "Aucun additif, aucun conservateur. Juste la pureté de la plante." },
            { icon: ShieldCheck, title: "Qualité Garantie", desc: "Un processus de séchage artisanal maîtrisé de A à Z." },
            { icon: Sparkles, title: "Intensité", desc: "Une concentration exceptionnelle pour des saveurs décuplées." },
          ].map((benefit, i) => (
            <motion.div key={i} variants={itemVariants} className="text-center p-8">
              <benefit.icon className="w-12 h-12 text-nature-orange mx-auto mb-6" />
              <h4 className="text-2xl font-bold text-nature-green mb-4">{benefit.title}</h4>
              <p className="text-nature-green/60 font-light">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  );
};

export default Products;
