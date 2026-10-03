// MedRef AI Master Medical Dataset

export const COMPREHENSIVE_DISEASES = [
  {
    id: "myocardial-infarction",
    title: "Myocardial Infarction (AMI)",
    category: "Cardiovascular",
    subtitle: "Acute coronary syndrome resulting in myocardial necrosis due to ischemia.",
    icd10: "I21.9",
    urgency: "High Alert / Emergency",
    overview: {
      beginner: "A heart attack occurs when blood flow to part of the heart muscle is blocked, usually by a blood clot. Without blood and oxygen, heart cells begin to die.",
      student: "Acute myocardial infarction (AMI) refers to myocardial tissue necrosis caused by an abrupt decrease or cessation of coronary blood supply. It is classified into STEMI (ST-segment elevation) and NSTEMI based on ECG presentation.",
      clinical: "Ischemic myocardial necrosis secondary to coronary artery thrombosis following plaque disruption. Characterized by elevated cardiac biomarkers (Troponin I/T) with ischemic symptoms, ECG changes, or imaging evidence of new wall motion abnormality.",
      exam: "High-yield STEMI vs NSTEMI key facts: STEMI = transmural infarction with ST-segment elevation or new LBBB; emergency PCI within 90 minutes. NSTEMI = subendocardial infarction with ST depression/T-wave inversion + positive Troponin.",
      deep: "Pathophysiologic breakdown of plaque rupture (Type 1 MI) vs demand ischemia (Type 2 MI). Intracoronary thrombus formation involves platelet adhesion to exposed collagen/vWF, tissue factor release, and fibrin mesh creation blocking epicardial artery."
    },
    etiology: [
      "Atherosclerotic plaque disruption and thrombosis (Type 1 MI)",
      "Supply-demand mismatch without acute plaque disruption (Type 2 MI, e.g., severe anemia, hypotension, tachyarrhythmias)",
      "Coronary artery spasm (Prinzmetal angina)",
      "Spontaneous coronary artery dissection (SCAD)",
      "Coronary embolization (e.g., infective endocarditis)"
    ],
    pathophysiology: "Subendocardial ischemia begins within 20 minutes of complete occlusion. Transmural necrosis is complete within 6 hours if collateral flow is absent. Cellular changes include ATP depletion, lactate accumulation, Na+/K+ pump failure, cellular swelling, and membrane damage releasing intracellular enzymes (Troponin, CK-MB).",
    clinicalFeatures: [
      "Substernal chest pressure or squeezing radiating to left arm, neck, or jaw",
      "Diaphoresis (profuse sweating), dyspnea, nausea, vomiting",
      "Atypical presentation in women, elderly, and diabetics (silent MI, isolated dyspnea or fatigue)",
      "S4 gallop, papillary muscle dysfunction murmur (mitral regurgitation)"
    ],
    diagnosis: {
      labs: ["Cardiac Troponin I or T (high sensitivity, peaks 12-24h)", "CK-MB (peaks 24h, useful for re-infarction)", "Complete Blood Count, BMP, Lipid panel"],
      ecg: ["ST elevation ≥1mm in ≥2 contiguous leads (STEMI)", "ST depression or T-wave inversion (NSTEMI/Unstable Angina)", "New LBBB considered STEMI equivalent"],
      imaging: ["Echocardiogram (regional wall motion abnormality)", "Coronary Angiography (gold standard for location and severity of occlusion)"]
    },
    management: {
      firstLine: ["MONA protocol: Morphine (if refractory pain), Oxygen (if SaO2 <90%), Nitroglycerin SL, Aspirin 325mg chewed", "P2Y12 inhibitor (Ticagrelor 180mg or Clopidogrel 600mg)", "Anticoagulation (Unfractionated Heparin or Enoxaparin)"],
      intervention: ["Primary PCI within 90 minutes of medical contact (Door-to-Balloon)", "Fibrinolytic therapy (tPA/Alteplase) within 30 minutes if PCI unavailable within 120 minutes"],
      longTerm: ["High-intensity Statin (Atorvastatin 80mg)", "Dual Antiplatelet Therapy (DAPT) for 12 months", "Beta-blocker (Metoprolol succinate)", "ACE inhibitor or ARB (for LVEF <40% or hypertension)"]
    },
    complications: [
      "Ventricular arrhythmias (VF/VT - leading cause of pre-hospital death)",
      "Cardiogenic shock & Acute heart failure",
      "Papillary muscle rupture (causes acute severe MR on day 2-7)",
      "Ventricular free wall rupture (causes cardiac tamponade on day 3-14)",
      "Dressler syndrome (post-MI autoimmune pericarditis 2-10 weeks later)"
    ],
    prognosis: "In-hospital mortality for STEMI treated with PCI is <5%. Long-term prognosis depends on residual LVEF, age, baseline kidney function, and adherence to secondary prevention medications.",
    connectedNodes: ["troponin", "lisinopril", "ecg-interpretation", "aspirin", "heart-failure"],
    sources: [
      { name: "2023 AHA/ACC Guidelines for ACS Management", url: "https://www.acc.org" },
      { name: "Harrison's Principles of Internal Medicine, 21st Ed.", url: "https://accessmedicine.mhmedical.com" },
      { name: "UpToDate - Acute Myocardial Infarction", url: "https://www.uptodate.com" }
    ]
  },
  {
    id: "type-2-diabetes",
    title: "Type 2 Diabetes Mellitus (T2DM)",
    category: "Endocrine & Metabolic",
    subtitle: "Progressive metabolic disorder characterized by insulin resistance and relative insulin deficiency.",
    icd10: "E11.9",
    urgency: "Chronic Management",
    overview: {
      beginner: "Type 2 diabetes is a long-term condition where the body cannot use insulin properly, causing high blood sugar levels. It can often be managed with diet, exercise, and medications.",
      student: "T2DM is characterized by peripheral insulin resistance (skeletal muscle, adipose tissue) combined with progressive beta-cell dysfunction in the pancreas leading to hyperglycemia.",
      clinical: "Metabolic disease marked by chronic hyperglycemia resulting from defects in insulin secretion, insulin action, or both. Associated with microvascular (retinopathy, nephropathy, neuropathy) and macrovascular (CAD, stroke, PAD) complications.",
      exam: "Diagnostic criteria: HbA1c ≥ 6.5%, Fasting Plasma Glucose ≥ 126 mg/dL, 2-hour OGTT ≥ 200 mg/dL, or Random Glucose ≥ 200 mg/dL with classic symptoms.",
      deep: "Pathophysiological 'Ominous Octet' framework: 1. Beta-cell failure, 2. Insulin resistance in muscle, 3. Increased hepatic glucose output, 4. Increased lipolysis, 5. Incretin deficiency (GLP-1), 6. Hyperglucagonemia, 7. Renal hyper-reabsorption (SGLT2), 8. Central nervous system dysfunction."
    },
    etiology: [
      "Genetic predisposition (polygenic etiology with >80 loci identified)",
      "Central obesity and elevated visceral fat",
      "Physical inactivity and sedentary lifestyle",
      "Metabolic syndrome (hypertension, dyslipidemia, abdominal obesity)",
      "Gestational diabetes history"
    ],
    pathophysiology: "Insulin resistance in liver leads to unchecked gluconeogenesis. Insulin resistance in skeletal muscle decreases glucose uptake. Pancreatic beta cells initially hypersecrete insulin to compensate (hyperinsulinemia), but over time undergo amyloid deposition and apoptosis, leading to secondary insulin deficiency.",
    clinicalFeatures: [
      "Polyuria (frequent urination), Polydipsia (excessive thirst), Polyphagia (excessive hunger)",
      "Unexplained weight loss or chronic fatigue",
      "Acanthosis nigricans (hyperpigmented velvety plaques on neck/axillae)",
      "Peripheral neuropathy (glove-and-stocking paresthesias)",
      "Recurrent infections (candidiasis, slow-healing ulcers)"
    ],
    diagnosis: {
      labs: ["HbA1c ≥ 6.5%", "Fasting Blood Glucose ≥ 126 mg/dL (7.0 mmol/L)", "2-hr Oral Glucose Tolerance Test (OGTT) ≥ 200 mg/dL", "Serum Creatinine & eGFR, Urine Microalbumin-to-Creatinine Ratio (UACR)"],
      ecg: ["Screening ECG for asymptomatic ischemic heart disease"],
      imaging: ["Dilated retinal exam for diabetic retinopathy"]
    },
    management: {
      firstLine: ["Lifestyle modification: 150 min/week moderate aerobic activity + 5-7% weight reduction", "Metformin 500mg - 1000mg BID (unless eGFR < 30 mL/min)"],
      secondLine: ["SGLT2 inhibitors (Empagliflozin, Dapagliflozin) if ASCVD, Heart Failure, or CKD present", "GLP-1 Receptor Agonists (Semaglutide, Tirzepatide) for weight loss & CV benefit", "DPP-4 inhibitors or Sulfonylureas"],
      thirdLine: ["Basal Insulin (Glargine/Detemir) or Prandial Insulin (Lispro) if HbA1c remains >9.0%"]
    },
    complications: [
      "Diabetic Ketoacidosis (DKA) & Hyperosmolar Hyperglycemic State (HHS)",
      "Diabetic Nephropathy (leading cause of End-Stage Renal Disease)",
      "Diabetic Retinopathy (leading cause of blindness in working-age adults)",
      "Diabetic Neuropathy & Diabetic Foot Ulcers / Amputation risk",
      "Cardiovascular Disease (2-4x increased risk of MI & Stroke)"
    ],
    prognosis: "With optimal glycemic control (HbA1c <7.0%), blood pressure control (<130/80 mmHg), and statin therapy, microvascular and macrovascular risk is reduced by >40%.",
    connectedNodes: ["hba1c", "metformin", "ckd", "sglt2-inhibitors", "hypertension"],
    sources: [
      { name: "ADA Standards of Care in Diabetes 2024", url: "https://diabetesjournals.org" },
      { name: "EASD Guidelines for Type 2 Diabetes", url: "https://easd.org" }
    ]
  },
  {
    id: "asthma",
    title: "Bronchial Asthma",
    category: "Respiratory",
    subtitle: "Chronic inflammatory disorder of airways causing episodic bronchospasm and hyperresponsiveness.",
    icd10: "J45.909",
    urgency: "Moderate to Emergency (Exacerbation)",
    overview: {
      beginner: "Asthma is a lung condition where airways narrow, swell, and produce extra mucus, making breathing difficult and causing coughing and wheezing.",
      student: "Asthma is a chronic inflammatory disorder of the lower airways characterized by variable airflow limitation, airway hyperresponsiveness, and airway remodeling over time.",
      clinical: "Reversible obstructive airway disease mediated by Type 2 helper T-cell (Th2) immune responses, eosinophilia, mast cell degranulation, and bronchial smooth muscle constriction.",
      exam: "Key diagnostic test: Spirometry showing obstructive pattern (FEV1/FVC < 0.70) with post-bronchodilator reversibility (FEV1 increase >12% and >200 mL).",
      deep: "Phenotypic differentiation into Eosinophilic (Th2-high, responsive to Inhaled Corticosteroids & Biologics like Dupilumab) vs Non-eosinophilic (Th2-low/Neutrophilic, associated with smoking and obesity)."
    },
    etiology: [
      "Atopic allergy predisposition (IgE-mediated response to dust mites, pollen, pet dander)",
      "Environmental triggers (cold air, exercise, viral upper respiratory infections)",
      "Occupational sensitizers (chemicals, flour, wood dust)",
      "Medication triggers (Aspirin/NSAIDs - Aspirin-Exacerbated Respiratory Disease, Beta-blockers)"
    ],
    pathophysiology: "Antigen presentation stimulates Th2 cells to release IL-4, IL-5, IL-13. IgE causes mast cell degranulation releasing histamine, leukotrienes (LTC4, LTD4), and prostaglandins. Resulting in smooth muscle contraction, goblet cell hypersecretion of thick mucus, mucosal edema, and eosinophilic tissue infiltration.",
    clinicalFeatures: [
      "Triad of Episodic Wheezing, Cough (often nocturnal), and Shortness of breath",
      "Chest tightness relieved by short-acting bronchodilator",
      "Pulsus paradoxus (drop in SBP >10 mmHg during inspiration in severe exacerbation)",
      "Silent chest (ominous sign of near-fatal airway occlusion requiring intubation)"
    ],
    diagnosis: {
      labs: ["Blood Eosinophil Count (>300 cells/uL suggests eosinophilic phenotype)", "Total Serum IgE", "Fractional Exhaled Nitric Oxide (FeNO >50 ppb indicates eosinophilic airway inflammation)"],
      spirometry: ["FEV1/FVC < 0.70 confirming obstruction", "Reversibility test: >12% and >200 mL increase in FEV1 15 min after Albuterol"],
      imaging: ["Chest X-ray usually normal or showing hyperinflation; excludes pneumothorax or pneumonia during exacerbation"]
    },
    management: {
      firstLine: ["GINA Track 1: Low-dose Inhaled Corticosteroid (ICS) + Formoterol as needed for quick relief & maintenance", "Short-Acting Beta-2 Agonist (SABA / Albuterol) as alternative reliever (Track 2)"],
      secondLine: ["Medium-dose ICS + LABA (Salmeterol/Formoterol)", "Leukotriene Receptor Antagonist (Montelukast 10mg daily)"],
      thirdLine: ["High-dose ICS-LABA + LAMA (Tiotropium)", "Biologic therapies: Anti-IgE (Omalizumab), Anti-IL5 (Mepolizumab, Benralizumab), Anti-IL4R (Dupilumab)"]
    },
    complications: [
      "Status Asthmaticus (severe acute asthma refractory to initial bronchodilators)",
      "Respiratory failure & Hypercapnia",
      "Pneumothorax or Pneumomediastinum",
      "Permanent fixed airflow obstruction (airway remodeling)"
    ],
    prognosis: "Excellent with daily controller adherence. Death rates are extremely low (<1 per 100,000) when patients avoid SABA monotherapy and receive ICS-containing maintenance.",
    connectedNodes: ["albuterol", "spirometry", "copd", "eosinophils", "montelukast"],
    sources: [
      { name: "Global Initiative for Asthma (GINA) 2023 Strategy", url: "https://ginasthma.org" },
      { name: "NHLBI Asthma Management Guidelines", url: "https://www.nhlbi.nih.gov" }
    ]
  },
  {
    id: "diabetic-ketoacidosis",
    title: "Diabetic Ketoacidosis (DKA)",
    category: "Emergency Medicine & Endocrine",
    subtitle: "Life-threatening metabolic complication of uncontrolled diabetes with severe ketosis and acidosis.",
    icd10: "E10.10",
    urgency: "High Alert / Emergency",
    overview: {
      beginner: "DKA is a serious complication of diabetes where the body runs out of insulin and starts breaking down fat too quickly, turning it into acids called ketones.",
      student: "DKA is a metabolic crisis characterized by the triad of Hyperglycemia (>250 mg/dL), Anion Gap Metabolic Acidosis (pH <7.30, HCO3 <18 mEq/L), and Ketonemia/Ketonuria.",
      clinical: "Absolute or relative insulin deficiency coupled with counter-regulatory hormone excess (glucagon, catecholamines, cortisol, GH). Lipolysis releases free fatty acids converted by hepatic mitochondria into acetoacetate and beta-hydroxybutyrate.",
      exam: "High yield calculation: High Anion Gap = Na - (Cl + HCO3). Potassium management: Never start insulin if K+ < 3.3 mEq/L (replete K+ first to prevent fatal arrhythmia).",
      deep: "Osmotic diuresis causes severe total body sodium, potassium, and water deficits (average 6-9 L deficit). Pseudo-hyponatremia occurs from glucose-driven osmotic fluid shift: add 1.6 mEq/L Na per 100 mg/dL glucose above 100."
    },
    etiology: [
      "Infection (most common trigger: Urinary Tract Infection, Pneumonia, Sepsis)",
      "Non-adherence to insulin therapy or pump malfunction",
      "New-onset Type 1 Diabetes Mellitus",
      "Acute cardiovascular events (Myocardial Infarction, Stroke)",
      "SGLT2 inhibitor therapy (can cause Euglycemic DKA with normal glucose <250 mg/dL)"
    ],
    pathophysiology: "Insulin deficiency prevents cellular glucose entry. Glucagon stimulates uninhibited lipolysis. Free fatty acids enter hepatic mitochondria undergoing beta-oxidation into acetoacetate and beta-hydroxybutyrate. Accumulation of ketoacids exceeds serum buffering capacity, yielding High Anion Gap Metabolic Acidosis.",
    clinicalFeatures: [
      "Kussmaul breathing (deep, rapid hyperventilation compensating for metabolic acidosis)",
      "Fruity or acetone odor on breath",
      "Nausea, vomiting, severe diffuse abdominal pain (mimicking acute abdomen)",
      "Polyuria, polydipsia, lethargy, altered mental status, cerebral edema risk"
    ],
    diagnosis: {
      labs: [
        "Blood Glucose > 250 mg/dL (or lower in euglycemic DKA)",
        "Arterial/Venous Blood Gas: pH < 7.30, Serum Bicarbonate < 18 mEq/L",
        "Anion Gap > 12 mEq/L",
        "Serum Beta-hydroxybutyrate > 3.0 mmol/L or positive serum/urine ketones"
      ],
      ecg: ["Inspect for hyperkalemia (peaked T-waves) or hypokalemia (U-waves)"],
      imaging: ["Chest X-ray to rule out triggering pneumonia"]
    },
    management: {
      firstLine: ["1. Aggressive IV Fluid Resuscitation: 0.9% Normal Saline 1-1.5 L in first hour", "2. Potassium Repletion: Add 20-30 mEq K+ per liter once K+ < 5.2 mEq/L. Hold insulin if K+ < 3.3!", "3. Regular Insulin IV Infusion: 0.1 units/kg/hr"],
      transition: ["Switch to 5% Dextrose with 0.45% Saline when glucose drops to 200 mg/dL (maintain insulin drip to clear ketoacidosis)", "Continue IV insulin until Anion Gap closes (<12 mEq/L), HCO3 ≥18, and pH >7.30"],
      subcutaneous: ["Administer Subcutaneous Basal Insulin 2 hours BEFORE stopping IV insulin drip to prevent rebound DKA"]
    },
    complications: [
      "Cerebral Edema (most dangerous in pediatric patients; treat with Mannitol or 3% Hypertonic Saline)",
      "Severe Hypokalemia leading to cardiac arrest or muscle paralysis",
      "Hypoglycemia from aggressive insulin therapy",
      "Mucormycosis (invasive fungal infection in severe diabetic acidotic patients)"
    ],
    prognosis: "Overall mortality is <1% in experienced tertiary centers, but rises significantly in elderly patients with severe comorbid sepsis or delayed resuscitation.",
    connectedNodes: ["anion-gap", "insulin", "type-1-diabetes", "potassium", "metformin"],
    sources: [
      { name: "ADA Consensus Statement on Hyperglycemic Crises", url: "https://diabetesjournals.org" },
      { name: "Endocrine Society Clinical Practice Guidelines", url: "https://www.endocrine.org" }
    ]
  },
  {
    id: "pulmonary-embolism",
    title: "Pulmonary Embolism (PE)",
    category: "Cardiovascular & Pulmonology",
    subtitle: "Occlusion of pulmonary arterial bed by thrombus dislodged from deep veins.",
    icd10: "I26.99",
    urgency: "High Alert / Emergency",
    overview: {
      beginner: "A pulmonary embolism occurs when a blood clot (usually from the legs) travels up into the blood vessels of the lungs, causing acute breathing trouble.",
      student: "PE occurs when a deep vein thrombus (DVT) embolizes through the right heart chambers and occludes pulmonary arterial circulation, causing V/Q mismatch and right ventricular strain.",
      clinical: "Acute hemodynamic disruption from RV pressure overload. Massive PE involves persistent hypotension (SBP <90 mmHg) or cardiac arrest; Submassive PE features RV dysfunction on echo/CT or elevated biomarkers (Troponin/BNP) without systemic hypotension.",
      exam: "High yield diagnostic tool: Wells' Criteria. If low/moderate probability -> check high-sensitivity D-dimer. If high probability -> proceed directly to CT Pulmonary Angiography (CTPA).",
      deep: "Virchow's Triad (Venous stasis, Endothelial injury, Hypercoagulability). S1Q3T3 pattern on ECG is classic but non-specific (found in <20%); sinus tachycardia is the most common ECG finding."
    },
    etiology: [
      "Deep Vein Thrombosis (90% originate from proximal leg veins: femoral, iliac, popliteal)",
      "Immobilization (prolonged flight, bed rest, post-orthopedic surgery)",
      "Malignancy (pancreatic, lung, stomach, hematologic cancers)",
      "Inherited thrombophilia (Factor V Leiden, Prothrombin G20210A, Antiphospholipid Syndrome)",
      "Oral contraceptives or Hormone Replacement Therapy"
    ],
    pathophysiology: "Embolus obstructs pulmonary arterial flow -> increases alveolar dead space (V/Q mismatch) causing hypoxemia. Increased pulmonary vascular resistance causes right ventricular dilation, wall stress, ischemia, and failure (cor pulmonale), decreasing LV preload and causing hypotension.",
    clinicalFeatures: [
      "Sudden onset dyspnea (most common symptom)",
      "Pleuritic chest pain (worse with deep inspiration)",
      "Tachycardia (HR >100 bpm) and Tachypnea (RR >20/min)",
      "Hemoptysis (indicates pulmonary infarction)",
      "Unilateral leg swelling/tenderness (DVT sign)"
    ],
    diagnosis: {
      labs: ["D-dimer test (high sensitivity, high negative predictive value; only useful when low PE probability)", "Troponin I & NT-proBNP (elevated in submassive PE indicating RV strain)", "Arterial Blood Gas (hypoxemia, hypocapnia, respiratory alkalosis)"],
      ecg: ["Sinus Tachycardia (most common)", "Right axis deviation, RBBB, S1Q3T3 pattern"],
      imaging: ["CT Pulmonary Angiography (CTPA) - Gold Standard", "Ventilation-Perfusion (V/Q) scan if contrast allergy or severe renal impairment", "Bedside Echocardiogram (McConnell sign: RV free wall hypokinesis with apical sparing)"]
    },
    management: {
      firstLine: ["Immediate Anticoagulation: LMWH (Enoxaparin 1mg/kg SC BID), Unfractionated Heparin drip, or DOAC (Apixaban/Rivaroxaban)", "Oxygen therapy, IV fluids cautiously (avoid RV overload)"],
      massivePE: ["Systemic Thrombolysis (Alteplase 100mg IV over 2 hours) or Catheter-directed Thrombolysis/Embolectomy for hemodynamically unstable massive PE"],
      maintenance: ["DOAC therapy (Apixaban 10mg BID for 7 days then 5mg BID) for at least 3-6 months; lifelong if unprovoked or recurrent"]
    },
    complications: [
      "Obstructive Shock & Sudden Cardiac Arrest",
      "Chronic Thromboembolic Pulmonary Hypertension (CTEPH)",
      "Pulmonary Infarction & Pleural Effusion",
      "Recurrent Thromboembolism"
    ],
    prognosis: "Mortality ranges from <1% in low-risk non-submassive PE up to >30% in massive PE presenting with obstructive shock.",
    connectedNodes: ["wells-criteria", "apixaban", "d-dimer", "ctpa", "troponin"],
    sources: [
      { name: "2019 ESC Guidelines on Acute Pulmonary Embolism", url: "https://www.escardio.org" },
      { name: "CHEST Guideline for Antithrombotic Therapy", url: "https://journal.chestnet.org" }
    ]
  },
  {
    id: "heart-failure",
    title: "Congestive Heart Failure (CHF)",
    category: "Cardiovascular",
    subtitle: "Complex clinical syndrome resulting from structural or functional impairment of ventricular filling or ejection.",
    icd10: "I50.9",
    urgency: "Chronic / Moderate to High (Decompensated)",
    overview: {
      beginner: "Heart failure means the heart isn't pumping blood as effectively as it should, leading to fluid buildup in the lungs and legs, fatigue, and shortness of breath.",
      student: "CHF is categorized by ejection fraction into HFrEF (EF ≤40%), HFmrEF (EF 41-49%), and HFpEF (EF ≥50%). Characterized by neurohormonal activation (RAAS, SNS) causing adverse cardiac remodeling.",
      clinical: "Syndrome characterized by high ventricular filling pressures and inadequate cardiac output at rest or with exertion. Acute decompensation presents with pulmonary congestion (orthopnea, PND, crackles) and peripheral edema.",
      exam: "The 4 Pillars of HFrEF Guideline-Directed Medical Therapy (GDMT): 1. ARNI (Sacubitril/Valsartan) or ACEi/ARB, 2. Beta-blocker (Carvedilol, Metoprolol succinate, Bisoprolol), 3. MRA (Spironolactone/Eplerenone), 4. SGLT2 inhibitor (Dapagliflozin/Empagliflozin).",
      deep: "Frank-Starling law compensation failure. Neurohormonal axis activation (Angiotensin II, Aldosterone, Norepinephrine) maintains MAP short-term but increases afterload, promotes cardiac fibrosis, apoptosis, and progressive ventricular dilation."
    },
    etiology: [
      "Ischemic Heart Disease / Prior Myocardial Infarction (most common cause of HFrEF)",
      "Hypertension (leading cause of HFpEF)",
      "Valvular Heart Disease (Aortic Stenosis, Mitral Regurgitation)",
      "Dilated Cardiomyopathy (alcohol, viral myocarditis, doxorubicin, genetic)",
      "Arrhythmias (AFib with rapid ventricular response)"
    ],
    pathophysiology: "Decreased stroke volume activates Sympathetic Nervous System (increasing HR and SVR) and RAAS (causing sodium/water retention and vasoconstriction). Chronic elevated wall stress stimulates cardiac hypertrophy and interstitial fibrosis, leading to progressive chamber dilation and EF drop.",
    clinicalFeatures: [
      "Left-sided HF: Exertional dyspnea, Orthopnea (shortness of breath lying flat), Paroxysmal Nocturnal Dyspnea (PND), pulmonary bibasilar crackles, S3 gallop",
      "Right-sided HF: Jugular Venous Distension (JVD >8 cm H2O), Hepatomegaly, Ascites, Bilateral pitting ankle edema",
      "Fatigue, exercise intolerance, cardiac cachexia"
    ],
    diagnosis: {
      labs: ["NT-proBNP (>300 pg/mL) or BNP (>100 pg/mL) - high negative predictive value", "Serum Electrolytes, BUN/Creatinine, LFTs, TSH, Iron panel"],
      ecg: ["Sinus tachycardia, LBBB, low voltage, old Q waves, atrial fibrillation"],
      imaging: [
        "Transthoracic Echocardiogram (TTE) - evaluates EF, diastolic function, wall motion, valve gradient",
        "Chest X-ray (Cardiomegaly, Kerley B lines, pleural effusion, cephalization of pulmonary vessels)"
      ]
    },
    management: {
      firstLine: ["GDMT Quadruple Therapy: 1. Sacubitril/Valsartan (ARNI), 2. Metoprolol Succinate or Carvedilol, 3. Spironolactone, 4. Empagliflozin or Dapagliflozin", "Loop Diuretic (Furosemide 20-80mg IV/PO) for symptom relief of volume overload"],
      decompensated: ["IV Loop Diuretics, Nitroglycerin drip (if SBP >110 mmHg), Inotropes (Dobutamine/Milrinone if cardiogenic shock)"],
      deviceTherapy: ["ICD (Implantable Cardioverter Defibrillator) for primary prevention if EF ≤35% after 3 months GDMT", "CRT (Cardiac Resynchronization Therapy) if EF ≤35% + LBBB with QRS ≥150ms"]
    },
    complications: [
      "Acute Decompensated Heart Failure & Pulmonary Edema",
      "Cardiorenal Syndrome (worsening renal function due to low output & high venous pressure)",
      "Symptomatic Ventricular Arrhythmias & Sudden Cardiac Death",
      "Refractory End-Stage Heart Failure (requiring LVAD or Heart Transplantation)"
    ],
    prognosis: "5-year mortality after initial diagnosis is approximately 50%. Adherence to 4-pillar GDMT reduces mortality by over 60%.",
    connectedNodes: ["lisinopril", "sglt2-inhibitors", "cha2ds2-vasc", "myocardial-infarction", "gfr"],
    sources: [
      { name: "2022 AHA/ACC/HFSA Heart Failure Guidelines", url: "https://www.acc.org" },
      { name: "2023 ESC Guidelines for Heart Failure", url: "https://www.escardio.org" }
    ]
  }
];

