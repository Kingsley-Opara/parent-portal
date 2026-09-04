import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/types/api";

interface ErrorCardProps {
  error: ApiError | string | null;
  onRetry?: () => void;
  title?: string;
}

export function ErrorCard({
  error,
  onRetry,
  title = "Failed to load information",
}: ErrorCardProps) {
  const message = typeof error === "string" ? error : error?.message || "An unexpected error occurred.";
  const detail = typeof error === "object" && error !== null ? error.detail : undefined;
  const statusCode = typeof error === "object" && error !== null ? error.statusCode : undefined;

  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 sm:p-8 text-center max-w-lg mx-auto shadow-xs">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4 ring-8 ring-rose-50">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-rose-700 font-medium mb-2">{message}</p>
      {detail && (
        <p className="text-[11px] text-slate-500 font-mono bg-white/80 p-2 rounded-lg border border-rose-100 mb-4 inline-block max-w-md break-words">
          {statusCode ? `[HTTP ${statusCode}] ` : ""}{detail}
        </p>
      )}
      {onRetry && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            className="border-rose-300 text-rose-800 hover:bg-rose-100/60"
          >
            Retry Request
          </Button>
        </div>
      )}
    </div>
  );
}
