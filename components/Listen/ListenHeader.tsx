import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ListenHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between py-4 px-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 border-none bg-transparent text-white/70 hover:text-white cursor-pointer transition-colors outline-none"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <Link
        href="/"
        className="font-display text-xl text-white/70 hover:text-white no-underline transition-colors"
      >
        Smokey FM
      </Link>
    </div>
  );
}
