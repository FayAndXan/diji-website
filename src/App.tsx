import { CompanionCarousel } from './components/CompanionCarousel'
import { CursorFx } from './components/CursorFx'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroBackdrop } from './components/HeroBackdrop'
import { HeroCopy } from './components/HeroCopy'

function App() {
  return (
    <main className="overflow-x-clip bg-[#031017] text-[#f3f2ea]">
      <CursorFx />

      <section
        id="home"
        className="relative isolate min-h-screen overflow-hidden border-b border-white/10"
      >
        <HeroBackdrop />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 pb-8 pt-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
          <Header />

          <div className="flex flex-1 flex-col justify-between gap-12 pt-8 sm:pt-10 md:pt-12 lg:pt-16">
            <HeroCopy />
            <CompanionCarousel />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default App
