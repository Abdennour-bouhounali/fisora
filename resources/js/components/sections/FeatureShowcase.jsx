import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';

const FeatureShowcase = ({ containerVariants, itemVariants }) => {
  const features = [
    { icon: Leaf, title: "Séchage Artisanal", desc: "Nous préservons l'âme de chaque ingrédient par un séchage doux à basse température." },
    { icon: ShieldCheck, title: "Zéro Additifs", desc: "Nos poudres sont pures : pas de sucre ajouté, pas de sel, pas d'agents de conservation." },
    { icon: Sparkles, title: "Concentré d'Arômes", desc: "Une seule cuillère suffit pour transformer vos plats avec une intensité aromatique unique." },
  ];

  return (
    <Section className="bg-nature-beige/20 py-32">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-16"
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="text-center group"
          >
            <div className="w-20 h-20 bg-nature-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-premium group-hover:bg-nature-green group-hover:text-nature-white transition-all duration-500">
              <item.icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-nature-green mb-4">{item.title}</h3>
            <p className="text-lg text-nature-green/60 leading-relaxed font-light">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default FeatureShowcase;
