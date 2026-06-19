import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } },
};

const WhyFisora = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: Clock,
      value: t('why_fisora.card1_value'),
      title: t('why_fisora.card1_title'),
      desc: t('why_fisora.card1_desc'),
      color: 'text-nature-orange',
      bg: 'bg-nature-orange/10',
    },
    {
      icon: Leaf,
      value: t('why_fisora.card2_value'),
      title: t('why_fisora.card2_title'),
      desc: t('why_fisora.card2_desc'),
      color: 'text-nature-green',
      bg: 'bg-nature-green/10',
    },
    {
      icon: Sparkles,
      title: t('why_fisora.card3_title'),
      desc: t('why_fisora.card3_desc'),
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
  ];

  const stripItems = [
    t('why_fisora.strip1'),
    t('why_fisora.strip2'),
    t('why_fisora.strip3'),
    t('why_fisora.strip4'),
  ];

  return (
    <section className="py-24 md:py-32 bg-nature-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          {/* Section Title */}
          <motion.div variants={item} className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-nature-green tracking-tighter">
              {t('why_fisora.section_title')}
            </h2>
          </motion.div>

          {/* Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full mb-20 md:mb-28">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="flex flex-col items-center text-center p-8 md:p-10 rounded-[2.5rem] bg-white border border-nature-beige shadow-premium hover:shadow-premium-hover transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${card.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <card.icon className={`w-8 h-8 ${card.color}`} />
                </div>
                
                {card.value && (
                  <div className="text-5xl md:text-6xl font-black text-nature-green tracking-tighter mb-4">
                    {card.value}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-nature-green mb-3">
                  {card.title}
                </h3>
                
                <p className="text-base text-nature-green/60 font-medium leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Premium Value Strip */}
          <motion.div 
            variants={item}
            className="w-full bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-10 shadow-premium border border-nature-beige"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stripItems.map((stripItem, idx) => (
                <div key={idx} className="flex items-center gap-3 md:gap-4 md:justify-center">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-nature-green flex-shrink-0" />
                  <span className="text-sm md:text-base font-bold text-nature-green">
                    {stripItem}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default WhyFisora;
