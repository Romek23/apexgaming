import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Box,
  Check,
  ChevronRight,
  Cpu,
  Fan,
  HardDrive,
  Layers,
  Monitor,
  Trash2,
  Zap,
} from "lucide-react";
import { Header } from "./Header";
import { partCategories, pcParts, type PartCategoryId, type PcPart } from "../data/pcBuilderData";
import builderHeroPc from "../assets/images/banners/vecteezy_modern-gaming-pc-isolated-on-transparent_48412781-removebg-preview.png";
import type { AppUser } from "../types/user";

type PcBuilderPageProps = {
  user?: AppUser | null;
  onNavigateHome?: () => void;
  onNavigateCatalog?: () => void;
  onNavigateBuilder?: () => void;
  onNavigateAuth?: () => void;
  onNavigateProfile?: () => void;
};

type SelectedParts = Partial<Record<PartCategoryId, PcPart>>;

type BuildIssue = {
  id: string;
  title: string;
  description: string;
  severity: "error" | "warning";
  categoryIds: PartCategoryId[];
};

const PSU_HEADROOM_W = 150;

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

const formatPrice = (value: number) => `${value.toLocaleString("uk-UA")} грн`;

function getBuildIssues(parts: SelectedParts): BuildIssue[] {
  const issues: BuildIssue[] = [];
  const cpu = parts.cpu;
  const motherboard = parts.motherboard;
  const ram = parts.ram;
  const gpu = parts.gpu;
  const psu = parts.psu;
  const pcCase = parts.case;
  const cooling = parts.cooling;
  const estimatedWattage = Object.values(parts).reduce((sum, part) => sum + (part?.wattage ?? 0), 0);

  if (cpu?.socket && motherboard?.socket && cpu.socket !== motherboard.socket) {
    issues.push({
      id: "cpu-motherboard-socket",
      title: "Процесор і плата не сумісні",
      description: `${cpu.name} має socket ${cpu.socket}, а ${motherboard.name} має ${motherboard.socket}.`,
      severity: "error",
      categoryIds: ["cpu", "motherboard"],
    });
  }

  if (motherboard?.ramType && ram?.ramType && motherboard.ramType !== ram.ramType) {
    issues.push({
      id: "ram-type",
      title: "RAM не підходить до плати",
      description: `${motherboard.name} підтримує ${motherboard.ramType}, а вибрана пам'ять має ${ram.ramType}.`,
      severity: "error",
      categoryIds: ["motherboard", "ram"],
    });
  }

  if (motherboard?.formFactor && pcCase?.supportedFormFactors && !pcCase.supportedFormFactors.includes(motherboard.formFactor)) {
    issues.push({
      id: "case-form-factor",
      title: "Корпус не підтримує формат плати",
      description: `${pcCase.name} підтримує ${pcCase.supportedFormFactors.join(", ")}, а плата має ${motherboard.formFactor}.`,
      severity: "error",
      categoryIds: ["motherboard", "case"],
    });
  }

  if (gpu?.gpuLengthMm && pcCase?.maxGpuLengthMm && gpu.gpuLengthMm > pcCase.maxGpuLengthMm) {
    issues.push({
      id: "gpu-length",
      title: "Відеокарта може не влізти в корпус",
      description: `${gpu.name}: ${gpu.gpuLengthMm} мм, ліміт корпусу ${pcCase.name}: ${pcCase.maxGpuLengthMm} мм.`,
      severity: "error",
      categoryIds: ["gpu", "case"],
    });
  }

  if (cpu?.socket && cooling?.coolerSockets && !cooling.coolerSockets.includes(cpu.socket)) {
    issues.push({
      id: "cooler-socket",
      title: "Охолодження не підходить до процесора",
      description: `${cooling.name} не підтримує socket ${cpu.socket}.`,
      severity: "error",
      categoryIds: ["cpu", "cooling"],
    });
  }

  if (psu?.psuCapacityW) {
    const recommendedWattage = estimatedWattage + PSU_HEADROOM_W;
    if (psu.psuCapacityW < recommendedWattage) {
      issues.push({
        id: "psu-capacity",
        title: "БЖ замалий для цієї збірки",
        description: `Оцінка ${estimatedWattage}W + запас ${PSU_HEADROOM_W}W = ${recommendedWattage}W, а вибраний БЖ має ${psu.psuCapacityW}W.`,
        severity: "warning",
        categoryIds: ["psu"],
      });
    }
  }

  return issues;
}

