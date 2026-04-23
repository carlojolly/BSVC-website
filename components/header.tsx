"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Text_03 } from "./ui/wave-text";

const NAV_ITEMS = ["About us", "Activities", "The Team", "Gallery", "Articles"];

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
      <div className="pointer-events-auto container relative">

        {/* Background pill */}
        <div
          aria-hidden
          className={`absolute pointer-events-none transition-all duration-500 ease-in-out ${
            scrolled
              ? "inset-x-0 top-2 bottom-2 rounded-full border border-black/[0.08] bg-[rgba(255,255,255,0.90)] backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(0,0,0,0.04)]"
              : "inset-x-0 top-0 bottom-0 rounded-none border-transparent bg-transparent shadow-none backdrop-blur-none"
          }`}
        />

        {/* Content row */}
        <div className="relative flex items-center justify-between pt-5 pb-4 md:pt-6 md:pb-5">
          <Link href="/">
            <Logo
              className={`transition-all duration-500 ease-in-out ${
                scrolled ? "w-[80px] md:w-[90px]" : "w-[100px] md:w-[120px]"
              }`}
            />
          </Link>

          <nav className="max-lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-6 md:gap-x-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`uppercase font-mono text-sm whitespace-nowrap transition-colors duration-150 ease-out hover:text-foreground ${
                  scrolled ? "text-foreground/70" : "text-foreground/60"
                }`}
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
