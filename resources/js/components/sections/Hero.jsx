import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const bgImage = isAr ? '/hero-bg-flliped.png' : '/hero-bg.png';
  const gradientDir = isAr ? 'bg-gradient-to-l' : 'bg-gradient-to-r';
  const marginClass = isAr ? 'lg:mr-12 xl:mr-20' : 'lg:ml-12 xl:ml-20';

  return (
    <>
      {/* ─────────────────────────────── DESKTOP HERO (md+) ──────────────────────────── */}
      <section
        className="hidden md:flex relative min-h-screen items-center justify-start overflow-hidden"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={`absolute inset-0 ${gradientDir} from-white/95 via-white/75 to-transparent pointer-events-none`} />

        <div className="relative z-10 w-full mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`max-w-xl py-20 ${marginClass}`}
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-nature-green/10 border border-nature-green/20 text-nature-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-nature-green animate-pulse" />
                {t('hero_section.badge')}
              </span>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              variants={item}
              className="text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-nature-green leading-[1.05] mb-8 tracking-tighter"
            >
              {t('hero_section.title_p1')}
              <br />
              <span className="italic font-light opacity-80">
                {t('hero_section.title_p2')}
              </span>
            </motion.h1>

            {/* SUBTITLE */}
            <motion.div variants={item} className="mb-12">
              <p className="text-xl lg:text-2xl text-nature-green/80 font-medium leading-relaxed">
                {t('hero_section.subtitle_p1')}
                <br />
                {t('hero_section.subtitle_p2')}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={item}>
              <Link
                href="/products"
                className="btn-premium btn-primary px-10 py-5 text-base w-max inline-flex"
              >
                {t('hero_section.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────── MOBILE HERO (< md) ─────────────────────────── */}
      <section className="flex flex-col md:hidden min-h-screen bg-nature-white overflow-hidden">
        {/* Top Text Content Area */}
        <div className="relative z-10 bg-nature-white px-6 pt-32 pb-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-nature-green/10 border border-nature-green/20 text-nature-green px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-nature-green animate-pulse" />
                {t('hero_section.badge')}
              </span>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              variants={item}
              className="text-5xl font-black text-nature-green leading-[1.05] mb-6 tracking-tighter"
            >
              {t('hero_section.title_p1')}
              <br />
              <span className="italic font-light opacity-80">
                {t('hero_section.title_p2')}
              </span>
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              variants={item}
              className="text-lg text-nature-green/80 font-medium leading-relaxed mb-8"
            >
              {t('hero_section.subtitle_p1')}
              <br />
              {t('hero_section.subtitle_p2')}
            </motion.p>

            {/* CTA */}
            <motion.div variants={item} className="w-full">
              <Link
                href="/products"
                className="btn-premium btn-primary w-full py-5 text-[15px] font-bold"
              >
                {t('hero_section.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Image Area */}
        <div className="relative flex-1 min-h-[360px] w-full">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/hero-bg-mobile.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
            }}
          />


          {/* Scroll Cue */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white flex items-center justify-center">
              <ChevronDown className="w-5 h-5 text-nature-green" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
