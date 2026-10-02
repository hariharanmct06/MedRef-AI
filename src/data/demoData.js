export const DEMO_DOCUMENTS = [
  {
    id: "doc-101",
    title: "Comprehensive Metabolic & Lipid Panel",
    type: "Blood report",
    category: "Reports",
    date: "2026-01-12",
    facility: "Metropolitan Diagnostics Center",
    doctor: "Dr. Sarah Jenkins, MD",
    verified: true,
    fileSize: "1.8 MB",
    fileType: "PDF",
    extractedData: {
      metrics: [
        { name: "Hemoglobin", value: 11.2, unit: "g/dL", refRange: "12.0 - 15.5 g/dL", status: "low", category: "Hematology" },
        { name: "WBC (White Blood Cells)", value: 7800, unit: "/uL", refRange: "4,500 - 11,000 /uL", status: "normal", category: "Hematology" },
        { name: "Platelets", value: 210000, unit: "/uL", refRange: "150,000 - 450,000 /uL", status: "normal", category: "Hematology" },
        { name: "Fasting Blood Glucose", value: 115, unit: "mg/dL", refRange: "70 - 99 mg/dL", status: "high", category: "Metabolic" },
        { name: "HbA1c", value: 6.2, unit: "%", refRange: "< 5.7%", status: "high", category: "Metabolic" },
        { name: "Total Cholesterol", value: 215, unit: "mg/dL", refRange: "< 200 mg/dL", status: "high", category: "Lipids" },
        { name: "LDL Cholesterol", value: 135, unit: "mg/dL", refRange: "< 100 mg/dL", status: "high", category: "Lipids" },
        { name: "HDL Cholesterol", value: 45, unit: "mg/dL", refRange: "> 50 mg/dL", status: "low", category: "Lipids" }
      ],
      medications: [],
      doctorNotes: "Mild anemia indicated by Hemoglobin 11.2 g/dL. Glucose and HbA1c indicate prediabetes stage. Elevated total and LDL cholesterol. Patient advised on dietary modification and follow-up consultation."
    },
    summary: "Blood panel showing mild hemoglobin deficit and early prediabetic glucose trends with elevated LDL cholesterol."
  },
  {
    id: "doc-102",
    title: "Primary Care Consultation Note",
    type: "Discharge summary",
    category: "Consultations",
    date: "2026-02-03",
    facility: "Metro Health Internal Medicine",
    doctor: "Dr. Sarah Jenkins, MD",
    verified: true,
    fileSize: "850 KB",
    fileType: "PDF",
    extractedData: {
      metrics: [
        { name: "Blood Pressure", value: "128/84", unit: "mmHg", refRange: "< 120/80 mmHg", status: "borderline", category: "Vitals" },
        { name: "Heart Rate", value: 74, unit: "bpm", refRange: "60 - 100 bpm", status: "normal", category: "Vitals" },
        { name: "BMI", value: 26.4, unit: "kg/m²", refRange: "18.5 - 24.9", status: "high", category: "Vitals" }
      ],
      medications: [
        { name: "Metformin", dosage: "500 mg", frequency: "Once daily", instructions: "Take after breakfast with water", status: "Active" }
      ],
      doctorNotes: "Reviewed Jan 12 lab results. Started low-dose Metformin 500mg daily to manage fasting glucose. Encouraged 30 minutes of aerobic walking daily and reduced refined carbs. Scheduled cardiac & thyroid baseline test."
    },
    summary: "Initial consultation review establishing dietary intervention, starting Metformin 500mg, and ordering baseline cardiac/thyroid screen."
  },
  {
    id: "doc-103",
    title: "Cardiac & Thyroid Screen Report",
    type: "Scan report",
    category: "Tests",
    date: "2026-03-18",
    facility: "Apex Cardiovascular & Endocrine Institute",
    doctor: "Dr. Robert Chen, MD",
    verified: true,
    fileSize: "3.2 MB",
    fileType: "PDF",
    extractedData: {
      metrics: [
        { name: "TSH (Thyroid Stimulating Hormone)", value: 2.1, unit: "mIU/L", refRange: "0.4 - 4.0 mIU/L", status: "normal", category: "Endocrine" },
        { name: "Free T4", value: 1.2, unit: "ng/dL", refRange: "0.8 - 1.8 ng/dL", status: "normal", category: "Endocrine" },
        { name: "Resting Blood Pressure", value: "124/82", unit: "mmHg", refRange: "< 120/80 mmHg", status: "borderline", category: "Vitals" },
        { name: "ECG Finding", value: "Normal Sinus Rhythm", unit: "", refRange: "Sinus Rhythm", status: "normal", category: "Cardiology" }
      ],
      medications: [],
      doctorNotes: "Thyroid panel completely within normal parameters. Resting ECG demonstrates normal sinus rhythm with no signs of ischemia or arrhythmia. Blood pressure remains pre-hypertensive."
    },
    summary: "Reassuring cardiology and thyroid evaluation confirming normal thyroid hormone levels and healthy ECG rhythm."
  },
  {
    id: "doc-104",
    title: "Cardiovascular & Metabolic Prescription",
    type: "Prescription image",
    category: "Prescriptions",
    date: "2026-04-02",
    facility: "Valley Medical Center",
    doctor: "Dr. Marcus Vance, MD",
    verified: true,
    fileSize: "1.1 MB",
    fileType: "PNG",
    extractedData: {
      metrics: [],
      medications: [
        { name: "Metformin", dosage: "500 mg", frequency: "Once daily", instructions: "Take oral tablet after breakfast with meals", status: "Active", sourceDocId: "doc-104" },
        { name: "Rosuvastatin", dosage: "10 mg", frequency: "Once daily", instructions: "Take oral tablet at bedtime", status: "Active", sourceDocId: "doc-104" },
        { name: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily", instructions: "Take capsule with morning meal", status: "Active", sourceDocId: "doc-104" }
      ],
      doctorNotes: "Rx active for 6 months. Maintain lipid and glycemic therapy. Repeat comprehensive blood panel in September 2026 before next renewal."
    },
    summary: "Updated prescription adding Rosuvastatin 10mg and Vitamin D3 2000IU alongside Metformin 500mg."
  },
  {
    id: "doc-105",
    title: "Follow-Up Comprehensive Laboratory Report",
    type: "Blood report",
    category: "Reports",
    date: "2026-09-28",
    facility: "Metropolitan Diagnostics Center",
    doctor: "Dr. Sarah Jenkins, MD",
    verified: true,
    fileSize: "2.4 MB",
    fileType: "PDF",
    extractedData: {
      metrics: [
        { name: "Hemoglobin", value: 12.4, unit: "g/dL", refRange: "12.0 - 15.5 g/dL", status: "normal", category: "Hematology" },
        { name: "WBC (White Blood Cells)", value: 7200, unit: "/uL", refRange: "4,500 - 11,000 /uL", status: "normal", category: "Hematology" },
        { name: "Platelets", value: 230000, unit: "/uL", refRange: "150,000 - 450,000 /uL", status: "normal", category: "Hematology" },
        { name: "Fasting Blood Glucose", value: 98, unit: "mg/dL", refRange: "70 - 99 mg/dL", status: "normal", category: "Metabolic" },
        { name: "HbA1c", value: 5.7, unit: "%", refRange: "< 5.7%", status: "normal", category: "Metabolic" },
        { name: "Total Cholesterol", value: 182, unit: "mg/dL", refRange: "< 200 mg/dL", status: "normal", category: "Lipids" },
        { name: "LDL Cholesterol", value: 98, unit: "mg/dL", refRange: "< 100 mg/dL", status: "normal", category: "Lipids" },
        { name: "HDL Cholesterol", value: 52, unit: "mg/dL", refRange: "> 50 mg/dL", status: "normal", category: "Lipids" }
      ],
      medications: [],
      doctorNotes: "Outstanding response to therapy! HbA1c normalized to 5.7%. LDL reduced to optimal 98 mg/dL. Hemoglobin returned to healthy baseline of 12.4 g/dL. Continue current regimen."
    },
    summary: "6-month follow-up showing remarkable normalization of glucose, HbA1c, LDL cholesterol, and hemoglobin markers."
  }
];

export const MOCK_RAG_QUESTIONS = [
  "Which blood tests have I taken recently?",
  "When was my previous HbA1c test?",
  "What medications appear in my latest prescription?",
  "Show me my recent laboratory reports.",
  "Which documents mention blood pressure?"
];
