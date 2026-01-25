
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    containerClassName?: string;
}

export default function Section({
    children,
    className,
    containerClassName,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn("py-24 md:py-32 lg:py-40 px-4 md:px-6 relative overflow-hidden scroll-mt-32", className)}
            {...props}
        >
            <div className={cn("container mx-auto max-w-[1320px]", containerClassName)}>
                {children}
            </div>
        </section>
    );
}
