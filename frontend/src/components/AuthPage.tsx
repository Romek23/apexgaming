import { FormEvent, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Mail, UserRound } from "lucide-react";
import { Header } from "./Header";
import type { AppUser } from "../types/user";

type AuthPageProps = {
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateBuilder: () => void;
  onAuthSuccess: (user: AppUser) => void;
};

type AuthMode = "login" | "register";

export function AuthPage({
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onAuthSuccess,
}: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const title = mode === "login" ? "Увійти в профіль" : "Створити профіль";
  const submitLabel = mode === "login" ? "Увійти" : "Зареєструватися";

  const helperText = useMemo(() => {
    if (mode === "login") {
      return "Введи email і пароль. Поки що це демо-вхід без backend.";
    }

    return "Профіль тимчасово збережеться у браузері на цьому пристрої.";
  }, [mode]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      setError("Заповни email і пароль.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError("Введи коректний email.");
      return;
    }

    if (mode === "register" && !cleanName) {
      setError("Введи ім'я для профілю.");
      return;
    }

    const fallbackName = cleanEmail.split("@")[0] || "Гравець";
    onAuthSuccess({
      name: mode === "register" ? cleanName : fallbackName,
      email: cleanEmail,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header
        onNavigateHome={onNavigateHome}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
      />

      <main className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <button
            type="button"
            onClick={onNavigateHome}
            className="mb-8 inline-flex items-center gap-2 text-sm font-black text-sky-600 transition hover:text-sky-700"
          >
            <ArrowLeft className="h-4 w-4" />
            На головну
          </button>

          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-500">Apex profile</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight tracking-tight text-slate-950">
            Особистий профіль для твоїх збірок
          </h1>
          <p className="mt-5 max-w-lg text-lg font-medium leading-8 text-slate-600">
            Тут будуть збережені конфігурації, дані користувача і швидкий доступ до майбутніх замовлень.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.08 }}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-8"
        >
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                mode === "login" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Увійти
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                mode === "register" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Реєстрація
            </button>
          </div>

          <div className="mb-7">
            <h2 className="text-3xl font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{helperText}</p>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label className="grid gap-2">
                <span className="text-sm font-black text-slate-700">Ім'я</span>
                <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-sky-400 focus-within:bg-white">
                  <UserRound className="h-5 w-5 text-slate-400" />
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-950 outline-none placeholder:text-slate-400"
                    placeholder="Андрій"
                  />
                </span>
              </label>
            ) : null}

            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-700">Email</span>
              <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-sky-400 focus-within:bg-white">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-950 outline-none placeholder:text-slate-400"
                  placeholder="you@example.com"
                  type="email"
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-700">Пароль</span>
              <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-sky-400 focus-within:bg-white">
                <Lock className="h-5 w-5 text-slate-400" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-950 outline-none placeholder:text-slate-400"
                  placeholder="••••••••"
                  type="password"
                />
              </span>
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="mt-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-sky-600"
            >
              {submitLabel}
            </button>
          </form>
        </motion.section>
      </main>
    </div>
  );
}
