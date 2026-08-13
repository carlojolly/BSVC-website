"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Instagram } from "lucide-react";

// These are real routes, not in-page anchors. "#the-team" / "#gallery" matched
// no element on any page, and "#activities" only resolved on the homepage even
// though the footer renders on every page.
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/#activities" },
  { label: "The Team", href: "/the-team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Articles", href: "/articles" },
];

const SOCIAL_LINKS = [
  { icon: Mail, href: "mailto:as.bsventureclub@unibocconi.it", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/bocconi-students-for-venture-capital/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/bsvc_bocconi", label: "Instagram" },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer className="relative border-t border-black/[0.08]" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(235,184,0,0.04),transparent)]" />

      <div className="container relative py-14 md:py-16">

        {/* ── row 1: nav links (left) + social icons (right) ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        >
          {/* Two even columns on phones. Wrapping five links in a flex row at
              375px left "Articles" orphaned on a ragged second line. */}
          <nav
            className="grid grid-cols-2 gap-y-3 gap-x-4
              sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest
                  text-foreground/60 sm:text-foreground/40
                  hover:text-primary active:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                // 48px on phones (comfortably past the 44px minimum touch
                // target); the original 36px is restored from `sm` up, where
                // it is a cursor target.
                className="w-12 h-12 sm:w-9 sm:h-9 rounded-full border border-black/10
                  flex items-center justify-center
                  text-foreground/60 sm:text-foreground/40
                  hover:text-primary hover:border-primary/40 hover:bg-primary/10 hover:scale-110
                  active:text-primary active:border-primary/40 active:bg-primary/10
                  transition-all duration-300"
              >
                {/* Glyph scales with the circle so the phone keeps the same
                    glyph-to-circle ratio the desktop version has (~0.42). */}
                <Icon size={15} className="w-5 h-5 sm:w-[15px] sm:h-[15px]" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── divider ── */}
        <div className="h-px bg-black/[0.06] mb-6" />

        {/* ── row 2: copyright (left) + Bocconi logo (right) ── */}
        {/* Stacked on phones. Side by side, the uppercase tracked copyright ran
            to three lines and squeezed the Bocconi mark against the edge. */}
        <motion.div
          className="flex flex-col items-start gap-5
            sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          {/* Dropping the uppercase and wide tracking on phones buys back
              roughly a third of the width, and reads better at 11px. */}
          <p
            className="font-mono text-[11px] leading-relaxed
              text-foreground/45 sm:text-foreground/30
              sm:tracking-widest sm:uppercase"
          >
            © 2024 Bocconi Students for Venture Capital. All rights reserved.
          </p>

          <Image
            src="/bocconi-logo.png"
            alt="Bocconi University"
            width={90}
            height={0}
            sizes="90px"
            className="h-auto flex-shrink-0 opacity-70"
          />
        </motion.div>

      </div>
    </footer>
  );
}
