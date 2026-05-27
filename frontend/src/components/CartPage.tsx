import { Box, Cpu, Fan, HardDrive, Layers, Monitor, Trash2, Zap } from "lucide-react";
import { Header } from "./Header";
import type { AppCart, AppUser } from "../types/user";

type CartPageProps = {
  user: AppUser | null;
  cart: AppCart;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateBuilder: () => void;
  onNavigateComponents: () => void;
  onNavigateCart: () => void;
  onNavigateAuth: () => void;
  onNavigateProfile: () => void;
  onRemoveCatalogItem: (id: string) => void;
  onRemoveBuildItem: (id: number) => void;
  onRemoveComponentItem: (id: string) => void;
  onClearCart: () => void;
};

const formatPrice = (value: number) => `${value.toLocaleString("uk-UA")} грн`;

const componentIcons: Record<string, typeof Cpu> = {
  cpu: Cpu,
  motherboard: Layers,
  gpu: Monitor,
  ram: Zap,
  storage: HardDrive,
  psu: Zap,
  case: Box,
  cooling: Fan,
};

export function CartPage({
  user,
  cart,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateComponents,
  onNavigateCart,
  onNavigateAuth,
  onNavigateProfile,
  onRemoveCatalogItem,
  onRemoveBuildItem,
  onRemoveComponentItem,
  onClearCart,
}: CartPageProps) {
  const componentItems = cart.componentItems ?? [];
  const catalogTotal = cart.catalogItems.reduce((sum, item) => sum + item.price, 0);
  const buildsTotal = cart.buildItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const componentsTotal = componentItems.reduce((sum, item) => sum + item.price, 0);
  const total = catalogTotal + buildsTotal + componentsTotal;
  const cartCount = cart.catalogItems.length + cart.buildItems.length + componentItems.length;
  const isEmpty = cartCount === 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header
        user={user}
        onNavigateHome={onNavigateHome}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
        onNavigateComponents={onNavigateComponents}
        onNavigateCart={onNavigateCart}
        onNavigateAuth={onNavigateAuth}
        onNavigateProfile={onNavigateProfile}
        cartCount={cartCount}
      />

      <main className="mx-auto max-w-6xl px-6 py-28">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-500">Cart</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">Кошик</h1>
          </div>
          {!isEmpty ? (
            <button
              type="button"
              onClick={onClearCart}
              className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
            >
              Очистити кошик
            </button>
          ) : null}
        </div>

        {isEmpty ? (
          <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <p className="text-xl font-black text-slate-900">Кошик порожній.</p>
            <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
              Додай готовий ПК з каталогу, власну збірку з профілю або окремі комплектуючі.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={onNavigateCatalog} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">
                До каталогу
              </button>
              <button type="button" onClick={onNavigateBuilder} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700">
                До конструктора
              </button>
              <button type="button" onClick={onNavigateComponents} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700">
                Комплектуючі
              </button>
            </div>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-6">
              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-black text-slate-950">Власні збірки</h2>
                {cart.buildItems.length ? (
                  <div className="grid gap-3">
                    {cart.buildItems.map((item) => (
                      <article key={item.id} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-black text-slate-950">{item.name}</h3>
                            <p className="mt-1 text-sm font-bold text-slate-500">
                              {formatPrice(item.totalPrice)} · {item.estimatedWattage}W
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveBuildItem(item.id)}
                            className="grid h-10 w-10 place-items-center rounded-xl text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-3 text-xs font-semibold text-slate-500">
                          {item.parts.map((part) => part.partName).join(", ")}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-slate-500">Власних збірок у кошику ще немає.</p>
                )}
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-black text-slate-950">Комплектуючі</h2>
                {componentItems.length ? (
                  <div className="grid gap-3">
                    {componentItems.map((item) => {
                      const Icon = componentIcons[item.categoryId] ?? Box;

                      return (
                        <article key={item.id} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
                            <Icon className="h-7 w-7" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-sky-500">{item.categoryLabel}</p>
                            <h3 className="font-black text-slate-950">{item.name}</h3>
                            <p className="mt-1 text-sm font-bold text-slate-500">{item.brand} · {item.wattage}W</p>
                            <p className="mt-2 text-lg font-black text-slate-950">{formatPrice(item.price)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveComponentItem(item.id)}
                            className="grid h-10 w-10 place-items-center rounded-xl text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-slate-500">Комплектуючих у кошику ще немає.</p>
                )}
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-black text-slate-950">Готові ПК з каталогу</h2>
                {cart.catalogItems.length ? (
                  <div className="grid gap-3">
                    {cart.catalogItems.map((item) => (
                      <article key={item.id} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                        <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl bg-slate-900 object-contain p-2" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-black text-slate-950">{item.name}</h3>
                          <p className="mt-1 text-sm font-bold text-slate-500">{item.cpu} · {item.gpu}</p>
                          <p className="mt-2 text-lg font-black text-slate-950">{item.priceLabel}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveCatalogItem(item.id)}
                          className="grid h-10 w-10 place-items-center rounded-xl text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-slate-500">Готових ПК у кошику ще немає.</p>
                )}
              </section>
            </div>

            <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-500">Разом</p>
              <p className="mt-2 text-4xl font-black text-slate-950">{formatPrice(total)}</p>
              <button
                type="button"
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 px-5 py-4 text-sm font-black text-white"
              >
                Оформити замовлення
              </button>
              <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
                Оформлення поки демонстраційне: кошик уже збирає товари, але оплата не підключена.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