export const COMPREHENSIVE_DRUGS = [
  {
    id: "lisinopril",
    name: "Lisinopril",
    brandNames: ["Zestril", "Prinivil"],
    drugClass: "Angiotensin-Converting Enzyme (ACE) Inhibitor",
    route: "Oral (Tablet)",
    badgeCategory: "Antihypertensive / Cardiovascular",
    overview: "Lisinopril is an oral ACE inhibitor widely used for hypertension, heart failure, and post-myocardial infarction kidney protection.",
    mechanism: "Competitive inhibitor of Angiotensin-Converting Enzyme (ACE). Prevents conversion of Angiotensin I to Angiotensin II (a potent vasoconstrictor). Decreases aldosterone secretion, reducing sodium and water retention. Increases bradykinin levels by blocking its breakdown.",
    indications: [
      "Essential Hypertension",
      "Heart Failure with Reduced Ejection Fraction (HFrEF)",
      "Acute Myocardial Infarction (started within 24h to reduce mortality)",
      "Diabetic Nephropathy (reduces microalbuminuria progression)"
    ],
    contraindications: [
      "History of ACE inhibitor-induced Angioedema",
      "Pregnancy (Black Box Warning: fetal toxicity/death)",
      "Concomitant use with Sacubitril/Valsartan (must observe 36-hour washout period)",
      "Bilateral Renal Artery Stenosis"
    ],
    adverseEffects: [
      "Dry persistent non-productive cough (10-15%, mediated by bradykinin accumulation)",
      "Hyperkalemia (due to reduced aldosterone)",
      "Acute decline in eGFR / elevated Creatinine (acceptable up to 30% baseline rise)",
      "Angioedema (life-threatening airway swelling, higher in Black patients)",
      "First-dose hypotension"
    ],
    interactions: [
      { drug: "Spironolactone / Potassium Supplements", severity: "Major", details: "Synergistic increase in serum potassium levels leading to severe hyperkalemia." },
      { drug: "NSAIDs (Ibuprofen, Naproxen)", severity: "Moderate", details: "Blunts antihypertensive efficacy and increases risk of acute renal failure ('Triple Whammy' with diuretics)." },
      { drug: "Sacubitril / Valsartan (Entresto)", severity: "Severe / Contraindicated", details: "Extreme risk of life-threatening angioedema. Requires 36-hour washout period." },
      { drug: "Lithium", severity: "Major", details: "Decreases lithium clearance leading to lithium toxicity." }
    ],
    warnings: "Black Box Warning: Fetal Toxicity. Discontinue as soon as pregnancy is detected. Monitor serum potassium and renal function within 1-2 weeks of initiation.",
    monitoring: ["Serum Creatinine & eGFR", "Serum Potassium", "Blood Pressure & Heart Rate", "Signs of angioedema or persistent cough"],
    dosing: "Hypertension: Initial 10mg PO once daily, titrate up to 40mg daily max. Heart Failure: Initial 2.5-5mg PO once daily, target 20-40mg PO daily.",
    sources: [
      { name: "FDA Lisinopril Prescribing Information", url: "https://www.accessdata.fda.gov" },
      { name: "Lexicomp Clinical Drug Information", url: "https://www.up-to-date.com" }
    ]
  },
  {
    id: "metformin",
    name: "Metformin Hydrochloride",
    brandNames: ["Glucophage", "Glumetza", "Fortamet"],
    drugClass: "Biguanide Antihypertensive / Antidiabetic",
    route: "Oral (Immediate Release & Extended Release)",
    badgeCategory: "Metabolic / Antidiabetic",
    overview: "Metformin is the first-line oral pharmacotherapy for Type 2 Diabetes Mellitus, noted for lowering blood glucose without causing hypoglycemia.",
    mechanism: "Activates AMP-activated protein kinase (AMPK) in hepatic cells. Inhibits hepatic gluconeogenesis and glycogenolysis. Increases peripheral insulin sensitivity in skeletal muscle (enhancing glucose uptake). Delays intestinal absorption of glucose.",
    indications: [
      "Type 2 Diabetes Mellitus (First-line agent)",
      "Prediabetes (off-label prevention in high-risk patients)",
      "Polycystic Ovary Syndrome (PCOS - off-label for ovulation induction)"
    ],
    contraindications: [
      "Severe Renal Impairment (eGFR < 30 mL/min/1.73m²)",
      "Acute or chronic Metabolic Acidosis (including DKA)",
      "Severe hepatic dysfunction or acute heart failure",
      "Conditions predisposing to tissue hypoxia (sepsis, acute MI)"
    ],
    adverseEffects: [
      "Gastrointestinal upset (diarrhea, nausea, abdominal pain, flatulence in up to 30%)",
      "Lactic Acidosis (rare but severe, mortality ~50%)",
      "Vitamin B12 deficiency (long-term use impairs B12 ileal absorption)",
      "Metallic taste in mouth"
    ],
    interactions: [
      { drug: "Iodinated Radiocontrast Media", severity: "Major", details: "Hold metformin before or at time of procedure; restart 48 hours post-procedure after verifying renal stability to avoid lactic acidosis." },
      { drug: "Alcohol", severity: "Major", details: "Potentiates metformin's effect on lactate metabolism, increasing lactic acidosis risk." },
      { drug: "Cimetidine", severity: "Moderate", details: "Competes for renal tubular transport, increasing plasma metformin levels." }
    ],
    warnings: "Black Box Warning: Lactic Acidosis. Risk increases with renal impairment, sepsis, old age, and heavy alcohol consumption.",
    monitoring: ["eGFR & Serum Creatinine (at baseline and annually)", "HbA1c (every 3-6 months)", "Serum Vitamin B12 levels (every 1-2 years)"],
    dosing: "Initial: 500mg PO BID or 850mg PO QD with meals. Titrate up to maximum effective dose of 2000mg - 2550mg daily. If eGFR 30-45 mL/min, max dose 1000mg/day.",
    sources: [
      { name: "ADA Standards of Care - Pharmacologic Approaches", url: "https://diabetesjournals.org" },
      { name: "FDA Metformin Safety Labeling Changes", url: "https://www.fda.gov" }
    ]
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    brandNames: ["Lipitor"],
    drugClass: "HMG-CoA Reductase Inhibitor (Statin)",
    route: "Oral (Tablet)",
    badgeCategory: "Lipid-Lowering / Cardiovascular",
    overview: "Atorvastatin is a high-intensity statin used to lower LDL cholesterol, reduce atherosclerotic plaque progression, and lower CV events.",
    mechanism: "Selectively and competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol biosynthesis. Upregulates hepatic LDL receptor expression, enhancing clearance of circulating LDL-C from bloodstream.",
    indications: [
      "Primary Hypercholesterolemia & Mixed Dyslipidemia",
      "Primary Prevention of Atherosclerotic Cardiovascular Disease (ASCVD)",
      "Secondary Prevention post-ACS, MI, Stroke, or TIA (High-intensity therapy)"
    ],
    contraindications: [
      "Active liver disease or unexplained persistent elevation in serum transaminases",
      "Pregnancy and Breastfeeding",
      "Hypersensitivity to Atorvastatin"
    ],
    adverseEffects: [
      "Myalgia & Muscle cramping (5-10%)",
      "Myopathy & Rhabdomyolysis (rare, elevated Creatine Kinase >10x ULN)",
      "Elevated hepatic transaminases (ALT/AST)",
      "Modest risk of new-onset Type 2 Diabetes"
    ],
    interactions: [
      { drug: "Clarithromycin / Itraconazole (CYP3A4 Inhibitors)", severity: "Major", details: "Inhibits CYP3A4 metabolism of atorvastatin, dramatically increasing serum levels and rhabdomyolysis risk." },
      { drug: "Gemfibrozil", severity: "Major", details: "Increases statin plasma concentrations; avoid combination due to rhabdomyolysis risk." },
      { drug: "Grapefruit Juice (>1.2 L/day)", severity: "Moderate", details: "CYP3A4 inhibition increases atorvastatin exposure." }
    ],
    warnings: "Myopathy/Rhabdomyolysis risk is dose-dependent. Patients should report unexplained muscle pain, tenderness, or dark urine immediately.",
    monitoring: ["Lipid Panel (4-12 weeks after initiation)", "Baseline ALT/AST", "Creatine Kinase (CK) if muscle symptoms occur"],
    dosing: "High-intensity therapy: 40mg - 80mg PO once daily. Moderate-intensity therapy: 10mg - 20mg PO once daily.",
    sources: [
      { name: "AHA/ACC Cholesterol Guidelines", url: "https://www.acc.org" },
      { name: "Pfizer Lipitor Prescribing Info", url: "https://www.pfizer.com" }
    ]
  },
  {
    id: "apixaban",
    name: "Apixaban",
    brandNames: ["Eliquis"],
    drugClass: "Direct Factor Xa Inhibitor (DOAC)",
    route: "Oral (Tablet)",
    badgeCategory: "Anticoagulant / Hematology",
    overview: "Apixaban is an oral direct Factor Xa inhibitor used for stroke prevention in non-valvular atrial fibrillation and treatment/prevention of DVT and PE.",
    mechanism: "Selective and reversible direct inhibitor of free and clot-bound Factor Xa and prothrombinase activity. Inhibits conversion of prothrombin to thrombin, preventing fibrin clot formation.",
    indications: [
      "Stroke and Systemic Embolism prevention in Non-Valvular Atrial Fibrillation",
      "Treatment of Deep Vein Thrombosis (DVT) and Pulmonary Embolism (PE)",
      "Secondary prevention of recurrent DVT and PE",
      "Post-operative DVT prophylaxis in hip or knee replacement"
    ],
    contraindications: [
      "Active pathological bleeding (e.g., intracranial hemorrhage, active GI bleeding)",
      "Severe hepatic impairment (Child-Pugh Class C)",
      "Prosthetic heart valves (requires Warfarin)",
      "Lesions at high risk of major bleeding"
    ],
    adverseEffects: [
      "Major and minor hemorrhage (GI bleeding, hematuria, epistaxis)",
      "Hematoma at puncture site",
      "Thrombocytopenia (rare)",
      "Anemia"
    ],
    interactions: [
      { drug: "Strong Dual Inhibitors of CYP3A4 & P-gp (Ketoconazole, Ritonavir)", severity: "Major", details: "Dramatically increases apixaban levels; reduce apixaban dose by 50% or avoid." },
      { drug: "Aspirin / NSAIDs / Antiplatelets", severity: "Major", details: "Additive bleeding risk; reserve combination only for mandatory indications (e.g. recent PCI)." },
      { drug: "Rifampin (Strong CYP3A4/P-gp Inducer)", severity: "Major", details: "Decreases apixaban exposure, reducing anticoagulant efficacy." }
    ],
    warnings: "Black Box Warning: Premature discontinuation increases thrombotic stroke risk. Epidural/spinal hematoma risk during neuraxial anesthesia.",
    monitoring: ["Hemoglobin/Hematocrit & Platelets", "Renal function (Serum Creatinine)", "Routine PT/INR testing is NOT required"],
    dosing: "AFib: 5mg PO BID. Reduce to 2.5mg PO BID if patient has ≥2 of: Age ≥80 years, Weight ≤60 kg, Serum Creatinine ≥1.5 mg/dL. DVT/PE treatment: 10mg PO BID for 7 days, then 5mg PO BID.",
    sources: [
      { name: "Eliquis FDA Prescribing Information", url: "https://www.eliquis.com" },
      { name: "CHEST Antithrombotic Therapy Guidelines", url: "https://journal.chestnet.org" }
    ]
  },
  {
    id: "albuterol",
    name: "Albuterol (Salbutamol)",
    brandNames: ["ProAir HFA", "Ventolin HFA", "Proventil HFA"],
    drugClass: "Short-Acting Beta-2 Adrenergic Agonist (SABA)",
    route: "Inhalation (MDI / Nebulizer)",
    badgeCategory: "Respiratory / Bronchodilator",
    overview: "Albuterol is a fast-acting bronchodilator used for acute rescue relief of bronchospasm in asthma and COPD.",
    mechanism: "Stimulates beta-2 adrenergic receptors in bronchial smooth muscle, activating adenylate cyclase and increasing intracellular cAMP. Leads to smooth muscle relaxation and rapid bronchodilation within 5-15 minutes.",
    indications: [
      "Acute bronchospasm rescue in Asthma and COPD",
      "Prevention of Exercise-Induced Bronchospasm (EIB)",
      "Hyperkalemia emergency management (off-label IV/nebulized shift of K+ into cells)"
    ],
    contraindications: [
      "Hypersensitivity to Albuterol or milk proteins (for dry powder inhalers)"
    ],
    adverseEffects: [
      "Tremor and nervousness (due to skeletal muscle beta-2 stimulation)",
      "Tachycardia and Palpitations (beta-1 cross-reactivity at high doses)",
      "Hypokalemia (drives K+ into intracellular space)",
      "Hyperglycemia"
    ],
    interactions: [
      { drug: "Non-selective Beta-Blockers (Propranolol)", severity: "Major", details: "Antagonizes albuterol bronchodilatory action and may induce severe bronchospasm." },
      { drug: "Diuretics (Furosemide, Thiazides)", severity: "Moderate", details: "Potentiates hypokalemic risk." }
    ],
    warnings: "Overuse (>1 canister per month) indicates poorly controlled asthma and increases risk of asthma-related death; requires controller ICS escalation.",
    monitoring: ["Peak Expiratory Flow Rate (PEFR) / FEV1", "Heart rate and blood pressure", "Serum Potassium (in high-dose emergency settings)"],
    dosing: "Acute Bronchospasm: 2 puffs (90 mcg/puff) MDI every 4-6 hours as needed or 2.5mg nebulizer solution every 20 min x 3 doses in acute severe asthma.",
    sources: [
      { name: "GINA Asthma Guidelines", url: "https://ginasthma.org" },
      { name: "FDA Albuterol Inhaler Labeling", url: "https://www.fda.gov" }
    ]
  }
];

