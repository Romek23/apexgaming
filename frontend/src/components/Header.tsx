import { motion } from "motion/react";
import { Search, ShoppingCart, User } from "lucide-react";
import type { AppUser } from "../types/user";

interface HeaderProps {
  user?: AppUser | null;
  onNavigateHome?: () => void;
  onNavigateCatalog?: () => void;
  onNavigateBuilder?: () => void;
  onNavigateAuth?: () => void;
  onNavigateProfile?: () => void;
}

const navItems = [
  { label: "Головна", action: "home" },
  { label: "Каталог", action: "catalog" },
  { label: "Збірки", action: "builder" },
  { label: "Комплектуючі", action: "catalog" },
  { label: "Про нас", action: "home" },
  { label: "Контакти", action: "home" },
] as const;

// Маленький аватар у шапці: або завантажена картинка, або перша літера імені.
function ProfileAvatar({ user }: { user: AppUser }) {
  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="h-8 w-8 rounded-full object-cover ring-2 ring-sky-100"
      />
    );
  }

  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-100 text-xs font-black text-sky-700 ring-2 ring-sky-50">
      {user.name.trim().charAt(0).toUpperCase() || "U"}
    </span>
  );
}

export function Header({
  user,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateAuth,
  onNavigateProfile,
}: HeaderProps) {
  // Перетворює пункт меню на виклик потрібної функції переходу.
  const handleNavigation = (action: (typeof navItems)[number]["action"]) => {
    if (action === "catalog") onNavigateCatalog?.();
    else if (action === "builder") onNavigateBuilder?.();
    else onNavigateHome?.();
  };

  const handleProfileClick = () => {
    // Якщо користувач увійшов, відкриваємо профіль. Якщо ні - сторінку входу.
    if (user) onNavigateProfile?.();
    else onNavigateAuth?.();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200/30 bg-white/70 shadow-sm backdrop-blur-2xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-12">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigateHome?.()}
            className="cursor-pointer text-xl tracking-tight"
          >
            {/* Логотип також працює як кнопка переходу на головну. */}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text font-bold text-transparent">APEX</span>
            <span className="font-light text-gray-900">GAMING</span>
          </motion.button>

          <div className="hidden items-center gap-8 lg:flex">
            {/* Основна навігація для великих екранів. */}
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item.action)}
                className="group relative text-sm text-gray-700 transition-colors duration-300 hover:text-blue-600"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Кнопка пошуку поки що тільки елемент інтерфейсу без логіки. */}
          <motion.button
            type="button"
            onClick={() => onNavigateCatalog?.()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Перейти до каталогу для пошуку товарів"
            className="rounded-xl p-2.5 transition-all duration-300 hover:bg-gray-100"
          >
            <Search className="h-5 w-5 text-gray-700" />
          </motion.button>

          {/* Кошик поки що візуальний, його логіку можна додати пізніше. */}
          <motion.button
            type="button"
            onClick={() => onNavigateCatalog?.()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Перейти до каталогу для вибору товарів"
            className="relative rounded-xl p-2.5 transition-all duration-300 hover:bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600" />
          </motion.button>

          {/* Кнопка профілю показує іконку або ім'я користувача. */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleProfileClick}
            className={`rounded-xl transition-all duration-300 hover:bg-gray-100 ${
              user ? "px-3 py-2 text-sm font-medium text-gray-700" : "p-2.5"
            }`}
          >
            {user ? (
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <ProfileAvatar user={user} />
                <span>Вітаємо, {user.name}</span>
              </span>
            ) : (
              <User className="h-5 w-5 text-gray-700" />
            )}
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
}
