import { useEffect } from "react";
import { motion } from "motion/react";
import { CreditCard, HelpCircle, Mail, MapPin, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";
import { Header } from "./Header";
import { Footer, type AboutSectionId } from "./Footer";
import type { AppUser } from "../types/user";

type AboutPageProps = {
  user: AppUser | null;
  cartCount: number;
  activeSection?: AboutSectionId;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateBuilder: () => void;
  onNavigateComponents: () => void;
  onNavigateCart: () => void;
  onNavigateAuth: () => void;
  onNavigateProfile: () => void;
  onNavigateAboutSection: (section: AboutSectionId) => void;
};

const sections: Array<{
  id: AboutSectionId;
  title: string;
  icon: typeof PackageCheck;
  text: string;
}> = [
  {
    id: "delivery",
    title: "Доставка та оплата",
    icon: CreditCard,
    text: "Ми відправляємо готові ПК та комплектуючі по Україні службами доставки. Перед відправкою техніка перевіряється, пакується у захисні матеріали та передається клієнту з базовими документами. Оплату можна передбачити як онлайн, так і при отриманні, залежно від обраного способу замовлення.",
  },
  {
    id: "warranty",
    title: "Гарантія",
    icon: ShieldCheck,
    text: "На товари діє гарантійна підтримка. Якщо з комплектуючою або готовим ПК виникає проблема, клієнт може звернутися до підтримки, описати ситуацію та отримати консультацію щодо подальших дій. Для дипломного проєкту цей розділ показує логіку інформаційної підтримки магазину.",
  },
  {
    id: "returns",
    title: "Повернення",
    icon: RotateCcw,
    text: "Повернення можливе, якщо товар не має слідів пошкодження та збережено основну комплектацію. Перед поверненням покупець зв'язується з менеджером, щоб узгодити деталі. Такий підхід допомагає уникнути плутанини та робить процес зрозумілим для клієнта.",
  },
  {
    id: "faq",
    title: "FAQ",
    icon: HelpCircle,
    text: "Найчастіші питання стосуються підбору комплектуючих, сумісності деталей, термінів доставки та гарантії. Сайт має каталог, конструктор ПК, профіль користувача, збережені збірки та кошик, тому клієнт може самостійно підібрати конфігурацію перед замовленням.",
  },
  {
    id: "contacts",
    title: "Контакти",
    icon: Mail,
    text: "Для зв'язку з магазином можна використовувати електронну пошту hello@apexgaming.ua або демо-контакти, вказані на сайті. У реальному проєкті тут можуть бути телефон, адреса сервісного центру, графік роботи та посилання на соціальні мережі.",
  },
];

export function AboutPage({
  user,
  cartCount,
  activeSection,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateComponents,
  onNavigateCart,
  onNavigateAuth,
  onNavigateProfile,
  onNavigateAboutSection,
}: AboutPageProps) {
  useEffect(() => {
    if (!activeSection) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.setTimeout(() => {
      document.getElementById(activeSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [activeSection]);

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
        <section id="about" className="bg-[#061a3a] px-6 pt-32 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Про нас</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">
                APEX GAMING
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-sky-50/80">
                APEX GAMING - це інтернет-магазин для підбору ігрових комп'ютерів та комплектуючих. Проєкт зроблений так, щоб користувач міг переглянути готові ПК, зібрати власну конфігурацію, зберегти її у профілі та додати потрібні товари до кошика.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid gap-4 rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-sky-300" />
                <span className="text-sm font-bold text-sky-50/80">Український демо-магазин ігрових ПК</span>
              </div>
              <p className="text-sm font-medium leading-7 text-sky-50/72">
                Основна мета сайту - показати зручний процес вибору техніки: від каталогу до персональної збірки. Інтерфейс орієнтований на просту навігацію, зрозумілі картки товарів і базову роботу з акаунтом.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 py-14">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.article
                id={section.id}
                key={section.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-50 text-sky-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">{section.title}</h2>
                    <p className="mt-3 max-w-4xl text-base font-medium leading-8 text-slate-600">{section.text}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>
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
