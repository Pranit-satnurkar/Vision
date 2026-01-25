
"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const LINKS = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/80 backdrop-blur-xl border-l border-border/40 rounded-l-3xl shadow-2xl">
                <SheetHeader className="mb-4">
                    <SheetTitle className="text-center text-xl font-bold tracking-tight opacity-50 uppercase">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 items-center justify-center h-[80%]">
                    {LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xl uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                            onClick={() => setOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
