"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  GraduationCap, 
  X, 
  GraduationCap as LogoIcon,
  LogOut,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/useUiStore";
import { useAuthStore } from "@/store/useAuthStore";
import { usePortalStore } from "@/store/usePortalStore";
import { getStudentStatusMeta } from "@/lib/formatters";

export function MobileNav() {
  const pathname = usePathname();
  const { mobileNavOpen, setMobileNavOpen } = useUiStore();
  const { user, logout } = useAuthStore();
  const { children, selectedStudentId, setSelectedStudentId } = usePortalStore();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Fees & Billing",
      href: "/fees",
      icon: CreditCard,
    },
    {
      name: "Results",
      href: "/results",
      icon: GraduationCap,
    },
  ];

  return (
    <>
      {/* Mobile Slide-Out Drawer Backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white p-5 shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-in-out lg:hidden",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                <LogoIcon className="h-4.5 w-4.5 text-amber-400" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900">Katalysa</span>
                <span className="block text-[10px] text-slate-400 font-medium">Parent Portal</span>
              </div>
            </div>
            <button
              onClick={() => setMobileNavOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 cursor-pointer"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Child Switcher in Mobile Drawer */}
          {children.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <Users className="h-3.5 w-3.5" />
                <span>Your Children ({children.length})</span>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
                {children.map((child) => {
                  const isSelected = child.id === selectedStudentId;
                  const meta = getStudentStatusMeta(child.status);
                  return (
                    <button
                      key={child.id}
                      onClick={() => {
                        setSelectedStudentId(child.id);
                        setMobileNavOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer border",
                        isSelected
                          ? "bg-indigo-50 border-indigo-200 text-indigo-950 font-semibold"
                          : "bg-slate-50 border-transparent hover:bg-slate-100 text-slate-700"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={child.avatarUrl}
                          alt={child.firstName}
                          className="h-7 w-7 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="text-xs font-semibold">{child.firstName} {child.lastName}</p>
                          <p className="text-[10px] text-slate-500 font-normal">{child.classInfo.gradeLevel}</p>
                        </div>
                      </div>
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full border", meta.badgeClass)}>
                        {meta.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="mt-5 space-y-1">
            <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Menu
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-900 border border-indigo-100"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-indigo-600" : "text-slate-400")} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer & Logout */}
        <div className="pt-4 border-t border-slate-100">
          <div className="mb-3">
            <p className="text-xs font-semibold text-slate-800">{user?.title} {user?.firstName} {user?.lastName}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => {
              setMobileNavOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Bottom Sticky Tab Bar for Mobile (~375px viewport friendly) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-md">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 min-w-[72px] min-h-[44px] rounded-xl text-[10px] font-semibold transition-colors cursor-pointer active:scale-95",
                isActive ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Icon className={cn("h-4.5 w-4.5 mb-0.5", isActive ? "text-indigo-600" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
