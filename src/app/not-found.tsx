import Link from "next/link";
import { GraduationCap, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4 shadow-lg">
        <GraduationCap className="h-8 w-8 text-amber-400" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
        404 Error • Page Not Found
      </span>
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Requested Resource Unavailable
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
        The parent portal page or student record you are attempting to view may have been archived, moved, or is temporarily inaccessible.
      </p>
      <Link href="/">
        <Button variant="primary" leftIcon={<Home className="h-4 w-4" />}>
          Return to Parent Dashboard
        </Button>
      </Link>
    </div>
  );
}
