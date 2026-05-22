import { motion } from "motion/react";
import { Bookmark, LogOut, Mail, UserRound, Wrench } from "lucide-react";
import { Header } from "./Header";
import type { AppUser } from "../types/user";

type ProfilePageProps = {
  user: AppUser;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateBuilder: () => void;
  onLogout: () => void;
};

export function ProfilePage({
  user,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onLogout,
}: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header
        user={user}
        onNavigateHome={onNavigateHome}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
      />

      <main className="mx-auto max-w-6xl px-6 py-28">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-500">Profile</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950">Вітаємо, {user.name}</h1>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            Тут буде центр керування профілем, збереженими збірками та майбутніми замовленнями.
          </p>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-sky-100 text-sky-600">
              <UserRound className="h-8 w-8" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">{user.name}</h2>
            <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-500">
              <Mail className="h-4 w-4" />
              {user.email}
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Вийти
            </button>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="grid gap-6"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Saved builds</p>
                  <h2 className="mt-1 text-3xl font-black text-slate-950">Збережені збірки</h2>
                </div>
                <Bookmark className="h-6 w-6 text-sky-500" />
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-base font-black text-slate-800">Поки що збережених збірок немає.</p>
                <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
                  На наступному етапі кнопка збереження на сторінці збірки буде додавати конфігурації сюди.
                </p>
                <button
                  type="button"
                  onClick={onNavigateBuilder}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-sky-600"
                >
                  <Wrench className="h-4 w-4" />
                  Перейти до збірки
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