export const CALCULATORS_DATA = [
  {
    id: "anion-gap",
    name: "Serum Anion Gap",
    category: "Metabolic / Nephrology",
    description: "Calculates the difference between unmeasured anions and cations in blood plasma to differentiate metabolic acidosis causes.",
    inputs: [
      { id: "na", label: "Sodium (Na⁺)", unit: "mEq/L", default: 140, min: 100, max: 180, step: 1 },
      { id: "cl", label: "Chloride (Cl⁻)", unit: "mEq/L", default: 102, min: 60, max: 140, step: 1 },
      { id: "hco3", label: "Bicarbonate (HCO₃⁻)", unit: "mEq/L", default: 24, min: 5, max: 50, step: 1 }
    ],
    formula: "Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻)",
    normalRange: "8 - 12 mEq/L (without Potassium) or 12 - 16 mEq/L (with Potassium)",
    calculate: (vals) => {
      const result = vals.na - (vals.cl + vals.hco3);
      let interpretation = "";
      let riskLevel = "Normal";
      if (result > 12) {
        riskLevel = "Elevated";
        interpretation = "High Anion Gap Metabolic Acidosis (HAGMA). Consider MUDPILES / GOLDMARK causes: Methanol, Uremia, DKA, Propylene glycol, Iron/Isoniazid, Lactic acidosis, Ethylene glycol, Salicylates.";
      } else if (result < 6) {
        riskLevel = "Low";
        interpretation = "Low Anion Gap. Consider Hypoalbuminemia (add 2.5 mEq/L per 1 g/dL drop in albumin < 4.0), Multiple Myeloma, or Lithium toxicity.";
      } else {
        riskLevel = "Normal";
        interpretation = "Normal Anion Gap (8 - 12 mEq/L). If metabolic acidosis is present, consider Normal Anion Gap Metabolic Acidosis (NAGMA / Hyperchloremic Acidosis): GI HCO3 loss (diarrhea) or Renal Tubular Acidosis (RTA).";
      }
      return { value: result, unit: "mEq/L", riskLevel, interpretation };
    },
    references: ["Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. CJASN. 2007;2(1):162-174."]
  },
  {
    id: "cha2ds2-vasc",
    name: "CHA₂DS₂-VASc Score for AFib Stroke Risk",
    category: "Cardiology",
    description: "Estimates annual thromboembolic stroke risk in non-valvular Atrial Fibrillation to guide anticoagulation therapy.",
    checkboxes: [
      { id: "c", label: "Congestive Heart Failure (or LVEF ≤40%)", points: 1 },
      { id: "h", label: "Hypertension (BP >140/90 or treated)", points: 1 },
      { id: "a2", label: "Age ≥ 75 years", points: 2 },
      { id: "d", label: "Diabetes Mellitus", points: 1 },
      { id: "s2", label: "Stroke / TIA / Thromboembolism history", points: 2 },
      { id: "v", label: "Vascular Disease (Prior MI, PAD, Aortic plaque)", points: 1 },
      { id: "a", label: "Age 65 - 74 years", points: 1 },
      { id: "sc", label: "Sex Category: Female", points: 1 }
    ],
    formula: "Sum of selected risk criteria points (Max 9 points)",
    normalRange: "Score 0 (Low Risk) to Score 9 (High Risk)",
    calculate: (selectedIds) => {
      let score = 0;
      if (selectedIds.includes("c")) score += 1;
      if (selectedIds.includes("h")) score += 1;
      if (selectedIds.includes("a2")) score += 2;
      if (selectedIds.includes("d")) score += 1;
      if (selectedIds.includes("s2")) score += 2;
      if (selectedIds.includes("v")) score += 1;
      if (selectedIds.includes("a")) score += 1;
      if (selectedIds.includes("sc")) score += 1;

      let riskLevel = "Low";
      let interpretation = "";
      let annualRisk = "";

      if (score === 0) {
        riskLevel = "Low Risk";
        annualRisk = "0% annual stroke risk";
        interpretation = "Anticoagulation or antiplatelet therapy is NOT recommended. Low risk of ischemic stroke.";
      } else if (score === 1) {
        riskLevel = "Moderate Risk";
        annualRisk = "1.3% annual stroke risk";
        interpretation = "Oral Anticoagulation (DOAC preferred over Warfarin) SHOULD BE CONSIDERED based on individual risk-benefit discussion.";
      } else {
        riskLevel = "High Risk";
        const risks = ["", "1.3%", "2.2%", "3.2%", "4.0%", "6.7%", "9.8%", "9.6%", "12.5%", "15.2%"];
        annualRisk = `${risks[score] || ">15%"} annual stroke risk`;
        interpretation = "Oral Anticoagulation (DOAC such as Apixaban, Rivaroxaban, or Dabigatran) IS RECOMMENDED unless strong contraindications exist.";
      }
      return { value: score, unit: "Points", riskLevel, annualRisk, interpretation };
    },
    references: ["Lip GY, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the CHA2DS2-VASc score. Chest. 2010;137(2):263-272."]
  },
  {
    id: "gfr-ckdepi",
    name: "eGFR (CKD-EPI 2021 Equation)",
    category: "Nephrology",
    description: "Estimates Glomerular Filtration Rate without race coefficient to stage Chronic Kidney Disease.",
    inputs: [
      { id: "scr", label: "Serum Creatinine", unit: "mg/dL", default: 1.1, min: 0.2, max: 15, step: 0.1 },
      { id: "age", label: "Age", unit: "years", default: 58, min: 18, max: 110, step: 1 }
    ],
    radios: [
      { id: "sex", label: "Sex at birth", options: [{ label: "Female", value: "female" }, { label: "Male", value: "male" }] }
    ],
    formula: "CKD-EPI 2021 = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.200 × 0.9938^Age (× 1.012 if female)",
    normalRange: "≥ 90 mL/min/1.73m²",
    calculate: (vals) => {
      const scr = vals.scr;
      const age = vals.age;
      const isFemale = vals.sex === "female";
      const kappa = isFemale ? 0.7 : 0.9;
      const alpha = isFemale ? -0.241 : -0.302;
      const genderMult = isFemale ? 1.012 : 1.0;

      const minVal = Math.min(scr / kappa, 1);
      const maxVal = Math.max(scr / kappa, 1);

      const egfr = Math.round(142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age) * genderMult);

      let stage = "";
      let riskLevel = "Normal";
      let interpretation = "";

      if (egfr >= 90) {
        stage = "Stage 1 (Normal or High)";
        riskLevel = "Normal";
        interpretation = "Normal kidney function. If kidney damage markers (microalbuminuria) are present, staging implies CKD Stage 1.";
      } else if (egfr >= 60) {
        stage = "Stage 2 (Mildly Decreased)";
        riskLevel = "Mild";
        interpretation = "Mildly reduced eGFR. Monitor renal function and blood pressure annually.";
      } else if (egfr >= 45) {
        stage = "Stage 3a (Mild-to-Moderate)";
        riskLevel = "Moderate";
        interpretation = "Stage 3a CKD. Evaluate cardiovascular risk factors, adjust renally-dosed medications (e.g. Metformin).";
      } else if (egfr >= 30) {
        stage = "Stage 3b (Moderate-to-Severe)";
        riskLevel = "High";
        interpretation = "Stage 3b CKD. Refer to Nephrology, screen for anemia and mineral bone disorder.";
      } else if (egfr >= 15) {
        stage = "Stage 4 (Severely Decreased)";
        riskLevel = "Very High";
        interpretation = "Stage 4 CKD. Prepare for renal replacement therapy (Dialysis or Kidney Transplant planning).";
      } else {
        stage = "Stage 5 (Kidney Failure)";
        riskLevel = "Critical";
        interpretation = "Kidney Failure / End-Stage Renal Disease (ESRD). Urgent nephrology management for dialysis or transplantation.";
      }

      return { value: egfr, unit: "mL/min/1.73m²", stage, riskLevel, interpretation };
    },
    references: ["Inker OJ, et al. New Creatinine- and Cystatin C-Based Equations to Estimate GFR without Race. N Engl J Med. 2021;385(19):1737-1749."]
  },
  {
    id: "wells-pe",
    name: "Wells' Criteria for Pulmonary Embolism",
    category: "Pulmonology & Emergency",
    description: "Assesses pre-test probability of Pulmonary Embolism to dictate appropriate diagnostic testing (D-dimer vs CTPA).",
    checkboxes: [
      { id: "dvt_signs", label: "Clinical signs/symptoms of DVT (leg swelling, pain on palpation)", points: 3.0 },
      { id: "pe_likely", label: "PE is #1 diagnosis OR equally likely as alternative", points: 3.0 },
      { id: "hr_100", label: "Heart Rate > 100 beats/min", points: 1.5 },
      { id: "immo", label: "Immobilization (≥3 consecutive days) OR surgery in past 4 weeks", points: 1.5 },
      { id: "prior_pe", label: "Previously documented DVT or PE", points: 1.5 },
      { id: "hemoptysis", label: "Hemoptysis (coughing up blood)", points: 1.0 },
      { id: "malignancy", label: "Malignancy (on treatment, treated in last 6 mos, or palliative)", points: 1.0 }
    ],
    formula: "Sum of points (Max 12.5 points)",
    normalRange: "0 - 1.5 (Low), 2.0 - 6.0 (Moderate), >6.0 (High)",
    calculate: (selectedIds) => {
      let score = 0;
      if (selectedIds.includes("dvt_signs")) score += 3.0;
      if (selectedIds.includes("pe_likely")) score += 3.0;
      if (selectedIds.includes("hr_100")) score += 1.5;
      if (selectedIds.includes("immo")) score += 1.5;
      if (selectedIds.includes("prior_pe")) score += 1.5;
      if (selectedIds.includes("hemoptysis")) score += 1.0;
      if (selectedIds.includes("malignancy")) score += 1.0;

      let riskLevel = "Low";
      let interpretation = "";
      let nextStep = "";

      if (score <= 1.5) {
        riskLevel = "Low Probability";
        nextStep = "High-sensitivity D-dimer test";
        interpretation = "PE Unlikely (~1.3% PE risk). Order D-dimer. If negative, PE is ruled out without needing CT radiation.";
      } else if (score <= 6.0) {
        riskLevel = "Moderate Probability";
        nextStep = "D-dimer OR CTPA";
        interpretation = "Moderate PE risk (~16.2% PE risk). Perform D-dimer or proceed directly to CTPA depending on clinical setting.";
      } else {
        riskLevel = "High Probability";
        nextStep = "Immediate CT Pulmonary Angiography (CTPA)";
        interpretation = "PE Likely (>37.5% PE risk). Do NOT wait for D-dimer. Proceed directly to CT Pulmonary Angiography and initiate empirical anticoagulation if no contraindications.";
      }
      return { value: score, unit: "Points", riskLevel, nextStep, interpretation };
    },
    references: ["Wells PS, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism. Thromb Haemost. 2000;83(3):416-420."]
  },
  {
    id: "curb-65",
    name: "CURB-65 Score for Pneumonia Severity",
    category: "Pulmonology & Infectious Disease",
    description: "Predicts 30-day mortality in Community-Acquired Pneumonia (CAP) to decide outpatient vs inpatient vs ICU admission.",
    checkboxes: [
      { id: "c", label: "Confusion (Abnormal AMTS or acute disorientation)", points: 1 },
      { id: "u", label: "Urea (BUN > 19 mg/dL or > 7 mmol/L)", points: 1 },
      { id: "r", label: "Respiratory Rate ≥ 30 breaths/min", points: 1 },
      { id: "b", label: "Blood Pressure (SBP < 90 mmHg OR DBP ≤ 60 mmHg)", points: 1 },
      { id: "age65", label: "Age ≥ 65 years", points: 1 }
    ],
    formula: "1 point for each positive criteria (Score 0 to 5)",
    normalRange: "Score 0 - 1 (Low Risk), Score 2 (Moderate), Score 3-5 (Severe)",
    calculate: (selectedIds) => {
      const score = selectedIds.length;
      let riskLevel = "Low";
      let disposition = "";
      let mortality = "";

      if (score <= 1) {
        riskLevel = "Low Risk";
        mortality = "<1.5% 30-day mortality";
        disposition = "Suitable for Outpatient oral antibiotic treatment (e.g. Amoxicillin or Azithromycin).";
      } else if (score === 2) {
        riskLevel = "Moderate Risk";
        mortality = "9.2% 30-day mortality";
        disposition = "Consider Inpatient admission or close outpatient monitoring in Observation Unit.";
      } else {
        riskLevel = "High Risk";
        mortality = score >= 4 ? ">30% 30-day mortality" : "22% 30-day mortality";
        disposition = score >= 4 ? "Urgent ICU admission indicated for respiratory/vasopressor support." : "Inpatient Hospital Admission indicated.";
      }
      return { value: score, unit: "Points", riskLevel, mortality, disposition };
    },
    references: ["Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382."]
  }
];

