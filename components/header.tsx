"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

const NAV_ITEMS = ["About us", "Activities", "Alumni", "Articles"];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed z-50 top-0 left-0 w-full pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "mx-auto mt-4 w-[calc(100%-6rem)] max-w-[1060px]"
            : "mx-0 mt-0 w-full"
        }`}
      >
        <div
          className={`relative flex items-center transition-all duration-500 ease-in-out ${
            scrolled
              ? "rounded-full border border-white/[0.1] bg-[rgba(8,8,8,0.82)] backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] px-4 md:px-6 py-3"
              : "container pt-8 md:pt-12 bg-transparent border-transparent"
          }`}
        >
          <div className="grid grid-cols-3 w-full items-center">
            <Link href="/" className="flex items-center">
              <Logo
                className={`transition-all duration-500 ease-in-out ${
                  scrolled ? "w-[80px] md:w-[90px]" : "w-[100px] md:w-[120px]"
                }`}
              />
            </Link>

            <nav className="max-lg:hidden flex items-center justify-center gap-x-6 md:gap-x-10">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className={`uppercase inline-block font-mono text-sm transition-colors duration-150 ease-out ${
                    scrolled
                      ? "text-white/70 hover:text-white"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-4">
              <Link
                href="/#contact-us"
                className={`uppercase max-lg:hidden font-mono text-sm transition-colors duration-150 ease-out ${
                  scrolled
                    ? "text-primary hover:text-primary/80"
                    : "text-primary hover:text-primary/80"
                }`}
              >
                Contact US
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
