"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HoverButton } from "@/components/ui/hover-glow-button";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-40 md:py-52">
      {/* soft radial glow behind text only */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(235,184,0,0.05),transparent)]" />

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
