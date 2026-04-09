"use client";

import { Mail, Linkedin, Instagram } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(235,184,0,0.03),transparent)]" />

      <div className="container relative py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* logo + nav */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10">
            <span className="font-libre-franklin text-base font-black tracking-tight text-white/80">
              BSVC
            </span>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
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
            </nav>
          </div>

          {/* social icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                  text-foreground/40 hover:text-primary hover:border-primary/40
                  transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="mt-10 mb-6 h-px bg-white/[0.06]" />

        {/* copyright */}
        <p className="font-mono text-[11px] text-foreground/25 tracking-widest uppercase">
          © 2024 Bocconi Students for Venture Capital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
