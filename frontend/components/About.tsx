import Reveal from "./Reveal";

export default function About() {
  return (
    <Reveal>
      <section
        id="about"
        className="bg-[#081021] py-28 px-6 text-white"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
              About BOTEXIUM
            </span>

            <h2 className="text-5xl font-extrabold mt-5 leading-tight">
              Building One Unified
              <span className="text-cyan-400"> Global Ecosystem</span>
            </h2>

            <p className="text-gray-400 mt-8 leading-8 text-lg">
              BOTEXIUM is building a borderless ecosystem where software,
              artificial intelligence, education, digital services,
              business and blockchain work together under one powerful
              digital economy.
            </p>

            <p className="text-gray-400 mt-6 leading-8">
              Our mission is to connect individuals, startups,
              enterprises and communities through innovative technology,
              creating opportunities without borders.
            </p>

          </div>

          {/* Right */}

          <div className="grid gap-6">

            <div className="rounded-3xl glass-card p-8 text-center">
              <h3 className="text-cyan-400 text-2xl font-bold">
                Global Vision
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                Connecting businesses, technology and communities into
                one sustainable ecosystem.
              </p>
            </div>

            <div className="rounded-3xl glass-card p-8 text-center">
              <h3 className="text-cyan-400 text-2xl font-bold">
                Innovation First
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                AI, software and blockchain working together to build
                real-world solutions.
              </p>
            </div>

            <div className="rounded-3xl glass-card p-8 text-center">
              <h3 className="text-cyan-400 text-2xl font-bold">
                Long-Term Growth
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                Creating sustainable value for businesses,
                communities and future generations.
              </p>
            </div>

          </div>

        </div>
      </section>
    </Reveal>
  );
}