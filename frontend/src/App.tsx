import { CatalogPage } from './components/CatalogPage'
import { Advantages } from './components/Advantages'
import { CustomBuild } from './components/CustomBuild'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { PopularProducts } from './components/PopularProducts'
import { Reviews } from './components/Reviews'
import { SetupBanner } from './components/SetupBanner'
import { useMemo, useState } from 'react'
import { RouteLoader } from './components/RouteLoader'
import { PcBuilderPage } from './components/PcBuilderPage'
import { AuthPage } from './components/AuthPage'
import { ProfilePage } from './components/ProfilePage'
import type { AppUser } from './types/user'

const USER_STORAGE_KEY = 'apexgaming:user'
const TOKEN_STORAGE_KEY = 'apexgaming:token'

function HomePage({
  user,
  onNavigateCatalog,
  onNavigateBuilder,
  onNavigateAuth,
  onNavigateProfile,
}: {
  user: AppUser | null
  onNavigateCatalog: () => void
  onNavigateBuilder: () => void
  onNavigateAuth: () => void
  onNavigateProfile: () => void
}) {

  return (
    <div className="min-h-screen bg-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header
        user={user}
        onNavigateCatalog={onNavigateCatalog}
        onNavigateBuilder={onNavigateBuilder}
        onNavigateAuth={onNavigateAuth}
        onNavigateProfile={onNavigateProfile}
      />
      <HeroSection />
      <PopularProducts />
      <Advantages />
      <CustomBuild />
      <SetupBanner />
      <Reviews />
      <Footer />
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<'home' | 'catalog' | 'builder' | 'auth' | 'profile'>('home')
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


  const [showLoader, setShowLoader] = useState(false)

  const navigateTo = (nextPage: typeof page) => {
    setShowLoader(true)
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => setShowLoader(false), 450)
  }

  const navigateHome = () => {
    navigateTo('home')
  }

  const navigateCatalog = () => {
    navigateTo('catalog')
  }

  const navigateBuilder = () => {
    navigateTo('builder')
  }

  const navigateAuth = () => {
    navigateTo('auth')
  }

  const navigateProfile = () => {
    if (user) {
      navigateTo('profile')
      return
    }

    navigateTo('auth')
  }

  const handleAuthSuccess = (nextUser: AppUser, token: string) => {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    navigateTo('profile')
  }

  const handleUpdateUser = async (nextUser: AppUser) => {
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
        // Keep the local profile responsive if the API is temporarily unavailable.
      }
    }

    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  const handleLogout = () => {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    window.localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
    navigateTo('home')
  }

  const isCatalog = page === 'catalog'
  const isBuilder = page === 'builder'
  const isAuth = page === 'auth'
  const isProfile = page === 'profile'

  const content = useMemo(() => {
    if (isCatalog) {
      return (
        <CatalogPage
          user={user}
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onNavigateAuth={navigateAuth}
          onNavigateProfile={navigateProfile}
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
          onNavigateAuth={navigateAuth}
          onNavigateProfile={navigateProfile}
        />
      )
    }

    if (isAuth) {
      return (
        <AuthPage
          onNavigateHome={navigateHome}
          onNavigateCatalog={navigateCatalog}
          onNavigateBuilder={navigateBuilder}
          onAuthSuccess={handleAuthSuccess}
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
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
        />
      )
    }

    return (
      <HomePage
        user={user}
        onNavigateCatalog={navigateCatalog}
        onNavigateBuilder={navigateBuilder}
        onNavigateAuth={navigateAuth}
        onNavigateProfile={navigateProfile}
      />
    )
  }, [isCatalog, isBuilder, isAuth, isProfile, user])

  return (
    <>
      {showLoader ? <RouteLoader label="Завантажуємо..." /> : null}
      {content}
    </>
  )
}



