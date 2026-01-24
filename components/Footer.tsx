
export default function Footer() {
    return (
        <footer className="p-4 border-t mt-auto">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Portfolio. All rights reserved.
            </div>
        </footer>
    );
}
