"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  KeyRound
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";
import { SCHOOL_INFO } from "@/lib/constants";
import { Alert } from "@/components/ui/Alert";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("babatunde.adeleke@gmail.com");
  const [password, setPassword] = useState("KatalysaParent2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login({ email, password, rememberMe });
    if (success) {
      router.push("/");
    }
  };

  const handleFillDemo = () => {
    setEmail("babatunde.adeleke@gmail.com");
    setPassword("KatalysaParent2025!");
    clearError();
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Form Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900 text-white shadow-md mx-auto">
          <GraduationCap className="h-7 w-7 text-amber-400" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Katalysa Parent Portal
        </h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Sign in with your verified guardian email to access your ward's academics and school billing.
        </p>
      </div>

      {/* Demo Credentials Quick Fill Banner */}
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-3.5 flex items-center justify-between text-xs text-indigo-950">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-indigo-600 shrink-0" />
          <div>
            <p className="font-bold">Assessment Demo Account</p>
            <p className="text-[10px] text-indigo-800/80">Dr. Babatunde Adeleke (5 Children)</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="text-[11px] font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer shadow-2xs"
        >
          Auto-fill
        </button>
      </div>

      {error && (
        <Alert variant="error" onDismiss={clearError}>
          {error}
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Guardian Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-700">
              Account Password
            </label>
            <a
              href={`mailto:${SCHOOL_INFO.email}?subject=Parent Portal Password Reset Request`}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-xs text-slate-600 cursor-pointer select-none">
            Keep me authenticated on this device
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Sign In to Portal
        </Button>
      </form>

      {/* Security Note */}
      <div className="pt-2 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Secured by Django REST Framework JWT Auth</span>
        </div>
      </div>
    </div>
  );
}
