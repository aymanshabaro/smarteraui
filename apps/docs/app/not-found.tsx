import Link from "next/link";
import { buttonClasses } from "~/components/primitives";

export default function NotFound() {
    return (
        <main className="bg-primary flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-brand-secondary text-sm font-semibold">404</p>
            <h1 className="text-display-sm text-primary font-semibold">Page not found</h1>
            <p className="text-md text-tertiary max-w-lg">The page you are looking for does not exist, or has not been published yet.</p>
            <Link href="/" className={`${buttonClasses("secondary")} mt-2`}>
                <span className="px-0.5">Back to the documentation</span>
            </Link>
        </main>
    );
}
