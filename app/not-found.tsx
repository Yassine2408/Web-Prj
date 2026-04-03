import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">The page you requested does not exist.</p>
      <Link href="/" className="rounded-xl border border-border px-4 py-2 text-sm">
        Back to home
      </Link>
    </div>
  );
}
