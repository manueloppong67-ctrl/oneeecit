import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { Download } from "@/components/Download";
import { Contact } from "@/components/Contact";
import { Rules } from "@/components/Rules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One City RP — Multiplayer Open-World Roleplay" },
      {
        name: "description",
        content:
          "One City RP is the best multiplayer open-world roleplay game. Join 600+ players, download the APK and write your story in the city that never sleeps.",
      },
      { property: "og:title", content: "One City RP — Multiplayer Open-World Roleplay" },
      {
        property: "og:description",
        content: "Join the best mobile multiplayer roleplay community. Download the APK and play now.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SiteNav />
      <main>
        <Hero />
        <Features />
        <About />
        <Rules />
        <Download />
        <Contact />
      </main>
    </div>
  );
}
