import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import ProcessSection from "@/components/ProcessSection";
import AboutSnippet from "@/components/AboutSnippet";
import ServicesBento from "@/components/ServicesBento";
import ProblemSection from "@/components/ProblemSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesBento />
      <ProblemSection />
      <FeaturedWorks />
      <ProcessSection />
      <AboutSnippet />
    </main>
  );
}
