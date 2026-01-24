
"use client";

import FadeIn from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowUpRight, Database, Play } from "lucide-react";
import projects from "@/data/projects.json";

export default function Projects() {
    return (
        <section id="projects" className="p-8 lg:p-12 space-y-12">
            <div className="grid gap-6">
                {projects.map((project, index) => (
                    <FadeIn key={index} delay={index * 0.05}>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group relative border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 p-6"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* "Icon" / Status Indicator */}
                                <div className="hidden md:flex flex-col items-center gap-2 pt-2 text-muted-foreground group-hover:text-primary transition-colors">
                                    <Database size={20} strokeWidth={1.5} />
                                    <div className="w-px h-full bg-border group-hover:bg-primary/50 transition-colors"></div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-xs font-mono text-muted-foreground mb-1">
                                                INDEX_0{index + 1} // FEATURED
                                            </div>
                                            <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                                                {project.title}
                                                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0" />
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="font-mono text-xs rounded-none bg-secondary/50 border border-border">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Hover "Run Object" Action */}
                                <div className="hidden lg:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <div className="flex items-center gap-2 text-xs font-mono text-primary animate-pulse">
                                        <Play size={10} className="fill-primary" />
                                        EXEC_PROJECT
                                    </div>
                                </div>
                            </div>
                        </a>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
