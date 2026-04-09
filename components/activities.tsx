"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Handshake, Megaphone, TrendingUp, PenLine } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const divisions = [
  {
    icon: Handshake,
    title: "Business Development",
    description:
      "Build partnerships with funds, startups, and accelerators to secure projects and sponsorships. Networking events, webinars, competitions, etc.",
  },
  {
    icon: Megaphone,
    title: "Media",
    description:
      "Promote our events and grow our brand through our different social media channels and weekly newsletter. In charge of web development.",
  },
  {
    icon: TrendingUp,
    title: "Venture Capital",
    description:
      "Complete projects with key industry players to get real-life VC exposure. Includes advising early-stage startups, supporting VCs in concrete projects.",
  },
  {
    icon: PenLine,
    title: "Articles",
    description:
      "Write in-depth analysis on the state of VC, current trends and interesting developments.",
  },
];

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export function Activities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="activities" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 -left-60 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl -translate-y-1/2" />
      </div>

      <div className="container relative" ref={sectionRef}>

        <motion.div
          className="flex flex-col gap-4 mb-16"
          variants={headingVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-primary text-sm uppercase tracking-widest">
              Activities
            </span>
          </div>
          <h2 className="font-libre-franklin text-3xl md:text-4xl">
            What we do
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-5"
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
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 overflow-hidden cursor-default
                  hover:border-primary/30 hover:bg-white/[0.05]
                  hover:shadow-[0_0_40px_-12px_rgba(235,184,0,0.25)]
                  transition-all duration-500 ease-out
                  hover:-translate-y-1 hover:scale-[1.01]"
              >
                {/* subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(235,184,0,0.06)_0%,transparent_60%)] pointer-events-none" />

                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6
                    group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110
                    transition-all duration-300">
                    <Icon size={20} className="text-primary" />
                  </div>

                  <h3 className="font-libre-franklin text-xl mb-3 group-hover:text-white transition-colors duration-300">
                    {div.title}
                  </h3>
                  <p className="font-mono text-sm text-foreground/50 leading-relaxed group-hover:text-foreground/65 transition-colors duration-300">
                    {div.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
