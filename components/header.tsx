"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Text_03 } from "./ui/wave-text";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "About us", href: "/#about-us" },
  { label: "Activities", href: "/#activities" },
  { label: "The Team", href: "/the-team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Articles", href: "/articles" },
];

const GRADIENT_RGB = (a: number) => `rgba(60,60,59,${a})`;
const BLUR_MASK = `linear-gradient(to bottom,
  rgba(0,0,0,1) 0%,
  rgba(0,0,0,1) 32%,
  rgba(0,0,0,0.88) 46%,
  rgba(0,0,0,0.70) 57%,
  rgba(0,0,0,0.48) 67%,
  rgba(0,0,0,0.28) 76%,
  rgba(0,0,0,0.13) 85%,
  rgba(0,0,0,0.04) 92%,
  rgba(0,0,0,0) 98%)`;
const SCROLL_START = 20;
const SCROLL_END = 110;

// How far the scrolled-state pill pulls in from each side of the container.
// 140px is tuned for the desktop container; applied to a ~375px phone it would
// consume 280px and leave a 95px pill with the logo and menu button spilling
// outside it, so phones get a token inset instead.
const PILL_INSET_DESKTOP = 140;
const PILL_INSET_MOBILE = 10;

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export const Header = () => {
  const [progress, setProgress] = useState(0);
  // Starts at the desktop value so SSR and the first client render agree; the
  // effect below corrects it on phones. Harmless either way, since the pill is
  // fully collapsed (progress 0, inset 0) until the user scrolls.
  const [maxPillInset, setMaxPillInset] = useState(PILL_INSET_DESKTOP);
  const rafRef = useRef<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Smoothly scroll to a hash target on the current page. Works for both
  // same-page anchors (e.g. "/#about-us" while on "/") and cross-page links
  // (navigates first, then scrolls smoothly once the target lands in view).
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIdx = href.indexOf("#");
    if (hashIdx === -1) return; // non-anchor links keep default behaviour
    const targetPath = href.slice(0, hashIdx) || "/";
    const id = href.slice(hashIdx + 1);
    if (!id) return;

    if (pathname === targetPath) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      // keep the URL in sync so refresh / share works
      window.history.replaceState(null, "", `#${id}`);
    } else {
      // navigate to the page; the browser will jump to the hash. After the
      // route lands, re-trigger a smooth scroll so the transition is animated
      // rather than instant.
      e.preventDefault();
      router.push(href);
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempt < 20) {
          requestAnimationFrame(() => tryScroll(attempt + 1));
        }
      };
      requestAnimationFrame(() => tryScroll());
    }
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () =>
      setMaxPillInset(mq.matches ? PILL_INSET_DESKTOP : PILL_INSET_MOBILE);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const raw = Math.min(1, Math.max(0, (y - SCROLL_START) / (SCROLL_END - SCROLL_START)));
        setProgress(easeInOut(raw));
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const p = progress;

  const gradientOpacity = 1 - p;
  const pillTopInset = p * 8;
  const pillBgAlpha = p;
  const pillBorderAlpha = p * 0.15;
  const pillShadowAlpha = p * 0.20;
  const pillRadius = p * 9999;
  // Horizontal inset that grows with scroll so the pill becomes noticeably
  // narrower in its "scrolled" state instead of spanning the full container.
  const pillSideInset = p * maxPillInset;
  const logoWidth = Math.round(120 - p * 10);
  const logoWidthMd = Math.round(144 - p * 18);

  return (
    <div className="fixed z-50 top-0 left-0 w-full pointer-events-none">

      {/* Gradient + blur overlay — always present, fades out as user scrolls */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "150px",
          opacity: gradientOpacity,
          willChange: "opacity",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            // Fades to a fully transparent *brand grey* rather than transparent
            // white: interpolating toward white lightens the midtones and leaves
            // a visible shelf over pale page backgrounds. The many stops trace an
            // ease-out alpha curve so the tail dies away instead of stopping on a
            // straight line — the seam that showed on the light-background pages.
            background: `linear-gradient(to bottom,
              ${GRADIENT_RGB(0.97)} 0%,
              ${GRADIENT_RGB(0.95)} 32%,
              ${GRADIENT_RGB(0.87)} 46%,
              ${GRADIENT_RGB(0.74)} 56%,
              ${GRADIENT_RGB(0.57)} 65%,
              ${GRADIENT_RGB(0.40)} 73%,
              ${GRADIENT_RGB(0.25)} 81%,
              ${GRADIENT_RGB(0.13)} 88%,
              ${GRADIENT_RGB(0.05)} 94%,
              ${GRADIENT_RGB(0)} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            // Matching eased falloff, ended a little earlier than the colour
            // ramp so the blur boundary is already invisible before it stops.
            WebkitMaskImage: BLUR_MASK,
            maskImage: BLUR_MASK,
          }}
        />
      </div>

      <div className="pointer-events-auto container relative">

        {/* Morphing pill background — interpolated on every scroll tick */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: `${pillTopInset}px`,
            bottom: `${pillTopInset}px`,
            left: `${pillSideInset}px`,
            right: `${pillSideInset}px`,
            borderRadius: `${pillRadius}px`,
            backgroundColor: `rgba(60,60,59,${pillBgAlpha})`,
            border: `1px solid rgba(0,0,0,${pillBorderAlpha})`,
            boxShadow: `0 4px 32px rgba(60,60,59,${pillShadowAlpha})`,
            willChange: "border-radius, background-color, top, bottom, left, right, box-shadow",
          }}
        />

        {/* Content row — also insets horizontally as the pill narrows so the
            logo / nav / contact link stay nicely inside the pill. */}
        <div
          className="relative flex items-center justify-between pt-4 pb-3 md:pt-5 md:pb-4"
          style={{
            paddingLeft: `${pillSideInset}px`,
            paddingRight: `${pillSideInset}px`,
          }}
        >

          <Link href="/">
            {/* Wrapper drives width so Logo className can stay static */}
            <div
              style={{ width: `${logoWidth}px` }}
              className="md:hidden overflow-hidden"
            >
              <Logo className="w-full" />
            </div>
            <div
              style={{ width: `${logoWidthMd}px` }}
              className="hidden md:block overflow-hidden"
            >
              <Logo className="w-full" />
            </div>
          </Link>

          <nav className="max-lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-6 md:gap-x-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="uppercase font-mono text-sm whitespace-nowrap transition-colors duration-150 ease-out text-white/80 hover:text-white"
              >
                <Text_03 text={item.label} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="mailto:as.bsventureclub@unibocconi.it"
              className="uppercase max-lg:hidden font-mono text-sm hover:text-primary/80 transition-colors duration-150 ease-out text-[#ffdd0ef2]"
            >
              Contact US
            </a>
            <MobileMenu />
          </div>
        </div>

      </div>
    </div>
  );
};
