import React from "react";
import { Receipt, History, AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export function PaymentEmptyState() {
  return (
    <EmptyState
      icon={<History className="h-6 w-6 text-slate-400" />}
      title="No Payment Records Found"
      description="There are currently no recorded payments or bank transactions for the selected student profile. Invoices can be settled via bank transfer or online portal payment."
    />
  );
}
