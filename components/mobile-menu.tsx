"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "About us", href: "/#about-us" },
    { name: "Activities", href: "/#activities" },
    { name: "The Team", href: "/the-team" },
    { name: "Gallery", href: "/gallery" },
    { name: "Articles", href: "/articles" },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Lock the page behind the sheet. Without this the body keeps scrolling
  // under the open menu (the dialog is `modal={false}`, so Radix does not do
  // it for us), which is the main reason dragging over the menu felt loose.
  useEffect(() => {
    if (!isOpen) return;
    const { overflow, paddingRight } = document.body.style;
    // Compensate for the scrollbar so hiding it does not shift the layout.
    const barWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (barWidth > 0) document.body.style.paddingRight = `${barWidth}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [isOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);
    const hashIdx = href.indexOf("#");
    if (hashIdx === -1) return;
    const targetPath = href.slice(0, hashIdx) || "/";
    const id = href.slice(hashIdx + 1);
    if (!id) return;

    if (pathname === targetPath) {
      e.preventDefault();
      // wait for the menu close animation to release before scrolling
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      });
    } else {
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

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-white transition-colors",
            className
          )}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="group-[[data-state=open]]:hidden" size={24} />
          <X className="hidden group-[[data-state=open]]:block" size={24} />
        </button>
      </Dialog.Trigger>

      {/* `forceMount` keeps the sheet in the DOM so open *and* close can be
          driven by CSS transitions. Radix's own presence handling only defers
          unmount for CSS animations, which would rule out the per-item
          transition-delay stagger below. */}
      <Dialog.Portal forceMount>
        <div
          data-overlay="true"
          className={cn(
            "fixed z-30 inset-0 bg-black/20 backdrop-blur-sm",
            "transition-opacity duration-300 ease-out-expo",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        />

        <Dialog.Content
          forceMount
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
          className={cn(
            "fixed top-0 left-0 w-full z-40 py-28 md:py-40",
            // Only one backdrop-filter layer now (the overlay keeps the other).
            // Two stacked blurs were being recomposited every frame, which is
            // what made the open/close feel heavy on a phone.
            "bg-white/[0.97] rounded-b-[28px]",
            "shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]",
            "transition-all duration-300 ease-out-expo motion-reduce:transition-none",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3 pointer-events-none invisible",
          )}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <nav className="flex flex-col space-y-6 container mx-auto">
            {menuItems.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.includes("#")) handleNavClick(e, item.href);
                  else handleLinkClick();
                }}
                // Cascade the items in behind the sheet; on close they all
                // leave together so dismissing still feels immediate.
                style={{ transitionDelay: isOpen ? `${90 + i * 45}ms` : "0ms" }}
                className={cn(
                  "text-xl font-mono uppercase py-2",
                  "text-foreground/60 hover:text-foreground active:text-foreground",
                  "transition-all duration-300 ease-out-expo motion-reduce:transition-none",
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-6">
              <a
                href="mailto:as.bsventureclub@unibocconi.it"
                onClick={handleLinkClick}
                style={{
                  transitionDelay: isOpen
                    ? `${90 + menuItems.length * 45}ms`
                    : "0ms",
                }}
                className={cn(
                  "inline-block text-xl font-mono uppercase py-2",
                  "text-primary hover:text-primary/80 active:text-primary/80",
                  "transition-all duration-300 ease-out-expo motion-reduce:transition-none",
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
                )}
              >
                Contact US
              </a>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
