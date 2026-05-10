import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#features", label: "Features" },
  { href: "#online", label: "Online" },
  { href: "#events", label: "Events" },
  { href: "#about", label: "About" },
  { href: "#rules", label: "Rules" },
  { href: "#download", label: "Download" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "glass py-3" : "py-5"
      }`}
    >
      <nav className="container mx-auto flex items-center gap-4 px-4">
        <a href="/#top" className="shrink-0 font-display text-lg font-bold tracking-widest md:text-xl">
          <span className="text-glow text-primary">MODERN</span>
          <span className="text-foreground">STATE</span>
          <span className="text-accent">RP</span>
        </a>
        <ul
          className="flex flex-1 items-center gap-6 overflow-x-auto whitespace-nowrap scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {links.map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <Link
              to="/report"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              Report
            </Link>
          </li>
          <li className="shrink-0">
            <Link
              to="/staff"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
            >
              Staff
            </Link>
          </li>
        </ul>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="https://discord.gg/YCghxeqjz"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-neon)] md:px-4 md:py-2 md:text-sm"
          >
            Join
          </a>
        </div>
      </nav>
    </header>
  );
}
