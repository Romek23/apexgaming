import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const heroImages = [
  new URL("../assets/images/banners/hero-photo-1.png", import.meta.url).href,
  new URL("../assets/images/banners/hero-photo-2.png", import.meta.url).href,
  new URL("../assets/images/banners/hero-photo-3.png", import.meta.url).href,
];


export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [glowColor, setGlowColor] = useState<string>("rgb(59,130,246)");


  useEffect(() => {
    let cancelled = false;

    const getAverageGlowFromImage = async (src: string) => {
      // Try to compute average color from the image to match the glow.
      // If it fails (CORS or canvas errors), keep default glow color.
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Image load failed"));
        });
        if (cancelled) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Downscale for performance
        const scale = 0.08; // smaller = faster
        const w = Math.max(1, Math.floor(img.naturalWidth * scale));
        const h = Math.max(1, Math.floor(img.naturalHeight * scale));
        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);

        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha < 10) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        if (count === 0) return;
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        // Boost the glow brightness a bit (so it looks nice on dark background)
        const boost = 1.35;
        const rr = Math.min(255, Math.round(r * boost));
        const gg = Math.min(255, Math.round(g * boost));
        const bb = Math.min(255, Math.round(b * boost));

        if (!cancelled) {
          setGlowColor(`rgb(${rr},${gg},${bb})`);
        }
      } catch {
        // ignore
      }
    };

    const loadedImages = heroImages.map((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => setImagesLoaded(true);
      return img;
    });

    // Initial color sync
    getAverageGlowFromImage(heroImages[0]);

    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const next = (prev + 1) % heroImages.length;
        getAverageGlowFromImage(heroImages[next]);
        return next;
      });
    }, 15000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      loadedImages.forEach((img) => {
        img.onload = null;
      });
    };
  }, []);


  return (
    <section
      className="relative min-h-screen overflow-hidden pt-20"
      style={{ backgroundImage: "linear-gradient(to bottom, #071B3B 0%, #071B3B 76%, #0A2647 82%, #1D3A6D 88%, #8BA7D1 94%, #D9E8FB 98%, #FFFFFF 100%)" }}>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_60%)]" />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"
        />
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
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37,99,235,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-600/50"
            >
              Купити зараз
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
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
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 overflow-hidden rounded-[32px] bg-transparent"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`glow-${heroImages[currentImage]}`}
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  boxShadow: `0 0 0 0 rgba(0,0,0,0), 0 0 60px ${glowColor}, 0 0 120px ${glowColor}, 0 0 220px ${glowColor}`
                }}
              />

              <motion.img
                key={heroImages[currentImage]}
                src={heroImages[currentImage]}
                alt="Gaming PC"
                loading="eager"
                decoding="async"
                initial={imagesLoaded ? { opacity: 0, y: 10, scale: 0.99 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="relative z-10 w-full h-auto object-cover will-change-transform"
                style={{
                  filter: `blur(0px) drop-shadow(0 0 26px ${glowColor}) drop-shadow(0 0 90px ${glowColor})`,
                }}
              />

            </AnimatePresence>

          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
