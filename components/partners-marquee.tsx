"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Logos live in public/partners/. Filenames with spaces are URL-encoded below.
// Names with "Partner" placeholders are screenshots that need a real label —
// rename the files (or update the `name` here) when you know which brand each one is.
const partners: { src: string; name: string }[] = [
  { src: "/partners/B4i%20logo.avif", name: "B4i" },
  { src: "/partners/Plug%20and%20Play.png", name: "Plug and Play" },
  { src: "/partners/Neutralis%20logo.png", name: "Neutralis" },
  { src: "/partners/Satenlight.png", name: "Satenlight" },
  { src: "/partners/TEF_logo-removebg-preview.png", name: "TEF" },
  { src: "/partners/buentrip%20ventures%20logo.png", name: "Buentrip Ventures" },
  { src: "/partners/radio_bocconi_logo-removebg-preview.png", name: "Radio Bocconi" },
  { src: "/partners/riceberg%20ventures%20logo.png", name: "Riceberg Ventures" },
  { src: "/partners/vcpartners.png", name: "VC Partners" },
  { src: "/partners/Screenshot_2026-04-26_at_1.25.21_pm-modified-removebg-preview-3.png", name: "Partner" },
  { src: "/partners/Screenshot_2026-04-26_at_1.27.49_pm-removebg-preview.png", name: "Partner" },
  { src: "/partners/Screenshot_2026-04-26_at_1.33.14_pm-removebg-preview.png", name: "Partner" },
  { src: "/partners/Screenshot_2026-04-26_at_1.34.30_pm-removebg-preview.png", name: "Partner" },
  { src: "/partners/Screenshot_2026-04-26_at_1.38.23_pm-removebg-preview.png", name: "Partner" },
  { src: "/partners/Screenshot_2026-04-26_at_1.41.42_pm-modified-removebg-preview.png", name: "Partner" },
  { src: "/partners/Screenshot_2026-04-26_at_1.43.12_pm-modified-removebg-preview.png", name: "Partner" },
  { src: "/partners/Screenshot_2026-04-26_at_1.45.09_pm-modified-removebg-preview.png", name: "Partner" },
];

export function PartnersMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // duplicate the track twice so the loop is seamless
  const track = [...partners, ...partners];

  return (
    <section
      ref={ref}
      aria-label="Partners and collaborations"
      className="relative pt-8 md:pt-10 pb-20 md:pb-28 overflow-hidden"
    >
      {/* hairline bottom divider, matching the rest of the page rhythm */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />

      {/* eyebrow */}
      <div className="container relative mb-10 md:mb-14">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <span className="h-px w-10 bg-primary" />
          <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
            Partners &amp; collabs
          </span>
        </motion.div>
      </div>

      {/* marquee */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max items-center gap-14 md:gap-20 motion-reduce:animate-none"
          style={{
            animation: "partners-marquee 52s linear infinite",
            // Promote the track to its own compositor layer so Safari keeps it
            // painted while it animates horizontally (otherwise individual
            // logos can flash empty as they cross sub-layer boundaries).
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {track.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${p.name}-${i}`}
              src={p.src}
              alt={i < partners.length ? p.name : ""}
              aria-hidden={i >= partners.length || undefined}
              draggable={false}
              decoding="async"
              className="h-12 md:h-16 w-auto max-w-[200px] md:max-w-[260px] object-contain shrink-0
                select-none opacity-55 hover:opacity-90 transition-opacity duration-300"
              style={{
                filter: "brightness(0)",
                // Force each logo onto the GPU so Safari doesn't drop the
                // raster mid-animation when the track is long.
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* keyframes — local to this component */}
      <style>{`
        @keyframes partners-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
