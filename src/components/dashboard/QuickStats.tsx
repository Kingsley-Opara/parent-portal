"use client";

import React from "react";
import { 
  Trophy, 
  Wallet, 
  Percent, 
  UserCheck 
} from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { formatNaira, getOrdinal } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/Skeleton";

export function QuickStats() {
  const { children, selectedStudentId, feeSummary, academicResult, isLoading, isInitialLoading } = usePortalStore();
  const selectedStudent = children.find((c) => c.id === selectedStudentId);

  if (isInitialLoading || isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-2 w-14" />
          </div>
        ))}
      </div>
    );
  }

  if (!selectedStudent) return null;

  const currentAverage = academicResult?.overallAverage ?? selectedStudent.metrics.currentAverage;
  const classPosition = academicResult?.classPosition ?? selectedStudent.metrics.classPosition;
  const totalStudents = academicResult?.totalStudentsInClass ?? selectedStudent.metrics.totalStudentsInClass;
  const attendanceRate = selectedStudent.metrics.attendanceRate;
  const outstandingBalance = feeSummary?.outstandingBalance ?? 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {/* KPI 1: Class Position */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Position</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
            <Trophy className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            {getOrdinal(classPosition)}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
            of {totalStudents} in class
          </p>
        </div>
      </div>

      {/* KPI 2: Overall Academic Average */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Percent className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-lg sm:text-2xl font-black text-emerald-600 tracking-tight">
            {currentAverage.toFixed(1)}%
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
            {currentAverage >= 75 ? "Distinction" : "Good Standing"}
          </p>
        </div>
      </div>

      {/* KPI 3: Fee Balance */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fee Balance</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
            <Wallet className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <p className={`text-lg sm:text-2xl font-black tracking-tight ${outstandingBalance > 0 ? "text-amber-600" : "text-slate-900"}`}>
            {formatNaira(outstandingBalance)}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium truncate">
            {outstandingBalance === 0 ? "Fully Paid" : "Balance Due"}
          </p>
        </div>
      </div>

      {/* KPI 4: Term Attendance */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            <UserCheck className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            {attendanceRate}%
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
            {selectedStudent.metrics.totalDaysPresent}/{selectedStudent.metrics.totalSchoolDays} days
          </p>
        </div>
      </div>
    </div>
  );
}
