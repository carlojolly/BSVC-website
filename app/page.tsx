'use client'

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Activities } from "@/components/activities";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <Leva hidden />
    </>
  );
}
