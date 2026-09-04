"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Menu, 
  Bell, 
  LogOut, 
  ChevronDown, 
  School,
  ShieldCheck
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePortalStore } from "@/store/usePortalStore";
import { useUiStore } from "@/store/useUiStore";
import { SCHOOL_INFO } from "@/lib/constants";
import { getStudentStatusMeta } from "@/lib/formatters";

export function Header() {
  const { user, logout } = useAuthStore();
  const { children, selectedStudentId, setSelectedStudentId, selectedTerm, selectedSession } = usePortalStore();
  const { setMobileNavOpen } = useUiStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [childDropdownOpen, setChildDropdownOpen] = useState(false);

  const selectedStudent = children.find((c) => c.id === selectedStudentId);
  const studentStatusMeta = selectedStudent ? getStudentStatusMeta(selectedStudent.status) : null;

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-3.5 sm:px-6">
      {/* Left: Brand Logo & Mobile Drawer Trigger */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer active:scale-95 transition-transform"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
            <GraduationCap className="h-4.5 w-4.5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900">Katalysa</span>
              <span className="hidden sm:inline-block rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-200">
                Parent Portal
              </span>
            </div>
            <p className="hidden md:block text-[10px] text-slate-400 font-medium -mt-0.5">
              {SCHOOL_INFO.shortName}
            </p>
          </div>
        </Link>
      </div>

      {/* Center: Active Child Switcher (Desktop Quick Dropdown) */}
      {children.length > 0 && selectedStudent && (
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setChildDropdownOpen(!childDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            >
              <div className="relative">
                <img
                  src={selectedStudent.avatarUrl}
                  alt={selectedStudent.firstName}
                  className="h-7 w-7 rounded-full object-cover border border-slate-200"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${studentStatusMeta?.dotClass}`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </span>
                <span className="text-[10px] text-slate-500">
                  {selectedStudent.classInfo.gradeLevel} • {studentStatusMeta?.label}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
            </button>

            {/* Quick Switch Dropdown */}
            {childDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setChildDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Active Child ({children.length})
                  </div>
                  {children.map((child) => {
                    const meta = getStudentStatusMeta(child.status);
                    const isSelected = child.id === selectedStudentId;
                    return (
                      <button
                        key={child.id}
                        onClick={() => {
                          setSelectedStudentId(child.id);
                          setChildDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                          isSelected ? "bg-indigo-50 text-indigo-950 font-medium" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={child.avatarUrl}
                            alt={child.firstName}
                            className="h-8 w-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <p className="text-xs font-medium leading-tight">
                              {child.firstName} {child.lastName}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {child.classInfo.gradeLevel} • {child.classInfo.arm}
                            </p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${meta.badgeClass}`}>
                          {meta.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-medium">
            <School className="h-3.5 w-3.5 text-indigo-600" />
            <span>{selectedSession} • {selectedTerm}</span>
          </div>
        </div>
      )}

      {/* Right: Term indicator & Parent Avatar */}
      <div className="flex items-center gap-2">
        <div className="md:hidden flex items-center px-2 py-1 rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-700">
          <span>{selectedTerm}</span>
        </div>

        <button
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="View notifications"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* Parent Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-1.5 rounded-xl p-1 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
              {user?.firstName?.[0] || "P"}
            </div>
            <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="border-b border-slate-100 px-3 py-2.5">
                  <p className="text-xs font-semibold text-slate-900">
                    {user?.title} {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
