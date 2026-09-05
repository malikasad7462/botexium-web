import Reveal from "./Reveal";

import {
  Users,
  Globe,
  Boxes,
  Briefcase,
} from "lucide-react";

export default function HeroStats() {
  const stats = [
  {
    icon: <Users size={42} />,
    number: "0+",
    title: "Community Members",
  },
  {
    icon: <Globe size={42} />,
    number: "0+",
    title: "Countries",
  },
  {
    icon: <Boxes size={42} />,
    number: "12+",
    title: "Future Products",
  },
  {
    icon: <Briefcase size={42} />,
    number: "25+",
    title: "Business Solutions",
  },
];

  return (
    <Reveal>
    <section className="bg-[#050816] px-6 pb-24">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item) => (
  <div
    key={item.title}
    className="rounded-3xl glass-card p-8 text-center"
  >

    <div className="flex justify-center text-cyan-400 mb-5">
      {item.icon}
    </div>

    <h3 className="text-5xl font-extrabold text-cyan-400">
      {item.number}
    </h3>

    <p className="mt-4 text-gray-400 text-lg">
      {item.title}
    </p>

  </div>
))}

        </div>

      </div>
    </section>
    </Reveal>
  );
}