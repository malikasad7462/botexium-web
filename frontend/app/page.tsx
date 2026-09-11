import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroStats from "@/components/HeroStats";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import Vision from "@/components/Vision";
import Mission from "@/components/Mission";
import Ecosystem from "@/components/Ecosystem";
import SoftwareSolutions from "@/components/SoftwareSolutions";
import TradingBots from "@/components/TradingBots";
import AISection from "@/components/AISection";
import Marketplace from "@/components/Marketplace";
import WhyChoose from "@/components/WhyChoose";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import TokenLaunchSection from "@/components/dashboard/TokenLaunchSection";
import Community from "@/components/Community";
import CommunityActivities from "@/components/CommunityActivities";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      {/* <HeroStats /> */}
      <About />
      {/* <Leadership /> */}
      <Vision />
      <Mission />
      <Ecosystem />
      <SoftwareSolutions />
      <TradingBots />
      <AISection />
      <Marketplace />
      <WhyChoose />
      <HowItWorks />
      <Roadmap />
      <TokenLaunchSection />
      <Community />
      <CommunityActivities />
      <FAQ />
      <FinalCTA />
      <Footer />
      <BackToTop />
      
    </>
  );
}