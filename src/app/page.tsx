"use client";

import React, { useEffect } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

import { ParentWelcome } from "@/components/dashboard/ParentWelcome";
import { ChildSelector } from "@/components/dashboard/ChildSelector";
import { StudentStatusBanner } from "@/components/dashboard/StudentStatusBanner";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { FeeSummaryCard } from "@/components/fees/FeeSummaryCard";
import { PaymentHistoryTable } from "@/components/fees/PaymentHistoryTable";
import { AcademicSummaryCard } from "@/components/results/AcademicSummaryCard";
import { ResultsTable } from "@/components/results/ResultsTable";
import { usePortalStore } from "@/store/usePortalStore";
import { ErrorCard } from "@/components/shared/ErrorCard";


export default function DashboardPage() {
  const { initializePortal, error, retry, children } = usePortalStore();

  useEffect(() => {
    initializePortal();
  }, [initializePortal]);

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 lg:pb-8">
        <Header />

        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar />

          <main className="flex-1 px-3.5 py-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-full min-w-0 pb-28 sm:pb-12">
            {/* Top Welcome Hero */}
            <ParentWelcome />


            {/* Error Banner if Top Level Error */}
            {error && (
              <ErrorCard error={error} onRetry={retry} title="Service Connection Alert" />
            )}

            {/* Child Selector (Multiple Children Switcher) */}
            <ChildSelector />

            {/* Student Status-Reactive Notice Banner */}
            <StudentStatusBanner />

            {/* Quick KPI Overview */}
            <QuickStats />

            {/* Section 2: Fee Summary & Billing */}
            <section className="space-y-4" aria-labelledby="fee-summary-heading">
              <FeeSummaryCard />
              <PaymentHistoryTable />
            </section>

            {/* Section 3: Academic Results */}
            <section className="space-y-4" aria-labelledby="academic-results-heading">
              <AcademicSummaryCard />
              <ResultsTable />
            </section>
          </main>
        </div>

        {/* Mobile Navigation Drawer & Bottom Bar */}
        <MobileNav />
      </div>
    </AuthGuard>
  );
}

