/**
 * Session 06 - Homework 02: Student Performance Analytics & Profile Processor
 * File: analytics.js
 */

// Step 1: raw student records (source of truth in the Heap)
const RAW_STUDENTS = [
    { id: 101, name: "Amina Al-Mansoor", scores: [95, 90, 92], attendance: 98 },
    { id: 102, name: "Carlos Reyes", scores: [80, 85, 78], attendance: 88 },
    { id: 103, name: "Sara Chen", scores: [55, 60, 58], attendance: 70 },
    { id: 104, name: "", scores: [70, 75, 72], attendance: 85 }, // missing name
];

// Step 2: process cohort records
const processedCohort = [];
let totalScoreSum = 0;
let passingCount = 0;

for (const student of RAW_STUDENTS) {
    // 1. fallback for a missing name using ||
    const studentName = student.name || "Unknown Student";

    // 2. calculate the average score using a loop
    let scoreSum = 0;
    for (const score of student.scores) {
        scoreSum += score;
    }
    const averageScore = Math.round(scoreSum / student.scores.length);
    totalScoreSum += averageScore;

    // 3. classify the letter grade tier
    let letterGrade = "F";
    if (averageScore >= 90) {
        letterGrade = "A";
    } else if (averageScore >= 80) {
        letterGrade = "B";
    } else if (averageScore >= 70) {
        letterGrade = "C";
    } else {
        letterGrade = "F";
    }

    // 4. passing status needs average >= 65 AND attendance >= 75
    const isPassing = averageScore >= 65 && student.attendance >= 75;
    if (isPassing) {
        passingCount++;
    }

    // 5. push a clean new record into processedCohort, the raw record stays untouched
    processedCohort.push({
        id: student.id,
        name: studentName,
        averageScore,
        letterGrade,
        isPassing,
    });
}

const cohortClassAverage = Math.round(totalScoreSum / RAW_STUDENTS.length);

// Step 3: print the executive summary
console.log("=== COHORT PERFORMANCE REPORT ===");
console.log(`Total Students Processed: ${processedCohort.length}`);
console.log(`Cohort Class Average: ${cohortClassAverage}%`);
console.log(`Passing Students: ${passingCount} / ${processedCohort.length}\n`);

// Automated verification suite
console.log("🧪 Running Verification Tests for analytics.js...\n");

// Test 1: fallback name test
console.log(processedCohort[3].name === "Unknown Student"
    ? "✅ Test 1 Passed: Empty name successfully resolved to 'Unknown Student'."
    : "❌ Test 1 FAILED: Name fallback did not trigger.");

// Test 2: grade calculation
console.log(processedCohort[0].averageScore === 92 && processedCohort[0].letterGrade === "A"
    ? "✅ Test 2 Passed: Student 101 classified as Grade A (92%)."
    : "❌ Test 2 FAILED: Grade calculation error.");

// Test 3: passing count check
console.log(passingCount === 3
    ? "✅ Test 3 Passed: Passing count accurate (3 students passed)."
    : `❌ Test 3 FAILED: Expected 3, got ${passingCount}`);

// Test 4: verify RAW_STUDENTS is unmutated
const rawSafe = RAW_STUDENTS[3].name === "";
console.log(rawSafe
    ? "✅ Test 4 Passed: Raw student dataset remained completely unmutated."
    : "❌ Test 4 FAILED: Raw dataset was mutated in memory!");

console.log("\n🎉 All analytics tests completed!");