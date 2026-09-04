"use client";

import React from "react";
import { 
  Trophy, 
  TrendingUp, 
  Wallet, 
  CheckCircle2, 
  Clock, 
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-2 w-16" />
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* KPI 1: Class Position */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Class Position</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Trophy className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {getOrdinal(classPosition)}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            out of <span className="font-semibold text-slate-700">{totalStudents}</span> students in class
          </p>
        </div>
      </div>

      {/* KPI 2: Overall Academic Average */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Term Average</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Percent className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
            {currentAverage.toFixed(1)}%
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {currentAverage >= 75 ? "Distinction Range" : "Good Standing"}
          </p>
        </div>
      </div>

      {/* KPI 3: Fee Balance */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fee Balance</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
            <Wallet className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className={`text-xl sm:text-2xl font-black tracking-tight ${outstandingBalance > 0 ? "text-amber-600" : "text-slate-900"}`}>
            {formatNaira(outstandingBalance)}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {outstandingBalance === 0 ? "Full Fees Settled" : "Balance Due for Term"}
          </p>
        </div>
      </div>

      {/* KPI 4: Term Attendance */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Attendance</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <UserCheck className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {attendanceRate}%
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {selectedStudent.metrics.totalDaysPresent} of {selectedStudent.metrics.totalSchoolDays} school days
          </p>
        </div>
      </div>
    </div>
  );
}
