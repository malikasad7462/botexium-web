import Reveal from "./Reveal";

export default function Mission() {
  return (
    <Reveal>
    <section
      id="mission"
      className="py-28 px-6 bg-[#081021] text-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            Our Mission
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            Creating Real Value
          </h2>

          <p className="mt-8 text-lg text-gray-400 leading-8">
            Our mission is to empower individuals, businesses and
            communities through technology, education, AI and
            blockchain while building a transparent global economy.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-cyan-400 text-xl font-bold">
              Innovation
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Deliver next-generation software, AI and digital solutions.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-cyan-400 text-xl font-bold">
              Education
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Build modern learning systems that prepare future leaders.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-cyan-400 text-xl font-bold">
              Business
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Connect entrepreneurs and companies through one ecosystem.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-cyan-400 text-xl font-bold">
              Sustainability
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Create long-term value powered by innovation and community.
            </p>
          </div>

        </div>

      </div>
    </section>
    </Reveal>
  );
}