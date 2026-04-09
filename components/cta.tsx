"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HoverButton } from "@/components/ui/hover-glow-button";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden py-40 md:py-52">
      {/* background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* radial glow behind content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(235,184,0,0.07),transparent)]" />
        {/* outer ambient blobs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px]" />
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* vignette to fade dot grid at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,black_100%)]" />
      </div>

      <div className="container relative flex flex-col items-center text-center" ref={ref}>
        {/* label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <span className="h-px w-10 bg-primary" />
          <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
            Get involved
          </span>
          <span className="h-px w-10 bg-primary" />
        </motion.div>

        {/* heading */}
        <motion.h2
          className="font-libre-franklin text-[45px] md:text-6xl lg:text-7xl leading-none mb-6"
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.1 }}
        >
          Join us today!
        </motion.h2>

        {/* supporting text */}
        <motion.p
          className="font-mono text-base text-foreground/50 mb-12 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.22 }}
        >
          Launch your VC career
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.35 }}
        >
          <HoverButton
            glowColor="#EBB800"
            backgroundColor="#000000"
            textColor="#ffffff"
            hoverTextColor="#EBB800"
            className="font-mono text-sm font-semibold uppercase tracking-widest
              px-10 py-4 rounded-full
              border border-primary/60
              hover:border-primary hover:shadow-[0_0_30px_rgba(235,184,0,0.25)]"
          >
            Apply now!
          </HoverButton>
        </motion.div>
      </div>
    </section>
  );
}
