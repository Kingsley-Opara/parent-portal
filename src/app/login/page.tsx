import React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { SCHOOL_INFO } from "@/lib/constants";
import { GraduationCap, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Parent Login | Katalysa School Portal",
  description: "Sign in to access your child's academic records, fees, and results.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      {/* Top minimal header */}
      <header className="px-6 py-4 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white">
              <GraduationCap className="h-4.5 w-4.5 text-amber-400" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Katalysa
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {SCHOOL_INFO.shortName}
          </span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8">
          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-slate-200/60 text-center text-xs text-slate-400 bg-white/50">
        <p>© {new Date().getFullYear()} Katalysa SaaS. All rights reserved. • {SCHOOL_INFO.address}</p>
      </footer>
    </div>
  );
}
