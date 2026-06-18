import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// ─── Static (non-translatable) step metadata ──────────────────────────────────
const STEP_META = [
  { moisture: 87, intensity: 1, accent: "#c25a00", bg: "#fff7ed", image: "/fresh_oranges.png", particles: "water" },
  { moisture: 70, intensity: 2, accent: "#b04e00", bg: "#fef0dc", image: "/Preparation.png", particles: "water" },
  { moisture: 40, intensity: 3, accent: "#9e4200", bg: "#fde8c8", image: "/Dehydration.png", particles: "steam" },
  { moisture: 12, intensity: 5, accent: "#7a3200", bg: "#f5d9b0", image: "/Concentration.png", particles: "sparkle" },
  { moisture: 4, intensity: 5, accent: "#5c2500", bg: "#ead8b0", image: "/final_result.png", particles: "none" },
];

// ─── Particle Canvas ───────────────────────────────────────────────────────────
const ParticleCanvas = ({ type }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv || type === 'none') return;
    const ctx = cv.getContext('2d');
    const W = cv.offsetWidth, H = cv.offsetHeight;
    cv.width = W; cv.height = H;

    const color = { water: '#7bb8e0', steam: '#b8ccd8', sparkle: '#e09030' }[type];
    const pts = Array.from({ length: type === 'sparkle' ? 16 : 22 }, () => ({
      x: Math.random() * W,
      y: H * 0.4 + Math.random() * H * 0.6,
      r: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.8 + 0.25),
      vx: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.55 + 0.15,
      da: -(Math.random() * 0.004 + 0.0015),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.y += p.vy; p.x += p.vx; p.a += p.da;
        if (p.a <= 0 || p.y < -8) {
          p.y = H; p.x = Math.random() * W; p.a = Math.random() * 0.5 + 0.15;
        }
        ctx.globalAlpha = Math.max(0, p.a);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-3xl"
    />
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Transformation = () => {
  const containerRef = useRef(null);
  const [step, setStep] = useState(0);
  const { t } = useTranslation();

  // Build steps array from translations, merged with static meta
  const steps = STEP_META.map((meta, i) => ({
    ...meta,
    eyebrow: t(`transformation.steps.${i}.eyebrow`),
    title: t(`transformation.steps.${i}.title`),
    desc: t(`transformation.steps.${i}.desc`),
    details: t(`transformation.steps.${i}.details`, { returnObjects: true }),
    caption: t(`transformation.steps.${i}.caption`),
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress → step index
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const idx = Math.min(steps.length - 1, Math.floor(v * steps.length));
      setStep(idx);
    });
  }, [scrollYProgress, steps.length]);

  const s = steps[step];

  // Subtle global scale
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 0.97]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * 90}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Animated background */}
        <motion.div
          className="absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: s.bg }}
        />

        {/* Progress dots */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {steps.map((st, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="w-5 h-px bg-black/10" />
              )}
              <motion.div
                className="rounded-full"
                animate={{
                  width: i === step ? 20 : 8,
                  height: 8,
                  backgroundColor: i <= step ? st.accent : 'rgba(0,0,0,0.12)',
                }}
                transition={{ duration: 0.35 }}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Step counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase text-black/30 z-20">
          {t('transformation.step_of', { current: step + 1, total: steps.length })}
        </div>

        <motion.div
          style={{ scale }}
          className="relative w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 xl:gap-24 z-10 mt-6 md:mt-0"
        >

          {/* ── LEFT: Text ── */}
          <div className="flex-1 relative min-h-[200px] lg:min-h-[360px] w-full max-w-lg lg:max-w-xl mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Eyebrow */}
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3"
                  style={{ color: s.accent }}>
                  {s.eyebrow}
                </p>

                {/* Title */}
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-stone-900 leading-tight mb-2 md:mb-4 lg:mb-5">
                  {s.title}
                </h2>

                {/* Desc */}
                <p className="text-sm md:text-base lg:text-xl text-stone-500 leading-relaxed max-w-sm lg:max-w-md mb-4 md:mb-6 lg:mb-8">
                  {s.desc}
                </p>

                {/* Details */}
                <ul className="space-y-1 md:space-y-2 lg:space-y-3 mb-4 md:mb-6 lg:mb-8">
                  {s.details.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex items-center gap-2.5 text-sm lg:text-lg text-stone-500"
                    >
                      <span
                        className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: s.accent, opacity: 0.7 }}
                      />
                      {d}
                    </motion.li>
                  ))}
                </ul>

                {/* Moisture bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] tracking-widest uppercase text-stone-400 mb-1.5">
                    <span>{t('transformation.moisture_label')}</span>
                    <span>{s.moisture}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-black/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: s.accent }}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.moisture}%` }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                </div>

                {/* Intensity dots */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] tracking-widest uppercase text-stone-400">
                    {t('transformation.intensity_label')}
                  </span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        animate={{ backgroundColor: i < s.intensity ? s.accent : 'rgba(0,0,0,0.1)' }}
                        transition={{ delay: i * 0.06 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="w-[70%] max-w-[280px] md:w-[60%] lg:w-[480px] xl:w-[560px] lg:max-w-none flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3]">

              {/* Particles */}
              <ParticleCanvas type={s.particles} key={`${step}-particles`} />

              {/* Moisture badge */}
              <motion.div
                key={`badge-${step}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-[11px] font-semibold text-white tracking-wide"
                style={{ backgroundColor: s.accent }}
              >
                {s.moisture}% H₂O
              </motion.div>

              {/* Images with crossfade */}
              <AnimatePresence>
                <motion.img
                  key={`img-${step}`}
                  src={s.image}
                  alt={s.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Caption bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent px-4 py-3 z-10">
                <p className="text-white/90 text-xs font-medium tracking-widest uppercase">
                  {s.caption}
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Transformation;