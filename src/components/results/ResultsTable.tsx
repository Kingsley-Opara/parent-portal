"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  HelpCircle, 
  LayoutList, 
  Table as TableIcon,
  Info
} from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { getGradeBadgeMeta } from "@/lib/formatters";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { ResultsEmptyState } from "./ResultsEmptyState";
import { ErrorCard } from "@/components/shared/ErrorCard";
import { GRADING_SCALE } from "@/lib/constants";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function ResultsTable() {
  const { academicResult, isLoading, error, retry } = usePortalStore();
  const [mobileViewMode, setMobileViewMode] = useState<"cards" | "table">("cards");
  const [gradingScaleModalOpen, setGradingScaleModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
        <div className="h-5 w-44 bg-slate-200 rounded mb-4 animate-pulse" />
        <TableSkeleton rows={5} />
      </div>
    );
  }

  if (error) {
    return <ErrorCard error={error} onRetry={retry} title="Academic Results Unavailable" />;
  }

  if (!academicResult || !academicResult.subjects || academicResult.subjects.length === 0) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Subject Breakdown</h3>
        </div>
        <ResultsEmptyState />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
        {/* Table Header & View Toggles */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 shrink-0">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Subject Performance Scores
              </h3>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Continuous Assessments (CA1 & CA2) + Terminal Examination
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile View Switcher (Cards vs Table) */}
            <div className="sm:hidden flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setMobileViewMode("cards")}
                className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                  mobileViewMode === "cards" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500"
                }`}
              >
                <LayoutList className="h-3 w-3" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setMobileViewMode("table")}
                className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                  mobileViewMode === "table" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500"
                }`}
              >
                <TableIcon className="h-3 w-3" />
                <span>Table</span>
              </button>
            </div>

            {/* Grading Scale Guide Modal Trigger */}
            <button
              onClick={() => setGradingScaleModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Grading Key</span>
            </button>
          </div>
        </div>

        {/* 1. Desktop Tabular View (Hidden on mobile when cards mode active) */}
        <div className={`overflow-x-auto ${mobileViewMode === "cards" ? "hidden sm:block" : "block"}`}>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-3 rounded-l-xl">Subject</th>
                <th className="py-3 px-2.5 text-center">CA1 (20)</th>
                <th className="py-3 px-2.5 text-center">CA2 (20)</th>
                <th className="py-3 px-2.5 text-center">Exam (60)</th>
                <th className="py-3 px-2.5 text-center">Total (100)</th>
                <th className="py-3 px-2.5 text-center">%</th>
                <th className="py-3 px-2.5 text-center">Grade</th>
                <th className="py-3 px-3 rounded-r-xl">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {academicResult.subjects.map((sub) => {
                const gradeMeta = getGradeBadgeMeta(sub.grade);
                return (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {sub.subjectName}
                      {sub.subjectTeacher && (
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {sub.subjectTeacher}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2.5 text-center text-slate-600">{sub.ca1}</td>
                    <td className="py-3 px-2.5 text-center text-slate-600">{sub.ca2}</td>
                    <td className="py-3 px-2.5 text-center text-slate-600 font-medium">{sub.exam}</td>
                    <td className="py-3 px-2.5 text-center font-bold text-slate-900 text-sm">
                      {sub.total}
                    </td>
                    <td className="py-3 px-2.5 text-center text-slate-700 font-semibold">
                      {sub.percentage}%
                    </td>
                    <td className="py-3 px-2.5 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-md border text-xs font-bold ${gradeMeta.bg}`}>
                        {sub.grade}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                      <span className="text-xs font-medium">{sub.remark}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Aggregate Footer */}
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-slate-50 font-bold text-xs text-slate-900">
                <td className="py-3 px-3">Aggregate Total</td>
                <td colSpan={3} className="py-3 px-2.5 text-center text-slate-500 font-normal">
                  {academicResult.subjects.length} Subjects Evaluated
                </td>
                <td className="py-3 px-2.5 text-center text-indigo-700 font-black text-sm">
                  {academicResult.totalScore}
                </td>
                <td className="py-3 px-2.5 text-center text-indigo-700 font-black">
                  {academicResult.overallAverage.toFixed(1)}%
                </td>
                <td colSpan={2} className="py-3 px-3 text-right text-slate-600 font-medium">
                  Position: <strong className="text-slate-900">{academicResult.classPosition} of {academicResult.totalStudentsInClass}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* 2. Mobile Card List (<640px / ~375px mobile friendly) */}
        {mobileViewMode === "cards" && (
          <div className="sm:hidden space-y-2.5">
            {academicResult.subjects.map((sub) => {
              const gradeMeta = getGradeBadgeMeta(sub.grade);
              return (
                <div
                  key={sub.id}
                  className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-2.5 shadow-2xs"
                >
                  {/* Card Header: Subject Name & Grade */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{sub.subjectName}</h4>
                      <span className="text-[10px] text-slate-400">{sub.subjectTeacher}</span>
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded-md border text-xs font-bold ${gradeMeta.bg}`}>
                        Grade {sub.grade}
                      </span>
                    </div>
                  </div>

                  {/* Assessment Scores Grid */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">CA1</span>
                      <span className="font-bold text-slate-700">{sub.ca1}/20</span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">CA2</span>
                      <span className="font-bold text-slate-700">{sub.ca2}/20</span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">Exam</span>
                      <span className="font-bold text-slate-700">{sub.exam}/60</span>
                    </div>
                    <div className="bg-indigo-50 p-1.5 rounded-xl border border-indigo-100">
                      <span className="text-[9px] text-indigo-700 font-bold block uppercase">Total</span>
                      <span className="font-black text-indigo-950">{sub.total}%</span>
                    </div>
                  </div>

                  {/* Remark */}
                  <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-slate-100">
                    <span className="text-slate-400 font-medium">Remark:</span>
                    <span className="font-bold text-slate-700">{sub.remark}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Official Grading Scale Reference Modal */}
      <Modal
        isOpen={gradingScaleModalOpen}
        onClose={() => setGradingScaleModalOpen(false)}
        title="Official Academic Grading System"
        description="WAEC / Cambridge Curriculum Assessment Scale"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="p-3">Grade</th>
                  <th className="p-3">Score Range</th>
                  <th className="p-3">Remark</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {GRADING_SCALE.map((g) => (
                  <tr key={g.grade}>
                    <td className="p-3 font-bold text-slate-900">{g.grade}</td>
                    <td className="p-3 text-slate-700 font-mono">{g.scoreRange}</td>
                    <td className="p-3 font-semibold text-slate-800">{g.remark}</td>
                    <td className="p-3 text-slate-500">{g.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Continuous Assessments (CA1 & CA2) account for 40% of the overall aggregate score, while the Terminal Examination accounts for 60%.
            </span>
          </div>

          <div className="flex justify-end pt-2">
            <Button size="sm" variant="outline" onClick={() => setGradingScaleModalOpen(false)}>
              Close Scale
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
