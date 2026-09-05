import Reveal from "./Reveal";

export default function Community() {
  return (
    <Reveal>
    <section
      id="community"
      className="py-28 px-6 bg-[#050816] text-white"
    >
      <div className="max-w-6xl mx-auto text-center">

        <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
          Join Our Community
        </span>

        <h2 className="text-5xl md:text-6xl font-extrabold mt-5">
          Build The Future With BOTEXIUM
        </h2>

        <p className="text-gray-400 mt-8 max-w-3xl mx-auto text-lg leading-8">
          BOTEXIUM is more than a platform. It is a growing global community of
          developers, entrepreneurs, students, businesses and innovators
          working together to build the next generation digital economy.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-20">

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-4xl font-bold text-cyan-400">🌍</h3>
            <h4 className="text-xl font-bold mt-4">Global Community</h4>
            <p className="text-gray-400 mt-3">
              Members from around the world.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-4xl font-bold text-cyan-400">💼</h3>
            <h4 className="text-xl font-bold mt-4">Business Network</h4>
            <p className="text-gray-400 mt-3">
              Connect businesses and professionals.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-4xl font-bold text-cyan-400">🤝</h3>
            <h4 className="text-xl font-bold mt-4">Partnerships</h4>
            <p className="text-gray-400 mt-3">
              Collaborate with innovators worldwide.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-8 text-center">
            <h3 className="text-4xl font-bold text-cyan-400">🚀</h3>
            <h4 className="text-xl font-bold mt-4">Grow Together</h4>
            <p className="text-gray-400 mt-3">
              Learn, build and grow inside BOTEXIUM.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-20">

         <div className="rounded-3xl glass-card p-7 text-center">
          <h3 className="text-3xl">🎓</h3>
          <h4 className="text-lg font-bold mt-4">Learn & Quiz</h4>
          <p className="text-gray-400 mt-3 text-sm leading-6">
            Complete educational quizzes and ecosystem learning activities.
          </p>
         </div>

         <div className="rounded-3xl glass-card p-7 text-center">
          <h3 className="text-3xl">💡</h3>
          <h4 className="text-lg font-bold mt-4">Share Ideas</h4>
          <p className="text-gray-400 mt-3 text-sm leading-6">
           Share useful ideas, feedback and suggestions with the community.
          </p>
         </div>

         <div className="rounded-3xl glass-card p-7 text-center">
          <h3 className="text-3xl">🚀</h3>
          <h4 className="text-lg font-bold mt-4">Community Tasks</h4>
          <p className="text-gray-400 mt-3 text-sm leading-6">
            Participate in campaigns, events, testing and contribution tasks.
          </p>
         </div>

         <div className="rounded-3xl glass-card p-7 text-center">
          <h3 className="text-3xl">🏆</h3>
          <h4 className="text-lg font-bold mt-4">Earn Points</h4>
          <p className="text-gray-400 mt-3 text-sm leading-6">
           Build your community score through meaningful participation.
          </p>
         </div>

        </div>

        <div className="mt-20 max-w-4xl mx-auto rounded-3xl glass-card p-8 sm:p-10">

         <span className="text-cyan-400 uppercase tracking-[3px] text-sm font-semibold">
               Community Rewards
         </span>

         <h3 className="text-3xl sm:text-4xl font-black mt-4">
             Participate. Earn Points. Get Recognized.
         </h3>

         <p className="text-gray-400 mt-5 leading-7">
            Community members can earn points by completing approved activities,
            contributing ideas, learning, helping others and participating in
            ecosystem initiatives.
         </p>

        <div className="grid sm:grid-cols-3 gap-5 mt-8">

         <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/10 p-5">
          <div className="text-cyan-400 text-2xl font-black">01</div>
          <h4 className="font-bold mt-2">Participate</h4>
          <p className="text-gray-400 text-sm mt-2">
           Complete community activities.
          </p>
         </div>

         <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/10 p-5">
          <div className="text-cyan-400 text-2xl font-black">02</div>
          <h4 className="font-bold mt-2">Earn Points</h4>
          <p className="text-gray-400 text-sm mt-2">
          Receive points for verified contributions.
          </p>
         </div>

         <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/10 p-5">
          <div className="text-cyan-400 text-2xl font-black">03</div>
          <h4 className="font-bold mt-2">Get Recognized</h4>
          <p className="text-gray-400 text-sm mt-2">
           Progress through community levels and rewards.
          </p>
         </div>

        </div>

       </div>

        <div className="mt-16">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-full transition">
            Join BOTEXIUM Community
          </button>
        </div>

      </div>
    </section>
    </Reveal>
  );
}