export const AI_VISION_SAMPLES = [
  {
    id: "sample-ecg",
    title: "12-Lead ECG - Acute STEMI",
    category: "Cardiology Imaging",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    description: "Anterior wall ST-segment elevation in chest leads V1-V4 with reciprocal ST depression in inferior leads.",
    aiAnalysis: {
      observations: [
        "ST-segment elevation ≥2.5mm in leads V2, V3, and V4 with convex upward morphology.",
        "Reciprocal ST-segment depression in leads II, III, and aVF.",
        "Sinus tachycardia at 104 bpm with normal PR and QRS duration.",
        "Hyperacute T-waves in anteroseptal distribution."
      ],
      pathology: "Acute Anterior Wall ST-Segment Elevation Myocardial Infarction (Anterior STEMI) secondary to acute occlusion of the Left Anterior Descending (LAD) coronary artery.",
      recommendations: [
        "Immediate emergency cath lab activation for Primary Percutaneous Coronary Intervention (PCI).",
        "Administer Aspirin 325mg chewed + Ticagrelor 180mg.",
        "Continuous cardiac monitoring for ventricular arrhythmias (VF/VT).",
        "Draw immediate High-Sensitivity Cardiac Troponin I and basic metabolic panel."
      ]
    }
  },
  {
    id: "sample-cxr",
    title: "Chest Radiograph - Lobar Pneumonia",
    category: "Pulmonary Radiology",
    thumbnailUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    description: "PA chest x-ray demonstrating dense right lower lobe consolidation with air bronchograms.",
    aiAnalysis: {
      observations: [
        "Focal dense airspace opacification in the right lower lobe.",
        "Visible air bronchograms within the region of consolidation.",
        "Blunting of the right costophrenic angle suggesting minor sympathetic pleural effusion.",
        "No cardiomegaly, pneumothorax, or mediastinal shift observed."
      ],
      pathology: "Acute Bacterial Lobar Pneumonia (Right Lower Lobe), classic appearance consistent with Streptococcus pneumoniae infection.",
      recommendations: [
        "Correlate with CURB-65 score and clinical systemic signs (fever, WBC count, pulse oximetry).",
        "Initiate empiric antibiotic coverage (e.g., Ceftriaxone + Azithromycin for inpatient setting).",
        "Follow-up CXR in 6-8 weeks post-resolution to confirm complete clearance."
      ]
    }
  },
  {
    id: "sample-lab",
    title: "Lab Panel Report - Severe DKA",
    category: "Clinical Laboratory",
    thumbnailUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
    description: "Blood gas and metabolic panel showing Glucose 420 mg/dL, pH 7.14, HCO3 10 mEq/L, Anion Gap 22.",
    aiAnalysis: {
      observations: [
        "Severe Hyperglycemia: Serum Glucose = 420 mg/dL.",
        "High Anion Gap Metabolic Acidosis: Anion Gap = 22 mEq/L, pH = 7.14, Bicarbonate = 10 mEq/L.",
        "Ketonemia: Serum Beta-hydroxybutyrate = 4.8 mmol/L.",
        "Serum Potassium = 4.9 mEq/L (pseudo-normal, total body K+ deficit exists)."
      ],
      pathology: "Severe Diabetic Ketoacidosis (DKA) with profound high anion gap metabolic decompensation.",
      recommendations: [
        "Urgent IV isotonic fluid resuscitation (0.9% NS 1 L/hr initially).",
        "Initiate continuous regular insulin IV drip (0.1 u/kg/hr) after confirming K+ ≥ 3.3 mEq/L.",
        "Monitor potassium hourly and add IV K+ to fluids once K+ < 5.2 mEq/L.",
        "Check hourly blood glucose and Q2-4h blood gases until Anion Gap closes (<12 mEq/L)."
      ]
    }
  }
];

