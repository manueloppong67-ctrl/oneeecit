import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { Download } from "@/components/Download";
import { Contact } from "@/components/Contact";
import { Rules } from "@/components/Rules";
import { OnlineCount } from "@/components/OnlineCount";
import { EventsList } from "@/components/EventsList";
import { TeamSection } from "@/components/TeamSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Modern State Rp — Multiplayer Open-World Roleplay" },
      {
        name: "description",
        content:
          "Modern State Rp is the best multiplayer open-world roleplay game. Join the community, download the APK and write your story.",
      },
      { property: "og:title", content: "Modern State Rp — Multiplayer Open-World Roleplay" },
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
        <TeamSection />
        <OnlineCount />
        <EventsList />
        <Features />
        <About />
        <Rules />
        <Download />
        <Contact />
      </main>
    </div>
  );
}
