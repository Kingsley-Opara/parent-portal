import { apiClient } from "./client";
import { FeeSummary, PaymentRecord } from "@/types/fees";
import { MOCK_FEE_SUMMARIES, MOCK_PAYMENT_HISTORY } from "@/services/mock/mockData";
import { ApiError } from "@/types/api";

export class FeesService {
  /**
   * Fetches fee summary & breakdown for a student
   * In DRF: GET /api/v1/students/{studentId}/fees/summary/?session={session}&term={term}
   */
  public async getFeeSummary(
    studentId: string,
    session?: string,
    term?: string
  ): Promise<FeeSummary | null> {
    await apiClient.simulateNetworkDelay();

    const scenario = apiClient.getScenario();
    if (scenario === 'error') {
      const error: ApiError = {
        statusCode: 500,
        code: 'FEES_FETCH_FAILED',
        message: 'Unable to load fee billing records from the school bursary.',
        detail: 'The billing engine returned an unexpected error response.',
      };
      throw error;
    }

    const feeSummary = MOCK_FEE_SUMMARIES[studentId];
    if (!feeSummary) return null;

    return {
      ...feeSummary,
      academicSession: session || feeSummary.academicSession,
      term: term || feeSummary.term,
    };
  }

  /**
   * Fetches past transaction/payment history for a student
   * In DRF: GET /api/v1/students/{studentId}/payments/
   */
  public async getPaymentHistory(studentId: string): Promise<PaymentRecord[]> {
    await apiClient.simulateNetworkDelay();

    const scenario = apiClient.getScenario();
    if (scenario === 'error') {
      const error: ApiError = {
        statusCode: 500,
        code: 'PAYMENT_HISTORY_FAILED',
        message: 'Unable to load payment history transactions.',
        detail: 'The payment gateway ledger is currently unreachable.',
      };
      throw error;
    }

    if (scenario === 'empty_payments') {
      return [];
    }

    const history = MOCK_PAYMENT_HISTORY[studentId] || [];
    return history;
  }
}

export const feesService = new FeesService();
