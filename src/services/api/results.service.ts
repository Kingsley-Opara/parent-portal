import { apiClient } from "./client";
import { AcademicResult } from "@/types/results";
import { MOCK_ACADEMIC_RESULTS, MOCK_STUDENTS } from "@/services/mock/mockData";
import { ApiError } from "@/types/api";
import { downloadReportCard, generateReportCardPdf } from "@/lib/pdf-generator";

export class ResultsService {
  /**
   * Fetches academic performance results for a specific student, session, and term
   * In DRF: GET /api/v1/students/{studentId}/results/?session={session}&term={term}
   */
  public async getAcademicResults(
    studentId: string,
    session?: string,
    term?: string
  ): Promise<AcademicResult | null> {
    await apiClient.simulateNetworkDelay();

    const scenario = apiClient.getScenario();
    if (scenario === 'error') {
      const error: ApiError = {
        statusCode: 500,
        code: 'RESULTS_FETCH_FAILED',
        message: 'Unable to retrieve academic results from the exam grading system.',
        detail: 'The examination processing server is experiencing temporary downtime.',
      };
      throw error;
    }

    if (scenario === 'empty_results') {
      return null;
    }

    const result = MOCK_ACADEMIC_RESULTS[studentId];
    if (!result) return null;

    return {
      ...result,
      academicSession: session || result.academicSession,
      term: (term as 'First Term' | 'Second Term' | 'Third Term') || result.term,
    };
  }

  /**
   * Downloads official PDF report card for a student
   * In DRF: GET /api/v1/students/{studentId}/results/pdf/?session={session}&term={term}
   * Generates and downloads the certified PDF via client jsPDF engine
   */
  public async downloadResultPdf(
    studentId: string,
    session?: string,
    term?: string
  ): Promise<boolean> {
    await apiClient.simulateNetworkDelay();

    const result = await this.getAcademicResults(studentId, session, term);
    if (!result) {
      throw new Error("No academic results found for this student/session to generate PDF.");
    }

    const student = MOCK_STUDENTS.find((s) => s.id === studentId);
    downloadReportCard(result, student);
    return true;
  }

  /**
   * Returns a PDF Document instance for in-app preview
   */
  public async getResultPdfBlob(
    studentId: string,
    session?: string,
    term?: string
  ): Promise<string | null> {
    const result = await this.getAcademicResults(studentId, session, term);
    if (!result) return null;

    const student = MOCK_STUDENTS.find((s) => s.id === studentId);
    const doc = generateReportCardPdf(result, student);
    return doc.output('datauristring');
  }
}

export const resultsService = new ResultsService();
