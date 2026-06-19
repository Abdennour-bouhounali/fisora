import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { Heart, Sprout, Sun, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';

const About = () => {
  const { t } = useTranslation();

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const processSteps = [
    { icon: Sprout, title: t('about.process.step1_title'), desc: t('about.process.step1_desc') },
    { icon: Sun, title: t('about.process.step2_title'), desc: t('about.process.step2_desc') },
    { icon: Wind, title: t('about.process.step3_title'), desc: t('about.process.step3_desc') },
  ];

  return (
    <div className="pt-20 md:pt-32 pb-24 bg-nature-white">
      <Head title={t('seo.about_title')} />
      <SEO title={t('seo.about_title')} description={t('seo.about_desc')} />

      {/* ── Hero / Mission ── */}
      <Section className="mb-16 md:mb-24">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">

          {/* IMAGE — always first on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="order-1 lg:order-2 mb-10 lg:mb-0"
          >
            <div className="rounded-3xl md:rounded-[4rem] overflow-hidden shadow-xl border border-nature-beige/20 bg-nature-white p-2 md:p-4">
              <img
                src="/images/about_hero_premium.png"
                alt="FISORA - Natural Heritage"
                loading="lazy"
                className="w-full h-auto rounded-2xl md:rounded-[3rem]"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="h-px w-10 bg-nature-orange" />
              <span className="text-nature-orange font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
                {t('about.subtitle')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-[5rem] font-bold text-nature-green mb-6 md:mb-10 leading-[1.1] tracking-tight"
            >
              {t('about.title')}
            </motion.h1>

            <motion.div variants={fadeUp} className="space-y-5 md:space-y-8">
              <p className="text-lg md:text-2xl text-nature-green leading-relaxed font-medium border-l-4 border-nature-orange pl-5 md:pl-8 py-2">
                {t('about.mission_text')}
              </p>
              <div className="space-y-4 md:space-y-6 pt-2">
                <p className="text-base md:text-xl text-nature-green/80 leading-relaxed font-semibold">
                  {t('about.mission_p1')}
                </p>
                <p className="text-base md:text-xl text-nature-green/70 leading-relaxed font-light">
                  {t('about.mission_p2')}
                </p>
                <p className="text-base md:text-xl text-nature-green/70 leading-relaxed font-light">
                  {t('about.mission_p3')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ── Natural Heritage ── */}
      <Section className="mb-8 md:mb-16">
        <div className="bg-nature-beige/10 rounded-3xl md:rounded-[4rem] p-8 md:p-12 lg:p-20 border border-nature-beige/20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-nature-green mb-5 md:mb-8 text-center tracking-tight"
            >
              {t('about.natural_heritage')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl text-center text-nature-green/70 leading-relaxed font-light mb-10 md:mb-16"
            >
              {t('about.natural_heritage_desc')}
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg md:text-2xl font-medium text-nature-green mb-6 md:mb-10 text-center">
              {t('about.objectives_title')}
            </motion.p>

            <div className="grid sm:grid-cols-3 gap-4 md:gap-8">
              {[1, 2, 3].map((num) => (
                <motion.div key={num} variants={fadeUp}>
                  <Card className="h-full p-6 md:p-8 text-center bg-nature-white border-none shadow-premium hover:shadow-2xl transition-all duration-500 rounded-2xl md:rounded-3xl">
                    <h3 className="text-base md:text-xl font-bold text-nature-orange mb-3 md:mb-4">
                      {t(`about.objectives.obj${num}_title`)}
                    </h3>
                    <p className="text-sm md:text-base text-nature-green/70 leading-relaxed">
                      {t(`about.objectives.obj${num}_desc`)}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Founder / Story ── */}
      <Section className="mb-20 md:mb-32">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">

          {/* IMAGE — first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 mb-10 lg:mb-0 relative"
          >
            <div className="rounded-3xl md:rounded-[4rem] overflow-hidden shadow-xl border border-nature-beige/20 bg-nature-white p-2 md:p-4">
              <img
                src="/images/about_process_story.png"
                alt="Artisanat FISORA - The Process"
                loading="lazy"
                className="w-full h-auto rounded-2xl md:rounded-[3rem]"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -right-3 md:-bottom-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 bg-nature-green text-nature-white rounded-full flex items-center justify-center shadow-2xl z-20"
            >
              <Heart className="w-7 h-7 md:w-10 md:h-10 fill-current" />
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-nature-green mb-7 md:mb-10 tracking-tight"
            >
              {t('about.story_title')}
            </motion.h2>

            <div className="space-y-5 md:space-y-6">
              <motion.p variants={fadeUp} className="text-base md:text-xl text-nature-green font-medium">
                {t('about.story_p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="text-base md:text-xl text-nature-green/70 leading-relaxed font-light">
                {t('about.story_p2')}
              </motion.p>

              <motion.div variants={fadeUp} className="py-4 md:py-6">
                <p className="text-sm md:text-lg font-medium text-nature-green mb-3 md:mb-4">{t('about.story_p3')}</p>
                <ul className="space-y-3">
                  {['l1', 'l2', 'l3'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-lg text-nature-green/80">
                      <div className="mt-2 w-2 h-2 shrink-0 rounded-full bg-nature-orange" />
                      {t(`about.story_list.${item}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-base md:text-xl text-nature-green/70 leading-relaxed font-light italic border-l-2 border-nature-beige pl-5 md:pl-6"
              >
                "{t('about.story_p4')}"
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Vision ── */}
      <Section className="mb-20 md:mb-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-nature-green mb-7 md:mb-10 tracking-tight"
          >
            {t('about.vision_title')}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="space-y-4 md:space-y-6 bg-nature-white p-7 md:p-12 rounded-3xl md:rounded-[3rem] shadow-premium"
          >
            <p className="text-lg md:text-2xl font-medium text-nature-green">
              {t('about.vision_p1')}
            </p>
            <p className="text-lg md:text-2xl text-nature-orange leading-relaxed font-medium">
              {t('about.vision_p2')}
            </p>
            <div className="pt-5 mt-5 border-t border-nature-beige/20">
              <p className="text-base md:text-xl text-nature-green/70 leading-relaxed font-light">
                {t('about.vision_p3')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Quality Process ── */}
      <Section className="bg-nature-beige/20 py-16 md:py-32 rounded-3xl md:rounded-[4rem] mx-2 md:mx-4 mb-20 md:mb-40">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-nature-green mb-4 md:mb-6 tracking-tight">
            {t('about.process.title')}
          </h2>
          <p className="text-base md:text-xl text-nature-green/60 font-light">
            {t('about.process.subtitle')}
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 md:gap-12"
        >
          {processSteps.map((step, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="h-full p-8 md:p-12 text-center group border-none shadow-premium hover:shadow-2xl transition-all duration-500 rounded-3xl md:rounded-[3rem] bg-nature-white">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-nature-beige/30 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-7 md:mb-10 group-hover:bg-nature-green group-hover:text-nature-white transition-colors duration-500">
                  <step.icon className="w-7 h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-nature-green mb-4 md:mb-6">{step.title}</h3>
                <p className="text-sm md:text-lg text-nature-green/60 leading-relaxed font-light">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  );
};

export default About;