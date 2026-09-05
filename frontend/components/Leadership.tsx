import Reveal from "@/components/Reveal";

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative py-24 sm:py-28 lg:py-32 bg-[#050816] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute w-[450px] h-[450px] bg-cyan-500/10 blur-[150px] rounded-full top-10 left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full bottom-0 right-[-150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">

        <Reveal>
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 rounded-full glass-card text-cyan-300 text-sm tracking-[3px] uppercase">
              Leadership
            </span>

            <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black text-white">
              Meet the Vision Behind{" "}
              <span className="hero-title">BOTEXIUM</span>
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg leading-8">
              Building a global digital ecosystem designed to connect
              technology, intelligence, business and opportunity.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="glass-card p-6 sm:p-8 lg:p-10">

            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">

              {/* CEO Image */}
              <div className="relative">
                <div className="relative aspect-square max-w-sm mx-auto rounded-3xl border border-cyan-400/20 bg-[#081021] overflow-hidden shadow-2xl">

                  <img
                    src="/images/ceo.png"
                    alt="Malik Asad Nawaz Awan - Founder & CEO of BOTEXIUM"
                    className="w-full h-full object-cover object-center"
                  />

                </div>
              </div>

              {/* CEO Information */}
              <div className="text-center lg:text-left">

                <span className="text-cyan-400 text-sm uppercase tracking-[3px] font-semibold">
                  Founder & CEO
                </span>

                <h3 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-white">
                  Malik Asad Nawaz Awan
                </h3>

                <div className="mt-6 h-px w-24 bg-cyan-400/40 mx-auto lg:mx-0" />

                <p className="mt-6 text-gray-300 text-base sm:text-lg leading-8">
                  A vision focused on building a future where technology,
                  artificial intelligence, education, business and blockchain
                  work together within one connected digital ecosystem.
                </p>

                <p className="mt-5 text-gray-400 leading-7">
                  BOTEXIUM is being developed with a long-term vision to create
                  meaningful digital opportunities, empower communities and
                  build innovative solutions for the next generation.
                </p>

                <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-400/20 bg-cyan-400/5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />

                  <span className="text-cyan-300 text-sm font-medium">
                    Building the Future Together
                  </span>
                </div>

              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}