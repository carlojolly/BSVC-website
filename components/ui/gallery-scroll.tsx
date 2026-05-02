"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Image {
  src: string;
  alt?: string;
}

interface GalleryScrollProps {
  images: Image[];
}

export function GalleryScroll({ images }: GalleryScrollProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 1, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [24, 0]);

  return (
    <div ref={container} className="relative bg-background">
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="container py-20 md:py-28"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
              The full collection
            </span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="font-libre-franklin text-[32px] md:text-[44px] leading-[1.05] tracking-tight">
            Take a closer look
            <span className="text-foreground/55">.</span>
          </h2>
          <p className="font-inter text-[14px] md:text-[16px] text-foreground/60 leading-[1.7] mt-5">
            Keep scrolling to see each moment up close.
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-16 md:gap-24 pb-24 md:pb-32">
        {images.map(({ src, alt }, i) => (
          <GalleryItem key={i} src={src} alt={alt} index={i} />
        ))}
      </div>
    </div>
  );
}

function GalleryItem({
  src,
  alt,
  index,
}: {
  src: string;
  alt?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.4, 1, 1, 0.4],
  );

  return (
    <motion.figure
      ref={ref}
      style={{ scale, opacity }}
      className="relative mx-auto w-[92vw] md:w-[80vw] max-w-[1400px] aspect-[16/10] overflow-hidden rounded-md bg-foreground/[0.04] border border-black/[0.06]"
    >
      <motion.img
        src={src}
        alt={alt ?? `Gallery image ${index + 1}`}
        style={{ y }}
        className="absolute inset-0 h-[112%] w-full object-cover -top-[6%]"
        loading="lazy"
        draggable={false}
      />
    </motion.figure>
  );
}
