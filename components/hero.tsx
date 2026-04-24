"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full">
      {/* Full-width team photo, sitting beneath the aurora layer */}
      <div className="relative w-full -z-20">
        <Image
          src="/bsvc-team.jpg"
          alt="Bocconi Students for Venture Capital team"
          width={6000}
          height={2821}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
      </div>

      {/* Heading overlapping the bottom of the photo */}
      <div className="relative -mt-[4vw] md:-mt-[3.5vw] flex justify-center px-2 md:px-4">
        <h1
          className="font-libre-franklin whitespace-nowrap flex items-center gap-2 md:gap-3 text-[clamp(0.875rem,3.8vw,4rem)] leading-none"
          style={{ fontWeight: 700 }}
        >
          <span>Bocconi Students for</span>
          <span
            className="bg-zinc-200/75 backdrop-blur-sm px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full uppercase tracking-tight"
            style={{ color: "rgba(255, 221, 14, 0.95)", fontWeight: 800 }}
          >
            Venture Capital
          </span>
        </h1>
      </div>

      {/* Breathing room before the next section */}
      <div className="h-20 md:h-32" />
    </section>
  );
}
