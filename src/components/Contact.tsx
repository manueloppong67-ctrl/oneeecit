const SOCIALS = [
  { label: "TikTok", href: "https://www.tiktok.com/@modern.state.role?_r=1&_t=ZS-96F4Mpe5Uo6" },
  { label: "Telegram", href: "https://t.me/Offcialvelocityxdigital" },
  { label: "YouTube", href: "https://www.youtube.com/@ModernStaterp" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="glass mx-auto max-w-3xl rounded-2xl p-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Contact
          </span>
          <h2 className="mt-4 font-display text-4xl font-black uppercase md:text-5xl">
            Get in <span className="text-gradient-neon">Touch</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Questions, partnerships or support — drop us a line, or follow us on socials.
          </p>
          <a
            href="mailto:roleplaynexus8@gmail.com"
            className="mt-8 inline-block rounded-md border border-primary px-8 py-3 font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-neon)]"
          >
            roleplaynexus8@gmail.com
          </a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-5 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="container mx-auto mt-24 border-t border-border/40 px-6 pt-8 pb-12 text-center">
        <div className="font-display text-lg font-bold tracking-widest">
          <span className="text-primary">MODERN</span>STATE
          <span className="text-accent">RP</span>
        </div>
        <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Modern State Rp · All rights reserved
        </p>
      </footer>
    </section>
  );
}
