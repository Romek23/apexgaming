import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Box, ChevronDown, Cpu, Fan, HardDrive, Layers, Monitor, SlidersHorizontal, X, Zap } from "lucide-react";
import { Header } from "./Header";
import { Footer, type AboutSectionId } from "./Footer";
import { partCategories, pcParts, type PartCategoryId, type PcPart } from "../data/pcBuilderData";
import type { AppUser, CartComponentItem } from "../types/user";

type ComponentsPageProps = {
  user?: AppUser | null;
  cartCount: number;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateBuilder: () => void;
  onNavigateComponents: () => void;
  onNavigateCart: () => void;
  onNavigateAuth: () => void;
  onNavigateProfile: () => void;
  onNavigateAboutSection: (section: AboutSectionId) => void;
  onAddComponentToCart: (item: CartComponentItem) => void;
};

type SortMode = "popular" | "cheap" | "expensive" | "wattage";
type FilterGroupId = "category" | "brand" | "price";

const categoryIcons: Record<PartCategoryId, typeof Cpu> = {
  cpu: Cpu,
  motherboard: Layers,
  gpu: Monitor,
  ram: Zap,
  storage: HardDrive,
  psu: Zap,
  case: Box,
  cooling: Fan,
};

const sortOptions: Array<{ label: string; value: SortMode }> = [
  { label: "Популярні", value: "popular" },
  { label: "Дешеві", value: "cheap" },
  { label: "Дорогі", value: "expensive" },
  { label: "За ватами", value: "wattage" },
];

const formatPrice = (value: number) => `${value.toLocaleString("uk-UA")} грн`;
const minPrice = Math.min(...pcParts.map((part) => part.price));
const maxPrice = Math.max(...pcParts.map((part) => part.price));

function getCategoryLabel(categoryId: PartCategoryId) {
  return partCategories.find((category) => category.id === categoryId)?.label ?? categoryId;
}

function makeCartItem(part: PcPart): CartComponentItem {
  return {
    id: part.id,
    categoryId: part.categoryId,
    categoryLabel: getCategoryLabel(part.categoryId),
    name: part.name,
    brand: part.brand,
    price: part.price,
    wattage: part.wattage,
    specs: part.specs,
  };
}

