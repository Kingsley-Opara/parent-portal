"use client";

import React from "react";
import { Sparkles, CalendarDays, Users } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePortalStore } from "@/store/usePortalStore";
import { SCHOOL_INFO } from "@/lib/constants";

export function ParentWelcome() {
  const { user } = useAuthStore();
  const { children, selectedSession, selectedTerm } = usePortalStore();

  const activeCount = children.filter((c) => c.status === "active").length;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white shadow-lg">
      {/* Background glowing ambient accents */}
      <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="absolute right-32 -bottom-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-md mb-3 border border-white/10">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Katalysa Parent Portal • {selectedSession}</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Welcome back, {user?.title} {user?.lastName}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Monitor academic achievements, review termly continuous assessments (CA), and manage school billing across your registered wards.
          </p>
        </div>

        {/* Term & Children Quick Badges */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-md border border-white/10 text-xs">
            <CalendarDays className="h-4 w-4 text-indigo-300 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Active Term</p>
              <p className="font-bold text-white">{selectedTerm}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-md border border-white/10 text-xs">
            <Users className="h-4 w-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Registered Wards</p>
              <p className="font-bold text-white">{children.length} ({activeCount} Active)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
