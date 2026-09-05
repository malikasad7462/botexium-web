import Reveal from "./Reveal";

export default function WhyChoose() {
  const reasons = [
    {
      title: "Real Business Utility",
      desc: "BOTEXIUM Token is backed by real software, AI, education and digital business services.",
    },
    {
      title: "Token Payment Benefits",
      desc: "Clients paying with BOTEXIUM Token will receive exclusive discounts on digital services.",
    },
    {
      title: "Borderless Ecosystem",
      desc: "One platform connecting businesses, developers, entrepreneurs and global communities.",
    },
    {
      title: "Long-Term Growth",
      desc: "Revenue generated from real services strengthens the entire ecosystem over time.",
    },
    {
      title: "Community Driven",
      desc: "The ecosystem grows together with its members, partners and contributors.",
    },
    {
      title: "Future Ready",
      desc: "Built for AI, blockchain, software, education and next-generation digital commerce.",
    },
  ];

  return (
    <Reveal>
    <section className="py-28 px-6 bg-[#050816] text-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">
          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            Why Choose BOTEXIUM
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            More Than A Token
          </h2>

          <p className="mt-8 text-lg text-gray-400 leading-8">
            BOTEXIUM combines blockchain with real-world businesses, creating lasting value for users, clients and investors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl glass-card p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-cyan-400">
                {item.title}
              </h3>

              <p className="mt-5 text-gray-400 leading-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
    </Reveal>
  );
}