export const LEARNING_PATHS = [
  {
    id: "cardiology",
    title: "Cardiology Masterclass",
    description: "Master acute coronary syndromes, heart failure GDMT, ECG interpretation, and valvular pathologies.",
    progress: 68,
    totalTopics: 12,
    completedCount: 8,
    topics: [
      { title: "Cardiac Anatomy & Physiology", completed: true },
      { title: "The Cardiac Cycle & Wiggers Diagram", completed: true },
      { title: "ECG Basics: Axis & Waveforms", completed: true },
      { title: "Ischemic Heart Disease & Angina", completed: true },
      { title: "STEMI vs NSTEMI Diagnosis & Management", completed: true },
      { title: "Heart Failure: HFrEF vs HFpEF GDMT", completed: true },
      { title: "Atrial Fibrillation & Anticoagulation", completed: true },
      { title: "Hypertension Guidelines (JNC8 / ACC)", completed: true },
      { title: "Ventricular Arrhythmias & ICD Criteria", completed: false },
      { title: "Valvular Heart Disease (Aortic Stenosis)", completed: false },
      { title: "Infective Endocarditis & Duke Criteria", completed: false },
      { title: "Pericarditis & Cardiac Tamponade", completed: false }
    ]
  },
  {
    id: "pharmacology",
    title: "Clinical Pharmacology Pearls",
    description: "High-yield mechanisms, black box warnings, drug interactions, and dosing adjustments.",
    progress: 45,
    totalTopics: 10,
    completedCount: 4,
    topics: [
      { title: "ACE Inhibitors & ARBs: RAAS Axis", completed: true },
      { title: "Beta Blockers: Selective vs Non-selective", completed: true },
      { title: "Antidiabetic Agents: SGLT2i & GLP-1RA", completed: true },
      { title: "Direct Oral Anticoagulants (DOACs)", completed: true },
      { title: "Statins & Ezetimibe Lipid Lowering", completed: false },
      { title: "Antiarrhythmic Drug Classes (Vaughan Williams)", completed: false },
      { title: "Antibiotic Stewardship & Spectrum", completed: false },
      { title: "Psychotropic Pharmacology (SSRIs / SNRIs)", completed: false },
      { title: "Immunosuppressive & Biologic Agents", completed: false },
      { title: "Toxicology & Antidotes Summary", completed: false }
    ]
  },
  {
    id: "emergency",
    title: "Emergency Medicine & Critical Care",
    description: "Rapid triage, resuscitation algorithms, acute shock states, and airway management.",
    progress: 30,
    totalTopics: 8,
    completedCount: 2,
    topics: [
      { title: "Approach to Undifferentiated Shock", completed: true },
      { title: "DKA & HHS Emergency Protocol", completed: true },
      { title: "Pulmonary Embolism & Thrombolysis", completed: false },
      { title: "Anaphylaxis Management Algorithm", completed: false },
      { title: "Acute Stroke Protocol & tPA Window", completed: false },
      { title: "Severe Trauma Resuscitation (ATLS)", completed: false },
      { title: "Acid-Base Disorders & Blood Gas Mastery", completed: false },
      { title: "Sepsis-3 Bundles & Vasopressor Choice", completed: false }
    ]
  }
];

