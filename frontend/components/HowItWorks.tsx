import Reveal from "./Reveal";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Join The Community",
      desc: "Become part of the BOTEXIUM ecosystem and stay connected with future updates and opportunities.",
    },
    {
      step: "02",
      title: "Connect Your Wallet",
      desc: "Securely connect your Web3 wallet to access the BOTEXIUM ecosystem and future token services.",
    },
    {
      step: "03",
      title: "Purchase BOTEXIUM Token",
      desc: "Acquire BOTEXIUM Tokens to unlock ecosystem benefits, services and exclusive member advantages.",
    },
    {
      step: "04",
      title: "Build, Earn & Grow",
      desc: "Use BOTEXIUM services, receive token benefits and grow with a global community-driven ecosystem.",
    },
  ];

  return (
    <Reveal>
    <section className="py-28 px-6 bg-[#081021] text-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            How It Works
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            Your Journey Starts Here
          </h2>

          <p className="mt-8 text-lg text-gray-400 leading-8">
            Join the BOTEXIUM ecosystem in four simple steps and become part of the future digital economy.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl glass-card p-8 text-center"
            >
              <div className="text-5xl font-black text-cyan-400">
                {item.step}
              </div>

              <h3 className="text-2xl font-bold mt-6">
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