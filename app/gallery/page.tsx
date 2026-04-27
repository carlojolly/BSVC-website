"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { Footer } from "@/components/footer";

const images = [
  { src: "/gallery/20250905_BSVCBoard_DSC_2113.jpg", alt: "BSVC board portrait" },
  { src: "/gallery/IMG_1910.jpeg", alt: "BSVC event" },
  { src: "/gallery/20250905_BSVCBoard_DSC_2200.jpg", alt: "BSVC board portrait" },
  { src: "/gallery/IMG_1922.jpeg", alt: "BSVC event" },
  { src: "/gallery/IMG_6888.jpeg", alt: "BSVC event" },
  { src: "/gallery/IMG_4374.JPG", alt: "BSVC event" },
  { src: "/gallery/adobe-express.jpg", alt: "BSVC event" },
];

export default function GalleryPage() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen w-full">
      {/* ── intro / hero ── */}
      <section className="relative flex h-[42vh] md:h-[48vh] items-end justify-center pb-10 md:pb-14">
        <div className="container relative flex flex-col items-center text-center">
          <h1 className="font-libre-franklin text-[42px] md:text-[80px] leading-[0.95] tracking-tight max-w-4xl">
            Moments
            <span className="text-primary">.</span>
          </h1>
          <p className="font-inter text-[15px] md:text-[17px] text-foreground/60 leading-[1.7] max-w-xl mt-6">
            A look back at our events, masterclasses, and gatherings — the
            people and moments that make up the BSVC ecosystem.
          </p>
        </div>
      </section>

      {/* ── zoom parallax ── */}
      <ZoomParallax images={images} />

      {/* breathing room before footer */}
      <div className="h-[30vh]" />

      <Footer />
    </main>
  );
}
