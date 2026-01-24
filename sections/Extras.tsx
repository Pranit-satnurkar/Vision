
import Section from "@/components/Section";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Music, Camera, Feather, ExternalLink } from "lucide-react";

export default function Extras() {
    const items = [
        {
            title: "Strings & Frequencies",
            description: "Guitarist, teacher, and performer since 2015. Merging leadership with creative discipline.",
            link: "https://www.youtube.com/@Pranit.Guitarist",
            icon: Music,
            color: "text-rose-500"
        },
        {
            title: "Visual Narrative",
            description: "Photographer since 2016. Mastering composition and detail.",
            link: "https://stock.adobe.com/in/contributor/208823292/Pranit?asset_id=533002621",
            icon: Camera,
            color: "text-blue-500"
        },
        {
            title: "The Narrative",
            description: "Where data meets storytelling.",
            link: "https://deepcurrentswrites.blogspot.com/",
            icon: Feather,
            color: "text-amber-500"
        }
    ];

    return (
        <Section id="extras">
            <FadeIn className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-6">Beyond the Code</h2>
                <p className="text-lg text-muted-foreground w-full">
                    I believe that great engineering comes from a diversity of inputs. Here's what keeps my mind sharp.
                </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                            <Card className="glass-panel border-white/10 h-full hover:bg-background/80 transition-all duration-500 group relative overflow-hidden rounded-xl">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-md bg-background/50 ${item.color}`}>
                                                <item.icon size={20} />
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
                                        </div>
                                        <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors leading-relaxed">
                                        {item.description}
                                    </p>
                                </CardContent>
                                {/* Subtle Background Gradient on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </Card>
                        </a>
                    </FadeIn>
                ))}
            </div>
        </Section>
    );
}
