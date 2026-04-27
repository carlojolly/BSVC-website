'use client'

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Activities } from "@/components/activities";
import { PartnersMarquee } from "@/components/partners-marquee";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <PartnersMarquee />
      <CTA />
      <Footer />
    </>
  );
}
