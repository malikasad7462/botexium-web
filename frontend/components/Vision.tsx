import Reveal from "./Reveal";

export default function Vision() {
  return (
    <Reveal>
    <section
      id="vision"
      className="py-28 px-6 bg-[#050816] text-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">
          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            Our Vision
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            Empowering The Future
          </h2>

          <p className="mt-8 text-gray-400 text-lg leading-8">
            BOTEXIUM envisions a world where technology, education,
            software, AI and blockchain unite to create one
            transparent, borderless and opportunity-driven economy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          <div className="rounded-3xl glass-card p-8 text-center">
            <div className="text-cyan-400 text-4xl font-bold">01</div>

            <h3 className="text-2xl font-bold mt-6">
              Global Connectivity
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Connecting people, businesses and innovation without
              geographical limitations.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <div className="text-cyan-400 text-4xl font-bold">02</div>

            <h3 className="text-2xl font-bold mt-6">
              Digital Transformation
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Accelerating digital adoption through software,
              AI and blockchain technologies.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <div className="text-cyan-400 text-4xl font-bold">03</div>

            <h3 className="text-2xl font-bold mt-6">
              Sustainable Ecosystem
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Building a self-sustaining ecosystem that creates
              long-term value for everyone.
            </p>
          </div>

        </div>

      </div>
    </section>
    </Reveal>
  );
}