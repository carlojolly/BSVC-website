"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function getApplicationStatus(): { open: boolean; label: string } {
  const now = new Date();
  const month = now.getMonth() + 1;
  const open = month === 2 || month === 9;
  return {
    open,
    label: "Applications open in February and September",
  };
}

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { open: applicationsOpen, label: statusLabel } = getApplicationStatus();

  return (
    <section className="relative py-32 md:py-44">
      <div
        className="container relative"
        ref={ref}
        style={{ maxWidth: "960px" }}
      >
        <motion.div
          className="relative rounded-2xl border border-foreground/[0.09] bg-white/70 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          {/* gold corner accents — subtle architectural framing */}
          <div className="absolute top-0 left-0 w-10 h-px bg-primary" aria-hidden />
          <div className="absolute top-0 left-0 h-10 w-px bg-primary" aria-hidden />
          <div className="absolute top-0 right-0 w-10 h-px bg-primary" aria-hidden />
          <div className="absolute top-0 right-0 h-10 w-px bg-primary" aria-hidden />
          <div className="absolute bottom-0 left-0 w-10 h-px bg-primary" aria-hidden />
          <div className="absolute bottom-0 left-0 h-10 w-px bg-primary" aria-hidden />
          <div className="absolute bottom-0 right-0 w-10 h-px bg-primary" aria-hidden />
          <div className="absolute bottom-0 right-0 h-10 w-px bg-primary" aria-hidden />

          <div className="px-7 md:px-14 py-14 md:py-20">
            {/* status row */}
            <motion.div
              className="flex items-center justify-between mb-12 md:mb-16"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 }}
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  {applicationsOpen && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                  )}
                  <span className={`relative rounded-full h-2 w-2 ${applicationsOpen ? "bg-primary" : "bg-foreground/30"}`} />
                </span>
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-foreground/75">
                  {statusLabel}
                </span>
              </div>
            </motion.div>

            {/* heading */}
            <motion.h2
              className="font-libre-franklin text-[42px] md:text-[68px] leading-[0.95] tracking-tight mb-7"
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.25 }}
            >
              Apply to BSVC
            </motion.h2>

            {/* sub */}
            <motion.p
              className="font-inter text-[15px] md:text-[17px] text-foreground/65 leading-[1.7] max-w-xl mb-10 md:mb-12"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 }}
            >
              Membership is by application only. Each semester we welcome a
              small, selective group of Bocconi students into our community.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap items-center gap-x-8 gap-y-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.6 }}
            >
              <a
                href="#"
                className="group relative inline-flex items-center gap-2.5
                  font-mono text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em]
                  px-7 py-4 rounded-full bg-foreground text-white
                  hover:bg-primary hover:text-foreground
                  transition-all duration-400
                  shadow-[0_8px_28px_-14px_rgba(0,0,0,0.45)]
                  hover:shadow-[0_14px_36px_-14px_rgba(235,184,0,0.55)]"
              >
                Begin application
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
