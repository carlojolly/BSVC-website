'use client'

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Leva hidden />
    </>
  );
}
