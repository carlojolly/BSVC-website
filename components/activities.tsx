"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Handshake, Megaphone, TrendingUp, PenLine, ArrowUpRight } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const divisions = [
  {
    index: "01",
    icon: Handshake,
    title: "Business Development",
    description:
      "Build partnerships with funds, startups, and accelerators to secure projects and sponsorships. Networking events, webinars, competitions, etc.",
    tag: "Partnerships & Growth",
  },
  {
    index: "02",
    icon: Megaphone,
    title: "Media",
    description:
      "Promote our events and grow our brand through our different social media channels and weekly newsletter. In charge of web development.",
    tag: "Brand & Community",
  },
  {
    index: "03",
    icon: TrendingUp,
    title: "Venture Capital",
    description:
      "Complete projects with key industry players to get real-life VC exposure. Includes advising early-stage startups, supporting VCs in concrete projects.",
    tag: "Industry Projects",
  },
  {
    index: "04",
    icon: PenLine,
    title: "Articles",
    description:
      "Write in-depth analysis on the state of VC, current trends and interesting developments.",
    tag: "Research & Writing",
  },
];

const TICKER_ITEMS = [
  "Business Development",
  "·",
  "Media",
  "·",
  "Venture Capital",
  "·",
  "Articles",
  "·",
  "Business Development",
  "·",
  "Media",
  "·",
  "Venture Capital",
  "·",
  "Articles",
  "·",
];

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

const subVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.15 },
  },
};

const tickerVariants = {
  hidden: { opacity: 0, scaleX: 0.95 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.3 },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.45 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export function Activities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="activities"
      className="relative overflow-hidden py-32 md:py-44"
    >
      {/* ── dot-grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      <div className="container relative" ref={sectionRef}>

        {/* ── header ── */}
        <div className="mb-10">
          <motion.div
            className="flex items-center gap-3 mb-5"
            variants={headingVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
              Activities
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              className="font-libre-franklin md:text-5xl lg:text-6xl text-[45px]"
              variants={headingVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              What we do
            </motion.h2>
          </div>
        </div>

        {/* ── ticker strip ── */}
        <motion.div
          className="relative mb-14 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.02] py-3"
          variants={tickerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div
            className="flex gap-8 whitespace-nowrap"
            style={{ animation: "ticker 18s linear infinite" }}
          >
            {TICKER_ITEMS.map((item, i) => (
              <span
                key={i}
                className={
                  item === "·"
                    ? "text-primary text-lg"
                    : "font-mono text-xs uppercase tracking-widest text-foreground/40"
                }
              >
                {item}
              </span>
            ))}
          </div>
          {/* fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </motion.div>

        {/* ── cards grid ── */}
        <motion.div
          className="grid sm:grid-cols-2 gap-4 md:gap-5"
          variants={cardContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <motion.div
                key={div.title}
                variants={cardVariants}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.025] overflow-hidden cursor-default
                  transition-all duration-500 ease-out
                  hover:border-primary/25 hover:bg-white/[0.05]
                  hover:-translate-y-1.5
                  hover:shadow-[0_20px_60px_-20px_rgba(235,184,0,0.2),0_0_0_1px_rgba(235,184,0,0.08)]"
              >
                {/* top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* inner radial glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_60%_50%_at_30%_0%,rgba(235,184,0,0.07),transparent)] pointer-events-none" />

                {/* giant faded index */}
                <span
                  className="absolute -right-2 -bottom-4 font-libre-franklin font-black text-[9rem] leading-none select-none pointer-events-none
                    text-white/[0.04] group-hover:text-primary/[0.07] transition-colors duration-500"
                  aria-hidden
                >
                  {div.index}
                </span>

                <div className="relative p-8">
                  {/* top row: icon + tag */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="relative">
                      {/* pulsing ring */}
                      <div className="absolute inset-0 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-[1.35] transition-all duration-700 pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center
                        group-hover:bg-primary/20 group-hover:border-primary/50
                        group-hover:shadow-[0_0_20px_rgba(235,184,0,0.2)]
                        transition-all duration-400">
                        <Icon size={20} className="text-primary transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60 border border-primary/20 rounded-full px-3 py-1 bg-primary/5">
                      {div.tag}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="font-libre-franklin text-2xl mb-3 leading-tight group-hover:text-white transition-colors duration-300">
                    {div.title}
                  </h3>

                  {/* description */}
                  <p className="font-mono text-sm text-foreground/45 leading-relaxed mb-8 group-hover:text-foreground/60 transition-colors duration-300">
                    {div.description}
                  </p>

                  {/* bottom row */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/25 tracking-widest">
                      {div.index} / 04
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center
                      group-hover:border-primary/40 group-hover:bg-primary/10
                      transition-all duration-300">
                      <ArrowUpRight size={14} className="text-foreground/30 group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* ticker keyframe */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
