import Reveal from "./Reveal";

export default function CommunityActivities() {
  const activities = [
    {
      icon: "📱",
      title: "Follow Official Socials",
      description:
        "Follow BOTEXIUM official social media accounts and stay connected with the latest updates.",
      points: "10 Points",
      limit: "One Time",
    },
    {
      icon: "🔔",
      title: "Subscribe Official Channels",
      description:
        "Subscribe to official BOTEXIUM channels to receive announcements, news and ecosystem updates.",
      points: "10 Points",
      limit: "One Time",
    },
    {
      icon: "❤️",
      title: "Like & Engage",
      description:
        "Engage with approved BOTEXIUM posts and campaigns through meaningful interactions.",
      points: "2 Points",
      limit: "Limited",
    },
    {
      icon: "📢",
      title: "Share Campaigns",
      description:
        "Share approved BOTEXIUM campaigns and announcements with your network.",
      points: "5 Points",
      limit: "Campaign Based",
    },
    {
      icon: "🎓",
      title: "Complete Quizzes",
      description:
        "Complete educational quizzes and demonstrate your understanding of the BOTEXIUM ecosystem.",
      points: "20 Points",
      limit: "Per Quiz",
    },
    {
      icon: "💡",
      title: "Submit Useful Feedback",
      description:
        "Share valuable feedback, ideas and suggestions that can help improve the ecosystem.",
      points: "15 Points",
      limit: "Verified",
    },
    {
      icon: "🧪",
      title: "Beta Testing",
      description:
        "Help test new BOTEXIUM products, features and services before public release.",
      points: "40 Points",
      limit: "Per Task",
    },
    {
      icon: "🤝",
      title: "Approved Referral",
      description:
        "Invite genuine new community members through approved referral activities.",
      points: "50 Points",
      limit: "Verified",
    },
  ];

  return (
    <Reveal>
      <section
        id="community-activities"
        className="py-24 sm:py-28 px-5 sm:px-6 bg-[#050816] text-white"
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}

          <div className="text-center">
            <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
              Community Rewards
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mt-5">
              Earn Points Through{" "}
              <span className="hero-title">Participation</span>
            </h2>

            <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-8">
              Participate in approved community activities, contribute to
              the ecosystem and earn Community Points through meaningful
              engagement.
            </p>
          </div>

          {/* Activity Cards */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

            {activities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-3xl glass-card p-7 flex flex-col"
              >

                <div className="text-4xl">
                  {activity.icon}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {activity.title}
                </h3>

                <p className="text-gray-400 mt-3 text-sm leading-7 flex-1">
                  {activity.description}
                </p>

                <div className="mt-6 pt-5 border-t border-cyan-400/10 flex items-center justify-between gap-3">

                  <span className="text-cyan-400 font-bold text-sm">
                    {activity.points}
                  </span>

                  <span className="text-gray-500 text-xs">
                    {activity.limit}
                  </span>

                </div>

              </div>
            ))}

          </div>

          {/* Points System Explanation */}

          <div className="mt-16 rounded-3xl glass-card p-8 sm:p-10 text-center">

            <span className="text-cyan-400 uppercase tracking-[3px] text-sm font-semibold">
              How It Works
            </span>

            <h3 className="text-3xl sm:text-4xl font-black mt-4">
              Participate. Earn. Progress.
            </h3>

            <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-7">
              Community Points are awarded for approved and verified
              activities. Your participation can help you progress through
              community levels and become eligible for future recognition
              and rewards.
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mt-10">

              <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/10 p-6">
                <div className="text-cyan-400 text-3xl font-black">
                  01
                </div>

                <h4 className="font-bold text-lg mt-3">
                  Participate
                </h4>

                <p className="text-gray-400 text-sm mt-2 leading-6">
                  Complete approved community activities.
                </p>
              </div>

              <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/10 p-6">
                <div className="text-cyan-400 text-3xl font-black">
                  02
                </div>

                <h4 className="font-bold text-lg mt-3">
                  Earn Points
                </h4>

                <p className="text-gray-400 text-sm mt-2 leading-6">
                  Receive points after successful verification.
                </p>
              </div>

              <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/10 p-6">
                <div className="text-cyan-400 text-3xl font-black">
                  03
                </div>

                <h4 className="font-bold text-lg mt-3">
                  Progress
                </h4>

                <p className="text-gray-400 text-sm mt-2 leading-6">
                  Build your community profile and unlock recognition.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>
    </Reveal>
  );
}