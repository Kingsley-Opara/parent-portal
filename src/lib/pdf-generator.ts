import jsPDF from "jspdf";
import { AcademicResult } from "@/types/results";
import { Student } from "@/types/student";
import { SCHOOL_INFO } from "@/lib/constants";
import { getOrdinal } from "@/lib/formatters";

export function generateReportCardPdf(result: AcademicResult, student?: Student): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Background Header Accent Bar
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(0, 0, pageWidth, 28, "F");

  // Accent gold line
  doc.setFillColor(217, 119, 6); // Amber 600
  doc.rect(0, 27, pageWidth, 2, "F");

  // School Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(SCHOOL_INFO.name.toUpperCase(), pageWidth / 2, 11, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240); // Slate 200
  doc.text(SCHOOL_INFO.motto, pageWidth / 2, 17, { align: "center" });

  doc.setFontSize(7.5);
  doc.text(`${SCHOOL_INFO.address} | Tel: ${SCHOOL_INFO.phone}`, pageWidth / 2, 22, { align: "center" });

  // Report Card Subtitle Badge
  let y = 36;
  doc.setFillColor(241, 245, 249); // Slate 100
  doc.roundedRect(margin, y, contentWidth, 8, 2, 2, "F");
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`OFFICIAL STUDENT PERFORMANCE REPORT CARD • ${result.academicSession} (${result.term.toUpperCase()})`, pageWidth / 2, y + 5.5, { align: "center" });

  // Student Biodata Box
  y += 12;
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, "FD");

  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // Slate 600

  // Left Column
  doc.text("Student Full Name:", margin + 4, y + 6);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(result.studentName, margin + 35, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Admission Number:", margin + 4, y + 12);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(result.admissionNumber, margin + 35, y + 12);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Class / Level:", margin + 4, y + 18);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(result.className, margin + 35, y + 18);

  // Right Column
  const rightColX = margin + contentWidth / 2 + 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Class Position:", rightColX, y + 6);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(`${getOrdinal(result.classPosition)} out of ${result.totalStudentsInClass} students`, rightColX + 28, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Overall Average:", rightColX, y + 12);
  doc.setTextColor(16, 185, 129); // Emerald
  doc.setFont("helvetica", "bold");
  doc.text(`${result.overallAverage.toFixed(1)}% (Class Highest: ${result.classHighestAverage.toFixed(1)}%)`, rightColX + 28, y + 12);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Term Attendance:", rightColX, y + 18);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(`${result.attendancePresent} / ${result.attendanceTotal} days present (${Math.round((result.attendancePresent / result.attendanceTotal) * 100)}%)`, rightColX + 28, y + 18);

  // Academic Results Table Header
  y += 28;
  const colWidths = [56, 17, 17, 18, 18, 16, 16, 26]; // Total: 182mm
  const colHeaders = ["Subject", "CA1 (20)", "CA2 (20)", "Exam (60)", "Total (100)", "%", "Grade", "Remark"];

  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(margin, y, contentWidth, 7, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  let curX = margin;
  colHeaders.forEach((header, index) => {
    const align = index === 0 ? "left" : "center";
    const textX = align === "left" ? curX + 3 : curX + colWidths[index] / 2;
    doc.text(header, textX, y + 4.8, { align });
    curX += colWidths[index];
  });

  // Table Rows
  y += 7;
  const rowHeight = 6.2;
  doc.setFontSize(8);

  result.subjects.forEach((subj, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(margin, y, contentWidth, rowHeight, "F");

    // Horizontal divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);

    curX = margin;
    // Subject Name
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(subj.subjectName, curX + 3, y + 4.3);
    curX += colWidths[0];

    // CA1
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(subj.ca1.toString(), curX + colWidths[1] / 2, y + 4.3, { align: "center" });
    curX += colWidths[1];

    // CA2
    doc.text(subj.ca2.toString(), curX + colWidths[2] / 2, y + 4.3, { align: "center" });
    curX += colWidths[2];

    // Exam
    doc.text(subj.exam.toString(), curX + colWidths[3] / 2, y + 4.3, { align: "center" });
    curX += colWidths[3];

    // Total
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(subj.total.toString(), curX + colWidths[4] / 2, y + 4.3, { align: "center" });
    curX += colWidths[4];

    // %
    doc.text(`${subj.percentage}%`, curX + colWidths[5] / 2, y + 4.3, { align: "center" });
    curX += colWidths[5];

    // Grade
    if (subj.grade.startsWith("A")) {
      doc.setTextColor(16, 185, 129); // Emerald
    } else if (subj.grade.startsWith("B")) {
      doc.setTextColor(37, 99, 235); // Blue
    } else {
      doc.setTextColor(217, 119, 6); // Amber
    }
    doc.text(subj.grade, curX + colWidths[6] / 2, y + 4.3, { align: "center" });
    curX += colWidths[6];

    // Remark
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(subj.remark, curX + 2, y + 4.3);

    y += rowHeight;
  });

  // Table Summary Footer Row
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 7, "D");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("AGGREGATE TOTAL:", margin + 3, y + 4.8);
  doc.text(`${result.totalScore} / ${result.obtainableScore}`, margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 4, y + 4.8);
  doc.text(`AVERAGE: ${result.overallAverage.toFixed(1)}%`, margin + contentWidth - 40, y + 4.8);

  // Remarks Section
  y += 11;
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, "FD");

  // Class Teacher's Remark
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text("Class Teacher's Remark:", margin + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  const splitTeacherRemark = doc.splitTextToSize(`"${result.classTeacherRemark}"`, contentWidth - 45);
  doc.text(splitTeacherRemark, margin + 4, y + 11);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`— ${result.classTeacherName}`, margin + 4, y + 17);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(margin + 4, y + 20, margin + contentWidth - 4, y + 20);

  // Principal's Remark
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text("Principal's Remark & Endorsement:", margin + 4, y + 25);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  const splitPrincipalRemark = doc.splitTextToSize(`"${result.principalRemark}"`, contentWidth - 45);
  doc.text(splitPrincipalRemark, margin + 4, y + 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`— ${result.principalName}`, margin + 4, y + 36);

  // Official Seal / Stamp text badge
  const sealX = margin + contentWidth - 38;
  const sealY = y + 5;
  doc.setDrawColor(37, 99, 235);
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(sealX, sealY, 34, 28, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(30, 64, 175);
  doc.text("KATALYSA ACADEMY", sealX + 17, sealY + 6, { align: "center" });
  doc.text("OFFICIAL SEAL", sealX + 17, sealY + 11, { align: "center" });
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("AUTHENTICATED", sealX + 17, sealY + 16, { align: "center" });
  doc.text(`ACCREDITED: ${SCHOOL_INFO.accreditationNumber}`, sealX + 17, sealY + 20, { align: "center" });
  doc.text("ACADEMIC BOARD", sealX + 17, sealY + 24, { align: "center" });

  // Footer
  const footerY = pageHeight - 12;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY, margin + contentWidth, footerY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(`Next Term Begins: ${result.nextTermBegins} | Generated via Katalysa Parent Portal on ${new Date().toLocaleDateString('en-GB')}`, margin, footerY + 5);
  doc.text("Page 1 of 1 • System Generated Certified Document", margin + contentWidth, footerY + 5, { align: "right" });

  return doc;
}

export function downloadReportCard(result: AcademicResult, student?: Student): void {
  const doc = generateReportCardPdf(result, student);
  const cleanStudentName = result.studentName.replace(/[^a-zA-Z0-9]/g, "_");
  const cleanSession = result.academicSession.replace(/[^a-zA-Z0-9]/g, "_");
  const cleanTerm = result.term.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `Katalysa_ReportCard_${cleanStudentName}_${cleanSession}_${cleanTerm}.pdf`;
  doc.save(filename);
}
