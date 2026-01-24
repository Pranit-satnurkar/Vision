
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background p-8 lg:p-12 lg:grid lg:grid-cols-12 gap-12">
            {/* Left Panel Skeleton */}
            <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col justify-between h-[calc(100vh-6rem)] sticky top-12 border-r border-border/50 pr-8">
                <div className="space-y-8">
                    <Skeleton className="h-4 w-32" />
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-3/4" />
                        <Skeleton className="h-20 w-1/2" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-32 ml-auto" />
                    </div>
                </div>
            </aside>

            {/* Right Feed Skeleton */}
            <main className="lg:col-span-7 xl:col-span-8 space-y-12">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-6">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                ))}
            </main>
        </div>
    );
}
