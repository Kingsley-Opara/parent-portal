"use client";

import React, { useState } from "react";
import { 
  Receipt, 
  CreditCard 
} from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { formatNaira, getPaymentStatusMeta } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";
import { FeeCardSkeleton } from "@/components/ui/Skeleton";
import { Modal } from "@/components/ui/Modal";
import { ErrorCard } from "@/components/shared/ErrorCard";

export function FeeSummaryCard() {
  const { feeSummary, isLoading, error, retry, selectedSession, selectedTerm } = usePortalStore();
  const [breakdownModalOpen, setBreakdownModalOpen] = useState(false);

  if (isLoading) {
    return <FeeCardSkeleton />;
  }

  if (error) {
    return <ErrorCard error={error} onRetry={retry} title="Fee Summary Unavailable" />;
  }

  if (!feeSummary) {
    return null;
  }

  const statusMeta = getPaymentStatusMeta(feeSummary.status);
  const percentPaid = feeSummary.totalFees > 0 
    ? Math.min(100, Math.round((feeSummary.amountPaid / feeSummary.totalFees) * 100))
    : 100;

  return (
    <>
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
              <CreditCard className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Fee Summary</h3>
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${statusMeta.badgeClass}`}>
                  {statusMeta.label}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {selectedSession} • {selectedTerm}
              </p>
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBreakdownModalOpen(true)}
              leftIcon={<Receipt className="h-3.5 w-3.5 text-slate-500" />}
              className="text-xs h-8 sm:h-9"
            >
              Breakdown
            </Button>
          </div>
        </div>

        {/* 3 Metrics Grid (Prompt Example: Total: ₦55,000 | Paid: ₦25,000 | Balance: ₦30,000 | Status: Partial) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 my-4 sm:my-5">
          {/* Total Fees */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Fees
            </span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {formatNaira(feeSummary.totalFees)}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
              Tuition, ICT & Levies
            </p>
          </div>

          {/* Amount Paid */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Amount Paid
            </span>
            <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">
              {formatNaira(feeSummary.amountPaid)}
            </p>
            <p className="text-[10px] text-emerald-700/80 mt-0.5 font-medium">
              {percentPaid}% of term total settled
            </p>
          </div>

          {/* Outstanding Balance */}
          <div className={`p-3.5 rounded-2xl border ${feeSummary.outstandingBalance > 0 ? "bg-amber-50/70 border-amber-200/80" : "bg-slate-50 border-slate-200/80"}`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${feeSummary.outstandingBalance > 0 ? "text-amber-800" : "text-slate-400"}`}>
              Outstanding Balance
            </span>
            <p className={`text-xl sm:text-2xl font-black mt-0.5 ${feeSummary.outstandingBalance > 0 ? "text-amber-700" : "text-slate-800"}`}>
              {formatNaira(feeSummary.outstandingBalance)}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
              {feeSummary.outstandingBalance > 0 ? `Due by ${feeSummary.dueDate}` : "All settled"}
            </p>
          </div>
        </div>

        {/* Payment Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Payment Completion</span>
            <span className="text-slate-900 font-bold">{percentPaid}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${statusMeta.progressColor}`}
              style={{ width: `${percentPaid}%` }}
            />
          </div>
        </div>
      </div>

      {/* Itemized Fee Breakdown Modal */}
      <Modal
        isOpen={breakdownModalOpen}
        onClose={() => setBreakdownModalOpen(false)}
        title={`Itemized Fee Breakdown (${selectedTerm})`}
        description={`Fee schedule for ${feeSummary.studentName} (${feeSummary.admissionNumber})`}
        maxWidth="lg"
      >
        <div className="space-y-3.5">
          <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {feeSummary.itemsBreakdown.map((item) => (
              <div key={item.id} className="p-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <span className="font-bold text-slate-900">{formatNaira(item.amount)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Cumulative Term Total:</span>
            <span className="text-base font-black text-slate-900">{formatNaira(feeSummary.totalFees)}</span>
          </div>

          <div className="flex justify-end pt-2">
            <Button size="sm" variant="outline" onClick={() => setBreakdownModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
