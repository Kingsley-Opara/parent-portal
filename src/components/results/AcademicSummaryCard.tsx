"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  Trophy, 
  Percent, 
  Download, 
  Eye, 
  Award, 
  FileCheck
} from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { getOrdinal } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";
import { ACADEMIC_SESSIONS, ACADEMIC_TERMS } from "@/lib/constants";
import { resultsService } from "@/services/api/results.service";
import { Modal } from "@/components/ui/Modal";

export function AcademicSummaryCard() {
  const { 
    academicResult, 
    selectedStudentId, 
    selectedSession, 
    selectedTerm, 
    setSelectedSession, 
    setSelectedTerm, 
    isPdfGenerating, 
    downloadCurrentReportCard,
    isLoading 
  } = usePortalStore();

  const [previewPdfUri, setPreviewPdfUri] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4">
        <div className="h-5 w-44 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const handlePreviewPdf = async () => {
    if (!selectedStudentId) return;
    setIsPreviewLoading(true);
    try {
      const uri = await resultsService.getResultPdfBlob(selectedStudentId, selectedSession, selectedTerm);
      setPreviewPdfUri(uri);
    } catch (err) {
      console.error("PDF Preview error:", err);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        {/* Header & Term Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Academic Performance
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {academicResult ? `${academicResult.className} • ${selectedSession}` : `${selectedSession} • ${selectedTerm}`}
              </p>
            </div>
          </div>

          {/* Session & Term Dropdowns and PDF Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full lg:w-auto">
            {/* 2-column Grid for Selects on Mobile */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
              >
                {ACADEMIC_SESSIONS.map((sess) => (
                  <option key={sess} value={sess}>
                    {sess} Session
                  </option>
                ))}
              </select>

              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
              >
                {ACADEMIC_TERMS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* PDF Action Buttons */}
            {academicResult && (
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePreviewPdf}
                  isLoading={isPreviewLoading}
                  leftIcon={<Eye className="h-3.5 w-3.5" />}
                  className="w-full sm:w-auto text-xs h-9 font-medium"
                >
                  Preview PDF
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={downloadCurrentReportCard}
                  isLoading={isPdfGenerating}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                  className="w-full sm:w-auto text-xs h-9 font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Download PDF
                </Button>
              </div>
            )}
          </div>
        </div>

        {academicResult ? (
          <>
            {/* 4 Summary Highlight Cards (Solid colors, no raster bugs) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 my-4">
              {/* Position in Class */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    Position
                  </span>
                  <Trophy className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
                  {getOrdinal(academicResult.classPosition)}
                </p>
                <p className="text-[10px] text-amber-800 font-medium">
                  of {academicResult.totalStudentsInClass} students
                </p>
              </div>

              {/* Overall Average */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                    Average
                  </span>
                  <Percent className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                  {academicResult.overallAverage.toFixed(1)}%
                </p>
                <p className="text-[10px] text-emerald-800 font-medium truncate">
                  Total: {academicResult.totalScore}/{academicResult.obtainableScore}
                </p>
              </div>

              {/* Class Highest */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Highest
                  </span>
                  <Award className="h-3.5 w-3.5 text-indigo-500" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                  {academicResult.classHighestAverage.toFixed(1)}%
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Benchmark
                </p>
              </div>

              {/* Total Subjects */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Subjects
                  </span>
                  <FileCheck className="h-3.5 w-3.5 text-slate-500" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                  {academicResult.subjects.length}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Evaluated
                </p>
              </div>
            </div>

            {/* Remarks Box */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs space-y-2">
              <div>
                <span className="font-bold text-slate-800">Class Teacher: </span>
                <span className="text-slate-600 italic text-[11px]">"{academicResult.classTeacherRemark}"</span>
                <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">— {academicResult.classTeacherName}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-800">Principal: </span>
                <span className="text-slate-600 italic text-[11px]">"{academicResult.principalRemark}"</span>
                <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">— {academicResult.principalName}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="py-6 text-center text-xs text-slate-500">
            <p className="font-bold text-slate-800 text-sm">No published performance records for {selectedTerm}, {selectedSession}.</p>
            <p className="text-xs text-slate-400 mt-1">Assessment scores for this term are currently undergoing academic board moderation.</p>
          </div>
        )}
      </div>

      {/* PDF Report Card Preview Modal */}
      {previewPdfUri && (
        <Modal
          isOpen={!!previewPdfUri}
          onClose={() => setPreviewPdfUri(null)}
          title={`Official Report Card Preview • ${academicResult?.studentName || ""}`}
          description={`${selectedSession} - ${selectedTerm}`}
          maxWidth="4xl"
        >
          <div className="space-y-4">
            <div className="w-full h-[65vh] rounded-xl border border-slate-200 overflow-hidden bg-slate-100">
              <iframe
                src={previewPdfUri}
                className="w-full h-full"
                title="Report Card PDF Preview"
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500">
                Certified official terminal result sheet
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setPreviewPdfUri(null)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={downloadCurrentReportCard}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
