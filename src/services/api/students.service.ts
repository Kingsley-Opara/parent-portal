import { apiClient } from "./client";
import { Student } from "@/types/student";
import { MOCK_STUDENTS } from "@/services/mock/mockData";
import { ApiError } from "@/types/api";

export class StudentsService {
  /**
   * Fetches all children associated with the authenticated parent
   * In DRF: GET /api/v1/parents/me/children/
   */
  public async getChildren(): Promise<Student[]> {
    await apiClient.simulateNetworkDelay();

    const scenario = apiClient.getScenario();
    if (scenario === 'error') {
      const error: ApiError = {
        statusCode: 500,
        code: 'STUDENTS_FETCH_FAILED',
        message: 'Unable to retrieve your registered children records.',
        detail: 'The student information registry service did not respond within the allocated timeout.',
      };
      throw error;
    }

    if (scenario === 'empty_children') {
      return [];
    }

    return MOCK_STUDENTS;
  }

  /**
   * Fetches detailed profile of a specific child
   * In DRF: GET /api/v1/students/{studentId}/
   */
  public async getChildById(studentId: string): Promise<Student | null> {
    await apiClient.simulateNetworkDelay();

    if (apiClient.getScenario() === 'error') {
      const error: ApiError = {
        statusCode: 500,
        code: 'STUDENT_DETAILS_FAILED',
        message: 'Could not load student profile.',
      };
      throw error;
    }

    const student = MOCK_STUDENTS.find((s) => s.id === studentId);
    return student || null;
  }
}

export const studentsService = new StudentsService();
