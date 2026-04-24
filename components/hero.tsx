"use client";

import { Pill } from "./pill";
import { AuroraBackground } from "./ui/aurora-background";

export function Hero() {
  return (
    <AuroraBackground className="h-svh">
      <div className="flex-1 flex flex-col items-center justify-center pb-16 text-center relative w-full">
        <Pill className="mb-6">Applications Open</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-libre-franklin" style={{ fontWeight: 700 }}>
          Bocconi Students for <br />
          <i className="font-libre-franklin" style={{ color: 'rgba(255, 221, 14, 0.95)' }}>Venture Capital</i>
        </h1>
        <p className="font-mono text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto" style={{ fontSize: '18px', lineHeight: '1.25' }}>
          Creating a VC and startup ecosystem for Bocconi
        </p>
      </div>
    </AuroraBackground>
  );
}
