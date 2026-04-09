import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        <Link href="/">
          <Logo className="w-[100px] md:w-[120px]" />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {["About us", "Activities", "Alumni", "Articles"].map((item) => (
            <Link
              className="uppercase inline-block font-mono text-foreground/40 hover:text-foreground transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>
        <Link className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80" href="/#contact-us">
          Contact US
        </Link>
        <MobileMenu />
      </header>
    </div>
  );
};
