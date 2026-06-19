import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Head, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/sections/Hero';
import Transformation from '../components/sections/Transformation';
import Ecosystem from '../components/sections/Ecosystem';
import FeatureShowcase from '../components/sections/FeatureShowcase';
import { useWaitlist } from '../context/WaitlistContext';
import Button from '../components/common/Button';
import axios from 'axios';

const USAGES = [
  { id: 'culinary', img: '/images/usages/culinary.png', title: 'Culinary Arts', desc: 'Elevate your cooking with concentrated flavors.' },
  { id: 'wellness', img: '/images/usages/wellness.png', title: 'Wellness', desc: 'Natural ingredients for your daily health rituals.' },
  { id: 'beverages', img: '/images/usages/beverages.png', title: 'Beverages', desc: 'Transform your drinks with pure botanical essences.' },
];

const Home = ({ featured_products = [] }) => {
  const { t, i18n } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const { props } = usePage();
  const coming_soon_mode = !!props.coming_soon_mode;
  const isRtl = i18n.language === 'ar';

  const getLocalizedName = (product) => {
    const lang = i18n.language;
    return product.name ? (product.name[lang] || product.name.fr) : '';
  };

  return (
    <div className="overflow-clip">
      <Head title={t('seo.home_title') || "Accueil"} />
      <Hero />

      {coming_soon_mode && (
        <section className="bg-nature-beige/20 py-16 border-y border-nature-beige/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-nature-green text-nature-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-premium">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
              <div className={`space-y-4 max-w-2xl text-center md:text-start z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-nature-orange">
                  <span className="w-1.5 h-1.5 rounded-full bg-nature-orange animate-pulse" />
                  {t('coming_soon.badge')}
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                  {t('coming_soon.banner.title')}
                </h2>
                <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                  {t('coming_soon.banner.description')}
                </p>
              </div>
              <div className="z-10 w-full md:w-auto flex justify-center">
                <Button
                  onClick={() => {
                    axios.post('/analytics/track', {
                      interaction_type: 'cta_click',
                      language: i18n.language,
                    }).catch(() => { });
                    openWaitlist();
                  }}
                  className="w-full md:w-auto py-5 px-12 bg-nature-orange text-white hover:bg-white hover:text-nature-green font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl transition-all"
                >
                  {t('coming_soon.banner.btn')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Transformation />

      {/* Marquee Separator */}
      <div className="bg-nature-green text-nature-white py-6 md:py-8 overflow-hidden flex whitespace-nowrap shadow-inner border-y border-nature-green">
        <motion.div
          className="flex gap-8 md:gap-16 items-center text-[10px] md:text-xs font-black uppercase tracking-[0.3em] pl-8 md:pl-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span>{t('home_page.marquee.t1')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>{t('home_page.marquee.t2')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>{t('home_page.marquee.t3')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>{t('home_page.marquee.t4')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <Ecosystem />

      {/* Product Highlight Section */}
      <section className="bg-nature-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-nature-orange mb-4 block">{t('home_page.collection')}</span>
              <h2 className="text-5xl md:text-7xl font-black text-nature-green tracking-tighter leading-[0.9]">
                {t('home_page.essence_p1')} <span className="italic font-light">{t('home_page.essence_p2')}</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="group flex items-center gap-4 text-nature-green font-bold uppercase tracking-widest text-xs border-b-2 border-nature-beige pb-2 hover:border-nature-green transition-all"
            >
              {t('home_page.view_all')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featured_products.length === 0 ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-nature-beige/20 rounded-[3rem] animate-pulse" />
              ))
            ) : (
              featured_products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-6 bg-nature-beige/30">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={getLocalizedName(product)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-nature-green">{getLocalizedName(product)}</h3>
                  <p className="text-nature-green/60">{product.price} {t('products.price') || 'DA'}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <FeatureShowcase />

      {/* Usages Section */}
      <section className="bg-nature-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-nature-orange mb-4 block">{t('home_page.usages_sub')}</span>
            <h2 className="text-5xl md:text-7xl font-black text-nature-green tracking-tighter leading-[0.9]">
              {t('home_page.usages_title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {USAGES.map((usage, index) => (
              <motion.div
                key={usage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative aspect-[16/10] overflow-hidden rounded-[3rem] cursor-pointer"
              >
                <img
                  src={usage.img}
                  alt={t(`usages.${usage.id}_title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nature-green/80 via-nature-green/20 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">{t(`usages.${usage.id}_title`)}</h3>
                  <p className="text-white/80 text-sm font-light leading-relaxed">{t(`usages.${usage.id}_desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-nature-green rounded-[4rem] p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 rounded-full blur-[120px] -z-0" />
            <div className="flex-grow z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
                {t('home_page.cta_title_p1')} <br />
                <span className="italic font-light opacity-60">{t('home_page.cta_title_p2')}</span>
              </h2>
              <Link href="/about">
                <button className="bg-white text-nature-green px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-nature-orange hover:text-white transition-all shadow-xl">
                  {t('home_page.cta_btn')}
                </button>
              </Link>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-white/10 rounded-[3rem] backdrop-blur-md border border-white/10 flex items-center justify-center p-12 z-10">
              <div className="text-center">
                <span className="block text-5xl font-black text-white mb-2 italic">{t('home_page.cta_100')}</span>
                <span className="block text-xs font-black uppercase tracking-[0.3em] text-white/40">{t('home_page.cta_desc')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
