export type PaymentStatus = 'paid' | 'partial' | 'pending' | 'overdue';

export type PaymentMethod = 
  | 'bank_transfer' 
  | 'card' 
  | 'paystack' 
  | 'flutterwave' 
  | 'pos' 
  | 'cash';

export interface FeeItem {
  id: string;
  name: string;
  category: 'Tuition' | 'ICT & Lab' | 'Development Levy' | 'PTA' | 'Co-Curricular' | 'Books & Materials' | 'Uniform';
  amount: number;
  isCompulsory: boolean;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  transactionDate: string;
  description: string;
  academicSession: string;
  term: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: 'successful' | 'pending' | 'failed';
  receiptNumber: string;
  receiptUrl?: string;
  channelDetails?: string; // e.g. "Access Bank Transfer - Ref 982183"
}

export interface FeeSummary {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  academicSession: string;
  term: string;
  currency: string; // "NGN"
  currencySymbol: string; // "₦"
  totalFees: number;
  amountPaid: number;
  outstandingBalance: number;
  status: PaymentStatus;
  dueDate: string;
  lastPaymentDate?: string;
  itemsBreakdown: FeeItem[];
}
