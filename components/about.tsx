"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function AnimatedCounter({
  target,
  suffix = "",
  inView,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 60, suffix: "+", label: "Members" },
  { value: 30, suffix: "+", label: "Masterclasses" },
  { value: 5, suffix: "+", label: "Partnering funds" },
];

const ecosystem = [
  "VC funds (Pre-seed → Series A)",
  "Founders & startups",
  "Industry mentors",
  "Bocconi students",
  "University societies worldwide",
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_SPRING_POP = [0.34, 1.56, 0.64, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

const bodyContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const bodyItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

const statContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.45 } },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_SPRING_POP },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.7 },
  },
};

const tagVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.85 } },
};

const tagItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about-us" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-3xl" />
      </div>

      <div className="container relative" ref={sectionRef}>
        <motion.div
          className="flex flex-col gap-4 mb-12 md:mb-16"
          variants={headingVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
              About us
            </span>
          </div>
          <h2 className="font-libre-franklin text-[40px] md:text-[58px] leading-[1.05] tracking-tight max-w-3xl">
            Building the future
            <br />
            <span className="text-foreground/55">of VC together.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* ── intro copy ── */}
          <motion.div
            className="md:col-span-7 space-y-5 font-inter text-foreground/70 text-[16px] md:text-[17px] leading-[1.7]"
            variants={bodyContainerVariants}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
          >
            <motion.p variants={bodyItemVariants}>
              Bocconi Students for Venture Capital is a student association
              focused on venture capital, startups, and innovation. We aim
              to create a community where connections form and students get
              closer to the VC ecosystem.
            </motion.p>
            <motion.p variants={bodyItemVariants}>
              This association exists because each of its members has
              recognised that the strong theoretical knowledge acquired at
              Bocconi University is not enough on its own. It must be
              complemented by real-world, practical experience.
            </motion.p>
            <motion.p variants={bodyItemVariants}>
              Through our activities, we bring Bocconi students into direct
              contact with founders, investors, and mentors, while building
              a team genuinely interested in how startups are built and
              funded. Our 60 members are all driven by the ambition to
              break into VC, tech, and startups… so{" "}
              <span className="text-primary">stay tuned for what&apos;s coming next!</span>
            </motion.p>
          </motion.div>

          {/* ── right column: ecosystem snapshot ── */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <motion.div
              className="grid grid-cols-3 gap-3 md:gap-4"
              variants={statContainerVariants}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={statCardVariants}
                  className="border border-primary/20 rounded-lg p-4 md:p-5 bg-primary/[0.03] text-center hover:border-primary/50 hover:bg-primary/[0.06] transition-colors duration-300"
                >
                  <div className="text-3xl md:text-4xl font-libre-franklin text-primary mb-1 leading-none">
                    <AnimatedCounter
                      target={s.value}
                      suffix={s.suffix}
                      inView={sectionInView}
                    />
                  </div>
                  <div className="font-mono text-[10px] md:text-xs text-foreground/55 uppercase tracking-wider mt-2 leading-snug">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="border border-black/[0.08] rounded-xl p-5 md:p-6 bg-black/[0.02]"
            >
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-foreground/40 mb-4">
                We work with
              </p>
              <motion.ul
                className="flex flex-wrap gap-2"
                variants={tagVariants}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
              >
                {ecosystem.map((label) => (
                  <motion.li
                    key={label}
                    variants={tagItemVariants}
                    className="font-mono text-xs text-foreground/70 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/60 backdrop-blur-sm"
                  >
                    {label}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
