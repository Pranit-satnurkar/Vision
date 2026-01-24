
import { ThemeToggle } from "@/components/ThemeToggle";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import bio from "@/data/bio.json";
import { ShoppingBag } from "lucide-react";

const LINKS = [
  { name: "About", href: "#about" },
  { name: "Experiences", href: "#experience" },
  { name: "Collections", href: "#projects" }, // Renamed from Projects
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass-panel rounded-full transition-all duration-300 hover:bg-background/80">
      <div className="container mx-auto flex justify-between items-center h-20 px-6">
        {/* Brand / Store Name */}
        <Link href="/" className="font-sans font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity">
          {bio.name}
        </Link>

        {/* Desktop Navigation - Centered like a store menu */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-wide font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center px-4"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Area (Cart/Action) */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="/Resume.pdf" download>
            <Button className="rounded-full px-6 font-medium bg-foreground text-background hover:bg-foreground/90 transition-all">
              Download Resume
            </Button>
          </a>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
