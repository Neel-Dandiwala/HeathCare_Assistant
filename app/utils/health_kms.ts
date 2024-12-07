// healthKMS.ts

export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    time: string[];
    purpose: string;
    sideEffects: string[];
    interactions: string[];
    prescribedBy: string;
    startDate: string;
    instructions: string;
  }
  
  export interface VitalSigns {
    heartRate: string;
    bloodPressure: string;
    temperature: string;
    oxygenLevel: string;
    glucoseLevel: string;
    lastUpdated: string;
    history: {
      date: string;
      readings: {
        type: string;
        value: string;
      }[];
    }[];
  }
  
  export interface MedicalCondition {
    name: string;
    diagnosedDate: string;
    diagnosedBy: string;
    severity: string;
    symptoms: string[];
    treatments: string[];
    notes: string;
  }
  
  export interface Appointment {
    doctor: string;
    specialty: string;
    date: string;
    purpose: string;
    location: string;
    notes: string;
    preparation: string[];
  }
  
  export interface Activity {
    name: string;
    duration: string;
    time: string;
    frequency: string;
    importance: string;
    notes: string;
  }
  
  export interface EmergencyContact {
    name: string;
    relation: string;
    phone: string;
    email: string;
    address: string;
    isICE: boolean; // In Case of Emergency
  }
  
  export interface Allergy {
    allergen: string;
    severity: string;
    symptoms: string[];
    treatment: string;
  }
  
  export interface HealthHistory {
    surgeries: {
      procedure: string;
      date: string;
      hospital: string;
      surgeon: string;
      notes: string;
    }[];
    hospitalizations: {
      reason: string;
      date: string;
      duration: string;
      hospital: string;
      treatmentReceived: string;
    }[];
  }
  
  export interface PatientKMS {
    personalInfo: {
      name: string;
      age: number;
      dateOfBirth: string;
      gender: string;
      bloodType: string;
      weight: string;
      height: string;
      primaryLanguage: string;
    };
    medications: Medication[];
    vitalSigns: VitalSigns;
    conditions: MedicalCondition[];
    appointments: Appointment[];
    activities: Activity[];
    emergencyContacts: EmergencyContact[];
    allergies: Allergy[];
    healthHistory: HealthHistory;
    dailyRoutine: {
      [key: string]: string[];
    };
    preferences: {
      dietaryRestrictions: string[];
      communicationPreferences: string[];
      mobilityAssistance: string[];
    };
  }
  
  // Patient's actual health data
  export const patientHealthKMS: PatientKMS = {
    personalInfo: {
      name: "John Smith",
      age: 68,
      dateOfBirth: "1956-03-15",
      gender: "Male",
      bloodType: "A+",
      weight: "175 lbs",
      height: "5'10\"",
      primaryLanguage: "English",
    },
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        time: ["8:00 AM", "8:00 PM"],
        purpose: "Type 2 Diabetes management",
        sideEffects: ["Nausea", "Diarrhea", "Loss of appetite"],
        interactions: ["Alcohol", "Certain contrast dyes"],
        prescribedBy: "Dr. Johnson (Endocrinologist)",
        startDate: "2023-01-15",
        instructions: "Take with meals to minimize stomach upset",
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        time: ["9:00 AM"],
        purpose: "Blood pressure control",
        sideEffects: ["Dry cough", "Dizziness"],
        interactions: ["NSAIDs", "Potassium supplements"],
        prescribedBy: "Dr. Smith (Cardiologist)",
        startDate: "2023-03-01",
        instructions: "Take on an empty stomach",
      },
      {
        name: "Simvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        time: ["8:00 PM"],
        purpose: "Cholesterol management",
        sideEffects: ["Muscle pain", "Fatigue"],
        interactions: ["Grapefruit juice", "Certain antibiotics"],
        prescribedBy: "Dr. Smith (Cardiologist)",
        startDate: "2023-02-15",
        instructions: "Take in the evening",
      }
    ],
    vitalSigns: {
      heartRate: "72 bpm",
      bloodPressure: "120/80",
      temperature: "98.6°F",
      oxygenLevel: "98%",
      glucoseLevel: "95 mg/dL",
      lastUpdated: "2024-03-07 08:00:00",
      history: [
        {
          date: "2024-03-07",
          readings: [
            { type: "bloodPressure", value: "120/80" },
            { type: "glucoseLevel", value: "95 mg/dL" }
          ]
        }
      ]
    },
    conditions: [
      {
        name: "Type 2 Diabetes",
        diagnosedDate: "2023-01-01",
        diagnosedBy: "Dr. Johnson",
        severity: "Moderate",
        symptoms: ["Increased thirst", "Frequent urination", "Fatigue"],
        treatments: ["Metformin", "Diet control", "Regular exercise"],
        notes: "Well controlled with current medication and lifestyle changes"
      },
      {
        name: "Hypertension",
        diagnosedDate: "2023-02-15",
        diagnosedBy: "Dr. Smith",
        severity: "Mild",
        symptoms: ["Occasional headaches"],
        treatments: ["Lisinopril", "Low-sodium diet", "Regular exercise"],
        notes: "Responds well to medication and lifestyle modifications"
      }
    ],
    appointments: [
      {
        doctor: "Dr. Smith",
        specialty: "Cardiologist",
        date: "2024-03-15 10:00 AM",
        purpose: "Quarterly check-up and medication review",
        location: "Heart Health Clinic, Room 205",
        notes: "Bring blood pressure log",
        preparation: ["Fast for 8 hours", "Bring medication list"]
      },
      {
        doctor: "Dr. Johnson",
        specialty: "Endocrinologist",
        date: "2024-03-22 2:00 PM",
        purpose: "Diabetes management review",
        location: "Diabetes Care Center, Suite 110",
        notes: "Discuss recent glucose readings",
        preparation: ["Bring glucose meter", "Bring food diary"]
      }
    ],
    activities: [
      {
        name: "Morning Walk",
        duration: "20 mins",
        time: "7:00 AM",
        frequency: "Daily",
        importance: "High",
        notes: "Weather permitting, walk in the neighborhood"
      },
      {
        name: "Light Exercise",
        duration: "15 mins",
        time: "4:00 PM",
        frequency: "Daily",
        importance: "Medium",
        notes: "Chair exercises and light stretching"
      }
    ],
    emergencyContacts: [
      {
        name: "Mary Smith",
        relation: "Daughter",
        phone: "555-0123",
        email: "mary.smith@email.com",
        address: "123 Care Lane, Cityville",
        isICE: true
      },
      {
        name: "Dr. Smith",
        relation: "Primary Care Physician",
        phone: "555-0456",
        email: "dr.smith@hospital.com",
        address: "456 Medical Center Dr.",
        isICE: false
      }
    ],
    allergies: [
      {
        allergen: "Penicillin",
        severity: "Severe",
        symptoms: ["Rash", "Difficulty breathing"],
        treatment: "Avoid penicillin and related antibiotics, seek immediate medical attention if exposed"
      }
    ],
    healthHistory: {
      surgeries: [
        {
          procedure: "Appendectomy",
          date: "2010-05-15",
          hospital: "City General Hospital",
          surgeon: "Dr. Wilson",
          notes: "No complications"
        }
      ],
      hospitalizations: [
        {
          reason: "Pneumonia",
          date: "2019-12-01",
          duration: "5 days",
          hospital: "City General Hospital",
          treatmentReceived: "IV antibiotics and respiratory therapy"
        }
      ]
    },
    dailyRoutine: {
      morning: [
        "7:00 AM - Morning walk",
        "8:00 AM - Breakfast and morning medications",
        "9:00 AM - Blood pressure check"
      ],
      afternoon: [
        "12:00 PM - Lunch",
        "2:00 PM - Blood glucose check",
        "4:00 PM - Light exercise"
      ],
      evening: [
        "6:00 PM - Dinner",
        "8:00 PM - Evening medications",
        "9:00 PM - Final health checks"
      ]
    },
    preferences: {
      dietaryRestrictions: [
        "Low sodium",
        "Low sugar",
        "No grapefruit (medication interaction)"
      ],
      communicationPreferences: [
        "Prefers morning appointments",
        "Needs written instructions",
        "Prefers phone calls over emails"
      ],
      mobilityAssistance: [
        "Uses reading glasses",
        "No mobility aids required"
      ]
    }
  };
  
  // Generate prompt for Vapi model
  export function generateVapiPrompt(kms: PatientKMS): string {
    return `
  You are a healthcare assistant for ${kms.personalInfo.name}, a ${kms.personalInfo.age}-year-old ${kms.personalInfo.gender}.
  
  Key Medical Information:
  - Diagnosed conditions: ${kms.conditions.map(c => c.name).join(', ')}
  - Current medications: ${kms.medications.map(m => `${m.name} ${m.dosage}`).join(', ')}
  - Allergies: ${kms.allergies.map(a => a.allergen).join(', ')}
  
  Daily Health Routine:
  ${Object.entries(kms.dailyRoutine).map(([time, activities]) => 
    `${time}: ${activities.join(', ')}`
  ).join('\n')}
  
  Important Medical Instructions:
  ${kms.medications.map(med => 
    `- ${med.name}: Take ${med.dosage} ${med.frequency} (${med.time.join(', ')})`
  ).join('\n')}
  
  Special Considerations:
  ${kms.preferences.dietaryRestrictions.map(r => `- ${r}`).join('\n')}
  
  You should:
  1. Help monitor medication schedules and provide reminders
  2. Track vital signs and alert about any concerning changes
  3. Provide information about medications, including side effects and interactions
  4. Assist with appointment scheduling and reminders
  5. Offer general health and lifestyle advice within the scope of existing conditions
  6. Help maintain daily health routines and activities
  
  Always recommend consulting healthcare providers for medical decisions and direct to emergency services if urgent medical attention is needed.
  `;
  }