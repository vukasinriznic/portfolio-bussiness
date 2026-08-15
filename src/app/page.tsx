import fs from "fs";
import path from "path";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";

export default function Home() {
  const photoPath = path.join(process.cwd(), "public/images/vukasin_hero.png");
  const photoSrc = fs.existsSync(photoPath) ? "/images/vukasin_hero.png" : null;

  return (
    <div className="relative flex flex-1 flex-col">
      <Header />
      <Hero photoSrc={photoSrc} />
      <Work />
      <Services />
      <About />
      <CTA />
    </div>
  );
}
