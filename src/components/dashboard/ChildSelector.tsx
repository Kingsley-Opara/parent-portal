"use client";

import React from "react";
import { Users, CheckCircle, Award, AlertCircle, UserMinus } from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { getStudentStatusMeta, getOrdinal } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { StudentProfileSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";

export function ChildSelector() {
  const { children, selectedStudentId, setSelectedStudentId, isLoading, isInitialLoading } = usePortalStore();

  if (isInitialLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
        description="There are currently no student records associated with this parent phone number or email address. Please contact the school admissions office to link your wards."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-indigo-600" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Select Child ({children.length})
          </h2>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline-block">
          Click a student card to switch active dashboard views
        </span>
      </div>

      {/* Multi-child cards list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {children.map((child) => {
          const isSelected = child.id === selectedStudentId;
          const statusMeta = getStudentStatusMeta(child.status);

          return (
            <button
              key={child.id}
              onClick={() => setSelectedStudentId(child.id)}
              className={cn(
                "relative flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all cursor-pointer border select-none group",
                isSelected
                  ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                  : "bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-xs hover:shadow-sm"
              )}
            >
              {/* Selected indicator checkmark */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <CheckCircle className="h-3 w-3" />
                </div>
              )}

              {/* Avatar with status indicator ring */}
              <div className="relative shrink-0">
                <img
                  src={child.avatarUrl}
                  alt={`${child.firstName} ${child.lastName}`}
                  className={cn(
                    "h-12 w-12 rounded-full object-cover border-2 transition-transform group-hover:scale-105",
                    isSelected ? "border-indigo-600" : "border-slate-200"
                  )}
                />
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white",
                    statusMeta.dotClass
                  )}
                  title={`Status: ${statusMeta.label}`}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {child.firstName} {child.lastName}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                  {child.classInfo.name}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-md border",
                      statusMeta.badgeClass
                    )}
                  >
                    {statusMeta.label}
                  </span>

                  {child.status === "active" && (
                    <span className="text-[10px] text-slate-500">
                      Avg: <strong className="text-slate-800 font-bold">{child.metrics.currentAverage}%</strong>
                    </span>
                  )}

                  {child.status === "graduated" && (
                    <span className="text-[10px] text-indigo-700 font-semibold flex items-center gap-0.5">
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
