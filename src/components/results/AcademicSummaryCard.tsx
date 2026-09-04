"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  Trophy, 
  Percent, 
  Download, 
  Eye, 
  Award, 
  Loader2,
  Calendar,
  CheckCircle2,
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

  if (isLoading || !academicResult) return null;

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
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
        {/* Header & Term Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Academic Performance
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {academicResult.className} • {academicResult.academicSession} ({academicResult.term})
              </p>
            </div>
          </div>

          {/* Term & Session Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="h-9 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
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
              className="h-9 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
            >
              {ACADEMIC_TERMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* PDF Action Buttons */}
            <Button
              size="sm"
              variant="outline"
              onClick={handlePreviewPdf}
              isLoading={isPreviewLoading}
              leftIcon={<Eye className="h-3.5 w-3.5" />}
              className="hidden sm:inline-flex"
            >
              Preview PDF
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={downloadCurrentReportCard}
              isLoading={isPdfGenerating}
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              Download PDF
            </Button>
          </div>
        </div>

        {/* 4 Summary Highlight Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6">
          {/* Position in Class */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                Class Position
              </span>
              <Trophy className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-2xl font-black text-amber-950 mt-1">
              {getOrdinal(academicResult.classPosition)}
            </p>
            <p className="text-[10px] text-amber-800/80 mt-0.5 font-medium">
              out of {academicResult.totalStudentsInClass} students
            </p>
          </div>

          {/* Overall Average */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                Overall Average
              </span>
              <Percent className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-950 mt-1">
              {academicResult.overallAverage.toFixed(1)}%
            </p>
            <p className="text-[10px] text-emerald-800/80 mt-0.5 font-medium">
              Aggregate: {academicResult.totalScore}/{academicResult.obtainableScore}
            </p>
          </div>

          {/* Class Highest */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Class Highest
              </span>
              <Award className="h-4 w-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-black text-slate-800 mt-1">
              {academicResult.classHighestAverage.toFixed(1)}%
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
              Class benchmark
            </p>
          </div>

          {/* Total Subjects */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Total Subjects
              </span>
              <FileCheck className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-2xl font-black text-slate-800 mt-1">
              {academicResult.subjects.length}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
              Evaluated this term
            </p>
          </div>
        </div>

        {/* Remarks Accordion/Box */}
        <div className="rounded-2xl bg-slate-50/70 border border-slate-100 p-4 text-xs space-y-2">
          <div>
            <span className="font-bold text-slate-800">Class Teacher's Remark: </span>
            <span className="text-slate-600 italic">"{academicResult.classTeacherRemark}"</span>
            <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">— {academicResult.classTeacherName}</span>
          </div>
          <div className="pt-2 border-t border-slate-200/50">
            <span className="font-bold text-slate-800">Principal's Endorsement: </span>
            <span className="text-slate-600 italic">"{academicResult.principalRemark}"</span>
            <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">— {academicResult.principalName}</span>
          </div>
        </div>
      </div>

      {/* PDF Report Card Preview Modal */}
      {previewPdfUri && (
        <Modal
          isOpen={!!previewPdfUri}
          onClose={() => setPreviewPdfUri(null)}
          title={`Official Report Card Preview • ${academicResult.studentName}`}
          description={`${academicResult.academicSession} - ${academicResult.term}`}
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
