export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#081723]">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_62%] brightness-[1.04] saturate-[1.08] contrast-[1.03]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/diji-hero-background.jpg"
        aria-hidden="true"
      >
        <source src="/assets/diji-hero-background.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(255,242,210,0.24),transparent_21%),radial-gradient(circle_at_14%_20%,rgba(255,232,190,0.2),transparent_19%),radial-gradient(circle_at_86%_22%,rgba(255,235,198,0.18),transparent_21%),radial-gradient(circle_at_54%_17%,rgba(164,219,248,0.14),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,28,0.05)_0%,rgba(8,20,28,0.01)_18%,rgba(7,17,24,0.05)_46%,rgba(4,11,16,0.32)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,14,20,0.3)_0%,rgba(5,14,20,0.08)_18%,rgba(5,14,20,0.01)_42%,rgba(5,14,20,0.03)_76%,rgba(5,14,20,0.1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_96%,rgba(2,7,11,0)_0%,rgba(2,7,11,0.04)_44%,rgba(2,7,11,0.34)_88%,rgba(2,7,11,0.52)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_56%,rgba(255,240,202,0.08),transparent_48%)] mix-blend-screen" />

      <div className="absolute -left-12 bottom-[8%] h-[16rem] w-[16rem] rounded-full bg-[#f0ddb5]/9 blur-3xl md:h-[22rem] md:w-[22rem]" />

      <div className="absolute -right-10 top-[18%] h-[12rem] w-[12rem] rounded-full bg-[#f3e0b5]/10 blur-3xl md:h-[18rem] md:w-[18rem]" />
    </div>
  )
}
