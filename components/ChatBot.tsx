"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm Pranit's AI assistant. Ask me anything about his projects, skills, or experience.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change or loading state changes
    useEffect(() => {
        const scrollToBottom = () => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        };

        // Small timeout to ensure DOM is updated
        const timeoutId = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timeoutId);
    }, [messages, isOpen, isLoading]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error:", errorText);
                throw new Error(`Failed to fetch response: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, something went wrong. Please try again later." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[90vw] max-w-[400px] h-[500px] bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Pranit's Assistant</h3>
                                    <p className="text-xs text-muted-foreground">Powered by Groq</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 rounded-full hover:bg-background/80"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                            msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div
                                        className={cn(
                                            "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                            msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted text-foreground rounded-tl-none"
                                        )}
                                    >
                                        <ReactMarkdown
                                            components={{
                                                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-accent-foreground" />,
                                                p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                                                ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-2" />,
                                                ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 mb-2" />,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                        {/* Input */}
                        <div className="p-4 border-t border-border bg-background/50">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask something..."
                                    className="flex-1 bg-background/50 border-border/50 focus-visible:ring-indigo-500 rounded-full px-4"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isLoading || !input.trim()}
                                    className="rounded-full w-10 h-10 shrink-0 bg-primary hover:bg-primary/90 transition-colors"
                                >
                                    <Send size={18} />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-accent rounded-full shadow-xl flex items-center justify-center text-white z-50 hover:shadow-2xl transition-shadow"
            >
                <MessageCircle size={24} />
            </motion.button>
        </>
    );
}
