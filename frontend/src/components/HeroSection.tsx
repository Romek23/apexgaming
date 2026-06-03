import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroPhoto4 from "../assets/images/banners/hero-photo-4.png";
import heroPhoto6 from "../assets/images/banners/hero-photo-6.png";
import heroPhotoVr from "../assets/images/banners/Gaming-Computer-Virtual-Reality-Compatibility-PNG-removebg-preview.png";
import heroPhotoPink from "../assets/images/banners/vecteezy_modern-gaming-pc-isolated-on-transparent_48412781-removebg-preview.png";

const heroImages = [
  { src: heroPhotoVr, color: "rgba(56,189,248,0.76)" },
  { src: heroPhotoPink, color: "rgba(217,70,239,0.72)" },
  { src: heroPhoto4, color: "rgba(244,63,94,0.68)" },
  { src: heroPhoto6, color: "rgba(34,197,94,0.66)" },
];


type HeroSectionProps = {
  onNavigateCatalog: () => void;
};

export function HeroSection({ onNavigateCatalog }: HeroSectionProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentHero = heroImages[currentImage];
  const glowColor = currentHero.color;

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-20"
      style={{ backgroundImage: "linear-gradient(to bottom, #071B3B 0%, #071B3B 76%, #0A2647 82%, #1D3A6D 88%, #8BA7D1 94%, #D9E8FB 98%, #FFFFFF 100%)" }}>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Нове покоління 2026</span>
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            Потужні Gaming PC
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              нового покоління
            </span>
          </h1>

          <p className="text-lg text-blue-100/80 mb-8 max-w-xl leading-relaxed">
            RTX серія, максимальна продуктивність та сучасний дизайн для справжніх геймерів
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              type="button"
              onClick={onNavigateCatalog}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37,99,235,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-600/50"
            >
              Купити зараз
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              type="button"
              onClick={onNavigateCatalog}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium backdrop-blur-sm border border-white/10 transition-all duration-300"
            >
              Переглянути каталог
            </motion.button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">

            {[
              { value: "500+", label: "Довірливих клієнтів" },
              { value: "98%", label: "Рейтинг задоволення" },
              { value: "24/7", label: "Підтримка" }
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-[28px] border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-[0_40px_80px_rgba(2,24,82,0.22)] transition hover:border-blue-400/30"
              >
                <div className="text-4xl sm:text-5xl font-black text-white mb-3">{stat.value}</div>
                <div className="text-sm uppercase tracking-[0.26em] text-sky-200/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="relative z-10 min-h-[360px] overflow-visible bg-transparent sm:min-h-[460px]">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 blur-[72px] transition-colors duration-700"
              style={{ backgroundColor: glowColor }}
            />

            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
              className="relative z-10 will-change-transform"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={currentHero.src}
                  alt="Gaming PC"
                  loading="eager"
                  decoding="async"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mx-auto h-[360px] w-full object-contain sm:h-[460px] lg:h-[560px]"
                  style={{
                    filter: `drop-shadow(0 28px 42px rgba(0,0,0,0.36)) drop-shadow(0 0 54px ${glowColor})`,
                  }}
                />
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <div className="dark-edge-fade absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
