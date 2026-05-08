import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { UserBadge } from "@/components/AuthGate";

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
      <nav className="container mx-auto flex items-center justify-between px-6">
        <a href="/#top" className="font-display text-xl font-bold tracking-widest">
          <span className="text-glow text-primary">ONE</span>
          <span className="text-foreground">CITY</span>
          <span className="text-accent">RP</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/report"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              Report
            </Link>
          </li>
          <li>
            <Link
              to="/staff"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
            >
              Staff
            </Link>
          </li>
        </ul>
        <a
          href="https://discord.gg/YCghxeqjz"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-primary px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-neon)]"
        >
          Join Now
        </a>
      </nav>
    </header>
  );
}
