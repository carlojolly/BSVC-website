"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Text_03 } from "./ui/wave-text";

const NAV_ITEMS = ["About us", "Activities", "The Team", "Gallery", "Articles"];

const BRAND_BLUE = "#3c3c3b";
const SCROLL_START = 20;
const SCROLL_END = 110;

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export const Header = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

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
  const logoWidth = Math.round(100 - p * 20);
  const logoWidthMd = Math.round(120 - p * 30);

  return (
    <div className="fixed z-50 top-0 left-0 w-full pointer-events-none">

      {/* Gradient + blur overlay — always present, fades out as user scrolls */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "90px",
          opacity: gradientOpacity,
          willChange: "opacity",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(60,60,59,0.96) 0%, ${BRAND_BLUE} 35%, rgba(255,255,255,0) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
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
            left: 0,
            right: 0,
            borderRadius: `${pillRadius}px`,
            backgroundColor: `rgba(60,60,59,${pillBgAlpha})`,
            border: `1px solid rgba(0,0,0,${pillBorderAlpha})`,
            boxShadow: `0 4px 32px rgba(60,60,59,${pillShadowAlpha})`,
            willChange: "border-radius, background-color, top, bottom, box-shadow",
          }}
        />

        {/* Content row */}
        <div className="relative flex items-center justify-between pt-5 pb-4 md:pt-6 md:pb-5">

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
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="uppercase font-mono text-sm whitespace-nowrap transition-colors duration-150 ease-out text-white/80 hover:text-white"
              >
                <Text_03 text={item} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/#contact-us"
              className="uppercase max-lg:hidden font-mono text-sm hover:text-primary/80 transition-colors duration-150 ease-out text-[#ffdd0ef2]"
            >
              Contact US
            </Link>
            <MobileMenu />
          </div>
        </div>

      </div>
    </div>
  );
};
