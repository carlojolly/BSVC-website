"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { Logo } from "./logo";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Activities", href: "#activities" },
  { label: "The Team", href: "#the-team" },
  { label: "Articles", href: "#articles" },
];

const SOCIAL_LINKS = [
  { icon: Mail, href: "mailto:bsvc@unibocconi.it", label: "Email" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer className="relative border-t border-white/[0.08]" ref={ref}>
      {/* subtle top glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(235,184,0,0.04),transparent)]" />

      <div className="container relative py-14 md:py-16">

        {/* ── row 1: logo + social ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        >
          <Logo className="w-[80px] opacity-90" />

          {/* social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                  text-foreground/40
                  hover:text-primary hover:border-primary/40 hover:bg-primary/10 hover:scale-110
                  transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── row 2: nav links ── */}
        <motion.nav
          className="flex flex-wrap gap-x-8 gap-y-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.1 }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-foreground/40
                hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </motion.nav>

        {/* ── divider ── */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* ── row 3: Bocconi affiliation ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/25">
            In collaboration with
          </span>
          <Image
            src="/bocconi-logo.png"
            alt="Bocconi University"
            width={80}
            height={0}
            sizes="80px"
            className="h-auto opacity-[0.35] grayscale brightness-[5]"
          />
        </motion.div>

        {/* ── row 4: copyright ── */}
        <motion.p
          className="font-mono text-[11px] text-foreground/20 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.28 }}
        >
          © 2024 Bocconi Students for Venture Capital. All rights reserved.
        </motion.p>

      </div>
    </footer>
  );
}
