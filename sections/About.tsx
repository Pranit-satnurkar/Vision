
import Section from "@/components/Section";
import FadeIn from "@/components/animations/FadeIn";
import Stagger, { StaggerItem } from "@/components/animations/Stagger";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, Code, LineChart } from "lucide-react";
import bio from "@/data/bio.json";

// Mapping broad skill categories to icons/titles
const VALUES = [
    {
        icon: LineChart,
        title: "Data Analysis",
        skills: bio.skills.analysis
    },
    {
        icon: Code,
        title: "Engineering",
        skills: [...bio.skills.programming, ...bio.skills.web, ...bio.skills.cloud.slice(0, 2)]
    },
    {
        icon: Brain,
        title: "AI Integration",
        skills: ["LLMs", "RAG", "Prompt Engineering", "Predictive Modeling", ...bio.skills.cloud.slice(2)]
    }
];

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
                    {VALUES.map((item, index) => (
                        <StaggerItem key={index} className="h-full">
                            <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <item.icon size={24} />
                                    </div>
                                    <CardTitle className="text-xl">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {item.skills.map(skill => (
                                            <span key={skill} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </Section>
    );
}
