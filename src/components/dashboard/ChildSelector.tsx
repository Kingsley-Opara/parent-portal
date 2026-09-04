"use client";

import React from "react";
import { Users, CheckCircle, Award } from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { getStudentStatusMeta } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { StudentProfileSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";

export function ChildSelector() {
  const { children, selectedStudentId, setSelectedStudentId, isInitialLoading } = usePortalStore();

  if (isInitialLoading) {
    return (
      <div className="space-y-3">
        <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto no-scrollbar">
          <StudentProfileSkeleton />
          <StudentProfileSkeleton />
          <StudentProfileSkeleton />
        </div>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-6 w-6 text-slate-400" />}
        title="No Registered Children Found"
        description="There are currently no student records associated with this parent profile."
      />
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-indigo-600" />
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Select Child ({children.length})
          </h2>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          Tap to switch ward
        </span>
      </div>

      {/* Horizontal Carousel on Mobile / Grid on Tablet & Desktop */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 snap-x">
        {children.map((child) => {
          const isSelected = child.id === selectedStudentId;
          const statusMeta = getStudentStatusMeta(child.status);

          return (
            <button
              key={child.id}
              onClick={() => setSelectedStudentId(child.id)}
              className={cn(
                "relative shrink-0 w-[240px] sm:w-auto flex items-center gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer border select-none snap-start active:scale-[0.98]",
                isSelected
                  ? "bg-white border-indigo-600 shadow-sm ring-2 ring-indigo-600/15"
                  : "bg-white border-slate-200/90 hover:border-slate-300"
              )}
            >
              {/* Selected indicator checkmark */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <CheckCircle className="h-3 w-3" />
                </div>
              )}

              {/* Avatar with status dot */}
              <div className="relative shrink-0">
                <img
                  src={child.avatarUrl}
                  alt={`${child.firstName} ${child.lastName}`}
                  className={cn(
                    "h-11 w-11 rounded-full object-cover border-2",
                    isSelected ? "border-indigo-600" : "border-slate-200"
                  )}
                />
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white",
                    statusMeta.dotClass
                  )}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 pr-3">
                <h3 className="text-xs font-bold text-slate-900 truncate">
                  {child.firstName} {child.lastName}
                </h3>

                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                  {child.classInfo.name}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span
                    className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded-md border",
                      statusMeta.badgeClass
                    )}
                  >
                    {statusMeta.label}
                  </span>

                  {child.status === "active" && (
                    <span className="text-[10px] text-slate-600 font-medium">
                      Avg: <strong className="text-slate-900 font-bold">{child.metrics.currentAverage}%</strong>
                    </span>
                  )}

                  {child.status === "graduated" && (
                    <span className="text-[9px] text-indigo-700 font-semibold flex items-center gap-0.5">
                      <Award className="h-2.5 w-2.5" /> Alumni
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
