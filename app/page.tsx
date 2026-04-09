'use client'

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Activities } from "@/components/activities";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <CTA />
      <Footer />
      <Leva hidden />
    </>
  );
}
