import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Cpu,
  Globe,
  HardDrive,
  Mail,
  Phone,
  SlidersHorizontal,
  Star,
  Zap,
} from "lucide-react";
import { Header } from "./Header";
import type { AppUser } from "../types/user";

import heroPhoto1 from "../assets/images/banners/Gaming-Computer-Virtual-Reality-Compatibility-PNG-removebg-preview.png";
import heroPhoto2 from "../assets/images/banners/vecteezy_modern-gaming-pc-isolated-on-transparent_48412781-removebg-preview.png";
import heroPhoto3 from "../assets/images/banners/hero-photo-4.png";
import heroPhoto4 from "../assets/images/banners/hero-photo-6.png";

const heroProduct = heroPhoto1;

const productImages = [heroPhoto1, heroPhoto2, heroPhoto3, heroPhoto4, heroPhoto2];

const productStockImages = [heroPhoto1, heroPhoto2, heroPhoto3, heroPhoto4, heroPhoto1];

const navItems = ["Головна", "Каталог", "Збірки", "Комплектуючі", "Контакти"];

const filters = [
  { title: "RTX серія", options: ["RTX 4060", "RTX 4070", "RTX 4080", "RTX 4090"] },
  { title: "Процесор", options: ["Intel", "Ryzen"] },
  { title: "RAM", options: ["16GB", "32GB", "64GB"] },
  { title: "Призначення", options: ["Gaming", "Streaming", "Workstation"] },
  { title: "Бренд", options: ["APEX", "ROG Style", "NZXT Style"] },
];