export function ComponentsPage({
  user,
  cartCount,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateComponents,
  onNavigateCart,
  onNavigateAuth,
  onNavigateProfile,
  onNavigateAboutSection,
  onAddComponentToCart,
}: ComponentsPageProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<PartCategoryId>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sortMode, setSortMode] = useState<SortMode>("popular");
  const [selectedPart, setSelectedPart] = useState<PcPart | null>(null);
  const [message, setMessage] = useState("");
  const [openFilterGroup, setOpenFilterGroup] = useState<FilterGroupId | null>("category");

  const brands = useMemo(() => [...new Set(pcParts.map((part) => part.brand))].sort(), []);

  const toggleFilterGroup = (group: FilterGroupId) => {
    setOpenFilterGroup((current) => (current === group ? null : group));
  };

  const toggleCategory = (categoryId: PartCategoryId) => {
    setSelectedCategories((current) => {
      const next = new Set(current);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) => {
      const next = new Set(current);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });
  };

  const visibleParts = useMemo(() => {
    const filtered = pcParts.filter((part) => {
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(part.categoryId);
      const matchesBrand = selectedBrands.size === 0 || selectedBrands.has(part.brand);
      const matchesPrice = part.price >= priceRange[0] && part.price <= priceRange[1];
      return matchesCategory && matchesBrand && matchesPrice;
    });

    if (sortMode === "cheap") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortMode === "expensive") return [...filtered].sort((a, b) => b.price - a.price);
    if (sortMode === "wattage") return [...filtered].sort((a, b) => b.wattage - a.wattage);
    return filtered;
  }, [priceRange, selectedBrands, selectedCategories, sortMode]);

  const addToCart = (part: PcPart) => {
    onAddComponentToCart(makeCartItem(part));
    setMessage("Комплектуючу додано до кошика.");
    setSelectedPart(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header
        user={user}
        onNavigateHome={onNavigateHome}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
        onNavigateComponents={onNavigateComponents}
        onNavigateCart={onNavigateCart}
        onNavigateAuth={onNavigateAuth}
        onNavigateProfile={onNavigateProfile}
        onNavigateAbout={() => onNavigateAboutSection("about")}
        cartCount={cartCount}
      />

      <main>
        <section className="bg-[#061a3a] px-6 pt-32 text-white">
          <div className="mx-auto max-w-7xl pb-14">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">PC components</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Комплектуючі</h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-sky-50/78">
              Обирай окремі деталі для апгрейду або майбутньої збірки: процесори, відеокарти, пам'ять, накопичувачі, блоки живлення, корпуси та охолодження.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[290px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Filters</p>
                  <h2 className="text-xl font-black text-slate-950">Підібрати</h2>
                </div>
                <SlidersHorizontal className="h-5 w-5 text-sky-500" />
              </div>

              <div className="divide-y divide-slate-200">
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleFilterGroup("category")}
                    className="flex w-full items-center justify-between text-left text-sm font-black text-slate-900"
                  >
                    Категорія
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition ${openFilterGroup === "category" ? "rotate-180" : ""}`} />
                  </button>
                  {openFilterGroup === "category" ? (
                    <div className="mt-3 grid gap-2">
                      {partCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => toggleCategory(category.id)}
                          className={`rounded-xl border px-3 py-2 text-left text-sm font-bold transition ${
                            selectedCategories.has(category.id)
                              ? "border-sky-300 bg-sky-50 text-sky-700"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleFilterGroup("brand")}
                    className="flex w-full items-center justify-between text-left text-sm font-black text-slate-900"
                  >
                    Бренд
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition ${openFilterGroup === "brand" ? "rotate-180" : ""}`} />
                  </button>
                  {openFilterGroup === "brand" ? (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => toggleBrand(brand)}
                          className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${
                            selectedBrands.has(brand)
                              ? "border-sky-300 bg-sky-50 text-sky-700"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleFilterGroup("price")}
                    className="flex w-full items-center justify-between text-left text-sm font-black text-slate-900"
                  >
                    Ціна
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition ${openFilterGroup === "price" ? "rotate-180" : ""}`} />
                  </button>
                  {openFilterGroup === "price" ? (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={priceRange[0]}
                        min={minPrice}
                        max={priceRange[1]}
                        onChange={(event) => setPriceRange([Number(event.target.value), priceRange[1]])}
                        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400"
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        min={priceRange[0]}
                        max={maxPrice}
                        onChange={(event) => setPriceRange([priceRange[0], Number(event.target.value)])}
                        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-col justify-between gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_38px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-500">Знайдено {visibleParts.length} товарів</p>
                <h2 className="text-2xl font-black text-slate-950">Усі комплектуючі</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortMode(option.value)}
                    className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                      sortMode === option.value
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {visibleParts.map((part) => {
                const Icon = categoryIcons[part.categoryId];

                return (
                  <motion.article
                    key={part.id}
                    whileHover={{ y: -2 }}
                    className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.07)] transition hover:border-sky-200 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-4 sm:w-[42%] sm:items-center">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sky-50 text-sky-600">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-sky-500">{getCategoryLabel(part.categoryId)}</p>
                        <h3 className="mt-1 break-words text-lg font-black leading-snug text-slate-950">{part.name}</h3>
                        <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{part.brand}</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-wrap gap-2">
                      {part.specs.slice(0, 3).map((spec) => (
                        <span key={spec} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-4 sm:min-w-[240px]">
                      <div className="sm:text-right">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Ціна</p>
                        <p className="text-xl font-black text-slate-950">{formatPrice(part.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedPart(part)}
                        className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-sky-600"
                      >
                        Детальніше
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {selectedPart ? (
          <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-500">{getCategoryLabel(selectedPart.categoryId)}</p>
                  <h2 className="mt-1 text-3xl font-black text-slate-950">{selectedPart.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPart(null)}
                  className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <div className="grid h-28 w-28 place-items-center rounded-[24px] bg-sky-50 text-sky-600">
                  {(() => {
                    const Icon = categoryIcons[selectedPart.categoryId];
                    return <Icon className="h-12 w-12" />;
                  })()}
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-950">{formatPrice(selectedPart.price)}</p>
                  <p className="mt-1 text-sm font-bold text-slate-500">{selectedPart.brand} · {selectedPart.wattage}W</p>
                  <div className="mt-4 grid gap-2">
                    {selectedPart.specs.map((spec) => (
                      <div key={spec} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600">
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(selectedPart)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 px-5 py-4 text-sm font-black text-white"
              >
                Додати до кошика
              </button>
            </motion.div>
          </div>
        ) : null}

        {message ? (
          <div className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-xl">
            {message}
          </div>
        ) : null}
      </main>

      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
        onNavigateComponents={onNavigateComponents}
        onNavigateAboutSection={onNavigateAboutSection}
      />
    </div>
  );
}
