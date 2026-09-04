"use client";

import React, { useEffect } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ChildSelector } from "@/components/dashboard/ChildSelector";
import { StudentStatusBanner } from "@/components/dashboard/StudentStatusBanner";
import { AcademicSummaryCard } from "@/components/results/AcademicSummaryCard";
import { ResultsTable } from "@/components/results/ResultsTable";
import { usePortalStore } from "@/store/usePortalStore";
import { GraduationCap } from "lucide-react";

export default function ResultsPage() {
  const { initializePortal } = usePortalStore();

  useEffect(() => {
    initializePortal();
  }, [initializePortal]);

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 lg:pb-8">
        <Header />

        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-full min-w-0 overflow-hidden">
            {/* Breadcrumb / Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
                <GraduationCap className="h-4 w-4" />
                <span>Academic Records & Transcripts</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Academic Results & Performance
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed subject score breakdowns, continuous assessment metrics, and certified PDF report cards.
              </p>
            </div>

            {/* Child Selector */}
            <ChildSelector />

            {/* Status Banner */}
            <StudentStatusBanner />

            {/* Academic Summary */}
            <AcademicSummaryCard />

            {/* Results Breakdown Table */}
            <ResultsTable />
          </main>
        </div>

        <MobileNav />
      </div>
    </AuthGuard>
  );
}

