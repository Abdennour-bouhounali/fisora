import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight, Zap, Clock, Heart, ShieldCheck, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = ({ containerVariants, itemVariants }) => {
  const { t } = useTranslation();

  return (
    <section
      className="relative min-h-screen flex items-start justify-start overflow-hidden"
      style={{
        backgroundImage: "url('/hero-bg.png')", // your edited image in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/5 to-white/0" />

      <div className="relative z-10 mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl py-28 md:py-32 lg:ml-16"
        >
          {/* HEADLINE */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-bla   leading-[1.1] mb-6"
          >
            {t('hero_section.title_p1')}
            <br />
            <span className="italic font-light">
              {t('hero_section.title_p2')}
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-nature-green/80 leading-relaxed max-w-2xl mb-8"
          >
            {t('hero_section.subtitle')}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              href="/products"
              className="btn-premium btn-primary px-6 py-4 flex items-center justify-center"
            >
              {t('hero_section.btn_shop')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <button
              onClick={() =>
                document
                  .getElementById('how-it-works')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-premium btn-secondary px-6 py-4 flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              {t('hero_section.btn_how')}
            </button>
          </motion.div>

          {/* AVAILABLE ESSENCES */}
          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-xs uppercase tracking-widest text-nature-green mb-4 font-semibold">
              {t('hero_section.available')}
            </p>

            <div className="flex flex-wrap gap-2 text-sm md:text-base text-nature-green/80 font-medium">
              <span>{t('hero_section.essences.garlic')}</span>
              <span className="text-nature-orange/40">•</span>

              <span>{t('hero_section.essences.onion')}</span>
              <span className="text-nature-orange/40">•</span>

              <span>{t('hero_section.essences.mint')}</span>
              <span className="text-nature-orange/40">•</span>

              <span>{t('hero_section.essences.strawberry')}</span>
              <span className="text-nature-orange/40">•</span>

              <span>{t('hero_section.essences.base')}</span>
            </div>
          </motion.div>

          {/* BADGES */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:flex flex-wrap gap-5 pt-6 border-t border-white/30"
          >
            {[
              { text: t('hero_section.badges.b1'), icon: Zap },
              { text: t('hero_section.badges.b2'), icon: Clock },
              { text: t('hero_section.badges.b3'), icon: Heart },
              { text: t('hero_section.badges.b4'), icon: ShieldCheck }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <badge.icon className="w-4 h-4 text-nature-orange" />
                <span className="text-xs font-bold uppercase tracking-wider text-nature-green">
                  {badge.text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
