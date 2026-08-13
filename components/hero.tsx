"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const [visible, setVisible] = useState(true);

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("about-us")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // On phones the hero owns the whole first screen, so About starts below
    // the fold and the user has to scroll to reach it. `svh` (not `vh`) is
    // deliberate: it measures the viewport with the browser chrome showing,
    // which is what's on screen at first paint. Desktop keeps normal flow.
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center md:block md:min-h-0">
      {/* Full-width team photo, sitting beneath the aurora layer.
          Hidden below `md`: the source is 2.13:1 ultrawide, so on a phone it
          collapses to a ~176px strip with the group's heads behind the fixed
          navbar. Desktop is untouched. */}
      <div className="hidden md:block relative w-full -z-20">
        <Image
          src="/bsvc-team.jpg"
          alt="Bocconi Students for Venture Capital team"
          width={6000}
          height={2821}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
        {/* Subtle dark tint scoped to the image only */}
        <div className="absolute inset-0 bg-black/25" />
        {/* Gradient fade: transparent → white over the bottom ~40% of the image */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Heading — pulled up into the lower portion of the photo on desktop,
          flex-centred in the viewport on phones.

          Phone layout is left-aligned and stacked (rule, eyebrow, two-line
          wordmark, blurb, buttons); desktop stays the centred single line over
          the photo. The reordering is done with `order-first`, so the eyebrow
          copy exists once in the DOM and simply moves. */}
      <div
        className="relative md:-mt-[16vw] flex flex-col items-start text-left
          md:items-center md:text-center px-6 md:px-8"
      >
        {/* Accent rule above the eyebrow — phones only. Same `h-px w-10
            bg-primary` rule every other section eyebrow on the site uses. */}
        <span
          aria-hidden
          className="md:hidden order-first mb-4 h-px w-10 bg-primary"
        />

        <h1
          className="font-libre-franklin uppercase whitespace-nowrap
            text-[3.4rem] leading-[1.05]
            md:text-[clamp(2.5rem,10vw,11rem)] md:leading-none
            md:[text-shadow:0_2px_24px_rgba(0,0,0,0.18)]"
          style={{ fontWeight: 900 }}
        >
          {/* White only works over the photo — on the phone's white page it
              would be invisible, so it falls back to the body foreground. */}
          <span className="text-foreground md:text-white">WE ARE </span>
          {/* Breaks to a second line on phones, stays inline on desktop */}
          <br className="md:hidden" />
          <span className="text-[#e5b800] md:text-[rgba(255,221,14,0.95)]">
            BSVC
          </span>
        </h1>

        {/* Doubles as the phone eyebrow (moved above the wordmark, uppercase
            and letterspaced) and the desktop sub-line under it. The phone
            colour is darker: at 10px the original #888994 sits at ~3.5:1 on
            the pale page, while #75767f reaches ~4.5:1. Desktop keeps the
            original, where it reads against the tinted photo instead. */}
        <p
          className="font-light
            font-mono order-first uppercase tracking-[0.2em] mb-4 text-[10px] whitespace-nowrap
            md:font-libre-franklin md:order-none md:normal-case md:tracking-normal
            md:mb-0 md:mt-2 md:whitespace-normal md:text-[clamp(0.75rem,1.6vw,1.5rem)]
            md:[text-shadow:0_1px_8px_rgba(0,0,0,0.25)]
            text-[#75767f] md:text-[#888994]"
          style={{ fontWeight: 200 }}
        >
          Bocconi Students for Venture Capital
        </p>

        {/* ── phone-only blurb + actions ── */}
        {/* Body copy matches the About section's own font-inter treatment. */}
        <p className="md:hidden mt-6 font-inter text-[15px] leading-[1.7] text-foreground/70 max-w-[22rem]">
          A student association connecting Bocconi to the venture capital
          world, through collaborations with funds, hands-on work with
          startups, and events that bring the ecosystem to campus.
        </p>

        {/* Buttons reuse the site's CTA treatment: mono, uppercase, tracked,
            rounded-full, dark fill with the yellow reserved for the pressed
            state. `active:` rather than `hover:` since this is touch-only. */}
        <div className="md:hidden mt-8 flex items-center gap-3">
          <a
            href="#about-us"
            onClick={scrollToAbout}
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]
              px-6 py-3.5 rounded-full bg-foreground text-white
              active:bg-primary active:text-foreground
              transition-all duration-400
              shadow-[0_8px_28px_-14px_rgba(0,0,0,0.45)]"
          >
            About us
          </a>
          <a
            href="mailto:as.bsventureclub@unibocconi.it"
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]
              px-6 py-3.5 rounded-full border border-foreground/20 text-foreground
              active:bg-foreground/5 transition-all duration-400"
          >
            Contact us
          </a>
        </div>
      </div>

      {/* Breathing room before the next section. On phones the full-height
          hero already provides the separation, so this collapses away. */}
      <div className="h-0 md:h-24" />

      {/* Scroll indicator — fixed at viewport bottom, fades when user scrolls */}
      <div
        className="fixed bottom-7 inset-x-0 flex flex-col items-center gap-1 pointer-events-none transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span
          className="font-libre-franklin tracking-wide"
          style={{ color: "#888994", fontSize: "clamp(0.65rem, 1vw, 0.85rem)", fontWeight: 300 }}
        >
        
        </span>
        <svg
          className="animate-bounce"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888994"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
