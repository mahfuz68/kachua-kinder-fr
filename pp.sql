SELECT 
    e.name,
    e.id,
    e.code,
    e."examYear",
    e."formFillupD",
    (
        SELECT COUNT(*) FROM exam_centers ec WHERE ec."examId" = e.id
    ) AS ExamCenterCount,
    (
        SELECT COUNT(*) FROM "ExamWiseSchool" es WHERE es."examId" = e.id
    ) AS ExamWiseSchoolCount,
    (
        SELECT COUNT(*) FROM "ExamWiseStudent" est WHERE est.examId = e.id
    ) AS ExamWiseStudentCount
FROM 
    Exam e
ORDER BY 
    e."createdAt" DESC;
