
"use client";

import { motion } from "framer-motion";
import bio from "@/data/bio.json";
import { MapPin, Clock, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="h-full w-full flex flex-col p-8 lg:p-12 relative overflow-hidden bg-background">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50"></div>

            {/* Top: Status Header */}
            <div className="w-full flex justify-between items-start mb-auto z-10">
                <div className="font-mono text-xs flex flex-col gap-1">
                    <span className="opacity-50">ID_REF:</span>
                    <span className="font-bold">{bio.name.toUpperCase()}</span>
                </div>
                <div className="font-mono text-xs flex flex-col gap-1 text-right">
                    <span className="opacity-50">SYS_TIME:</span>
                    <span className="font-bold flex items-center gap-2 justify-end">
                        <Clock size={10} className="animate-pulse text-green-500" />
                        {time}
                    </span>
                </div>
            </div>

            {/* Middle: Kinetic Identity */}
            <div className="z-10 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] mb-6">
                        DATA<br />
                        <span className="text-muted-foreground">ANALYST</span><br />
                        & AI/ML<br />
                        <span className="text-muted-foreground">ENGINEER</span>
                    </h1>

                    <p className="text-lg text-muted-foreground leading-relaxed max-w-sm font-light border-l-2 border-primary/20 pl-4">
                        {bio.summary}
                    </p>
                </motion.div>
            </div>

            {/* Bottom: Meta Data */}
            <div className="mt-auto z-10 space-y-6">
                <div className="grid grid-cols-2 gap-4 font-mono text-xs text-muted-foreground">
                    <div className="flex flex-col gap-1 border-t border-border pt-2">
                        <span className="opacity-50">LOCATION</span>
                        <span className="font-bold text-foreground flex items-center gap-1">
                            <MapPin size={10} /> Pune, IN
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 border-t border-border pt-2">
                        <span className="opacity-50">AVAILABILITY</span>
                        <span className="font-bold text-green-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            ONLINE
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {/* Social Links as Console Buttons */}
                    {Object.entries(bio.socialLinks)
                        .filter(([platform]) => platform !== 'portfolio')
                        .map(([platform, url]) => (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-mono border border-border hover:bg-primary hover:text-primary-foreground transition-colors uppercase"
                            >
                                {platform}
                            </a>
                        ))}
                    <a
                        href="/Resume.pdf"
                        download
                        className="px-3 py-1 bg-primary text-primary-foreground text-xs font-mono border border-primary hover:opacity-90 transition-opacity uppercase ml-auto"
                    >
                        DL_RESUME
                    </a>
                </div>
            </div>
        </section>
    );
}