export function PcBuilderPage({
  user,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateAuth,
  onNavigateProfile,
}: PcBuilderPageProps) {
  const [activeCategory, setActiveCategory] = useState<PartCategoryId>("cpu");
  const [selectedParts, setSelectedParts] = useState<SelectedParts>({});
  const [shakingPartId, setShakingPartId] = useState<string | null>(null);

  const activeCategoryInfo = partCategories.find((category) => category.id === activeCategory) ?? partCategories[0];

  const activeParts = useMemo(
    () => pcParts.filter((part) => part.categoryId === activeCategory),
    [activeCategory]
  );

  const selectedList = useMemo(
    () => partCategories.map((category) => ({ category, part: selectedParts[category.id] })),
    [selectedParts]
  );

  const totalPrice = useMemo(
    () => Object.values(selectedParts).reduce((sum, part) => sum + (part?.price ?? 0), 0),
    [selectedParts]
  );

  const estimatedWattage = useMemo(
    () => Object.values(selectedParts).reduce((sum, part) => sum + (part?.wattage ?? 0), 0),
    [selectedParts]
  );

  const buildIssues = useMemo(() => getBuildIssues(selectedParts), [selectedParts]);
  const blockingIssues = buildIssues.filter((issue) => issue.severity === "error");

  const selectedCount = Object.values(selectedParts).filter(Boolean).length;

  const selectPart = (part: PcPart) => {
    const simulatedIssues = getBuildIssues({ ...selectedParts, [part.categoryId]: part });
    const blocksSelection = simulatedIssues.some(
      (issue) => issue.severity === "error" && issue.categoryIds.includes(part.categoryId)
    );

    if (blocksSelection) {
      setShakingPartId(part.id);
      window.setTimeout(() => {
        setShakingPartId((current) => (current === part.id ? null : current));
      }, 560);
      return;
    }

    setSelectedParts((current) => ({
      ...current,
      [part.categoryId]: part,
    }));
  };

  const removePart = (categoryId: PartCategoryId) => {
    setSelectedParts((current) => {
      const next = { ...current };
      delete next[categoryId];
      return next;
    });
  };

  const clearBuild = () => {
    setSelectedParts({});
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
        <section className="relative overflow-hidden bg-[#061a3a] pt-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(14,165,233,0.34),transparent_34%),radial-gradient(circle_at_20%_45%,rgba(59,130,246,0.22),transparent_32%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200/40 bg-white/12 px-4 py-2 text-sm font-bold text-sky-50 backdrop-blur-xl">
                <Cpu className="h-4 w-4 text-sky-300" />
                PC Builder
              </div>
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Збери свій Gaming PC
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-sky-50/82">
                Обирай комплектуючі по категоріях, дивись вартість збірки та поступово складай конфігурацію під себе.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
              className="relative min-h-[320px]"
            >
              <div className="absolute inset-8 rounded-full bg-fuchsia-500/40 blur-[78px]" />
              <div className="absolute inset-16 rounded-full bg-sky-400/24 blur-[48px]" />
              <img
                src={builderHeroPc}
                alt="Custom gaming PC"
                className="relative z-10 ml-auto h-[320px] w-full object-contain drop-shadow-[0_0_58px_rgba(217,70,239,0.56)] sm:h-[390px]"
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="mb-4 px-2">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Categories</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">Комплектуючі</h2>
              </div>

              <div className="grid gap-2">
                {partCategories.map((category) => {
                  const Icon = categoryIcons[category.id];
                  const isActive = activeCategory === category.id;
                  const selectedPart = selectedParts[category.id];

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                        isActive
                          ? "border-sky-300 bg-sky-50 text-slate-950 shadow-[0_14px_34px_rgba(14,165,233,0.12)]"
                          : "border-transparent bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`grid h-10 w-10 place-items-center rounded-xl ${isActive ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black">{category.label}</span>
                        <span className="block truncate text-xs font-medium text-slate-500">
                          {selectedPart ? selectedPart.name : "Не вибрано"}
                        </span>
                      </span>
                      <ChevronRight className={`h-4 w-4 ${isActive ? "text-sky-500" : "text-slate-300"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-sky-500">{activeCategoryInfo.description}</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">{activeCategoryInfo.label}</h2>
              </div>
              <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
                {activeParts.length} варіанти
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_54px_rgba(15,23,42,0.07)]">
              {activeParts.map((part, index) => {
                const isSelected = selectedParts[part.categoryId]?.id === part.id;
                const simulatedIssues = getBuildIssues({ ...selectedParts, [part.categoryId]: part });
                const relevantIssues = simulatedIssues.filter((issue) => issue.categoryIds.includes(part.categoryId));
                const relevantErrors = relevantIssues.filter((issue) => issue.severity === "error");
                const hasRelevantError = relevantErrors.length > 0;
                const isShaking = shakingPartId === part.id;

                return (
                  <motion.article
                    key={part.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, x: isShaking ? [0, -18, 18, -16, 16, -11, 11, -6, 6, 0] : 0 }}
                    transition={{
                      opacity: { duration: 0.24, delay: index * 0.035, ease: "easeOut" },
                      y: { duration: 0.24, delay: index * 0.035, ease: "easeOut" },
                      x: { duration: 0.5, ease: "easeInOut" },
                    }}
                    className={`group border-b border-slate-200 p-4 transition last:border-b-0 hover:bg-sky-50/55 ${
                      isSelected
                        ? "bg-sky-50/80 ring-1 ring-inset ring-sky-200"
                        : hasRelevantError
                          ? "bg-red-50/60"
                          : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                            {part.brand}
                          </span>
                          {part.badge ? (
                            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">
                              {part.badge}
                            </span>
                          ) : null}
                          {hasRelevantError ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Несумісно
                            </span>
                          ) : null}
                        </div>
                        <div className="flex items-start gap-3">
                          <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${isSelected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {isSelected ? <Check className="h-4 w-4" /> : <Box className="h-4 w-4" />}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{activeCategoryInfo.label}</p>
                            <h3 className="break-words text-lg font-black leading-snug text-slate-950">{part.name}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                        <div className="min-w-[128px] sm:text-right">
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Ціна</p>
                          <p className="whitespace-nowrap text-xl font-black text-slate-950">{formatPrice(part.price)}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => selectPart(part)}
                          className={`inline-flex h-11 min-w-[118px] items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black transition ${
                            isSelected
                              ? "bg-sky-500 text-white shadow-[0_14px_30px_rgba(14,165,233,0.24)]"
                              : "bg-slate-950 text-white hover:bg-sky-600"
                          }`}
                        >
                          {isSelected ? <Check className="h-4 w-4" /> : null}
                          {isSelected ? "Вибрано" : "Обрати"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 pl-0 lg:pl-12">
                      {part.specs.map((spec) => (
                        <span key={spec} className="max-w-full rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold leading-snug text-slate-600 ring-1 ring-slate-100">
                          {spec}
                        </span>
                      ))}
                    </div>
                    {relevantErrors.length ? (
                      <div className="mt-3 grid gap-2 pl-0 lg:pl-12">
                        {relevantErrors.slice(0, 2).map((issue) => (
                          <div
                            key={issue.id}
                            className="rounded-2xl bg-red-100 px-3 py-2 text-xs font-bold leading-relaxed text-red-700"
                          >
                            {issue.title}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </motion.article>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-2 lg:self-start xl:sticky xl:top-24 xl:col-span-1">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Summary</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">Твоя збірка</h2>
                </div>
                <button
                  type="button"
                  onClick={clearBuild}
                  disabled={selectedCount === 0}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Clear build"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div className="rounded-2xl bg-slate-950 p-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">Разом</p>
                  <p className="mt-1 break-words text-xl font-black 2xl:text-2xl">{formatPrice(totalPrice)}</p>
                </div>
                <div className="rounded-2xl bg-sky-50 p-4 text-slate-950">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-500">Wattage</p>
                  <p className="mt-1 text-xl font-black 2xl:text-2xl">{estimatedWattage}W</p>
                </div>
              </div>

              {blockingIssues.length ? (
                <div className="mb-5 grid gap-2">
                  {blockingIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="rounded-2xl border border-red-200 bg-red-50 px-3 py-3 text-red-800"
                    >
                      <p className="text-sm font-black">{issue.title}</p>
                      <p className="mt-1 text-xs font-bold leading-relaxed opacity-80">{issue.description}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="grid gap-3">
                {selectedList.map(({ category, part }) => {
                  const Icon = categoryIcons[category.id];

                  return (
                    <div key={category.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{category.label}</p>
                        <p className="truncate text-sm font-black text-slate-950">{part ? part.name : "Не вибрано"}</p>
                      </div>
                      {part ? (
                        <button
                          type="button"
                          onClick={() => removePart(category.id)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${category.label}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 px-5 py-4 text-sm font-black text-white shadow-[0_18px_38px_rgba(14,165,233,0.28)] transition hover:shadow-[0_22px_52px_rgba(14,165,233,0.42)]"
              >
                Зберегти збірку
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
