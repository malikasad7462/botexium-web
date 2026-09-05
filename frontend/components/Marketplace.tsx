import Reveal from "./Reveal";

import {
  Code2,
  Palette,
  Brain,
  Package,
  Users,
  Wallet,
} from "lucide-react";

export default function Marketplace() {
  const services = [
  {
    icon: <Code2 size={40} />,
    title: "Software Projects",
    desc: "Custom websites, mobile apps, enterprise software and SaaS solutions.",
  },
  {
    icon: <Palette size={40} />,
    title: "Digital Services",
    desc: "Branding, UI/UX, graphic design, video editing and creative solutions.",
  },
  {
    icon: <Brain size={40} />,
    title: "AI Services",
    desc: "AI automation, chatbots, smart assistants and intelligent workflows.",
  },
  {
    icon: <Package size={40} />,
    title: "Digital Products",
    desc: "Templates, source code, plugins, themes and premium digital assets.",
  },
  {
    icon: <Users size={40} />,
    title: "Global Freelancers",
    desc: "Connecting skilled professionals with businesses around the world.",
  },
  {
    icon: <Wallet size={40} />,
    title: "Secure Payments",
    desc: "Traditional payment methods alongside BOTEXIUM Token integration.",
  },
];

  return (
    <Reveal>
    <section
      id="marketplace"
      className="py-28 px-6 bg-[#081021] text-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            Digital Marketplace
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            One Marketplace.
            <span className="text-cyan-400"> Unlimited Opportunities.</span>
          </h2>

          <p className="mt-8 text-lg text-gray-400 leading-8">
            A unified marketplace where businesses, freelancers and customers
            collaborate through software, AI and digital services.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl glass-card p-8 text-center"
            >
              <div className="text-cyan-400 mb-6">
                {item.icon}
              </div>
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