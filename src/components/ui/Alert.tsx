import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "error" | "success";
  title?: string;
  onDismiss?: () => void;
}

export function Alert({
  variant = "info",
  title,
  children,
  className,
  onDismiss,
  ...props
}: AlertProps) {
  const variantStyles = {
    info: {
      container: "bg-blue-50/80 border-blue-200/80 text-blue-900",
      icon: <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />,
      titleColor: "text-blue-950 font-semibold",
    },
    warning: {
      container: "bg-amber-50/80 border-amber-200/80 text-amber-900",
      icon: <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />,
      titleColor: "text-amber-950 font-semibold",
    },
    error: {
      container: "bg-rose-50/80 border-rose-200/80 text-rose-900",
      icon: <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />,
      titleColor: "text-rose-950 font-semibold",
    },
    success: {
      container: "bg-emerald-50/80 border-emerald-200/80 text-emerald-900",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />,
      titleColor: "text-emerald-950 font-semibold",
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-3 rounded-2xl border p-4 text-sm transition-all",
        style.container,
        className
      )}
      {...props}
    >
      {style.icon}
      <div className="flex-1 min-w-0">
        {title && <h5 className={cn("text-sm mb-1", style.titleColor)}>{title}</h5>}
        <div className="text-xs leading-relaxed opacity-90">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
