import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

import Section from '../components/ui/Section';
import SEO from '../components/ui/SEO';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layout/MainLayout';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Simulate API call using our service
      // await contactService.sendMessage(formData);
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-nature-white">
      <Head title={t('seo.contact_title')} />
      <SEO
        title={t('seo.contact_title')}
        description={t('seo.contact_desc')}
      />
      <Section>
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-nature-orange" />
            <span className="text-nature-orange font-bold tracking-[0.2em] text-xs uppercase">Restons en contact</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-[5.5rem] font-bold text-nature-green mb-8 tracking-tight leading-tight"
          >
            Une question ? <br />
            <span className="italic font-light text-nature-green/80">Parlons-en.</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* Contact Info Sidebar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-nature-green/40 mb-8">Coordonnées</h3>
              <div className="space-y-10">
                {[
                  { icon: MapPin, label: "Adresse", value: "Toulouse, France" },
                  { icon: Phone, label: "Téléphone", value: "+33 (0) 7 83 06 94 65" },
                  { icon: Mail, label: "Email", value: "contact@fisora.shop" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 bg-nature-beige/30 rounded-2xl flex items-center justify-center group-hover:bg-nature-green group-hover:text-nature-white transition-all duration-500">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-nature-orange uppercase tracking-widest mb-1">{item.label}</span>
                      <span className="text-xl font-medium text-nature-green">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* <motion.div variants={itemVariants}>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-nature-green/40 mb-8">Réseaux Sociaux</h3>
              <div className="flex gap-4">
                {[
                  { icon: FaInstagram, label: "Instagram" },
                  { icon: FaFacebook, label: "Facebook" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-16 h-16 bg-nature-white border border-nature-beige rounded-2xl flex items-center justify-center text-nature-green hover:bg-nature-green hover:text-nature-white hover:-translate-y-2 transition-all duration-500 shadow-premium"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div> */}
          </motion.div>

          {/* Contact Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-nature-beige/10 p-10 md:p-16 rounded-[4rem] border border-nature-beige/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-nature-orange/5 rounded-full blur-[100px] -z-10" />

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <Input
                    label="Nom Complet"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Adresse Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <Input
                  label="Votre Message"
                  name="message"
                  textarea
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Comment pouvons-nous vous aider ?"
                  required
                />

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-6 flex items-center justify-center gap-4 group"
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
                  <Send className={`w-5 h-5 ${status === 'loading' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                </Button>

                {status === 'success' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-nature-green font-bold text-center pt-4">
                    Message envoyé avec succès ! Merci.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
