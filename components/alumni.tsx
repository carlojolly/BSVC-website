"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type Alumnus = {
  name: string;
  role: string;
  formerRole: string;
  bio: string;
  image: string;
  linkedin: string;
};

const alumni: Alumnus[] = [
  {
    name: "Giovanni Calabrese",
    role: "VC @ Sella",
    formerRole: "Co-founder & Former President",
    bio: "Giovanni started his VC career in Berlin at Redstone and has now returned to Italy to be a VC at Sella",
    image: "/Alumni/Giovanni Calabrese.jpeg",
    linkedin: "https://www.linkedin.com/in/gio-calabrese/",
  },
  {
    name: "Bianca Ambrosini",
    role: "Investor @ Best Nights VC",
    formerRole: "Co-founder & Former Head of Communications",
    bio: "Bianca started her career in VC doing Investor Relations at Partech. She went on to work at B4i and is now in Berlin working at Best Nights, Jägermeister's VC",
    image: "/Alumni/Bianca Ambrosini.jpeg",
    linkedin: "https://www.linkedin.com/in/bianca-ambrosini/",
  },
  {
    name: "Daria Pelini",
    role: "Ventures Associate @ Plug and Play",
    formerRole: "Co-founder & Former Head of Partnerships",
    bio: "Daria started her career as an Operations Intern at Angels4Impact, she then went on to work at Impact Hub Milano before settling into Plug and Play in Valencia",
    image: "/Alumni/Daria Pelini.jpg",
    linkedin: "https://www.linkedin.com/in/daria-pelini-81930017a/",
  },
  {
    name: "Matteo Ferravante",
    role: "Founder in Residence @ Vento",
    formerRole: "Co-founder & Former Vice President",
    bio: "Matteo started his startup career at Joinrs but he didn't stop there. He has worked at PayPal, Macai, and HelloFresh. With a background in Product Management he is now a founder at Vento's Venture Builder",
    image: "/Alumni/Matteo Ferravante.jpeg",
    linkedin: "https://www.linkedin.com/in/matteo-luigi-ferravante/",
  },
  {
    name: "Nazli Okuducu",
    role: "Innovation Analyst @ Deloitte",
    formerRole: "Former Head of Communications",
    bio: "Nazli started her VC career at Workup, one of Turkey's most active accelerators. She then worked at StartersHub, APX, and Deloitte Garage in Berlin. She now works at Deloitte Officine Innovazione as an analyst",
    image: "/Alumni/Nazli Okuducu.jpeg",
    linkedin: "https://www.linkedin.com/in/nazliokuducu/",
  },
  {
    name: "Luca Schettino",
    role: "Investor Relations @ PoliHub",
    formerRole: "Co-founder & Former member",
    bio: "Luca started his venture career at Plug and Play. Afterwards, he did Venture Building at PoliHub and now does Investor Relations at PoliHub",
    image: "/Alumni/Luca Schettino.jpeg",
    linkedin: "https://www.linkedin.com/in/luca-schettino/",
  },
];

export function Alumni() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section
      id="alumni"
      className="relative pt-8 md:pt-12 pb-24 md:pb-32 overflow-hidden"
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
              Alumni
            </span>
          </motion.div>

          <motion.h2
            className="font-libre-franklin text-[32px] md:text-[44px] leading-[1.05] tracking-tight mb-5"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 }}
          >
            Our Alumni Network
          </motion.h2>

          <motion.p
            className="font-inter text-[15px] md:text-[16px] leading-[1.6] text-foreground/65 max-w-3xl mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
          >
            We also want to highlight the strength of our network: BSVC has
            built an alumni community of over 200 members who have gone on to
            work across venture capital, tech, startups, and finance. The
            profiles featured here are just a small selection of former members,
            giving a glimpse into the paths and opportunities that come out of
            the association.
          </motion.p>

          {/* ── alumni list ── */}
          <motion.div
            className="flex flex-col divide-y divide-black/[0.08]"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.2 },
              },
            }}
          >
            {alumni.map((a) => (
              <motion.article
                key={a.name}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
                  },
                }}
                className="flex items-start gap-5 md:gap-7 py-6 md:py-7"
              >
                {/* small photo */}
                <div className="relative shrink-0 w-28 md:w-32 aspect-[3/4] overflow-hidden rounded-md bg-foreground/[0.04] border border-black/[0.06]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={`${a.name}, ${a.role}`}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>

                {/* text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-libre-franklin text-[17px] md:text-[19px] leading-tight font-semibold">
                    {a.name}
                  </h3>
                  <p className="font-inter text-[13px] md:text-[14px] text-foreground/75 mt-1">
                    {a.role}
                  </p>
                  <p className="font-inter text-[13px] md:text-[14px] text-foreground/55 mt-0.5">
                    {a.formerRole}
                  </p>
                  <p className="font-inter text-[13px] md:text-[14px] leading-[1.6] text-foreground/70 mt-3 max-w-2xl">
                    {a.bio}
                  </p>
                  <a
                    href={a.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${a.name} on LinkedIn`}
                    className="inline-flex items-center mt-3 text-foreground/45 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
