"use client";

import React, { useState } from "react";
import { 
  History, 
  CheckCircle, 
  FileText 
} from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { formatNaira, formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { PaymentEmptyState } from "./PaymentEmptyState";
import { ErrorCard } from "@/components/shared/ErrorCard";
import { PaymentRecord } from "@/types/fees";
import { Modal } from "@/components/ui/Modal";

export function PaymentHistoryTable() {
  const { paymentHistory, isLoading, error, retry } = usePortalStore();
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="h-5 w-40 bg-slate-200 rounded mb-4 animate-pulse" />
        <TableSkeleton rows={3} />
      </div>
    );
  }

  if (error) {
    return <ErrorCard error={error} onRetry={retry} title="Payment History Unavailable" />;
  }

  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Payment History</h3>
        </div>
        <PaymentEmptyState />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shrink-0">
              <History className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Payment History
              </h3>
              <p className="text-[11px] text-slate-500">
                {paymentHistory.length} recorded transaction{paymentHistory.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Table (>640px) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Reference / Receipt</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3">Channel</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {paymentHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {formatDate(item.transactionDate)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-mono text-[11px] font-semibold text-slate-800">
                      {item.receiptNumber}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono">{item.reference}</p>
                  </td>
                  <td className="py-3.5 px-3 text-slate-800 max-w-xs truncate">
                    {item.description}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 capitalize">
                    {item.paymentMethod.replace("_", " ")}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                    {formatNaira(item.amount)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="h-3 w-3" />
                      Paid
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedReceipt(item)}
                      className="text-indigo-600 hover:bg-indigo-50"
                      leftIcon={<FileText className="h-3.5 w-3.5" />}
                    >
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Clean Card List (<640px / ~375px mobile friendly) */}
        <div className="sm:hidden space-y-2.5">
          {paymentHistory.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {formatDate(item.transactionDate)}
                  </span>
                  <span className="font-bold text-slate-900 font-mono text-xs">
                    {item.receiptNumber}
                  </span>
                </div>
                <span className="text-sm font-black text-slate-900">
                  {formatNaira(item.amount)}
                </span>
              </div>

              <p className="text-slate-600 leading-snug text-[11px]">{item.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[10px] font-medium text-slate-500 capitalize">
                  {item.paymentMethod.replace("_", " ")}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedReceipt(item)}
                  className="h-7 text-[11px] px-2.5"
                  leftIcon={<FileText className="h-3 w-3" />}
                >
                  View Receipt
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Transaction Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="Official Bursary Receipt"
          description="Katalysa Financial Settlement Verification"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-1.5" />
              <p className="text-sm font-bold text-emerald-950">Payment Confirmed</p>
              <p className="text-2xl font-black text-emerald-700 mt-1">
                {formatNaira(selectedReceipt.amount)}
              </p>
            </div>

            <div className="space-y-2 divide-y divide-slate-100 text-slate-700">
              <div className="flex justify-between pt-2">
                <span className="text-slate-500 font-medium">Receipt No:</span>
                <span className="font-mono font-bold text-slate-900">{selectedReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500 font-medium">Reference:</span>
                <span className="font-mono text-slate-700">{selectedReceipt.reference}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500 font-medium">Date & Time:</span>
                <span>{new Date(selectedReceipt.transactionDate).toLocaleString("en-GB")}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500 font-medium">Purpose:</span>
                <span className="text-right max-w-[200px] font-semibold">{selectedReceipt.description}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500 font-medium">Channel:</span>
                <span className="capitalize">{selectedReceipt.channelDetails || selectedReceipt.paymentMethod}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button size="sm" variant="outline" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
