import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureShowcase = ({ containerVariants, itemVariants }) => {
  const { t } = useTranslation();
  const features = [
    { icon: Leaf, title: t('home_page.features.f1_title'), desc: t('home_page.features.f1_desc') },
    { icon: ShieldCheck, title: t('home_page.features.f2_title'), desc: t('home_page.features.f2_desc') },
    { icon: Sparkles, title: t('home_page.features.f3_title'), desc: t('home_page.features.f3_desc') },
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
