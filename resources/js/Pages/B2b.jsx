import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Send, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm, Head } from '@inertiajs/react';
import Section from '../components/ui/Section';
import SEO from '../components/ui/SEO';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const B2B_PRODUCTS = [
  { id: 'Garlic Concentrate', labelKey: 'coming_soon.waitlist_form.product_interest_garlic', labelFr: 'Concentré d\'Ail', labelEn: 'Garlic Concentrate', labelAr: 'ثوم مركز' },
  { id: 'Purple Onion Concentrate', labelKey: 'coming_soon.waitlist_form.product_interest_onion', labelFr: 'Concentré d\'Oignon Violet', labelEn: 'Purple Onion Concentrate', labelAr: 'بصل بنفسجي مركز' },
  { id: 'Mediterranean Base', labelKey: 'coming_soon.waitlist_form.product_interest_base', labelFr: 'Base Méditerranéenne', labelEn: 'Mediterranean Base', labelAr: 'قاعدة متوسطية' },
  { id: 'Mint Concentrate', labelKey: 'coming_soon.waitlist_form.product_interest_mint', labelFr: 'Concentré de Menthe', labelEn: 'Mint Concentrate', labelAr: 'نعناع مركز' },
  { id: 'Lemon Concentrate', labelKey: 'coming_soon.waitlist_form.product_interest_lemon', labelFr: 'Concentré de Citron', labelEn: 'Lemon Concentrate', labelAr: 'ليمون مركز' },
  { id: 'Orange Concentrate', labelKey: 'coming_soon.waitlist_form.product_interest_orange', labelFr: 'Concentré d\'Orange', labelEn: 'Orange Concentrate', labelAr: 'برتقال مركز' },
];

