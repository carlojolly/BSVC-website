"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const board: Member[] = [
  {
    name: "Raphael Brault",
    role: "President",
    image: "/Board/raphael-brault.png",
    bio: "Raphael is an Economics and Finance (BIEF) student who joined BSVC as a Consulting Associate when he arrived at Bocconi in 2024. He loves collaborative ecosystems where people work in teams.",
  },
  {
    name: "Jeanne Bonamigo",
    role: "Vice President",
    image: "/Board/jeanne-bonamigo.png",
    bio: "Jeanne is a second-year BIEM student who started BSVC as a consulting associate. She has previous work experience in venture capital, with internships at funds including Teampact Ventures.",
  },
  {
    name: "Rebecca Pipia",
    role: "Head of Partnerships",
    image: "/Board/rebecca-pipia.png",
    bio: "Rebecca is a third-year BESS student who joined BSVC as a member of the events division. She has previous experience in fintech and AI-driven business evaluation, with a particular interest in the intersection of economics, technology, and strategy.",
  },
  {
    name: "Chloe Streichenberger",
    role: "Co-Head of Venture Capital",
    image: "/Board/chloe-streichenberger.png",
    bio: "Chloe is a second-year BIEM student who began BSVC as a consulting associate. She has previous experience working in AI and in tech-sector startups, and is familiar with working across both the U.S. and Europe.",
  },
  {
    name: "Tomas Garcia",
    role: "Co-Head of Venture Capital",
    image: "/Board/tomas-garcia.png",
    bio: "Tomas is a second-year BIEM student who began BSVC as a member of the Articles division. He has previous experience in structured finance and risk management in Peru, and is particularly interested in investment trends, emerging technologies, and the broader startup ecosystem.",
  },
  {
    name: "Sofia Cornu",
    role: "Co-Head of Communications",
    image: "/Board/sofia-cornu.png",
    bio: "Sofia is a third-year BIG student. She joined BSVC last year as a consulting associate, and was previously head of media at the French Society. She has also gained professional experience through an internship at a consulting firm.",
  },
  {
    name: "Lola Boren",
    role: "Co-Head of Communications",
    image: "/Board/lola-boren.png",
    bio: "Lola is a second-year BEMACS student. She joined BSVC as a Media Associate, contributing to the association's communication and visibility. She has a strong interest in the venture capital ecosystem and how marketing strategies can be leveraged to make it more accessible.",
  },
  {
    name: "Lucas Medina",
    role: "Co-Head of Business Development",
    image: "/Board/lucas-medina.png",
    bio: "Lucas is a BIEF student who started BSVC as a business development member. He has previous experience across finance, venture capital, and fintech through internships and projects.",
  },
  {
    name: "Victoria Zimmermann",
    role: "Co-Head of Business Development",
    image: "/Board/victoria-zimmermann.png",
    bio: "Victoria is a second-year BESS student who joined BSVC as a member of the business development division. She has a strong interest in VC ecosystems, especially in the Middle East, and previous experience in the trading and investment industry through internships.",
  },
];

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section
      id="the-team"
      className="relative pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden"
    >
      <div className="container relative" ref={sectionRef}>
        <div className="max-w-4xl mx-auto">
        {/* ── header ── */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <span className="h-px w-10 bg-primary" />
          <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
            The board
          </span>
        </motion.div>

        <motion.h2
          className="font-libre-franklin text-[40px] md:text-[58px] leading-[1.05] tracking-tight mb-12 md:mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 }}
        >
          Meet <span className="text-foreground/55">the team.</span>
        </motion.h2>

        {/* ── board grid ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
          }}
        >
          {board.map((m) => (
            <motion.article
              key={m.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                },
              }}
              className="group flex flex-col"
            >
              {/* photo with hover-revealed bio overlay */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-foreground/[0.04] border border-black/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={`${m.name}, ${m.role}`}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                {/* darkening layer */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500"
                />
                {/* bio (revealed on hover) */}
                <div
                  className="absolute inset-0 flex items-center
                    p-5 md:p-6
                    opacity-0 translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    pointer-events-none"
                >
                  <p className="font-inter text-[12px] md:text-[13px] leading-[1.65] text-white">
                    {m.bio}
                  </p>
                </div>
              </div>

              {/* name + role */}
              <h3 className="font-libre-franklin text-[18px] md:text-[20px] leading-tight mt-5">
                {m.name}
              </h3>
              <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-foreground/45 mt-2">
                {m.role}
              </p>
            </motion.article>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
