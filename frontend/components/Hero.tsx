import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#050816] overflow-hidden pt-16 sm:pt-0"
    >
      {/* Background Glow */}

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full top-20 left-10 animate-pulse"></div>

      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[150px] rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* Content */}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-12 lg:pb-40 text-center">

        <span className="inline-block px-6 py-3 rounded-full glass-card text-cyan-300 text-sm tracking-[3px] uppercase">
          The Future of Business • AI • Blockchain
        </span>

        <h1 className="mt-3 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-tight text-white">
          Building The Future Of
          <br />
          <span className="hero-title hero-glow">
            Global Digital Ecosystems
          </span>
        </h1>

        <p className="mt-2 sm:mt-8 max-w-3xl mx-auto text-base sm:text-xl text-gray-300 leading-7 sm:leading-9">
          BOTEXIUM is creating a borderless ecosystem where Software,
          Artificial Intelligence Bots, Education, Business and Blockchain
          come together to power the next generation digital economy.
        </p>

        {/* Hero Buttons */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-5 sm:mt-12 w-full">

  <a
    href="#community"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 premium-btn"
  >
    Join Community
    <ArrowRight size={18} />
  </a>

  <a
    href="#vision"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 premium-btn"
  >
    Explore Ecosystem
    <ArrowRight size={18} />
  </a>

</div>
      </div>
    </section>
  );
}