const products = [
  {
    name: "Apex Nova X1",
    cpu: "Intel Core i5-14600KF",
    gpu: "RTX 4060 Ti",
    ram: "32GB DDR5",
    ssd: "1TB NVMe",
    fps: "165 FPS",
    price: "45 900 грн",
    image: productImages[3],
    glow: "rgba(236,72,153,0.42)",
    brand: "APEX",
    purpose: "Gaming",
  },
  {
    name: "Apex Striker Pro",
    cpu: "Ryzen 7 7800X3D",
    gpu: "RTX 4070 Super",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "240 FPS",
    price: "72 500 грн",
    image: productImages[4],
    glow: "rgba(14,165,233,0.46)",
    brand: "APEX",
    purpose: "Streaming",
  },
  {
    name: "Apex Frostline",
    cpu: "Intel Core i7-14700KF",
    gpu: "RTX 4080 Super",
    ram: "64GB DDR5",
    ssd: "2TB NVMe",
    fps: "300 FPS",
    price: "96 900 грн",
    image: productImages[0],
    glow: "rgba(217,70,239,0.38)",
    brand: "ROG Style",
    purpose: "Workstation",
  },
  {
    name: "Apex Redline S",
    cpu: "Ryzen 5 7600X",
    gpu: "RTX 4070",
    ram: "32GB DDR5",
    ssd: "1TB NVMe",
    fps: "210 FPS",
    price: "61 200 грн",
    image: productImages[1],
    glow: "rgba(239,68,68,0.44)",
    brand: "NZXT Style",
    purpose: "Gaming",
  },
  {
    name: "Apex Prism Ultra",
    cpu: "Intel Core i9-14900KF",
    gpu: "RTX 4090",
    ram: "64GB DDR5",
    ssd: "4TB NVMe",
    fps: "360 FPS",
    price: "149 900 грн",
    image: productImages[2],
    glow: "rgba(34,211,238,0.44)",
    brand: "ROG Style",
    purpose: "Streaming",
  },
  {
    name: "Apex Studio Max",
    cpu: "Ryzen 9 7950X",
    gpu: "RTX 4080",
    ram: "64GB DDR5",
    ssd: "2TB NVMe",
    fps: "280 FPS",
    price: "118 400 грн",
    image: productImages[4],
    glow: "rgba(59,130,246,0.44)",
    brand: "NZXT Style",
    purpose: "Workstation",
  },

  {
    name: "Apex Nova X1 Plus",
    cpu: "Intel Core i7-14700KF",
    gpu: "RTX 4070 Ti Super",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "260 FPS",
    price: "84 900 грн",
    image: productStockImages[0],
    glow: "rgba(14,165,233,0.42)",
    brand: "APEX",
    purpose: "Streaming",
  },
  {
    name: "Apex Streamline S2",
    cpu: "Ryzen 7 7800X3D",
    gpu: "RTX 4070 Super",
    ram: "64GB DDR5",
    ssd: "2TB NVMe",
    fps: "235 FPS",
    price: "79 900 грн",
    image: productStockImages[4],
    glow: "rgba(236,72,153,0.40)",
    brand: "NZXT Style",
    purpose: "Gaming",
  },
  {
    name: "Apex ChairSetup C1",
    cpu: "Intel Core i5-14600KF",
    gpu: "RTX 4060 Ti",
    ram: "32GB DDR5",
    ssd: "1TB NVMe",
    fps: "175 FPS",
    price: "49 900 грн",
    image: productStockImages[2],
    glow: "rgba(34,211,238,0.42)",
    brand: "APEX",
    purpose: "Gaming",
  },
  {
    name: "Apex Connectivity P4",
    cpu: "Ryzen 5 7600X",
    gpu: "RTX 4060 Ti",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "170 FPS",
    price: "52 900 грн",
    image: productStockImages[1],
    glow: "rgba(59,130,246,0.42)",
    brand: "ROG Style",
    purpose: "Streaming",
  },
  {
    name: "Apex Maintenance Pro",
    cpu: "Ryzen 7 7700",
    gpu: "RTX 4070",
    ram: "32GB DDR5",
    ssd: "1TB NVMe",
    fps: "215 FPS",
    price: "63 900 грн",
    image: productStockImages[3],
    glow: "rgba(239,68,68,0.40)",
    brand: "NZXT Style",
    purpose: "Workstation",
  },

  // --- Added ~20 more configs (duplicated catalog images, unique characteristics/prices) ---
  {
    name: "Apex Nova X2",
    cpu: "Intel Core i5-13400F",
    gpu: "RTX 4060 Ti",
    ram: "16GB DDR5",
    ssd: "1TB NVMe",
    fps: "135 FPS",
    price: "38 900 грн",
    image: productImages[4],
    glow: "rgba(56,189,248,0.30)",
    brand: "APEX",
    purpose: "Gaming",
  },
  {
    name: "Apex Nova X3",
    cpu: "Ryzen 5 5600X",
    gpu: "RTX 4060",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "150 FPS",
    price: "36 900 грн",
    image: productImages[0],
    glow: "rgba(236,72,153,0.30)",
    brand: "ROG Style",
    purpose: "Streaming",
  },
  {
    name: "Apex Striker Pro S",
    cpu: "Intel Core i7-13700KF",
    gpu: "RTX 4070",
    ram: "32GB DDR5",
    ssd: "1TB NVMe",
    fps: "205 FPS",
    price: "69 900 грн",
    image: productImages[1],
    glow: "rgba(14,165,233,0.34)",
    brand: "APEX",
    purpose: "Streaming",
  },
  {
    name: "Apex Striker Pro M",
    cpu: "Ryzen 7 7700X",
    gpu: "RTX 4070 Super",
    ram: "64GB DDR5",
    ssd: "2TB NVMe",
    fps: "245 FPS",
    price: "92 900 грн",
    image: productImages[2],
    glow: "rgba(239,68,68,0.32)",
    brand: "NZXT Style",
    purpose: "Workstation",
  },
  {
    name: "Apex Frostline XL",
    cpu: "Intel Core i9-13900KF",
    gpu: "RTX 4080",
    ram: "64GB DDR5",
    ssd: "4TB NVMe",
    fps: "315 FPS",
    price: "132 900 грн",
    image: productImages[3],
    glow: "rgba(217,70,239,0.30)",
    brand: "ROG Style",
    purpose: "Workstation",
  },
  {
    name: "Apex Redline S2",
    cpu: "Ryzen 5 7600X",
    gpu: "RTX 4070",
    ram: "16GB DDR5",
    ssd: "1TB NVMe",
    fps: "180 FPS",
    price: "56 900 грн",
    image: productImages[0],
    glow: "rgba(34,211,238,0.30)",
    brand: "NZXT Style",
    purpose: "Gaming",
  },
  {
    name: "Apex Redline S3",
    cpu: "Intel Core i5-14600KF",
    gpu: "RTX 4070 Ti",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "235 FPS",
    price: "79 900 грн",
    image: productImages[1],
    glow: "rgba(59,130,246,0.30)",
    brand: "APEX",
    purpose: "Gaming",
  },
  {
    name: "Apex Prism Ultra Lite",
    cpu: "Ryzen 9 7900X",
    gpu: "RTX 4090",
    ram: "64GB DDR5",
    ssd: "4TB NVMe",
    fps: "380 FPS",
    price: "189 900 грн",
    image: productImages[2],
    glow: "rgba(14,165,233,0.28)",
    brand: "ROG Style",
    purpose: "Streaming",
  },
  {
    name: "Apex Studio Max V2",
    cpu: "Intel Core i7-14700KF",
    gpu: "RTX 4080 Super",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "295 FPS",
    price: "119 900 грн",
    image: productImages[4],
    glow: "rgba(236,72,153,0.26)",
    brand: "NZXT Style",
    purpose: "Workstation",
  },
  {
    name: "Apex Nova X1 Compact",
    cpu: "Ryzen 7 7700",
    gpu: "RTX 4060 Ti",
    ram: "32GB DDR5",
    ssd: "512GB NVMe",
    fps: "140 FPS",
    price: "29 900 грн",
    image: productStockImages[0],
    glow: "rgba(14,165,233,0.32)",
    brand: "APEX",
    purpose: "Gaming",
  },
  {
    name: "Apex Streamline S2 Plus",
    cpu: "Intel Core i7-13700K",
    gpu: "RTX 4070 Super",
    ram: "64GB DDR5",
    ssd: "2TB NVMe",
    fps: "255 FPS",
    price: "99 900 грн",
    image: productStockImages[1],
    glow: "rgba(34,211,238,0.30)",
    brand: "ROG Style",
    purpose: "Streaming",
  },
  {
    name: "Apex ChairSetup C1 Pro",
    cpu: "Ryzen 5 7600",
    gpu: "RTX 4060 Ti",
    ram: "16GB DDR5",
    ssd: "1TB NVMe",
    fps: "155 FPS",
    price: "42 900 грн",
    image: productStockImages[2],
    glow: "rgba(236,72,153,0.28)",
    brand: "APEX",
    purpose: "Gaming",
  },
  {
    name: "Apex Connectivity P4 Plus",
    cpu: "Intel Core i5-13600KF",
    gpu: "RTX 4070",
    ram: "32GB DDR5",
    ssd: "1TB NVMe",
    fps: "200 FPS",
    price: "61 900 грн",
    image: productStockImages[3],
    glow: "rgba(239,68,68,0.28)",
    brand: "NZXT Style",
    purpose: "Streaming",
  },
  {
    name: "Apex Maintenance Pro V3",
    cpu: "Ryzen 7 7700",
    gpu: "RTX 4080",
    ram: "64GB DDR5",
    ssd: "2TB NVMe",
    fps: "285 FPS",
    price: "109 900 грн",
    image: productStockImages[4],
    glow: "rgba(59,130,246,0.26)",
    brand: "ROG Style",
    purpose: "Workstation",
  },
  {
    name: "Apex Streamline S3",
    cpu: "Intel Core i9-12900K",
    gpu: "RTX 4070 Ti Super",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "275 FPS",
    price: "104 900 грн",
    image: productImages[3],
    glow: "rgba(14,165,233,0.30)",
    brand: "APEX",
    purpose: "Streaming",
  },
  {
    name: "Apex Frostline Mini",
    cpu: "Ryzen 7 7800X3D",
    gpu: "RTX 4080",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "305 FPS",
    price: "124 900 грн",
    image: productImages[0],
    glow: "rgba(217,70,239,0.24)",
    brand: "NZXT Style",
    purpose: "Gaming",
  },
  {
    name: "Apex Redline S4",
    cpu: "Intel Core i7-12700K",
    gpu: "RTX 4060",
    ram: "32GB DDR5",
    ssd: "2TB NVMe",
    fps: "165 FPS",
    price: "34 900 грн",
    image: productImages[1],
    glow: "rgba(34,211,238,0.26)",
    brand: "APEX",
    purpose: "Gaming",
  },
  {
    name: "Apex Nova X4",
    cpu: "Ryzen 9 7950X",
    gpu: "RTX 4090",
    ram: "64GB DDR5",
    ssd: "4TB NVMe",
    fps: "405 FPS",
    price: "219 900 грн",
    image: productImages[2],
    glow: "rgba(239,68,68,0.24)",
    brand: "ROG Style",
    purpose: "Workstation",
  },
  {
    name: "Apex Prism Ultra Pro",
    cpu: "Intel Core i9-14900KF",
    gpu: "RTX 4080 Super",
    ram: "32GB DDR5",
    ssd: "3TB NVMe",
    fps: "330 FPS",
    price: "141 900 грн",
    image: productImages[4],
    glow: "rgba(59,130,246,0.24)",
    brand: "NZXT Style",
    purpose: "Streaming",
  },
  {
    name: "Apex Connectivity P5",
    cpu: "Intel Core i5-14600KF",
    gpu: "RTX 4070 Super",
    ram: "16GB DDR5",
    ssd: "2TB NVMe",
    fps: "220 FPS",
    price: "57 900 грн",
    image: productStockImages[0],
    glow: "rgba(14,165,233,0.26)",
    brand: "ROG Style",
    purpose: "Streaming",
  },
];

