import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import { Mail, Phone, MapPin, Leaf, ArrowUpRight } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    { name: 'Suivre ma commande', path: '/track' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const productLinks = [
    { name: t('products.lemon'), path: '/products#lemon' },
    { name: t('products.orange'), path: '/products#orange' },
    { name: t('products.mint'), path: '/products#mint' },
    { name: t('products.garlic'), path: '/products#garlic' },
    { name: t('products.onion'), path: '/products#onion' },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: '#', color: 'hover:bg-[#E4405F]' },
    { icon: FaFacebookF, href: '#', color: 'hover:bg-[#1877F2]' },
    { icon: FaTwitter, href: '#', color: 'hover:bg-[#1DA1F2]' },
    { icon: FaYoutube, href: '#', color: 'hover:bg-[#FF0000]' },
  ];

  return (
    <footer className="relative bg-nature-green text-nature-white overflow-hidden pt-24 pb-12">
      {/* Decorative Organic Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nature-lemon opacity-5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-nature-orange opacity-5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <img src="/logo-white.svg" alt="FISORA" className="h-12 w-auto group-hover:scale-105 transition-transform duration-500" />
            </Link>
            <p className="text-nature-beige/60 text-lg leading-relaxed max-w-sm font-light">
              {t('footer.brand_desc')}
            </p>
            {/* <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className={`w-12 h-12 bg-nature-white/5 rounded-xl flex items-center justify-center text-nature-beige/80 transition-all duration-300 ${social.color} hover:text-nature-white border border-nature-white/10`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div> */}
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-nature-lemon/80">
              {t('footer.links_title')}
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-nature-beige/60 hover:text-nature-lemon flex items-center gap-2 group transition-colors"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-nature-lemon transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Quick Access */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-nature-lemon/80">
              {t('footer.products_title')}
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-nature-beige/60 hover:text-nature-lemon flex items-center justify-between group py-1 border-b border-nature-white/5 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-nature-lemon/80">
              {t('footer.contact_title')}
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-nature-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-nature-lemon group-hover:text-nature-green transition-all duration-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-nature-beige/80 font-medium group-hover:text-nature-white transition-colors">{t('contact.info.address')}</p>
                  <p className="text-nature-beige/40 text-sm mt-1">Toulouse, France</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-nature-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-nature-lemon group-hover:text-nature-green transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-nature-beige/80 font-medium group-hover:text-nature-white transition-colors">{t('contact.info.phone')}</p>
                  <p className="text-nature-beige/40 text-sm mt-1">Available 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-nature-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-nature-lemon group-hover:text-nature-green transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-nature-beige/80 font-medium group-hover:text-nature-white transition-colors">{t('contact.info.email')}</p>
                  <p className="text-nature-beige/40 text-sm mt-1">Contact us anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-nature-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-nature-beige/40">
          <div className="flex items-center gap-4">
            <span>&copy; {currentYear} FISORA. {t('footer.copyright')}</span>
            <span className="hidden md:block w-1 h-1 bg-nature-white/10 rounded-full" />
            <Link href="/privacy" className="hover:text-nature-lemon transition-colors">Privacy Policy</Link>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-nature-white/5 rounded-full border border-nature-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-nature-beige/60">{t('footer.made_in')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
