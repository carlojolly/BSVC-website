"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Handshake,
  Lightbulb,
  GraduationCap,
  Mic,
  Users,
  FileText,
  ArrowUpRight,
  Plus,
  type LucideIcon,
} from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type Link = { label: string; href: string };

type Activity = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string;
  links?: Link[];
};

// NOTE: replace the placeholder hrefs ("#") below with real Spotify / Medium /
// LinkedIn URLs when ready.
const activities: Activity[] = [
  {
    icon: Handshake,
    title: "Collaborations with VC Funds",
    tagline:
      "Working alongside Seed to Series A funds on deal flow, joint events, and daily operations.",
    body: "We work closely with venture capital funds on initiatives ranging from deal flow exposure to joint events and daily operations. These partnerships allow members to interact directly with professionals in the industry and better understand how funds operate from the inside. We are currently working with a range of Seed to Series A investment funds, with many of these collaborations turning into concrete opportunities such as internships and off-cycle roles for our members.",
  },
  {
    icon: Lightbulb,
    title: "Startup Consulting",
    tagline:
      "Hands-on projects with founders — market research, growth strategy, fundraising prep.",
    body: "Our members engage in hands-on projects with startups, helping them tackle real challenges such as market research, growth strategy, or fundraising preparation. It is a way to apply what we learn, while creating tangible value for early-stage companies. So far, we have worked with over 20 startups, engaging deeply with the founding teams to offer the best possible guidance.",
  },
  {
    icon: GraduationCap,
    title: "Masterclasses",
    tagline:
      "Targeted sessions with industry professionals on the fundamentals of VC.",
    body: "We organize targeted sessions with industry professionals to break down key topics in venture capital and startups. From sourcing and evaluating deals to understanding term sheets or scaling a company, these masterclasses are designed to give the theoretical part of VC to our members. A dozen sessions were held last semester, with many more coming up.",
  },
  {
    icon: Mic,
    title: "Podcasts with Founders & VC Experts",
    tagline:
      "Real conversations with the people building and funding the ecosystem.",
    body: "We host conversations with founders, investors, and inspiring individuals to go beyond theory and understand how things actually work in practice. These podcasts give direct access to real stories, lessons learned, and honest insights from people building and investing in the ecosystem.",
    links: [{ label: "Listen on Spotify", href: "#" }],
  },
  {
    icon: Users,
    title: "Networking & Exposure Events",
    tagline:
      "Aperitifs, dinners, and gatherings that bring our community together.",
    body: "We organise aperitifs, dinners, and other social events designed to bring people together. These gatherings can be internal, strengthening the bonds within our team, or external, providing opportunities to connect with venture capital professionals and other industry experts.",
  },
  {
    icon: FileText,
    title: "Articles",
    tagline:
      "Accessible writing on venture capital, startups, and emerging trends in tech.",
    body: "We regularly publish accessible articles covering venture capital, startups, and emerging trends in tech. Beyond sharing knowledge, this is a way for members to build strong opinions and contribute to the broader conversation around innovation.",
    links: [
      { label: "Read on Medium", href: "#" },
      { label: "Follow on LinkedIn", href: "#" },
    ],
  },
];

