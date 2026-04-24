import { AnianOnboarding } from './components/AnianOnboarding'
import { CompanionCarousel } from './components/CompanionCarousel'
import { CursorFx } from './components/CursorFx'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroBackdrop } from './components/HeroBackdrop'
import { HeroCopy } from './components/HeroCopy'

function App() {
  const isAnianSite =
    window.location.hostname.toLowerCase().startsWith('anian.') ||
    window.location.pathname.toLowerCase().startsWith('/anian')

  if (isAnianSite) {
    return <AnianOnboarding />
  }

  return (
    <main className="overflow-x-clip bg-[#031017] text-[#f3f2ea]">
      <CursorFx />

      <section
        id="home"
        className="relative isolate min-h-screen overflow-hidden border-b border-white/10"
      >
        <HeroBackdrop />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 pb-8 pt-5 sm:px-6 sm:pt-6 md:px-8 md:pt-7 lg:px-10 lg:pt-8 xl:px-14">
          <Header />

          <div className="flex flex-1 flex-col pt-6 sm:pt-7 md:pt-8 lg:pt-10">
            <HeroCopy />

            <div className="mt-[clamp(2.35rem,5.8vh,4.45rem)]">
              <CompanionCarousel />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default App
