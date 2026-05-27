import { CatalogPage } from './components/CatalogPage'
import { Advantages } from './components/Advantages'
import { CustomBuild } from './components/CustomBuild'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { PopularProducts } from './components/PopularProducts'
import { Reviews } from './components/Reviews'
import { SetupBanner } from './components/SetupBanner'
import { useEffect, useMemo, useState } from 'react'
import { RouteLoader } from './components/RouteLoader'
import { PcBuilderPage } from './components/PcBuilderPage'
import { AuthPage } from './components/AuthPage'
import { ProfilePage } from './components/ProfilePage'
import { CartPage } from './components/CartPage'
import { AboutPage } from './components/AboutPage'
import { ComponentsPage } from './components/ComponentsPage'
import type { AboutSectionId } from './components/Footer'
import type { AppCart, AppUser, CartBuildItem, CartCatalogItem, CartComponentItem } from './types/user'

const USER_STORAGE_KEY = 'apexgaming:user'
const TOKEN_STORAGE_KEY = 'apexgaming:token'
const CART_STORAGE_KEY = 'apexgaming:cart'
const EMPTY_CART: AppCart = { catalogItems: [], buildItems: [], componentItems: [] }

// Головна сторінка збирає всі основні блоки сайту в один екран.
function HomePage({
  user,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateComponents,
  onNavigateCart,
  onNavigateAboutSection,
  onNavigateAuth,
  onNavigateProfile,
  cartCount,
}: {
  user: AppUser | null
  onNavigateCatalog: () => void
  onNavigateBuilder: () => void
  onNavigateComponents: () => void
  onNavigateCart: () => void
  onNavigateAboutSection: (section: AboutSectionId) => void
  onNavigateAuth: () => void
  onNavigateProfile: () => void
  cartCount: number
}) {

  return (
    <div className="min-h-screen bg-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header
        user={user}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
        onNavigateComponents={onNavigateComponents}
        onNavigateCart={onNavigateCart}
        onNavigateAbout={() => onNavigateAboutSection('about')}
        onNavigateAuth={onNavigateAuth}
        onNavigateProfile={onNavigateProfile}
        cartCount={cartCount}
      />
      {/* Головний банер сайту з основною пропозицією магазину. */}
      <HeroSection onNavigateCatalog={onNavigateCatalog} />

      {/* Блок із популярними готовими комп'ютерами. */}
      <PopularProducts onNavigateCatalog={onNavigateCatalog} />

      {/* Переваги магазину: доставка, гарантія, підтримка. */}
      <Advantages />

      {/* Блок про індивідуальну збірку ПК під потреби клієнта. */}
      <CustomBuild onNavigateBuilder={onNavigateBuilder} />

      {/* Додатковий рекламний банер із сетапом. */}
      <SetupBanner onNavigateCatalog={onNavigateCatalog} />

      {/* Відгуки клієнтів для довіри до магазину. */}
      <Reviews />

      {/* Нижня частина сайту з навігацією та контактами. */}
      <Footer
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
        onNavigateComponents={onNavigateComponents}
        onNavigateAboutSection={onNavigateAboutSection}
      />
    </div>
  )
}

