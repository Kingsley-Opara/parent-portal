import { GradingScaleEntry } from "@/types/results";

export const SCHOOL_INFO = {
  name: "Katalysa International Academy",
  shortName: "Katalysa Academy",
  motto: "Empowering Next-Generation Visionaries & Innovators",
  tagline: "Excellence • Integrity • Leadership",
  address: "Plot 14, Silicon Valley Estate, Victoria Island Extension, Lagos, Nigeria",
  phone: "+234 (0) 803 900 1200",
  email: "parentrelations@katalysa.edu.ng",
  bursaryEmail: "bursar@katalysa.edu.ng",
  portalUrl: "https://portal.katalysa.edu.ng",
  currentAcademicSession: "2024/2025",
  currentTerm: "Second Term" as const,
  nextTermResumption: "Monday, April 28, 2025",
  accreditationNumber: "WAEC/NG/LAG/2014/9912",
};

export const ACADEMIC_SESSIONS = [
  "2024/2025",
  "2023/2024",
  "2022/2023"
] as const;

export const ACADEMIC_TERMS = [
  "First Term",
  "Second Term",
  "Third Term"
] as const;

export const GRADING_SCALE: GradingScaleEntry[] = [
  { grade: "A1", scoreRange: "80% - 100%", minScore: 80, maxScore: 100, gradePoint: 4.0, remark: "Distinction", description: "Outstanding mastery of subject matter" },
  { grade: "B2", scoreRange: "75% - 79%", minScore: 75, maxScore: 79, gradePoint: 3.5, remark: "Very Good", description: "Strong conceptual understanding" },
  { grade: "B3", scoreRange: "70% - 74%", minScore: 70, maxScore: 74, gradePoint: 3.0, remark: "Good", description: "Above average academic competence" },
  { grade: "C4", scoreRange: "65% - 69%", minScore: 65, maxScore: 69, gradePoint: 2.5, remark: "Credit", description: "Demonstrated clear proficiency" },
  { grade: "C5", scoreRange: "60% - 64%", minScore: 60, maxScore: 64, gradePoint: 2.0, remark: "Credit", description: "Solid comprehension of fundamentals" },
  { grade: "C6", scoreRange: "50% - 59%", minScore: 50, maxScore: 59, gradePoint: 1.5, remark: "Credit", description: "Satisfactory standard met" },
  { grade: "D7", scoreRange: "45% - 49%", minScore: 45, maxScore: 49, gradePoint: 1.0, remark: "Pass", description: "Fair effort, requires reinforcement" },
  { grade: "E8", scoreRange: "40% - 44%", minScore: 40, maxScore: 44, gradePoint: 0.5, remark: "Weak Pass", description: "Minimum threshold, urgent improvement required" },
  { grade: "F9", scoreRange: "0% - 39%", minScore: 0, maxScore: 39, gradePoint: 0.0, remark: "Fail", description: "Unsatisfactory, remediation compulsory" },
];
