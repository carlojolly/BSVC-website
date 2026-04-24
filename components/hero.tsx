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
        {/* Gradient fade: transparent → white over the bottom ~40% of the image */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Heading — pulled up into the lower portion of the photo */}
      <div className="relative -mt-[18vw] md:-mt-[16vw] flex flex-col items-center px-4 md:px-8">
        <h1
          className="font-libre-franklin uppercase whitespace-nowrap leading-none"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 11rem)",
            fontWeight: 900,
            textShadow: "0 2px 24px rgba(0,0,0,0.18)",
          }}
        >
          <span style={{ color: "#ffffff" }}>WE ARE </span>
          <span style={{ color: "rgba(255, 221, 14, 0.95)" }}>BSVC.</span>
        </h1>
        <p
          className="font-libre-franklin text-center mt-1 md:mt-2"
          style={{
            color: "#888994",
            fontSize: "clamp(0.75rem, 1.6vw, 1.5rem)",
            fontWeight: 200,
            textShadow: "0 1px 8px rgba(0,0,0,0.25)",
          }}
        >
          Bocconi Students for Venture Capital
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pt-8 pb-10 md:pb-14">
        <div className="animate-bounce flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3c3c3b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3c3c3b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-mt-2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
