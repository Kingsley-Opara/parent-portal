"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  LifeBuoy, 
  ShieldCheck,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SCHOOL_INFO } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Fees & Payments",
      href: "/fees",
      icon: CreditCard,
    },
    {
      name: "Academic Results",
      href: "/results",
      icon: GraduationCap,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4 shrink-0">
      {/* Primary Navigation */}
      <div className="space-y-1">
        <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer",
                isActive
                  ? "bg-indigo-50 text-indigo-900 shadow-xs border border-indigo-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-indigo-600" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Institutional Resources & Help */}
      <div className="mt-8 space-y-1">
        <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          School Services
        </p>
        <div className="space-y-0.5">
          <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-500 rounded-xl">
            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Academic Calendar</span>
            <span className="ml-auto text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">Term 2</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-500 rounded-xl">
            <MessageSquare className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Teacher Inquiries</span>
            <span className="ml-auto text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">Online</span>
          </div>
        </div>
      </div>

      {/* Support & Bursary Contact Box */}
      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 mb-1.5 text-slate-800 font-semibold text-[11px]">
            <LifeBuoy className="h-4 w-4 text-indigo-600" />
            <span>Bursary & Helpdesk</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
            Need payment confirmation or student records support?
          </p>
          <a
            href={`mailto:${SCHOOL_INFO.bursaryEmail}`}
            className="inline-block text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
          >
            {SCHOOL_INFO.bursaryEmail}
          </a>
        </div>

        {/* Accreditation Seal */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
          <span>Katalysa Certified School SaaS</span>
        </div>
      </div>
    </aside>
  );
}
