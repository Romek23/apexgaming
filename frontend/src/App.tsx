import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { PopularProducts } from './components/PopularProducts'
import { Advantages } from './components/Advantages'
import { CustomBuild } from './components/CustomBuild'
import { SetupBanner } from './components/SetupBanner'
import { Reviews } from './components/Reviews'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
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
