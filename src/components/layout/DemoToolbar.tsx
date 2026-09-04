"use client";

import React, { useState } from "react";
import { 
  SlidersHorizontal, 
  ChevronUp, 
  ChevronDown, 
  RotateCcw, 
  AlertTriangle, 
  Loader2, 
  UserX, 
  FileX2, 
  CreditCard, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { usePortalStore } from "@/store/usePortalStore";
import { MockScenario } from "@/types/api";

export function DemoToolbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { mockScenario, setMockScenario, children, selectedStudentId, setSelectedStudentId } = usePortalStore();

  const scenarios: { id: MockScenario; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "normal",
      label: "Normal Flow",
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
      desc: "Full operational data state",
    },
    {
      id: "loading",
      label: "Loading Skeleton",
      icon: <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />,
      desc: "Simulate pending network delay & skeletons",
    },
    {
      id: "error",
      label: "API Error (503)",
      icon: <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />,
      desc: "Simulate server fault with retry action",
    },
    {
      id: "empty_children",
      label: "No Children",
      icon: <UserX className="h-3.5 w-3.5 text-amber-500" />,
      desc: "Zero students associated with parent",
    },
    {
      id: "empty_payments",
      label: "No Payments",
      icon: <CreditCard className="h-3.5 w-3.5 text-purple-500" />,
      desc: "Zero payment history recorded",
    },
    {
      id: "empty_results",
      label: "No Results",
      icon: <FileX2 className="h-3.5 w-3.5 text-amber-600" />,
      desc: "Results under moderation / unpublished",
    },
  ];

  return (
    <aside aria-label="Reviewer Demo Controls" className="fixed bottom-14 lg:bottom-4 right-4 z-40 max-w-sm">
      <div className="rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-semibold tracking-wide">Evaluator Controls</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">
              {mockScenario}
            </span>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="p-3.5 border-t border-slate-800 space-y-3 bg-slate-950/90 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                Simulate System State (Brief Criteria 6)
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {scenarios.map((sc) => {
                  const isActive = mockScenario === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setMockScenario(sc.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        isActive
                          ? "bg-indigo-600 text-white border-indigo-400 font-semibold shadow-xs"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                      }`}
                      title={sc.desc}
                    >
                      {sc.icon}
                      <span className="text-[11px] truncate">{sc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Student Status Tester */}
            {children.length > 0 && (
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                  Test Student Statuses (Active / Graduated / Withdrawn / Inactive)
                </p>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {children.map((child) => {
                    const isSelected = child.id === selectedStudentId;
                    return (
                      <button
                        key={child.id}
                        onClick={() => setSelectedStudentId(child.id)}
                        className={`w-full flex items-center justify-between p-1.5 px-2 rounded-lg text-left transition-colors cursor-pointer text-[11px] ${
                          isSelected
                            ? "bg-slate-800 text-amber-300 font-semibold border border-slate-700"
                            : "text-slate-400 hover:bg-slate-900"
                        }`}
                      >
                        <span className="truncate">{child.firstName} ({child.classInfo.gradeLevel})</span>
                        <span className="capitalize text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {child.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Next.js 16 + Zustand + DRF Mock</span>
              <button
                onClick={() => setMockScenario("normal")}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