export default function App() {
  // page зберігає, яку сторінку зараз треба показати.
  const [page, setPage] = useState<'home' | 'catalog' | 'builder' | 'components' | 'auth' | 'profile' | 'cart' | 'about'>('home')
  const [aboutSection, setAboutSection] = useState<AboutSectionId>('about')

  // При відкритті сайту пробуємо взяти користувача з localStorage.
  const [user, setUser] = useState<AppUser | null>(() => {
    const savedUser = window.localStorage.getItem(USER_STORAGE_KEY)

    if (!savedUser) {
      return null
    }

    try {
      return JSON.parse(savedUser) as AppUser
    } catch {
      window.localStorage.removeItem(USER_STORAGE_KEY)
      return null
    }
  })

  const [cart, setCart] = useState<AppCart>(() => {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!savedCart) {
      return EMPTY_CART
    }

    try {
      const parsedCart = JSON.parse(savedCart) as AppCart
      return {
        catalogItems: parsedCart.catalogItems ?? [],
        buildItems: parsedCart.buildItems ?? [],
        componentItems: parsedCart.componentItems ?? [],
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY)
      return EMPTY_CART
    }
  })

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY)

    if (!token) {
      return
    }

    const checkSession = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401) {
          window.localStorage.removeItem(TOKEN_STORAGE_KEY)
          window.localStorage.removeItem(USER_STORAGE_KEY)
          setUser(null)
        }
      } catch {
        // Якщо backend тимчасово не відповідає, не виходимо з акаунту автоматично.
      }
    }

    checkSession()
  }, [])


  const [showLoader, setShowLoader] = useState(false)

  // Одна функція для переходу між сторінками з короткою анімацією завантаження.
  const navigateTo = (nextPage: typeof page) => {
    setShowLoader(true)
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => setShowLoader(false), 450)
  }

  const navigateHome = () => {
    // Перехід на головну сторінку.
    navigateTo('home')
  }

  const navigateCatalog = () => {
    // Перехід до каталогу готових ПК.
    navigateTo('catalog')
  }

  const navigateBuilder = () => {
    // Перехід до конструктора, де можна підібрати комплектуючі.
    navigateTo('builder')
  }

  const navigateComponents = () => {
    navigateTo('components')
  }

  const navigateCart = () => {
    navigateTo('cart')
  }

  const navigateAboutSection = (section: AboutSectionId) => {
    setAboutSection(section)
    navigateTo('about')
  }

  const navigateAuth = () => {
    // Перехід до сторінки входу або реєстрації.
    navigateTo('auth')
  }

  const navigateProfile = () => {
    // Якщо користувач не увійшов, замість профілю показуємо сторінку входу.
    if (user) {
      navigateTo('profile')
      return
    }

    navigateTo('auth')
  }

  const handleAuthSuccess = (nextUser: AppUser, token: string) => {
    // Після входу зберігаємо токен і дані користувача в браузері.
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    navigateTo('profile')
  }

  const handleUpdateUser = async (nextUser: AppUser) => {
    // Якщо є токен, пробуємо зберегти аватар на сервері.
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY)

    if (token) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ avatar_url: nextUser.avatarUrl ?? null }),
        })

        if (response.ok) {
          const savedUser = await response.json()
          const normalizedUser = {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            avatarUrl: savedUser.avatar_url ?? undefined,
          }

          window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(normalizedUser))
          setUser(normalizedUser)
          return
        }
      } catch {
        // Якщо сервер тимчасово не відповідає, все одно оновлюємо профіль локально.
      }
    }

    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  const handleLogout = () => {
    // При виході очищаємо дані входу і повертаємо користувача на головну.
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    window.localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
    navigateTo('home')
  }

  const handleSessionExpired = () => {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    window.localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
    navigateTo('auth')
  }

  const saveCart = (nextCart: AppCart) => {
    setCart(nextCart)
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart))
  }

  const handleAddCatalogToCart = (item: CartCatalogItem) => {
    saveCart({
      ...cart,
      catalogItems: [item, ...cart.catalogItems.filter((cartItem) => cartItem.id !== item.id)],
    })
  }

  const handleAddBuildToCart = (item: CartBuildItem) => {
    saveCart({
      ...cart,
      buildItems: [item, ...cart.buildItems.filter((cartItem) => cartItem.id !== item.id)],
    })
  }

  const handleAddComponentToCart = (item: CartComponentItem) => {
    saveCart({
      ...cart,
      componentItems: [item, ...(cart.componentItems ?? []).filter((cartItem) => cartItem.id !== item.id)],
    })
  }

  const handleRemoveCatalogItem = (id: string) => {
    saveCart({
      ...cart,
      catalogItems: cart.catalogItems.filter((item) => item.id !== id),
    })
  }

  const handleRemoveBuildItem = (id: number) => {
    saveCart({
      ...cart,
      buildItems: cart.buildItems.filter((item) => item.id !== id),
    })
  }

  const handleRemoveComponentItem = (id: string) => {
    saveCart({
      ...cart,
      componentItems: (cart.componentItems ?? []).filter((item) => item.id !== id),
    })
  }

  const handleClearCart = () => {
    saveCart(EMPTY_CART)
  }

  const isCatalog = page === 'catalog'
  const isBuilder = page === 'builder'
  const isComponents = page === 'components'
  const isAuth = page === 'auth'
  const isProfile = page === 'profile'
  const isCart = page === 'cart'
  const isAbout = page === 'about'
  const cartCount = cart.catalogItems.length + cart.buildItems.length + (cart.componentItems ?? []).length

  // Ці змінні роблять умови нижче коротшими і зрозумілішими.
  const content = useMemo(() => {
    // Тут вибираємо, який компонент сторінки показувати зараз.
    if (isCatalog) {
      return (
        <CatalogPage
          user={user}
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateComponents={navigateComponents}
          onNavigateCart={navigateCart}
          onNavigateAuth={navigateAuth}
          onNavigateProfile={navigateProfile}
          cartCount={cartCount}
          onAddCatalogToCart={handleAddCatalogToCart}
        />
      )
    }

    if (isComponents) {
      return (
        <ComponentsPage
          user={user}
          cartCount={cartCount}
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateComponents={navigateComponents}
          onNavigateCart={navigateCart}
          onNavigateAuth={navigateAuth}
          onNavigateProfile={navigateProfile}
          onNavigateAboutSection={navigateAboutSection}
          onAddComponentToCart={handleAddComponentToCart}
        />
      )
    }

    if (isBuilder) {
      return (
        <PcBuilderPage
          user={user}
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateComponents={navigateComponents}
          onNavigateCart={navigateCart}
          onNavigateAuth={navigateAuth}
          onNavigateProfile={navigateProfile}
          cartCount={cartCount}
          onSessionExpired={handleSessionExpired}
        />
      )
    }

    if (isAuth) {
      return (
        <AuthPage
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateComponents={navigateComponents}
          onNavigateCart={navigateCart}
          cartCount={cartCount}
          onAuthSuccess={handleAuthSuccess}
        />
      )
    }

    if (isCart) {
      return (
        <CartPage
          user={user}
          cart={cart}
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateComponents={navigateComponents}
          onNavigateCart={navigateCart}
          onNavigateAuth={navigateAuth}
          onNavigateProfile={navigateProfile}
          onRemoveCatalogItem={handleRemoveCatalogItem}
          onRemoveBuildItem={handleRemoveBuildItem}
          onRemoveComponentItem={handleRemoveComponentItem}
          onClearCart={handleClearCart}
        />
      )
    }

    if (isAbout) {
      return (
        <AboutPage
          user={user}
          cartCount={cartCount}
          activeSection={aboutSection}
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateComponents={navigateComponents}
          onNavigateCart={navigateCart}
          onNavigateAuth={navigateAuth}
          onNavigateProfile={navigateProfile}
          onNavigateAboutSection={navigateAboutSection}
        />
      )
    }

    if (isProfile && user) {
      return (
        <ProfilePage
          user={user}
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateComponents={navigateComponents}
          onNavigateCart={navigateCart}
          cartCount={cartCount}
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
          onAddBuildToCart={handleAddBuildToCart}
        />
      )
    }

    return (
      <HomePage
        user={user}
        onNavigateCatalog={navigateCatalog}
        onNavigateBuilder={navigateBuilder}
        onNavigateComponents={navigateComponents}
        onNavigateCart={navigateCart}
        onNavigateAboutSection={navigateAboutSection}
        onNavigateAuth={navigateAuth}
        onNavigateProfile={navigateProfile}
        cartCount={cartCount}
      />
    )
  }, [isCatalog, isBuilder, isComponents, isAuth, isCart, isAbout, isProfile, user, cart, aboutSection])

  return (
    <>
      {showLoader ? <RouteLoader label="Завантажуємо..." /> : null}
      {content}
    </>
  )
}



