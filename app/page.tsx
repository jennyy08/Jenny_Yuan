import Hero from "@/components/Hero";
import NowDone from "@/components/NowDone";
import Projects from "@/components/Projects";
import Interests from "@/components/Interests";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="max-w-content mx-auto px-6 sm:px-10">
      <Hero />
      <NowDone />
      <Projects />
      <Interests />
      <Footer />
    </main>
  );
}
