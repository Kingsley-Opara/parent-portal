"use client";

import React from "react";
import { Award, AlertOctagon, UserX, CheckCircle, ShieldAlert, Phone, Mail } from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { Alert } from "@/components/ui/Alert";
import { SCHOOL_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function StudentStatusBanner() {
  const { children, selectedStudentId } = usePortalStore();
  const selectedStudent = children.find((c) => c.id === selectedStudentId);

  if (!selectedStudent) return null;

  const { status, firstName, lastName, statusRemark, classInfo } = selectedStudent;

  if (status === "graduated") {
    return (
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Award className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-indigo-950">
                  Alumni Student Profile • {classInfo.name}
                </h4>
                <span className="text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">
                  Graduated
                </span>
              </div>
              <p className="text-xs text-indigo-900/80 mt-1 max-w-2xl leading-relaxed">
                {statusRemark || `${firstName} has completed all academic requirements at ${SCHOOL_INFO.name}. Official transcripts, testimonials, and certified WAEC results remain permanently accessible.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "withdrawn") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
              <UserX className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-amber-950">
                  Student Record Archived • Officially Withdrawn
                </h4>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  Withdrawn
                </span>
              </div>
              <p className="text-xs text-amber-900/80 mt-1 max-w-2xl leading-relaxed">
                {statusRemark || `Student is no longer actively enrolled. Historical report cards are archived for reference. Online billing actions are deactivated.`}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <a
              href={`mailto:${SCHOOL_INFO.email}?subject=Inquiry regarding withdrawn student: ${firstName} ${lastName}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100/50 shadow-xs transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Contact Admissions</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (status === "inactive") {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-xs">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-rose-950">
                  Administrative Action Required • Inactive Profile
                </h4>
                <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">
                  Inactive
                </span>
              </div>
              <p className="text-xs text-rose-900/80 mt-1 max-w-2xl leading-relaxed">
                {statusRemark || `This account requires bursary re-registration or administrative verification before term portal features are restored.`}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <a
              href={`mailto:${SCHOOL_INFO.bursaryEmail}?subject=Bursary Clearance Inquiry: ${firstName} ${lastName} (${selectedStudent.admissionNumber})`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-xs transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Contact Bursar</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Active status
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              {firstName} {lastName} • {selectedStudent.admissionNumber}
            </span>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              Active Enrolled
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Class: <span className="font-semibold text-slate-700">{classInfo.name}</span> • Class Teacher: <span className="text-slate-700 font-medium">{classInfo.classTeacher}</span>
          </p>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 sm:text-right">
        <span>Term Resumption: </span>
        <strong className="text-slate-800 font-bold">{SCHOOL_INFO.nextTermResumption}</strong>
      </div>
    </div>
  );
}
