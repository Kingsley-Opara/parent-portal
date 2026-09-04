export interface SubjectScore {
  id: string;
  subjectCode: string;
  subjectName: string;
  ca1: number; // Continuous Assessment 1 (Max 20)
  ca2: number; // Continuous Assessment 2 (Max 20)
  exam: number; // Final Exam (Max 60)
  total: number; // Total (Max 100)
  percentage: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6' | 'D7' | 'E8' | 'F9';
  remark: string;
  classAverage?: number;
  highestInClass?: number;
  lowestInClass?: number;
  subjectTeacher?: string;
}

export interface AcademicResult {
  id: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  className: string;
  gradeLevel: string;
  arm: string;
  academicSession: string; // e.g. "2024/2025"
  term: 'First Term' | 'Second Term' | 'Third Term';
  subjects: SubjectScore[];
  totalScore: number;
  obtainableScore: number;
  overallAverage: number;
  classPosition: number;
  totalStudentsInClass: number;
  classHighestAverage: number;
  classLowestAverage: number;
  attendancePresent: number;
  attendanceTotal: number;
  classTeacherRemark: string;
  classTeacherName: string;
  principalRemark: string;
  principalName: string;
  nextTermBegins: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface GradingScaleEntry {
  grade: string;
  scoreRange: string;
  minScore: number;
  maxScore: number;
  gradePoint: number;
  remark: string;
  description: string;
}
