import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { Heart, ShieldCheck, Sparkles, Sprout, Sun, Wind, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';

const About = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const processSteps = [
    { icon: Sprout, title: t('about.process.step1_title'), desc: t('about.process.step1_desc') },
    { icon: Sun, title: t('about.process.step2_title'), desc: t('about.process.step2_desc') },
    { icon: Wind, title: t('about.process.step3_title'), desc: t('about.process.step3_desc') }
  ];

  return (
    <div className="pt-32 pb-24 bg-nature-white">
      <Head title={t('seo.about_title')} />
        <SEO 
        title={t('seo.about_title')}
        description={t('seo.about_desc')}
      />
      
      {/* Hero / Mission Section */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-nature-orange" />
              <span className="text-nature-orange font-bold tracking-[0.2em] text-xs uppercase">
                {t('about.subtitle')}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-[5rem] font-bold text-nature-green mb-10 leading-[1.1] tracking-tight">
              {t('about.title')}
            </motion.h1>
            
            <motion.div variants={itemVariants} className="space-y-8">
              <p className="text-2xl text-nature-green leading-relaxed font-medium border-l-4 border-nature-orange pl-8 py-2">
                {t('about.mission_text')}
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[1px] border-nature-beige/20 bg-nature-white p-4">
              <img 
                src="/images/about_hero_premium.png" 
                alt="FISORA - Natural Heritage" 
                loading="lazy"
                className="w-full h-auto rounded-[3rem] shadow-inner"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Founder / Story Section */}
      <Section className="mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[1px] border-nature-beige/20 bg-nature-white p-4">
              <img 
                src="/images/about_process_story.png" 
                alt="Artisanat FISORA - The Process" 
                loading="lazy"
                className="w-full h-auto rounded-[3rem] shadow-inner"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 w-24 h-24 bg-nature-green text-nature-white rounded-full flex items-center justify-center shadow-2xl z-20"
            >
              <Heart className="w-10 h-10 fill-current" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-nature-green mb-10 tracking-tight">
              {t('about.story_title')}
            </h2>
            <p className="text-xl text-nature-green/60 leading-relaxed font-light">
              {t('about.story_text')}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Quality Process Section */}
      <Section className="bg-nature-beige/20 py-32 rounded-[4rem] mx-4 mb-40">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-nature-green mb-6 tracking-tight">
            {t('about.process.title')}
          </h2>
          <p className="text-xl text-nature-green/60 font-light">
            {t('about.process.subtitle')}
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12"
        >
          {processSteps.map((step, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full p-12 text-center group border-none shadow-premium hover:shadow-2xl transition-all duration-500 rounded-[3rem] bg-nature-white">
                <div className="w-20 h-20 bg-nature-beige/30 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:bg-nature-green group-hover:text-nature-white transition-colors duration-500">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-nature-green mb-6">{step.title}</h3>
                <p className="text-lg text-nature-green/60 leading-relaxed font-light">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Trust & Quality Banner */}
      <Section className="pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
        >
           <div className="flex items-center gap-4">
             <ShieldCheck className="w-12 h-12 text-nature-green" />
             <span className="text-2xl font-black uppercase tracking-widest text-nature-green">{t('about.trust.t1')}</span>
           </div>
           <div className="flex items-center gap-4">
             <Sparkles className="w-12 h-12 text-nature-green" />
             <span className="text-2xl font-black uppercase tracking-widest text-nature-green">{t('about.trust.t2')}</span>
           </div>
           <div className="flex items-center gap-4">
             <Leaf className="w-12 h-12 text-nature-green" />
             <span className="text-2xl font-black uppercase tracking-widest text-nature-green">{t('about.trust.t3')}</span>
           </div>
        </motion.div>
      </Section>
      </div>
  );
};

export default About;
