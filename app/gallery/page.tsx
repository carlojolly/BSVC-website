"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { GalleryScroll } from "@/components/ui/gallery-scroll";
import { Footer } from "@/components/footer";

const images = Array.from({ length: 22 }, (_, i) => {
  const n = i + 1;
  return {
    src: `/Gallery/image_${n}.jpg`,
    alt: `BSVC moment ${n}`,
  };
});

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
      <div className="h-[10vh] md:h-[12vh]" />

      {/* ── zoom parallax intro ── */}
      <ZoomParallax images={[...images.slice(0, 7), images[21]]} />

      {/* ── full scroll-through gallery ── */}
      <GalleryScroll images={images} />

      <Footer />
    </main>
  );
}
