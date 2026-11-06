import { useState } from 'react'

import { CompanionCards } from './components/CompanionCards'
import { CompanionDialog } from './components/CompanionDialog'
import { CursorFx } from './components/CursorFx'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroBackdrop } from './components/HeroBackdrop'
import { HeroCopy } from './components/HeroCopy'
import type { CompanionProfile } from './data/companions'

function App() {
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionProfile | null>(null)

  return (
    <main className="overflow-x-clip bg-[#031017] text-[#f3f2ea]">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <CursorFx />

      <section
        id="home"
        className="relative isolate min-h-screen overflow-hidden border-b border-white/10"
      >
        <HeroBackdrop />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 pb-8 pt-5 sm:px-6 sm:pt-6 md:px-8 md:pt-7 lg:px-10 lg:pt-8 xl:px-14">
          <Header />

          <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col pt-6 sm:pt-7 md:pt-8 lg:pt-10">
            <HeroCopy />

            <div className="mt-[clamp(3.9rem,8.8vh,6.8rem)]">
              <CompanionCards onSelect={setSelectedCompanion} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {selectedCompanion && <CompanionDialog companion={selectedCompanion} onClose={() => setSelectedCompanion(null)} />}
    </main>
  )
}

export default App
