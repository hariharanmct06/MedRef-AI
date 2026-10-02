export const MEDICAL_REFERENCE_KNOWLEDGE_BASE = [
  {
    id: "hba1c",
    term: "HbA1c (Glycated Hemoglobin)",
    category: "Metabolic / Diabetes",
    simpleExplanation: "A routine blood test that measures your average blood sugar levels over the past 2 to 3 months by looking at sugar attached to red blood cells.",
    medicalContext: "HbA1c measures the percentage of hemoglobin proteins coated with sugar (glycated). Because red blood cells live for roughly 120 days, the test provides an integrated index of glycemic control rather than a single point-in-time snapshot.",
    referenceRanges: [
      { condition: "Normal", range: "Below 5.7%" },
      { condition: "Prediabetes", range: "5.7% to 6.4%" },
      { condition: "Diabetes", range: "6.5% or higher" }
    ],
    relatedTerms: ["Fasting Blood Glucose", "Insulin Sensitivity", "Glycated Hemoglobin", "Metformin"],
    doctorQuestions: [
      "How does my current HbA1c compare with my previous test?",
      "What lifestyle or dietary changes can help lower my HbA1c level?",
      "How often should I recheck my HbA1c based on my current results?"
    ],
    sources: [
      { name: "American Diabetes Association (ADA)", url: "https://diabetes.org" },
      { name: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)", url: "https://www.niddk.nih.gov" }
    ]
  },
  {
    id: "hemoglobin",
    term: "Hemoglobin (Hb)",
    category: "Hematology",
    simpleExplanation: "An iron-rich protein in red blood cells that carries oxygen from your lungs to the rest of your body and returns carbon dioxide to your lungs.",
    medicalContext: "Low hemoglobin levels typically indicate anemia, which can cause fatigue, weakness, or shortness of breath. High levels may occur from dehydration, living at high altitude, smoking, or chronic hypoxia.",
    referenceRanges: [
      { condition: "Adult Female Baseline", range: "12.0 - 15.5 g/dL" },
      { condition: "Adult Male Baseline", range: "13.5 - 17.5 g/dL" }
    ],
    relatedTerms: ["Red Blood Cells (RBC)", "Hematocrit", "Ferritin", "Iron Deficiency"],
    doctorQuestions: [
      "Is my hemoglobin level within the expected range for my age and gender?",
      "Could dietary iron or vitamin supplementation help improve my hemoglobin?",
      "Are additional tests (such as ferritin or vitamin B12) recommended?"
    ],
    sources: [
      { name: "Mayo Clinic - Hemoglobin Test Guide", url: "https://www.mayoclinic.org" },
      { name: "NIH National Heart, Lung, and Blood Institute", url: "https://www.nhlbi.nih.gov" }
    ]
  },
  {
    id: "wbc",
    term: "WBC (White Blood Count)",
    category: "Hematology",
    simpleExplanation: "The total number of immune system cells circulating in your bloodstream that help your body fight infections and inflammation.",
    medicalContext: "White blood cells (leukocytes) include neutrophils, lymphocytes, monocytes, eosinophils, and basophils. Elevated levels (leukocytosis) often indicate infection, inflammation, or physical stress. Lower levels (leukopenia) may reflect viral infections, bone marrow suppression, or autoimmune responses.",
    referenceRanges: [
      { condition: "Standard Adult Range", range: "4,500 - 11,000 cells/uL" }
    ],
    relatedTerms: ["Neutrophils", "Lymphocytes", "Differential Count", "Immune System"],
    doctorQuestions: [
      "What might explain any change in my white blood cell count?",
      "Should this count be rechecked after a few weeks?",
      "Does this test indicate an active infection or inflammatory state?"
    ],
    sources: [
      { name: "MedlinePlus Medical Encyclopedia", url: "https://medlineplus.gov" }
    ]
  },
  {
    id: "platelets",
    term: "Platelet Count (Thrombocytes)",
    category: "Hematology",
    simpleExplanation: "Tiny cell fragments in your blood that help form clots to slow or stop bleeding when an injury occurs.",
    medicalContext: "Platelets are essential for hemostasis. Abnormally low platelet counts (thrombocytopenia) can increase bleeding or bruising risks, whereas high counts (thrombocytosis) can increase clotting risks.",
    referenceRanges: [
      { condition: "Standard Adult Range", range: "150,000 - 450,000 /uL" }
    ],
    relatedTerms: ["Coagulation", "CBC (Complete Blood Count)", "Thrombocytopenia"],
    doctorQuestions: [
      "Are my platelet levels stable over time?",
      "Could any medications I am taking affect my platelet count?",
      "Do I need follow-up testing?"
    ],
    sources: [
      { name: "Cleveland Clinic Health Library", url: "https://my.clevelandclinic.org" }
    ]
  },
  {
    id: "ldl-cholesterol",
    term: "LDL Cholesterol (Low-Density Lipoprotein)",
    category: "Lipid Profile / Cardiology",
    simpleExplanation: "Often called 'bad' cholesterol, LDL transports cholesterol particles throughout your body. Higher levels can build up in arterial walls.",
    medicalContext: "Elevated LDL cholesterol is a key modifiable risk factor for atherosclerosis and cardiovascular disease. Management typically combines dietary modifications, regular aerobic exercise, and statin medications when indicated.",
    referenceRanges: [
      { condition: "Optimal", range: "Below 100 mg/dL" },
      { condition: "Near Optimal", range: "100 - 129 mg/dL" },
      { condition: "High", range: "160 - 189 mg/dL" }
    ],
    relatedTerms: ["HDL Cholesterol", "Total Cholesterol", "Statins (Rosuvastatin)", "Atherosclerosis"],
    doctorQuestions: [
      "What is my target LDL level based on my overall cardiovascular profile?",
      "How do my dietary choices affect my LDL cholesterol?",
      "Should we evaluate other heart health risk indicators?"
    ],
    sources: [
      { name: "American Heart Association (AHA)", url: "https://www.heart.org" },
      { name: "CDC Cholesterol Basics", url: "https://www.cdc.gov/cholesterol" }
    ]
  },
  {
    id: "tsh",
    term: "TSH (Thyroid Stimulating Hormone)",
    category: "Endocrine",
    simpleExplanation: "A hormone produced by your pituitary gland that signals your thyroid gland to produce hormones controlling your metabolism.",
    medicalContext: "High TSH levels often suggest hypothyroidism (underactive thyroid), as the pituitary sends more signal to stimulate a sluggish thyroid. Low TSH suggests hyperthyroidism (overactive thyroid).",
    referenceRanges: [
      { condition: "Standard Adult Baseline", range: "0.4 - 4.0 mIU/L" }
    ],
    relatedTerms: ["Free T4", "Thyroid Gland", "Hypothyroidism", "Metabolism"],
    doctorQuestions: [
      "Is my TSH level optimal for my energy levels and metabolism?",
      "Should Free T4 or thyroid antibodies be evaluated alongside TSH?",
      "How often should my thyroid panel be monitored?"
    ],
    sources: [
      { name: "American Thyroid Association", url: "https://www.thyroid.org" }
    ]
  },
  {
    id: "metformin",
    term: "Metformin",
    category: "Medication / Metabolic",
    simpleExplanation: "A widely prescribed oral medication that lowers blood sugar levels by reducing glucose production in the liver and improving body insulin sensitivity.",
    medicalContext: "Metformin is a biguanide antihyperglycemic agent. It is often first-line therapy for type 2 diabetes and prediabetes management alongside diet and physical activity.",
    referenceRanges: [],
    relatedTerms: ["HbA1c", "Fasting Glucose", "Insulin Resistance", "Prediabetes"],
    doctorQuestions: [
      "What time of day is best for me to take Metformin?",
      "What common side effects should I be aware of?",
      "Are regular kidney function tests (eGFR) required while on Metformin?"
    ],
    sources: [
      { name: "U.S. National Library of Medicine - MedlinePlus", url: "https://medlineplus.gov/druginfo/meds/a696005.html" }
    ]
  }
];
