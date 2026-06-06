import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight, Leaf, ShieldCheck, CheckCircle2, PlayCircle, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = ({ containerVariants, itemVariants }) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 md:pt-24 pb-12 overflow-hidden bg-nature-white">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle ambient light from 'ingredients' */}
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[20%] w-[30%] h-[40%] bg-nature-orange/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[10%] w-[40%] h-[30%] bg-nature-green/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col"
          >
            {/* EYEBROW */}
            {/* <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-nature-orange" />
              <span className="text-nature-orange font-bold tracking-[0.2em] text-xs uppercase">
                Mediterranean Ingredients Reimagined
              </span>
            </motion.div> */}

            {/* HEADLINE */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-nature-green leading-[1.1] mb-6 md:mb-8 tracking-tight"
            >
              Real Ingredients.<br />
              <span className="italic font-light">Smarter Cooking.</span>
            </motion.h1>

            {/* SUBHEADLINE */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-nature-green/70 mb-8 md:mb-10 leading-relaxed max-w-2xl font-light"
            >
              FISORA helps people eat and cook in a smarter way, transforming real Mediterranean fruits, vegetables, and herbs into concentrated pantry essentials that make everyday meals easier, healthier, and more convenient.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-10 md:mb-12">
              <Link href="/products" className="btn-premium btn-primary text-base md:text-lg px-6 py-3 md:px-8 md:py-4 group justify-center flex items-center">
                Shop Ingredients
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-premium btn-secondary text-base md:text-lg px-6 py-3 md:px-8 md:py-4 flex items-center justify-center gap-2 group">
                <PlayCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                See How It Works
              </button>
            </motion.div>

            {/* PRODUCT PREVIEW */}
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-xs uppercase tracking-widest text-nature-green/50 mb-4 font-semibold">Available Essences</p>
              <div className="flex flex-wrap gap-2 text-sm text-nature-green/80 font-medium">
                <span>Garlic</span>
                <span className="text-nature-orange/40">•</span>
                <span>Purple Onion</span>
                <span className="text-nature-orange/40">•</span>
                <span>Mint</span>
                <span className="text-nature-orange/40">•</span>
                <span>Strawberry</span>
                <span className="text-nature-orange/40">•</span>
                <span>Mediterranean Base</span>
              </div>
            </motion.div>

            {/* TRUST BAR */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:flex flex-wrap gap-x-4 md:gap-x-8 gap-y-4 items-center pt-6 md:pt-8 border-t border-nature-beige">
              {[
                { text: "100% Real Ingredients", icon: Leaf },
                { text: "No Additives", icon: ShieldCheck },
                { text: "Naturally Dehydrated", icon: Droplets },
                { text: "Mediterranean Sourced", icon: CheckCircle2 }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="w-4 h-4 text-nature-orange flex-shrink-0" />
                  <span className="text-[10px] md:text-xs font-bold text-nature-green/80 uppercase tracking-wider leading-tight">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* VISUAL: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl aspect-square sm:aspect-[4/5]">
              <motion.img
                src="/hero.png"
                alt="FISORA Mediterranean Ingredients"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
