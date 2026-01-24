
import Section from "@/components/Section";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import experience from "@/data/experience.json";

export default function Experience() {
    return (
        <Section id="experience">
            <FadeIn className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional Journey</h2>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    A timeline of impact-driven roles where I've leveraged data and AI to solve complex business problems.
                </p>
            </FadeIn>

            <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-px bg-border md:-translate-x-1/2 hidden md:block"></div>

                {experience.map((exp, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                        <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Timeline Node */}
                            <div className="absolute left-4 md:left-[50%] w-3 h-3 bg-primary rounded-full md:-translate-x-1.5 hidden md:block"></div>

                            <div className="w-full md:w-1/2">
                                <Card className="relative overflow-hidden glass-panel hover:bg-background/80 transition-all duration-500 rounded-xl border-white/10">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-accent"></div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-xl">{exp.role}</h3>
                                            <Badge variant="secondary">{exp.period}</Badge>
                                        </div>
                                        <div className="text-lg font-medium text-muted-foreground">{exp.company}</div>
                                        <div className="text-sm text-muted-foreground">{exp.description}</div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                            {exp.achievements.map((ach, i) => (
                                                <li key={i}>{ach}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </Section>
    );
}
