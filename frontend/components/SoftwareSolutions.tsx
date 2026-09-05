import Reveal from "./Reveal";

import {
  Globe,
  Smartphone,
  MonitorCog,
  Brain,
  Cloud,
  Wallet,
} from "lucide-react";

export default function SoftwareSolutions() {
  const services = [
  {
    icon: <Globe size={40} />,
    title: "Website Development",
    desc: "Modern, responsive and scalable websites for startups, businesses and enterprises.",
  },
  {
    icon: <Smartphone size={40} />,
    title: "Mobile Applications",
    desc: "High-performance Android and iOS applications with premium user experience.",
  },
  {
    icon: <MonitorCog size={40} />,
    title: "Custom Software",
    desc: "ERP, CRM and enterprise software tailored to business requirements.",
  },
  {
    icon: <Brain size={40} />,
    title: "AI Solutions",
    desc: "AI automation, chatbots, business intelligence and smart digital assistants.",
  },
  {
    icon: <Cloud size={40} />,
    title: "Cloud & SaaS",
    desc: "Cloud platforms and SaaS products designed for global businesses.",
  },
  {
    icon: <Wallet size={40} />,
    title: "Token Payment Gateway",
    desc: "Clients can pay using BOTEXIUM Token and receive exclusive service discounts.",
  },
];

  return (
    <Reveal>
    <section
      id="software"
      className="py-28 px-6 bg-[#050816] text-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
            Software Solutions
          </span>

          <h2 className="text-5xl font-extrabold mt-5">
            Building Digital Solutions
            <span className="text-cyan-400"> For The World</span>
          </h2>

          <p className="mt-8 text-lg text-gray-400 leading-8">
            BOTEXIUM delivers premium software, AI-powered systems and digital
            platforms while creating real utility for the BOTEXIUM Token economy.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl glass-card p-8 text-center"
            >
              <div className="text-cyan-400 mb-6">
               {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-cyan-400">
                {service.title}
              </h3>

              <p className="mt-5 text-gray-400 leading-7">
                {service.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
    </Reveal>
  );
}