export type StudentStatus = 'active' | 'graduated' | 'withdrawn' | 'inactive';

export interface ClassInfo {
  id: string;
  name: string; // e.g., "Grade 10 - Diamond (SS1)"
  gradeLevel: string; // "SS1" | "JSS1" etc.
  arm: string; // "Diamond", "Gold", "Emerald"
  academicSession: string; // "2024/2025"
  term: 'First Term' | 'Second Term' | 'Third Term';
  classTeacher: string;
  totalStudents: number;
}

export interface StudentMetrics {
  currentAverage: number;
  classPosition: number;
  totalStudentsInClass: number;
  attendanceRate: number; // e.g. 96.5%
  totalDaysPresent: number;
  totalSchoolDays: number;
  conductRating: 'Excellent' | 'Very Good' | 'Good' | 'Fair';
}

export interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  avatarUrl: string;
  status: StudentStatus;
  statusRemark?: string; // Reason or details if graduated, withdrawn, or inactive
  classInfo: ClassInfo;
  metrics: StudentMetrics;
  enrollmentDate: string;
  graduationDate?: string;
  withdrawalDate?: string;
}

export interface Guardian {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
  address: string;
  children: Student[];
}
