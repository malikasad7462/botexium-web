import Reveal from "./Reveal";

export default function Roadmap() {
  const roadmap = [
    {
      phase: "Phase 01",
      title: "Foundation",
      desc: "Brand identity, website launch and community building.",
    },
    {
      phase: "Phase 02",
      title: "Token Launch",
      desc: "Smart contract, presale, wallet integration and investor dashboard.",
    },
    {
      phase: "Phase 03",
      title: "Ecosystem",
      desc: "Software, AI, Marketplace and BOTEXIUM Academy launch.",
    },
    {
      phase: "Phase 04",
      title: "Global Expansion",
      desc: "Business network, partnerships and worldwide growth.",
    },
    {
      phase: "Phase 05",
      title: "Future Vision",
      desc: "BOTEXIUM Pay, BOTEXIUM Wallet, Schools, University and Research Labs.",
    },
  ];

  return (
    <Reveal>
    <section
      id="roadmap"
      className="py-28 px-6 bg-[#050816] text-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            Roadmap
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            Building Step By Step
          </h2>

          <p className="mt-8 text-lg text-gray-400 leading-8">
            A clear long-term strategy focused on sustainable growth,
            innovation and global expansion.
          </p>

        </div>

        <div className="mt-20 space-y-8">

          {roadmap.map((item) => (
            <div
              key={item.phase}
              className="rounded-3xl glass-card p-8 text-center"
            >
              <div className="lg:w-1/4">
                <h3 className="text-cyan-400 text-2xl font-bold">
                  {item.phase}
                </h3>
              </div>

              <div className="lg:w-3/4">
                <h4 className="text-3xl font-bold">
                  {item.title}
                </h4>

                <p className="mt-4 text-gray-400 leading-8">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
    </Reveal>
  );
}