export const FLASHCARDS_DECK = [
  {
    id: "fc1",
    category: "Cardiology",
    question: "What is the door-to-balloon time target for primary PCI in STEMI?",
    answer: "≤ 90 minutes from first medical contact at a PCI-capable hospital (or ≤ 120 minutes if transfer is required).",
    explanation: "Rapid reperfusion minimizes transmural myocardial necrosis and reduces overall cardiogenic shock and mortality risk."
  },
  {
    id: "fc2",
    category: "Pharmacology",
    question: "Why must Lisinopril and Entresto (Sacubitril/Valsartan) have a 36-hour washout period when switching?",
    answer: "To prevent life-threatening angioedema.",
    explanation: "Both ACE inhibitors and neprilysin inhibitors block the degradation of bradykinin. Combined dual blockade dramatically increases bradykinin levels, causing severe airway angioedema."
  },
  {
    id: "fc3",
    category: "Endocrinology",
    question: "At what serum glucose level during DKA resuscitation should Dextrose (D5W) be added to IV fluids?",
    answer: "When blood glucose drops to 200 - 250 mg/dL.",
    explanation: "Dextrose is added so that IV insulin drip can be continued safely without causing hypoglycemia, enabling complete clearance of ketoacidosis (closing the anion gap)."
  },
  {
    id: "fc4",
    category: "Pulmonology",
    question: "What is the classic diagnostic finding for asthma on post-bronchodilator spirometry?",
    answer: "An increase in FEV1 by > 12% AND > 200 mL following short-acting beta-agonist inhalation.",
    explanation: "Demonstrates reversible airway obstruction, a key hallmark distinguishing asthma from fixed COPD."
  },
  {
    id: "fc5",
    category: "Hematology / Cardiology",
    question: "Which CHA₂DS₂-VASc criteria award 2 points instead of 1 point?",
    answer: "Age ≥ 75 years AND Prior Stroke / TIA / Thromboembolism history.",
    explanation: "These two factors carry the highest predictive stroke hazard ratio in non-valvular atrial fibrillation."
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    category: "Cardiology",
    question: "A 62-year-old male presents with acute crushing chest pain. ECG demonstrates ST-segment elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    options: [
      "Left Anterior Descending (LAD)",
      "Right Coronary Artery (RCA)",
      "Left Circumflex (LCx)",
      "Left Main Coronary Artery"
    ],
    correctIndex: 1,
    explanation: "ST elevation in leads II, III, and aVF indicates an inferior wall myocardial infarction. In 85-90% of individuals (right-dominant circulation), the inferior wall is supplied by the Right Coronary Artery (RCA)."
  },
  {
    id: "q2",
    category: "Pharmacology",
    question: "Which of the following antidiabetic drug classes has proven mortality reduction and renal protection benefits in patients with heart failure and CKD, regardless of baseline HbA1c?",
    options: [
      "Sulfonylureas (Glipizide)",
      "DPP-4 Inhibitors (Sitagliptin)",
      "SGLT2 Inhibitors (Empagliflozin)",
      "Thiazolidinediones (Pioglitazone)"
    ],
    correctIndex: 2,
    explanation: "SGLT2 inhibitors (Empagliflozin, Dapagliflozin) reduce intraglomerular pressure and intraglucose hyperfiltration, delivering profound cardio-renal protection and mortality reduction in HFrEF, HFpEF, and CKD."
  },
  {
    id: "q3",
    category: "Emergency Medicine",
    question: "In a patient presenting with Diabetic Ketoacidosis (DKA), what is the single condition where IV regular insulin administration must be TEMPORARILY HELD?",
    options: [
      "Blood glucose > 500 mg/dL",
      "Serum Potassium < 3.3 mEq/L",
      "Arterial pH < 7.00",
      "Anion Gap > 20 mEq/L"
    ],
    correctIndex: 1,
    explanation: "Insulin drives potassium into cells. Administering insulin when K+ < 3.3 mEq/L can induce severe, lethal hypokalemia and cardiac arrest. Replete potassium to ≥ 3.3 mEq/L before starting insulin."
  }
];

export const RECENT_TOPICS = [
  { id: "myocardial-infarction", title: "Myocardial Infarction", category: "Cardiology", time: "10 mins ago", type: "disease" },
  { id: "lisinopril", title: "Lisinopril", category: "Pharmacology", time: "2 hours ago", type: "drug" },
  { id: "diabetic-ketoacidosis", title: "Diabetic Ketoacidosis", category: "Emergency", time: "Yesterday", type: "disease" },
  { id: "cha2ds2-vasc", title: "CHA₂DS₂-VASc Calculator", category: "Cardiology", time: "2 days ago", type: "calculator" }
];