export function Activities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="activities"
      className="relative overflow-hidden pt-32 md:pt-44 pb-16 md:pb-20"
    >
      {/* ── ambient backdrop ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      <div className="container relative max-w-5xl" ref={sectionRef}>
        {/* ── header ── */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <span className="h-px w-10 bg-primary" />
          <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
            Activities
          </span>
        </motion.div>

        <motion.h2
          className="font-libre-franklin text-[40px] md:text-[58px] leading-[1.05] tracking-tight mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 }}
        >
          Value created
          <br />
          <span className="text-foreground/55">across our network.</span>
        </motion.h2>

        <motion.p
          className="font-inter text-foreground/60 text-[16px] md:text-[17px] leading-[1.7] max-w-2xl mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.18 }}
        >
          BSVC is not a stack of separate divisions. It is one connected
          community with open collaboration across practices. We work
          across projects, sharing insight and supporting each other. Each
          activity strengthens the next, building a stronger network over
          time.
          <span className="text-foreground/35"> Click any practice to learn more.</span>
        </motion.p>

        {/* ── connected list ── */}
        <div className="relative">
          {/* the spine that visually ties everything together */}
          <div
            className="absolute left-6 md:left-9 top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-foreground/15 to-foreground/[0.04] pointer-events-none"
            aria-hidden
          />

          <ul className="relative">
            {activities.map((a, i) => {
              const isOpen = open === i;
              const Icon = a.icon;
              return (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    ease: EASE_OUT_EXPO,
                    delay: 0.32 + i * 0.07,
                  }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`activity-panel-${i}`}
                    className={`group w-full text-left flex items-start gap-4 md:gap-6 py-7 md:py-8 border-b border-black/[0.07] transition-colors duration-300 ${
                      isOpen ? "" : "hover:bg-primary/[0.025]"
                    }`}
                  >
                    {/* node on the spine */}
                    <span className="relative shrink-0 z-10">
                      <span
                        className={`flex items-center justify-center w-12 md:w-[72px] h-12 md:h-[72px] rounded-full border transition-all duration-400 ${
                          isOpen
                            ? "border-primary bg-primary/10 shadow-[0_0_0_6px_rgba(235,184,0,0.06),0_8px_24px_-12px_rgba(235,184,0,0.4)]"
                            : "border-black/10 bg-white group-hover:border-primary/40 group-hover:bg-primary/[0.04]"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={`transition-colors duration-300 ${
                            isOpen
                              ? "text-primary"
                              : "text-foreground/45 group-hover:text-primary"
                          }`}
                        />
                      </span>
                    </span>

                    {/* content */}
                    <div className="flex-1 min-w-0 pt-1.5 md:pt-3">
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="font-mono text-[10px] tracking-[0.25em] text-foreground/30">
                          {String(i + 1).padStart(2, "0")} / 06
                        </span>
                      </div>
                      <h3
                        className={`font-libre-franklin text-xl md:text-[26px] leading-tight transition-colors duration-300 ${
                          isOpen
                            ? "text-foreground"
                            : "text-foreground/85 group-hover:text-foreground"
                        }`}
                      >
                        {a.title}
                      </h3>
                      <p className="font-inter text-[14px] md:text-[15px] text-foreground/55 mt-2 max-w-2xl leading-[1.6]">
                        {a.tagline}
                      </p>

                      <div
                        id={`activity-panel-${i}`}
                        aria-hidden={!isOpen}
                        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                          opacity: isOpen ? 1 : 0,
                          overflowAnchor: "none",
                        }}
                      >
                        <div className="overflow-hidden min-h-0">
                          <div className="pt-5 md:pt-6 max-w-3xl">
                            <p className="font-inter text-[15px] md:text-[16px] text-foreground/70 leading-[1.7]">
                              {a.body}
                            </p>
                            {a.links && a.links.length > 0 && (
                              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
                                {a.links.map((l) => (
                                  <a
                                    key={l.label}
                                    href={l.href}
                                    tabIndex={isOpen ? 0 : -1}
                                    className="group/link inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-primary hover:text-foreground transition-colors border-b border-primary/40 hover:border-foreground/60 pb-1"
                                  >
                                    {l.label}
                                    <ArrowUpRight
                                      size={14}
                                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                    />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* toggle indicator */}
                    <span
                      className={`shrink-0 mt-2 md:mt-4 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-primary text-primary bg-primary/[0.06]"
                          : "border-black/[0.1] text-foreground/45 group-hover:border-primary/40 group-hover:text-primary"
                      }`}
                      aria-hidden
                    >
                      <Plus
                        size={16}
                        className={`transition-transform duration-400 ease-out ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
