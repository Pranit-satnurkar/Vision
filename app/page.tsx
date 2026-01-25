
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Extras from "@/sections/Extras";
import Contact from "@/sections/Contact";
// import { getRepos } from "@/lib/github";

export default async function Home() {
  // const githubRepos = await getRepos("Pranit-satnurkar");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Mobile: Stacked, Desktop: Split Screen */}
      <div className="lg:grid lg:grid-cols-12 min-h-screen">

        {/* LEFT PANEL: Identity & Control (Fixed on Desktop) */}
        <aside className="lg:col-span-5 xl:col-span-4 lg:h-screen lg:sticky lg:top-0 border-r border-border bg-background/50 backdrop-blur-sm z-20 flex flex-col justify-between overflow-hidden relative">
          <Hero />
          {/* We can add a footer or status bar here */}
        </aside>

        {/* RIGHT PANEL: Data Feed (Scrollable) */}
        <main className="lg:col-span-7 xl:col-span-8 flex flex-col">
          {/* Section Dividers for 'System Log' feel */}
          <div className="py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/50 text-center">
            &gt; System.Load_Module("About")
          </div>
          <About />

          <div className="py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/50 text-center">
            &gt; System.Load_Module("Experience_Log")
          </div>
          <Experience />

          <div className="py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/50 text-center">
            &gt; System.Load_Module("Project_Database")
          </div>
          <Projects />

          <div className="py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/50 text-center">
            &gt; System.Load_Module("Extras")
          </div>
          <Extras />

          <div className="py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/50 text-center">
            &gt; Open_Comm_Channel()
          </div>
          <Contact />
        </main>

      </div>
    </div>
  );
}
