"use client";

import { useState, useRef, useEffect } from "react";
import Section from "@/components/Section";
import FadeIn from "@/components/animations/FadeIn";
import Stagger, { StaggerItem } from "@/components/animations/Stagger";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, Code, LineChart, Palette, Rocket, Bot, Send, User, RotateCcw } from "lucide-react";
import bio from "@/data/bio.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
    return (
        <Section id="about" className="bg-secondary/30">
            <div className="space-y-16">
                <FadeIn className="max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight mb-6">About Me</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        I am {bio.name}, a {bio.tagline}. {bio.philosophy}
                    </p>
                </FadeIn>

                <Stagger className="grid md:grid-cols-3 gap-6">
                    {/* 1. Analytics & Data */}
                    <StaggerItem className="h-full">
                        <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <LineChart size={24} />
                                </div>
                                <CardTitle className="text-xl">Analytics & Data</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {[...bio.skills.analysis, "Predictive Modeling"].map(skill => (
                                        <span key={skill} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </StaggerItem>

                    {/* 2. Development & Engineering (Removed Game Dev) */}
                    <StaggerItem className="h-full">
                        <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <Code size={24} />
                                </div>
                                <CardTitle className="text-xl">Development & Engineering</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {[...bio.skills.web, ...bio.skills.cloud.slice(0, 2)].map(skill => (
                                        <span key={skill} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </StaggerItem>

                    {/* 3. Creative & AI (Switchable) */}
                    <StaggerItem className="h-full">
                        <AiCard />
                    </StaggerItem>
                </Stagger>
            </div>
        </Section>
    );
}

function AiCard() {
    const [showAi, setShowAi] = useState(false);

    return (
        <Card className="h-full min-h-[350px] border-none shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group bg-card">
            <AnimatePresence mode="wait">
                {!showAi ? (
                    <motion.div
                        key="card"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col"
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <Palette size={24} />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowAi(true)}
                                    className="text-xs font-mono gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <Bot size={14} /> ASK Viz
                                </Button>
                            </div>
                            <CardTitle className="text-xl">Creative & AI</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {[...bio.skills.uiUx, ...bio.skills.ai].map(skill => (
                                    <span key={skill} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 h-full w-full z-20 bg-card"
                    >
                        <EmbeddedChat onBack={() => setShowAi(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}

function EmbeddedChat({ onBack }: { onBack: () => void }) {
    const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
        { role: "assistant", content: "Hi! I'm Viz, Pranit's AI assistant. Ask me about his creativity or AI skills." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Removed auto-scroll useEffect specifically to prevent jumpiness if that was the issue.
    // If user meant "scroll to card when opened", that would be in the parent. 
    // But "autoscroll which switches to chatbot" likely refers to the chat scrolling itself or the page scrolling to it. 
    // I will keep the scroll-to-bottom logic inside the chat *only* when new messages arrive, 
    // but I'll make sure it doesn't run on mount aggressively if that's the cause.
    // Actually, the user said "autoscroll which switches to chatbot". 
    // This might mean when they click "Ask AI", the page scrolls.
    // Let's check the AiCard component too. It just sets `setShowAi(true)`.
    // The previous code had `useEffect` scrolling `scrollRef` into view.
    // If `scrollRef` is at the bottom of the chat, and the chat loads, it might scroll the whole page down if the chat is at the bottom of the viewport.
    // I will simply remove the `useEffect` that scrolls into view automatically.


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to fetch response from AI.");
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
        } catch (error: any) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: error.message || "Error connecting to AI." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full absolute inset-0 bg-card z-20"> {/* Filled absolute positioning for full coverage */}
            <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <Bot size={16} className="text-primary" />
                    <span className="text-sm font-semibold">Viz</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive" onClick={onBack}>
                    <RotateCcw size={14} />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-3 text-sm scroll-smooth">
                {messages.map((msg, i) => (
                    <div key={i} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "")}>
                        <div className={cn("p-2 rounded-lg max-w-[85%]", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {isLoading && <div className="text-xs text-muted-foreground animate-pulse ml-2">Thinking...</div>}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2 shrink-0 bg-background/50">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask..."
                    className="h-8 text-xs bg-background"
                />
                <Button type="submit" size="icon" className="h-8 w-8 shrink-0">
                    <Send size={14} />
                </Button>
            </form>
        </div>
    );
}
