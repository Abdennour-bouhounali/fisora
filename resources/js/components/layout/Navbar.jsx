import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, Leaf, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useScroll } from '../../hooks/useScroll';
import { NAV_LINKS } from '../../constants';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { url, props } = usePage();
  const coming_soon_mode = !!props.coming_soon_mode;
  const isScrolled = useScroll(20);
  const { cartCount, setIsCartOpen } = useCart();

  const links = [...NAV_LINKS];
  if (coming_soon_mode) {
    links.push({ name: 'coming_soon.b2b.nav', path: '/b2b' });
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
    setIsOpen(false);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-nature-white/80 backdrop-blur-xl shadow-premium' : 'py-4 bg-gradient-to-b from-nature-white/80 via-nature-white/50 to-transparent   '
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="FISORA" className="h-10 w-auto transition-opacity duration-500 hover:opacity-80" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm font-bold tracking-widest uppercase transition-opacity duration-300 ${url === link.path ? 'text-nature-orange' : 'text-nature-green'
                    }`}
                >
                  {t(link.name)}
                  {url === link.path && (
                    <motion.div className="absolute -bottom-2 left-0 right-0 h-1 bg-nature-orange rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Icons & Language */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              {!coming_soon_mode && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-3 bg-nature-beige/30 rounded-xl text-nature-green hover:bg-nature-green hover:text-nature-white transition-all duration-300 group"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-nature-orange text-nature-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 bg-nature-beige/30 px-4 py-2 rounded-xl text-sm font-bold text-nature-green hover:bg-nature-beige/50 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.code.toUpperCase()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-40 bg-nature-white rounded-2xl shadow-premium border border-nature-beige/50 p-2 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${i18n.language === lang.code ? 'bg-nature-green text-nature-white' : 'text-nature-green/60 hover:bg-nature-beige/30'
                            }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {!coming_soon_mode && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-nature-beige/30 rounded-xl text-nature-green"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-nature-orange text-nature-white text-[8px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-nature-beige/30 rounded-xl text-nature-green">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-nature-white border-t border-nature-beige/30 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setTimeout(() => setIsOpen(false), 150)}
                  className={`block text-2xl font-bold ${url === link.path ? 'text-nature-orange' : 'text-nature-green'
                    }`}
                >
                  {t(link.name)}
                </Link>
              ))}

              <div className="pt-8 border-t border-nature-beige/30">
                <p className="text-xs font-black uppercase tracking-widest text-nature-green/30 mb-4">Langue</p>
                <div className="flex gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${i18n.language === lang.code ? 'bg-nature-green text-nature-white shadow-premium' : 'bg-nature-beige/30 text-nature-green'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
