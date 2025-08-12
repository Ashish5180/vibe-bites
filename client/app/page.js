import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import FeaturedProducts from '../components/FeaturedProducts'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-vibe-bg">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  )
}
