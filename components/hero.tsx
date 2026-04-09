"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh">
      <GL hovering={hovering} />

      <div className="flex-1 flex flex-col items-center justify-center pb-16 text-center relative">
        <Pill className="mb-6">Applications Open</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Bocconi Students <br />
          <i className="font-light">Venture</i> Capital
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
          Through perpetual investment strategies that outperform the market
        </p>

        <Link className="contents max-sm:hidden" href="/#contact">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Apply Now!]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="/#contact">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contact Us]
          </Button>
        </Link>
      </div>
    </div>
  );
}
