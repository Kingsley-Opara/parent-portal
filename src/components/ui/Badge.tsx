import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "slate" | "emerald" | "amber" | "rose" | "indigo" | "blue" | "teal";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "slate",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/10",
    amber: "bg-amber-50 text-amber-800 border-amber-200 ring-amber-600/10",
    rose: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/10",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-600/10",
    blue: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/10",
    teal: "bg-teal-50 text-teal-700 border-teal-200 ring-teal-600/10",
  };

  const dotStyles = {
    slate: "bg-slate-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    teal: "bg-teal-500",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium rounded-md",
    md: "text-xs px-2.5 py-1 font-medium rounded-full",
    lg: "text-sm px-3 py-1.5 font-medium rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", dotStyles[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
