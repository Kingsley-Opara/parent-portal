import { StudentStatus } from "@/types/student";
import { PaymentStatus } from "@/types/fees";

export function formatNaira(amount: number, includeDecimals = false): string {
  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(amount);

  // Normalize currency symbol to standard Naira ₦
  return formatted.replace(/NGN\s?/, '₦');
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function getStudentStatusMeta(status: StudentStatus) {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        variant: 'emerald' as const,
        description: 'Currently enrolled and in good academic standing.',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20',
        dotClass: 'bg-emerald-500',
      };
    case 'graduated':
      return {
        label: 'Graduated',
        variant: 'indigo' as const,
        description: 'Completed studies and officially graduated (Alumni).',
        badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-600/20',
        dotClass: 'bg-indigo-500',
      };
    case 'withdrawn':
      return {
        label: 'Withdrawn',
        variant: 'amber' as const,
        description: 'Officially withdrawn from the institution.',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20',
        dotClass: 'bg-amber-500',
      };
    case 'inactive':
      return {
        label: 'Inactive',
        variant: 'rose' as const,
        description: 'Enrollment suspended pending administrative review or bursary clearance.',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20',
        dotClass: 'bg-rose-500',
      };
  }
}

export function getPaymentStatusMeta(status: PaymentStatus) {
  switch (status) {
    case 'paid':
      return {
        label: 'Fully Paid',
        variant: 'emerald' as const,
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        progressColor: 'bg-emerald-500',
      };
    case 'partial':
      return {
        label: 'Partial',
        variant: 'amber' as const,
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        progressColor: 'bg-amber-500',
      };
    case 'pending':
      return {
        label: 'Pending',
        variant: 'blue' as const,
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
        progressColor: 'bg-blue-500',
      };
    case 'overdue':
      return {
        label: 'Overdue',
        variant: 'rose' as const,
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
        progressColor: 'bg-rose-500',
      };
  }
}

export function getGradeBadgeMeta(grade: string) {
  const clean = grade.toUpperCase();
  if (clean.startsWith('A')) {
    return {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
      text: 'text-emerald-700',
    };
  }
  if (clean.startsWith('B')) {
    return {
      bg: 'bg-blue-50 text-blue-800 border-blue-300 font-bold',
      text: 'text-blue-700',
    };
  }
  if (clean.startsWith('C')) {
    return {
      bg: 'bg-teal-50 text-teal-800 border-teal-300 font-medium',
      text: 'text-teal-700',
    };
  }
  if (clean.startsWith('D') || clean.startsWith('E')) {
    return {
      bg: 'bg-amber-50 text-amber-800 border-amber-300 font-medium',
      text: 'text-amber-700',
    };
  }
  return {
    bg: 'bg-rose-50 text-rose-800 border-rose-300 font-bold',
    text: 'text-rose-700',
  };
}
