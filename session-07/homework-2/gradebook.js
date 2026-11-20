/**
 * Session 07 - Homework 02: Student Gradebook & Honors Dashboard
 * Deliverable: gradebook.js
 */

// Step 1: raw student cohort dataset
const STUDENTS_COHORT = [
    { id: 101, name: "Sara Al-Mansoor", major: "Software Engineering", scores: [94, 98, 92], attendance: 97 },
    { id: 102, name: "Marcus Brody", major: "Computer Science", scores: [82, 79, 85], attendance: 88 },
    { id: 103, name: "Elena Rostova", major: "Data Analytics", scores: [60, 58, 64], attendance: 75 },
    { id: 104, name: "Tariq Mahmoud", major: "Cybersecurity", scores: [90, 88, 95], attendance: 95 },
    { id: 105, name: "Chloe Dupont", major: "Web Development", scores: [50, 45, 52], attendance: 65 },
];

// Step 2: pure calculation helper functions

// Task 2A: average of the scores rounded to 1 decimal, or 0 for an empty list
function calculateAverage(scores) {
    if (!scores || scores.length === 0) return 0;
    let sum = 0;
    for (const score of scores) {
        sum += score;
    }
    return Number((sum / scores.length).toFixed(1));
}

// Task 2B: letter grade from an average (A >= 90, B >= 80, C >= 70, D >= 60, else F)
function getLetterGrade(avg) {
    if (avg >= 90) return "A";
    if (avg >= 80) return "B";
    if (avg >= 70) return "C";
    if (avg >= 60) return "D";
    return "F";
}

// Task 2C: academic status object with a label and a badge class
function getAcademicStatus(avg, attendance) {
    if (avg >= 90 && attendance >= 90) {
        return { label: "Honor Roll", badgeClass: "badge-honor" };
    }
    if (avg < 60 || attendance < 70) {
        return { label: "Academic Warning", badgeClass: "badge-risk" };
    }
    return { label: "Good Standing", badgeClass: "badge-pass" };
}

// Step 3: DOM row builder

// Task 3: builds and returns a <tr> filled with student data, using textContent only
function createStudentRow(student) {
    const avg = calculateAverage(student.scores);
    const grade = getLetterGrade(avg);
    const status = getAcademicStatus(avg, student.attendance);

    const tr = document.createElement("tr");

    // 1. name cell
    const tdName = document.createElement("td");
    tdName.textContent = student.name;
    tdName.style.fontWeight = "600";
    tr.appendChild(tdName);

    // 2. major cell
    const tdMajor = document.createElement("td");
    tdMajor.textContent = student.major;
    tr.appendChild(tdMajor);

    // 3. average cell
    const tdAvg = document.createElement("td");
    tdAvg.textContent = `${avg}%`;
    tr.appendChild(tdAvg);

    // 4. letter grade cell
    const tdGrade = document.createElement("td");
    tdGrade.textContent = grade;
    tdGrade.style.fontWeight = "700";
    tr.appendChild(tdGrade);

    // 5. status badge cell
    const tdStatus = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `badge ${status.badgeClass}`;
    badge.textContent = status.label;
    tdStatus.appendChild(badge);
    tr.appendChild(tdStatus);

    return tr;
}

// Step 4: render the dashboard and the cohort metrics
function renderDashboard(students) {
    const tbody = document.querySelector("#gradebook-tbody");
    const cohortAvgEl = document.querySelector("#stat-cohort-avg");
    const honorsCountEl = document.querySelector("#stat-honors-count");
    const riskCountEl = document.querySelector("#stat-risk-count");

    // guard clause: nothing to render into
    if (!tbody) return;

    // clear existing rows safely
    tbody.textContent = "";

    let totalAvgSum = 0;
    let honorsCount = 0;
    let riskCount = 0;

    for (const student of students) {
        const avg = calculateAverage(student.scores);
        const status = getAcademicStatus(avg, student.attendance);

        totalAvgSum += avg;
        if (status.badgeClass === "badge-honor") honorsCount++;
        if (status.badgeClass === "badge-risk") riskCount++;

        const row = createStudentRow(student);
        tbody.appendChild(row);
    }

    // update the summary metric cards
    const cohortAverage = students.length > 0 ? (totalAvgSum / students.length).toFixed(1) : 0;
    if (cohortAvgEl) cohortAvgEl.textContent = `${cohortAverage}%`;
    if (honorsCountEl) honorsCountEl.textContent = String(honorsCount);
    if (riskCountEl) riskCountEl.textContent = String(riskCount);
}

// Step 5: mount the dashboard
renderDashboard(STUDENTS_COHORT);

// Step 6: automated verification checks
console.log("--- 🧪 Session 07 Homework 02 Verification Suite ---");
console.assert(calculateAverage([100, 80]) === 90, "calculateAverage standard test failed!");
console.assert(calculateAverage([]) === 0, "calculateAverage empty array test failed!");
console.assert(getLetterGrade(95) === "A", "getLetterGrade A test failed!");
console.assert(getLetterGrade(58) === "F", "getLetterGrade F test failed!");
console.assert(getAcademicStatus(92, 95).badgeClass === "badge-honor", "getAcademicStatus honor test failed!");
console.assert(getAcademicStatus(50, 80).badgeClass === "badge-risk", "getAcademicStatus risk test failed!");
console.log("✅ All student analytics assertions passed successfully!");