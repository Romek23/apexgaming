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

function HomePage({ onNavigateCatalog }: { onNavigateCatalog: () => void }) {

  return (
    <div className="min-h-screen bg-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header onNavigateCatalog={onNavigateCatalog} />
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
  const [page, setPage] = useState<'home' | 'catalog'>('home')


  const navigateHome = () => {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateCatalog = () => {
    setPage('catalog')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isCatalog = page === 'catalog'

  const content = useMemo(() => {
    if (isCatalog) {
      return (
        <CatalogPage onNavigateHome={navigateHome} onNavigateCatalog={navigateCatalog} />
      )
    }

    return <HomePage onNavigateCatalog={navigateCatalog} />
  }, [isCatalog])

  return (
    <>
      <RouteLoader label="Завантажуємо головну..." />
      {content}
    </>
  )
}

