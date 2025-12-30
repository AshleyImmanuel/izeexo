import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import ProcessSection from "@/components/ProcessSection";
import AboutSnippet from "@/components/AboutSnippet";
import ServicesBento from "@/components/ServicesBento";
import ServicesBento from "@/components/ServicesBento";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesBento />
      <FeaturedWorks />
      <ProcessSection />
      <AboutSnippet />
    </main>
  );
}
