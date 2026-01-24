
import Section from "@/components/Section";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Mail, Copy } from "lucide-react";
import bio from "@/data/bio.json";

export default function Contact() {
    return (
        <Section id="contact" className="py-32 bg-primary text-primary-foreground text-center">
            <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Let's build something exceptional.</h2>
                <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
                    Whether you have a project in mind or just want to chat about AI, I'd love to hear from you.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href={bio.socialLinks.email} className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                        <Button size="lg" variant="secondary" className="h-14 min-w-[44px] px-8 text-lg rounded-full w-full sm:w-auto active:scale-[0.98] transition-all">
                            <Mail className="mr-2 h-5 w-5" /> Send me an email
                        </Button>
                    </a>
                </div>
            </FadeIn>
        </Section>
    );
}
