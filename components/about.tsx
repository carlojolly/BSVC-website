"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Rocket, Lightbulb, TrendingUp } from "lucide-react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const pillars = [
  {
    icon: Users,
    title: "Community First",
    text: "60 driven members united by ambition to break into VC, tech, and startups.",
  },
  {
    icon: Rocket,
    title: "Startup Ecosystem",
    text: "Direct contact with founders building the next generation of companies.",
  },
  {
    icon: TrendingUp,
    title: "VC Access",
    text: "Relationships with investors and mentors who shape the funding landscape.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Understanding how startups are built, funded, and scaled from day one.",
  },
];

const stats = [
  { value: 60, suffix: "+", label: "Members" },
  { value: 3, suffix: "", label: "Pillars" },
  { value: 100, suffix: "%", label: "Student-led" },
];

export function About() {
  const { ref: sectionRef, inView: sectionInView } = useInView(0.1);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.15);

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

      <div className="container relative">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ease-out ${
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-10 bg-primary" />
            <h2 className="font-libre-franklin text-3xl md:text-4xl">
              Who we are
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <div className="space-y-5 font-mono text-foreground/60 text-sm sm:text-base leading-relaxed">
                <p>
                  Bocconi Students for Venture Capital is a student association
                  focused on venture capital, startups, and innovation. We aim
                  to create a community where connections form and students get
                  closer to the VC ecosystem.
                </p>
                <p>
                  Through our activities, we bring Bocconi students into direct
                  contact with founders, investors, and mentors, while building
                  a team genuinely interested in how startups are built and
                  funded.
                </p>
                <p className="text-foreground/80">
                  Our 60 members are all driven by the ambition to break into
                  VC, tech, and startups… so{" "}
                  <span className="text-primary">stay tuned for what&apos;s coming next!</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="border border-primary/20 rounded-lg p-5 bg-primary/[0.03] text-center hover:border-primary/50 hover:bg-primary/[0.06] transition-all duration-300"
                  >
                    <div className="text-3xl md:text-4xl font-libre-franklin text-primary mb-1">
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02] space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                  Who we connect you with
                </p>
                {[
                  { label: "Founders", pct: 85 },
                  { label: "Investors", pct: 70 },
                  { label: "Mentors", pct: 60 },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-foreground/70">{item.label}</span>
                    </div>
                    <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
                      <div
                        className={`h-full bg-primary transition-all duration-1000 delay-300 ease-out ${
                          sectionInView ? "" : "w-0"
                        }`}
                        style={{ width: sectionInView ? `${item.pct}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={pillarsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20"
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`group border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-500 cursor-default ${
                  pillarsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: pillarsInView ? `${i * 100}ms` : "0ms" }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-libre-franklin text-lg mb-2">{p.title}</h3>
                <p className="font-mono text-xs text-foreground/50 leading-relaxed">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