const parseProductPrice = (price: string) => Number(price.replace(/\D/g, ""));

const catalogPriceBounds = products.reduce(
  (bounds, product) => {
    const price = parseProductPrice(product.price);
    return {
      min: Math.min(bounds.min, price),
      max: Math.max(bounds.max, price),
    };
  },
  { min: Number.POSITIVE_INFINITY, max: 0 }
);

const PRICE_STEP = 1000;

const formatPrice = (value: number) => `${value.toLocaleString("uk-UA")} грн`;

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (option: string) => void;
}) {
  return (
    <div className="border-t border-slate-200/70 pt-5 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selected.has(option);
          return (
            <label
              key={option}
              className="group flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700"
              onClick={(e) => {
                e.preventDefault();
                onToggle(option);
              }}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-md border bg-white transition group-hover:border-sky-400 ${
                  isSelected ? "border-sky-400" : "border-slate-300"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-[3px] bg-sky-500 shadow-[0_0_18px_rgba(14,165,233,0.85)] transition ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </span>
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

type CatalogPageProps = {
  user?: AppUser | null;
  onNavigateHome?: () => void;
  onNavigateCatalog?: () => void;
  onNavigateBuilder?: () => void;
  onNavigateAuth?: () => void;
  onNavigateProfile?: () => void;
};

export function CatalogPage({
  user,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateAuth,
  onNavigateProfile,
}: CatalogPageProps) {
  const ITEMS_PER_PAGE = 6;

  const catalogTopRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({});
  const initialPriceRange: [number, number] = [catalogPriceBounds.min, catalogPriceBounds.max];
  const [draftPriceRange, setDraftPriceRange] = useState<[number, number]>(initialPriceRange);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    catalogPriceBounds.min,
    catalogPriceBounds.max,
  ]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPriceRange(draftPriceRange);
      setCurrentPage(1);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [draftPriceRange]);

  const updateDraftPriceRange = (nextRange: [number, number]) => {
    setDraftPriceRange(nextRange);
  };

  const updateMinPrice = (value: number) => {
    const nextMin = Math.max(catalogPriceBounds.min, Math.min(value, draftPriceRange[1] - PRICE_STEP));
    updateDraftPriceRange([nextMin, draftPriceRange[1]]);
  };

  const updateMaxPrice = (value: number) => {
    const nextMax = Math.min(catalogPriceBounds.max, Math.max(value, draftPriceRange[0] + PRICE_STEP));
    updateDraftPriceRange([draftPriceRange[0], nextMax]);
  };

  const toggleFilter = (groupTitle: string, option: string) => {
    setSelectedFilters((prev) => {
      const next = { ...prev };
      const groupSet = new Set(next[groupTitle] ?? []);
      if (groupSet.has(option)) groupSet.delete(option);
      else groupSet.add(option);

      if (groupSet.size === 0) delete next[groupTitle];
      else next[groupTitle] = groupSet;

      return next;
    });

    setCurrentPage(1);
    requestAnimationFrame(() => {
      catalogTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const filteredProducts = useMemo(() => {
    const hasGroup = (title: string) => !!selectedFilters[title]?.size;

    const optionMatches = (product: (typeof products)[number], groupTitle: string, options: Set<string>) => {
      const optionList = [...options];

      const any = (substr: string | undefined, opt: string) => (substr ?? "").includes(opt);

      // OR всередині групи
      return optionList.some((opt) => {
        if (groupTitle === "RTX серія") return any(product.gpu, opt);
        if (groupTitle === "Процесор") return any(product.cpu, opt);
        if (groupTitle === "RAM") return any(product.ram, opt);

        if (groupTitle === "Призначення") return any(product.purpose, opt);
        if (groupTitle === "Бренд") return any(product.brand, opt);

        return true;
      });
    };

    // AND між групами
    return products.filter((product) => {
      const productPrice = parseProductPrice(product.price);
      const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];

      return matchesPrice && filters.every((f) => {
        if (!hasGroup(f.title)) return true;
        return optionMatches(product, f.title, selectedFilters[f.title]);
      });
    });
  }, [priceRange, selectedFilters]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
    [filteredProducts.length]
  );
  const safeTotalPages = Math.max(1, totalPages);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [currentPage, filteredProducts]);

  const shouldShowPagination = filteredProducts.length > ITEMS_PER_PAGE;

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(1, page), safeTotalPages);
    setCurrentPage(next);

    requestAnimationFrame(() => {
      catalogTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header
        user={user}
        onNavigateHome={onNavigateHome}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
        onNavigateAuth={onNavigateAuth}
        onNavigateProfile={onNavigateProfile}
      />

      <main>
        <section className="relative overflow-hidden bg-[#061a3a] pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(14,165,233,0.36),transparent_34%),radial-gradient(circle_at_18%_42%,rgba(37,99,235,0.22),transparent_32%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/45 bg-white/14 px-4 py-2 text-sm font-bold text-white shadow-[0_0_26px_rgba(14,165,233,0.20)] backdrop-blur-xl">
                <Zap className="h-4 w-4 text-sky-300" />
                Premium gaming ecommerce 2026
              </div>
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Каталог Gaming PC
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-sky-50">
                Обери потужний комп&apos;ютер для gaming, streaming та роботи
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative min-h-[360px]"
            >
              <div className="absolute inset-8 rounded-full bg-sky-400/42 blur-[76px]" />
              <img
                src={heroProduct}
                alt="Gaming PC"
                className="relative z-10 ml-auto max-h-[430px] w-full object-contain drop-shadow-[0_0_54px_rgba(14,165,233,0.68)]"
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[300px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-500">Filters</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">Підібрати ПК</h2>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-600 shadow-[0_0_34px_rgba(14,165,233,0.16)]">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-950">Ціна</h3>
                  <span className="text-sm font-bold text-sky-600">
                    {formatPrice(draftPriceRange[0])} - {formatPrice(draftPriceRange[1])}
                  </span>
                </div>
                <div className="relative mb-5 h-6">
                  <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-slate-100" />
                  <div
                    className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-500 to-blue-700 shadow-[0_0_24px_rgba(14,165,233,0.45)]"
                    style={{
                      left: `${((draftPriceRange[0] - catalogPriceBounds.min) / (catalogPriceBounds.max - catalogPriceBounds.min)) * 100}%`,
                      right: `${100 - ((draftPriceRange[1] - catalogPriceBounds.min) / (catalogPriceBounds.max - catalogPriceBounds.min)) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={catalogPriceBounds.min}
                    max={catalogPriceBounds.max}
                    step={PRICE_STEP}
                    value={draftPriceRange[0]}
                    onChange={(event) => updateMinPrice(Number(event.target.value))}
                    aria-label="Minimum price"
                    className="pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent accent-sky-500 [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto"
                  />
                  <input
                    type="range"
                    min={catalogPriceBounds.min}
                    max={catalogPriceBounds.max}
                    step={PRICE_STEP}
                    value={draftPriceRange[1]}
                    onChange={(event) => updateMaxPrice(Number(event.target.value))}
                    aria-label="Maximum price"
                    className="pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent accent-sky-500 [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Min
                    <input
                      type="number"
                      min={catalogPriceBounds.min}
                      max={draftPriceRange[1] - PRICE_STEP}
                      step={PRICE_STEP}
                      value={draftPriceRange[0]}
                      onChange={(event) => updateMinPrice(Number(event.target.value))}
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold tracking-normal text-slate-900 outline-none transition focus:border-sky-400"
                    />
                  </label>
                  <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Max
                    <input
                      type="number"
                      min={draftPriceRange[0] + PRICE_STEP}
                      max={catalogPriceBounds.max}
                      step={PRICE_STEP}
                      value={draftPriceRange[1]}
                      onChange={(event) => updateMaxPrice(Number(event.target.value))}
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold tracking-normal text-slate-900 outline-none transition focus:border-sky-400"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-5">
                {filters.map((filter) => (
                  <FilterGroup
                    key={filter.title}
                    title={filter.title}
                    options={filter.options}
                    selected={selectedFilters[filter.title] ?? new Set()}
                    onToggle={(option) => toggleFilter(filter.title, option)}
                  />
                ))}
                {["SSD", "RGB lighting"].map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center justify-between border-t border-slate-200/70 pt-5 text-sm font-semibold text-slate-950"
                  >
                    {option}
                    <span className="h-6 w-11 rounded-full bg-sky-500 p-1 shadow-[0_0_22px_rgba(14,165,233,0.48)]">
                      <span className="block h-4 w-4 translate-x-5 rounded-full bg-white" />
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div ref={catalogTopRef} />
            <div className="mb-7 flex flex-col justify-between gap-4 rounded-[24px] border border-slate-200/70 bg-white/86 p-4 shadow-[0_18px_44px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-600">Знайдено {filteredProducts.length} конфігурації</p>
                <h2 className="text-2xl font-black text-slate-950">Premium Gaming PCs</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Популярні", "Новинки", "Дешеві", "Дорогі"].map((sort, index) => (
                  <button
                    key={sort}
                    className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                      index === 0
                        ? "bg-slate-950 text-white shadow-[0_18px_38px_rgba(15,23,42,0.22)]"
                        : "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                    }`}
                  >
                    {sort}
                  </button>
                ))}
                <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-sky-200 hover:text-sky-700">
                  Dropdown <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, index) => (
                  <motion.article
                    layout
                    key={product.name}
                    initial={{ opacity: 0, y: 18, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 14, scale: 0.985 }}
                    transition={{ duration: 0.28, delay: index * 0.025, ease: "easeOut" }}
                    whileHover={{ y: -4 }}
                    className="group overflow-hidden rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition duration-500 hover:border-sky-200 hover:shadow-[0_34px_90px_rgba(14,165,233,0.18)]"
                  >
                  <div className="relative mb-5 grid aspect-[1.12] place-items-center overflow-hidden rounded-[22px] bg-gradient-to-br from-slate-950 via-[#08204a] to-sky-900">
                    <div
                      className="absolute inset-7 rounded-full opacity-90 blur-[48px] transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: product.glow }}
                    />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 max-h-[86%] w-full object-contain drop-shadow-[0_0_36px_rgba(56,189,248,0.50)] transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/45 bg-slate-950/58 px-3 py-1 text-xs font-black text-white shadow-[0_0_22px_rgba(14,165,233,0.34)] backdrop-blur-xl">
                      {product.fps}
                    </span>
                  </div>

                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-950">{product.name}</h3>
                      <div className="mt-1 flex items-center gap-1 text-amber-400">
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-sky-50 px-3 py-2 text-right text-sm font-black text-sky-600">
                      RGB
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
                    <span className="rounded-2xl bg-slate-50 p-3">
                      <Cpu className="mb-1 h-4 w-4 text-sky-500" />
                      {product.cpu}
                    </span>
                    <span className="rounded-2xl bg-slate-50 p-3">
                      <Zap className="mb-1 h-4 w-4 text-sky-500" />
                      {product.gpu}
                    </span>
                    <span className="rounded-2xl bg-slate-50 p-3">{product.ram}</span>
                    <span className="rounded-2xl bg-slate-50 p-3">
                      <HardDrive className="mb-1 h-4 w-4 text-sky-500" />
                      {product.ssd}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Ціна</p>
                      <p className="text-2xl font-black text-slate-950">{product.price}</p>
                    </div>
                    <button className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_38px_rgba(14,165,233,0.28)] transition hover:shadow-[0_22px_52px_rgba(14,165,233,0.42)]">
                      Детальніше
                    </button>
                  </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {shouldShowPagination ? (
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`grid h-11 w-24 place-items-center rounded-2xl text-sm font-black transition ${
                      currentPage === 1
                        ? "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none"
                        : "bg-white text-slate-600 shadow-sm hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 border border-slate-200"
                    }`}
                  >
                    Назад
                  </button>

                  {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      onClick={() => goToPage(page)}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`grid h-11 w-11 place-items-center rounded-2xl text-sm font-black transition ${
                        page === currentPage
                          ? "bg-sky-500 text-white shadow-[0_0_28px_rgba(14,165,233,0.52)]"
                          : "bg-white text-slate-600 shadow-sm hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 border border-slate-200"
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === safeTotalPages}
                    className={`grid h-11 w-24 place-items-center rounded-2xl text-sm font-black transition ${
                      currentPage === safeTotalPages
                        ? "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none"
                        : "bg-white text-slate-600 shadow-sm hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 border border-slate-200"
                    }`}
                  >
                    Вперед
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="bg-[#061a3a] px-6 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="text-2xl tracking-tight">
              <span className="font-black text-sky-400">APEX</span>
              <span className="font-light">GAMING</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-sky-100/70">
              Premium gaming PC для геймінгу, стрімінгу та професійної роботи.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, Mail].map((Icon, index) => (
                <button
                  key={index}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-sky-100 transition hover:bg-sky-500 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-sky-300">Навігація</h3>
            <div className="grid gap-3 text-sm text-sky-100/72">
              {navItems.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (index === 0) onNavigateHome?.();
                    if (index === 1) onNavigateCatalog?.();
                    if (index === 2) onNavigateBuilder?.();
                  }}
                  className="text-left transition hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-sky-300">Контакти</h3>
            <div className="grid gap-3 text-sm text-sky-100/72">
              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-sky-300" /> +380 99 000 00 00
              </span>
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-sky-300" /> hello@apexgaming.ua
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-sky-100/55">
          © 2026 APEXGAMING. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
