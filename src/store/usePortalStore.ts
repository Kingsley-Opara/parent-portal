import { create } from "zustand";
import { Student } from "@/types/student";
import { FeeSummary, PaymentRecord } from "@/types/fees";
import { AcademicResult } from "@/types/results";
import { ApiError, MockScenario } from "@/types/api";
import { studentsService } from "@/services/api/students.service";
import { feesService } from "@/services/api/fees.service";
import { resultsService } from "@/services/api/results.service";
import { apiClient } from "@/services/api/client";
import { SCHOOL_INFO } from "@/lib/constants";

interface PortalStoreState {
  children: Student[];
  selectedStudentId: string;
  feeSummary: FeeSummary | null;
  paymentHistory: PaymentRecord[];
  academicResult: AcademicResult | null;
  selectedSession: string;
  selectedTerm: string;
  
  // Status flags
  isLoading: boolean;
  isInitialLoading: boolean;
  isPdfGenerating: boolean;
  error: ApiError | null;
  mockScenario: MockScenario;

  // Actions
  initializePortal: () => Promise<void>;
  fetchDashboardData: (studentId?: string, session?: string, term?: string) => Promise<void>;
  setSelectedStudentId: (id: string) => Promise<void>;
  setSelectedSession: (session: string) => Promise<void>;
  setSelectedTerm: (term: string) => Promise<void>;
  setMockScenario: (scenario: MockScenario) => Promise<void>;
  downloadCurrentReportCard: () => Promise<void>;
  retry: () => Promise<void>;
}

export const usePortalStore = create<PortalStoreState>((set, get) => ({
  children: [],
  selectedStudentId: "stu-001",
  feeSummary: null,
  paymentHistory: [],
  academicResult: null,
  selectedSession: SCHOOL_INFO.currentAcademicSession,
  selectedTerm: SCHOOL_INFO.currentTerm,
  
  isLoading: false,
  isInitialLoading: true,
  isPdfGenerating: false,
  error: null,
  mockScenario: "normal",

  initializePortal: async () => {
    set({ isInitialLoading: true, error: null });
    try {
      const children = await studentsService.getChildren();
      set({ children });
      
      const currentSelected = get().selectedStudentId;
      const validStudentId = children.length > 0
        ? (children.some((c) => c.id === currentSelected) ? currentSelected : children[0].id)
        : "";

      set({ selectedStudentId: validStudentId });

      if (validStudentId) {
        await get().fetchDashboardData(validStudentId);
      }
    } catch (err) {
      set({ error: err as ApiError });
    } finally {
      set({ isInitialLoading: false });
    }
  },

  fetchDashboardData: async (studentId?: string, session?: string, term?: string) => {
    const targetStudentId = studentId || get().selectedStudentId;
    const targetSession = session || get().selectedSession;
    const targetTerm = term || get().selectedTerm;

    if (!targetStudentId) {
      set({ feeSummary: null, paymentHistory: [], academicResult: null, isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      // Parallel fetch from decoupled service layer
      const [feeRes, paymentsRes, resultsRes] = await Promise.all([
        feesService.getFeeSummary(targetStudentId, targetSession, targetTerm),
        feesService.getPaymentHistory(targetStudentId),
        resultsService.getAcademicResults(targetStudentId, targetSession, targetTerm),
      ]);

      set({
        feeSummary: feeRes,
        paymentHistory: paymentsRes,
        academicResult: resultsRes,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        error: err as ApiError,
        isLoading: false,
      });
    }
  },

  setSelectedStudentId: async (id: string) => {
    set({ selectedStudentId: id });
    await get().fetchDashboardData(id);
  },

  setSelectedSession: async (session: string) => {
    set({ selectedSession: session });
    await get().fetchDashboardData(undefined, session, undefined);
  },

  setSelectedTerm: async (term: string) => {
    set({ selectedTerm: term });
    await get().fetchDashboardData(undefined, undefined, term);
  },

  setMockScenario: async (scenario: MockScenario) => {
    apiClient.setScenario(scenario);
    set({ mockScenario: scenario });

    if (scenario === 'loading') {
      set({ isLoading: true, error: null });
      return; // Keep in perpetual loading state for reviewer inspection
    }

    if (scenario === 'error') {
      set({
        error: {
          statusCode: 503,
          code: 'SERVICE_UNAVAILABLE',
          message: 'Unable to connect to Katalysa School Information System. The server is temporarily unresponsive.',
          detail: 'The upstream Django REST Framework service returned HTTP 503 Service Unavailable.',
        },
        isLoading: false,
      });
      return;
    }

    // Refresh data according to the selected scenario
    await get().initializePortal();
  },

  downloadCurrentReportCard: async () => {
    const { selectedStudentId, selectedSession, selectedTerm } = get();
    if (!selectedStudentId) return;

    set({ isPdfGenerating: true });
    try {
      await resultsService.downloadResultPdf(selectedStudentId, selectedSession, selectedTerm);
    } catch (error) {
      console.error("PDF Download error:", error);
    } finally {
      set({ isPdfGenerating: false });
    }
  },

  retry: async () => {
    apiClient.setScenario('normal');
    set({ mockScenario: 'normal', error: null });
    await get().initializePortal();
  },
}));
