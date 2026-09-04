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
    <div className="rounded-2xl sm:rounded-3xl bg-slate-900 p-5 sm:p-7 text-white shadow-sm border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300 mb-2 border border-white/10">
            <Sparkles className="h-3 w-3" />
            <span>Katalysa Portal • {selectedSession}</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            Welcome back, {user?.title} {user?.lastName}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Monitor academic achievements, continuous assessments (CA), and school billing across your registered wards.
          </p>
        </div>

        {/* Term & Children Badges */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700 text-xs">
            <CalendarDays className="h-4 w-4 text-indigo-400 shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Active Term</p>
              <p className="font-bold text-white text-xs">{selectedTerm}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700 text-xs">
            <Users className="h-4 w-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Registered Wards</p>
              <p className="font-bold text-white text-xs">{children.length} ({activeCount} Active)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
