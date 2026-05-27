import { motion } from "motion/react";
import { Globe, Mail, MessageCircle, Share2, Video } from "lucide-react";

export type AboutSectionId = "about" | "delivery" | "warranty" | "returns" | "faq" | "contacts";

type FooterProps = {
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateBuilder: () => void;
  onNavigateComponents?: () => void;
  onNavigateAboutSection?: (section: AboutSectionId) => void;
};

const navigationItems = [
  { label: "Головна", action: "home" },
  { label: "Каталог", action: "catalog" },
  { label: "Збірки", action: "builder" },
  { label: "Комплектуючі", action: "components" },
  { label: "Про нас", action: "about" },
] as const;

const supportItems: Array<{ label: string; section: AboutSectionId }> = [
  { label: "Доставка та оплата", section: "delivery" },
  { label: "Гарантія", section: "warranty" },
  { label: "Повернення", section: "returns" },
  { label: "FAQ", section: "faq" },
  { label: "Контакти", section: "contacts" },
];

export function Footer({ onNavigateHome, onNavigateCatalog, onNavigateBuilder, onNavigateComponents, onNavigateAboutSection }: FooterProps) {
  const handleNavigation = (action: (typeof navigationItems)[number]["action"]) => {
    if (action === "catalog") onNavigateCatalog();
    else if (action === "builder") onNavigateBuilder();
    else if (action === "components") onNavigateComponents?.();
    else if (action === "about") onNavigateAboutSection?.("about");
    else onNavigateHome();
  };

  const handleSupportNavigation = (section: AboutSectionId) => {
    if (onNavigateAboutSection) {
      onNavigateAboutSection(section);
      return;
    }

    onNavigateHome();
  };

  const handleNewsletterSubmit = () => {
    window.alert("Дякуємо! Підписку прийнято для демонстрації.");
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#071B3B] via-[#0A2647] to-[#071B3B] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.1),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <motion.button
              type="button"
              onClick={onNavigateHome}
              whileHover={{ scale: 1.05 }}
              className="mb-4 cursor-pointer text-2xl"
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text font-bold text-transparent">APEX</span>
              <span className="font-light text-white">GAMING</span>
            </motion.button>
            <p className="mb-6 leading-relaxed text-blue-200/70">
              Преміальні ігрові комп'ютери та комплектуючі для справжніх геймерів.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, MessageCircle, Video].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="mailto:hello@apexgaming.ua"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-blue-500"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Навігація</h4>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleNavigation(item.action)}
                    className="inline-block text-blue-200/70 transition-colors duration-300 hover:translate-x-1 hover:text-blue-400"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Підтримка</h4>
            <ul className="space-y-3">
              {supportItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleSupportNavigation(item.section)}
                    className="inline-block text-blue-200/70 transition-colors duration-300 hover:translate-x-1 hover:text-blue-400"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Розсилка</h4>
            <p className="mb-4 text-sm text-blue-200/70">
              Отримуй новини про акції та нові продукти.
            </p>
            <div className="mb-6 flex gap-2">
              <input
                type="email"
                placeholder="Твій email"
                className="min-w-0 flex-1 rounded-xl border border-blue-500/20 bg-white/5 px-4 py-3 text-white placeholder:text-blue-200/40 backdrop-blur-sm transition-colors focus:border-blue-400 focus:outline-none"
              />
              <motion.button
                type="button"
                onClick={handleNewsletterSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-3 shadow-lg shadow-blue-600/50 transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
              >
                <Mail className="h-5 w-5" />
              </motion.button>
            </div>
            <p className="text-xs text-blue-200/50">
              Підписуючись, ти погоджуєшся з нашою політикою конфіденційності.
            </p>
          </div>
        </div>

        <div className="border-t border-blue-500/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-blue-200/70">© 2026 APEX GAMING. Всі права захищені.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Політика конфіденційності", "Умови використання", "Cookies"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSupportNavigation("faq")}
                  className="text-blue-200/70 transition-colors hover:text-blue-400"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
