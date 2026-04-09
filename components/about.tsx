"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function AnimatedCounter({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
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

  return <span className="tabular-nums">{count}{suffix}</span>;
}

const stats = [
  { value: 60, suffix: "+", label: "Members" },
  { value: 4, suffix: "", label: "Divisions" },
  { value: 100, suffix: "%", label: "Student-led" },
];

const connections = [
  { label: "Founders", pct: 85 },
  { label: "Investors", pct: 70 },
  { label: "Mentors", pct: 60 },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_SPRING_POP = [0.34, 1.56, 0.64, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

const bodyContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const bodyItemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(5px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

const statContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.5 } },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.85 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: EASE_SPRING_POP },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.8 },
  },
};

function BarRow({ label, pct, delay, inView }: { label: string; pct: number; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay }}
      className="space-y-1.5"
    >
      <div className="flex justify-between font-mono text-sm">
        <span className="text-foreground/70">{label}</span>
      </div>
      <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${pct}%` } : { width: "0%" }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + 0.15 }}
        />
      </div>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const panelRef = useRef<HTMLDivElement>(null);
  const panelInView = useInView(panelRef, { once: true, amount: 0.4 });

  return (
    <section id="about-us" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)",
          }}
        />
      </div>

      <div className="container relative" ref={sectionRef}>

        <motion.div
          className="flex flex-col gap-4 mb-10"
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
          <h2 className="font-libre-franklin text-[45px]">
            Who we are
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          <motion.div
            className="space-y-5 font-mono text-foreground/60 text-sm sm:text-base leading-relaxed"
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
              Through our activities, we bring Bocconi students into direct
              contact with founders, investors, and mentors, while building
              a team genuinely interested in how startups are built and
              funded.
            </motion.p>
            <motion.p variants={bodyItemVariants} className="text-foreground/80">
              Our 60 members are all driven by the ambition to break into
              VC, tech, and startups… so{" "}
              <span className="text-primary">stay tuned for what&apos;s coming next!</span>
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-6">

            <motion.div
              className="grid grid-cols-3 gap-4"
              variants={statContainerVariants}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={statCardVariants}
                  className="border border-primary/20 rounded-lg p-5 bg-primary/[0.03] text-center hover:border-primary/50 hover:bg-primary/[0.06] transition-colors duration-300"
                >
                  <div className="text-3xl md:text-4xl font-libre-franklin text-primary mb-1">
                    <AnimatedCounter target={s.value} suffix={s.suffix} inView={sectionInView} />
                  </div>
                  <div className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              ref={panelRef}
              variants={panelVariants}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="border border-white/10 rounded-xl p-6 bg-white/[0.02] space-y-4"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                Who we connect you with
              </p>
              {connections.map((item, i) => (
                <BarRow
                  key={item.label}
                  label={item.label}
                  pct={item.pct}
                  delay={0.95 + i * 0.12}
                  inView={sectionInView}
                />
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
