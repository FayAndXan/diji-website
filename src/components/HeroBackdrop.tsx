export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#041019]">
      <img
        src="/assets/diji-hero-background.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_62%] opacity-56 blur-[18px]"
      />

      <img
        src="/assets/diji-hero-background.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_60%] 2xl:hidden"
      />

      <img
        src="/assets/diji-hero-background.jpg"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-contain object-[center_58%] 2xl:block"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_53%,rgba(255,244,216,0.22),transparent_20%),radial-gradient(circle_at_14%_18%,rgba(255,241,216,0.16),transparent_18%),radial-gradient(circle_at_86%_18%,rgba(255,241,216,0.16),transparent_18%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,21,28,0.28)_0%,rgba(9,21,28,0.14)_18%,rgba(7,17,24,0.16)_48%,rgba(4,11,16,0.68)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,12,18,0.64)_0%,rgba(4,12,18,0.2)_20%,rgba(4,12,18,0.05)_42%,rgba(4,12,18,0.08)_76%,rgba(4,12,18,0.3)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(2,7,11,0)_0%,rgba(2,7,11,0.08)_42%,rgba(2,7,11,0.72)_88%,rgba(2,7,11,0.92)_100%)]" />

      <div className="absolute -left-12 bottom-[8%] h-[16rem] w-[16rem] rounded-full bg-[#88c6e7]/10 blur-3xl md:h-[22rem] md:w-[22rem]" />

      <div className="absolute -right-10 top-[18%] h-[12rem] w-[12rem] rounded-full bg-[#f0deba]/10 blur-3xl md:h-[18rem] md:w-[18rem]" />

      <div className="absolute left-[45%] top-[21%] hidden h-px w-[5.5rem] rotate-[-6deg] bg-[linear-gradient(90deg,transparent,rgba(255,247,224,0.94),transparent)] shadow-[0_0_18px_rgba(255,247,224,0.48)] md:block" />
    </div>
  )
}