const B2b = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRtl = lang === 'ar';
  const [success, setSuccess] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    business_type: 'Restaurant',
    monthly_usage: '',
    products_of_interest: [],
    language: lang,
  });

  const handleCheckboxChange = (productId) => {
    const currentList = [...data.products_of_interest];
    const index = currentList.indexOf(productId);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(productId);
    }
    setData('products_of_interest', currentList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/b2b-leads', {
      onSuccess: () => {
        setSuccess(true);
        reset();
      },
    });
  };

  const getProductLabel = (product) => {
    if (lang === 'ar') return product.labelAr;
    if (lang === 'fr') return product.labelFr;
    return product.labelEn;
  };

  return (
    <div className="pt-32 pb-24 bg-nature-white">
      <Head title={t('coming_soon.b2b.title')} />
      <SEO
        title={t('coming_soon.b2b.title')}
        description={t('coming_soon.b2b.subtitle')}
      />

      <Section>
        <div className={`max-w-4xl mb-20 ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6 justify-start"
          >
            <div className="h-[1px] w-12 bg-nature-orange" />
            <span className="text-nature-orange font-bold tracking-[0.2em] text-xs uppercase">
              {t('coming_soon.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-[5.5rem] font-bold text-nature-green mb-8 tracking-tight leading-none uppercase"
          >
            {t('coming_soon.b2b.title')}
          </motion.h1>
          <p className="text-lg md:text-xl text-nature-green/60 max-w-2xl font-light leading-relaxed">
            {t('coming_soon.b2b.intro')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Info Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-nature-green/40">
                {t('contact.info.title')}
              </h3>
              <div className="space-y-8">
                <div className="flex gap-5 items-center">
                  <div className="w-12 h-12 bg-nature-beige/30 rounded-xl flex items-center justify-center text-nature-green">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-nature-orange uppercase tracking-wider">Email</span>
                    <a href="mailto:contact@fisora.shop" className="text-lg font-medium text-nature-green hover:text-nature-orange transition-colors">
                      contact@fisora.shop
                    </a>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <div className="w-12 h-12 bg-nature-beige/30 rounded-xl flex items-center justify-center text-nature-green">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-nature-orange uppercase tracking-wider">Phone</span>
                    <span className="text-lg font-medium text-nature-green">
                      +33 (0) 7 83 06 94 65
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8">
            <div className="bg-nature-beige/10 p-8 md:p-16 rounded-[4rem] border border-nature-beige/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-nature-orange/5 rounded-full blur-[100px] -z-10" />

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-nature-green text-nature-white rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-nature-green uppercase tracking-tight">
                    {t('coming_soon.b2b.title')}
                  </h3>
                  <p className="text-lg text-nature-green/60 max-w-md leading-relaxed font-light">
                    {t('coming_soon.b2b.form.success')}
                  </p>
                  <Button onClick={() => setSuccess(false)} className="px-10 py-4 mt-4">
                    {isRtl ? 'تقديم طلب آخر' : 'Submit Another Request'}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <Input
                      label={t('coming_soon.b2b.form.business_name')}
                      required
                      value={data.business_name}
                      onChange={(e) => setData('business_name', e.target.value)}
                      error={errors.business_name}
                    />

                    <Input
                      label={t('coming_soon.b2b.form.contact_name')}
                      required
                      value={data.contact_name}
                      onChange={(e) => setData('contact_name', e.target.value)}
                      error={errors.contact_name}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Input
                      label={t('coming_soon.b2b.form.email')}
                      type="email"
                      required
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      error={errors.email}
                    />

                    <Input
                      label={t('coming_soon.b2b.form.phone')}
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      error={errors.phone}
                    />
                  </div>

                  {/* Business Type Dropdown */}
                  <div className="space-y-3">
                    <label className={`text-xs font-black uppercase tracking-widest text-nature-green/60 ${isRtl ? 'mr-4' : 'ml-4'}`}>
                      {t('coming_soon.b2b.form.business_type')} <span className="text-nature-orange">*</span>
                    </label>
                    <select
                      required
                      value={data.business_type}
                      onChange={(e) => setData('business_type', e.target.value)}
                      className={`w-full bg-nature-white border-none rounded-2xl p-6 focus:ring-2 focus:ring-nature-orange transition-all shadow-premium outline-none text-nature-green ${isRtl ? 'text-right' : 'text-left'
                        }`}
                    >
                      <option value="Restaurant">{lang === 'fr' ? 'Restaurant' : lang === 'ar' ? 'مطعم' : 'Restaurant'}</option>
                      <option value="Café">{lang === 'fr' ? 'Café' : lang === 'ar' ? 'مقهى' : 'Café'}</option>
                      <option value="Caterer">{lang === 'fr' ? 'Traiteur' : lang === 'ar' ? 'متعهد حفلات/ضيافة' : 'Caterer'}</option>
                      <option value="Food Business">{lang === 'fr' ? 'Entreprise agroalimentaire' : lang === 'ar' ? 'مصنع/محل أغذية' : 'Food Business'}</option>
                      <option value="Other">{lang === 'fr' ? 'Autre' : lang === 'ar' ? 'آخر' : 'Other'}</option>
                    </select>
                    {errors.business_type && (
                      <p className="text-xs text-nature-orange mt-1">{errors.business_type}</p>
                    )}
                  </div>

                  <Input
                    label={t('coming_soon.b2b.form.monthly_usage')}
                    textarea
                    rows={4}
                    required
                    value={data.monthly_usage}
                    onChange={(e) => setData('monthly_usage', e.target.value)}
                    placeholder={isRtl ? 'مثال: نحتاج حوالي ١٥ كغ من مسحوق الليمون والنعناع شهرياً...' : 'Example: We anticipate using 10kg of Lemon Concentrate monthly...'}
                    error={errors.monthly_usage}
                  />

                  {/* Products of interest checklist */}
                  <div className="space-y-4">
                    <label className={`text-xs font-black uppercase tracking-widest text-nature-green/60 ${isRtl ? 'mr-4' : 'ml-4'}`}>
                      {t('coming_soon.b2b.form.products_of_interest')} <span className="text-nature-orange">*</span>
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {B2B_PRODUCTS.map((prod) => {
                        const isChecked = data.products_of_interest.includes(prod.id);
                        return (
                          <div
                            key={prod.id}
                            onClick={() => handleCheckboxChange(prod.id)}
                            className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${isChecked
                              ? 'bg-nature-green text-nature-white border-nature-green shadow-md'
                              : 'bg-nature-white border-nature-beige/40 text-nature-green hover:border-nature-green/50'
                              }`}
                          >
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${isChecked ? 'bg-white text-nature-green' : 'bg-nature-beige/20 border border-nature-beige'
                              }`}>
                              {isChecked && <Check className="w-4 h-4" />}
                            </div>
                            <span className="text-sm font-bold">{getProductLabel(prod)}</span>
                          </div>
                        );
                      })}
                    </div>
                    {errors.products_of_interest && (
                      <p className="text-xs text-nature-orange mt-1">{errors.products_of_interest}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={processing}
                    className="w-full py-6 flex items-center justify-center gap-4 group uppercase tracking-widest font-black text-xs"
                  >
                    {processing ? (isRtl ? 'جاري الإرسال...' : 'Submitting...') : t('coming_soon.b2b.form.submit')}
                    {!processing && <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default B2b;
