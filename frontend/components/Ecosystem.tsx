import Reveal from "./Reveal";

export default function Ecosystem() {
  const ecosystem = [
    {
      title: "Software",
      desc: "Building websites, mobile apps, enterprise software and digital platforms.",
    },
    {
      title: "Artificial Intelligence",
      desc: "AI automation, business intelligence and next-generation smart solutions.",
    },
    {
      title: "Education",
      desc: "Schools, Academy, professional training and future learning systems.",
    },
    {
      title: "Marketplace",
      desc: "Connecting businesses, freelancers and customers in one digital marketplace.",
    },
    {
      title: "Business Network",
      desc: "Creating global opportunities through partnerships and collaboration.",
    },
    {
      title: "BOTEXIUM Token",
      desc: "The utility token powering payments, rewards and the ecosystem economy.",
    },
  ];

  return (
    <Reveal>
    <section
      id="ecosystem"
      className="py-28 px-6 bg-[#050816] text-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            Global Ecosystem
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            One Ecosystem.
            <span className="text-cyan-400"> Endless Opportunities.</span>
          </h2>

          <p className="mt-8 text-lg text-gray-400 leading-8">
            BOTEXIUM unifies technology, business, education, artificial intelligence
            and blockchain into one powerful ecosystem designed for the future.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {ecosystem.map((item) => (

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