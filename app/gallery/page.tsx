"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { GalleryScroll } from "@/components/ui/gallery-scroll";
import { Footer } from "@/components/footer";

const GALLERY_FILES: { n: number; ext: string }[] = [
  { n: 1, ext: "jpg" },
  { n: 2, ext: "jpg" },
  { n: 3, ext: "jpg" },
  { n: 4, ext: "jpg" },
  { n: 5, ext: "jpg" },
  { n: 6, ext: "jpg" },
  { n: 7, ext: "jpg" },
  { n: 8, ext: "jpg" },
  { n: 9, ext: "jpg" },
  { n: 10, ext: "jpg" },
  { n: 11, ext: "jpg" },
  { n: 12, ext: "jpg" },
  { n: 13, ext: "JPG" },
  { n: 14, ext: "JPG" },
  { n: 15, ext: "jpg" },
  { n: 16, ext: "jpg" },
  { n: 17, ext: "jpg" },
  { n: 18, ext: "jpg" },
  { n: 19, ext: "jpg" },
  { n: 20, ext: "jpg" },
  { n: 21, ext: "JPG" },
  { n: 22, ext: "jpg" },
];

const images = GALLERY_FILES.map(({ n, ext }) => ({
  src: `/gallery/image ${n}.${ext}`,
  alt: `BSVC moment ${n}`,
}));

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
