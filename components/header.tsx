"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Text_03 } from "./ui/wave-text";

const NAV_ITEMS = ["About us", "Activities", "The Team", "Gallery", "Articles"];

const BRAND_BLUE = "#3c3c3b";

export const Header = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.001) current = target;
      setProgress(current);
      if (current !== target) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const nextTarget = clamp((window.scrollY - 24) / 36);
      target = nextTarget;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const pillOpacity = progress;
  const overlayOpacity = 1 - progress;
  const pillScale = 0.98 + progress * 0.02;
  const pillRadius = 1 - progress;
  const pillTop = 8 - progress * 8;
  const pillBottom = 8 - progress * 8;
  const pillShadow = `0 4px 32px rgba(60,60,59,${0.2 * progress})`;
  const initialTransform = `translateY(${progress * -6}px) scale(${1 - progress * 0.01})`;

  return (
    <div className="fixed z-50 top-0 left-0 w-full pointer-events-none">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "90px",
          opacity: overlayOpacity,
          transition: "opacity 420ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity, transform",
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
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            insetInline: 0,
            top: `${pillTop}px`,
            bottom: `${pillBottom}px`,
            borderRadius: `${pillRadius * 9999}px`,
            border: "1px solid rgba(0,0,0,0.15)",
            backgroundColor: BRAND_BLUE,
            boxShadow: pillShadow,
            opacity: pillOpacity,
            transform: `translateY(${(1 - progress) * -2}px) scale(${pillScale})`,
            transition: "border-radius 420ms cubic-bezier(0.4, 0, 0.2, 1), top 420ms cubic-bezier(0.4, 0, 0.2, 1), bottom 420ms cubic-bezier(0.4, 0, 0.2, 1), background-color 420ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 420ms cubic-bezier(0.4, 0, 0.2, 1), opacity 420ms cubic-bezier(0.4, 0, 0.2, 1), transform 420ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform, opacity, border-radius, top, bottom, box-shadow",
          }}
        />

        <div
          className="relative flex items-center justify-between pt-5 pb-4 md:pt-6 md:pb-5"
          style={{
            transform: initialTransform,
            transition: "transform 420ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
          <Link href="/">
            <Logo
              className={`transition-all duration-500 ease-in-out ${
                progress > 0.6 ? "w-[80px] md:w-[90px]" : "w-[100px] md:w-[120px]"
              }`}
            />
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
