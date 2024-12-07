// HealthAssistant.tsx
"use client";
import React, { useState, useEffect } from "react";
import SimliVapi from "./SimliVapi";
import { Heart, Activity, Brain, Thermometer, Stethoscope, Calendar, Phone, Bell, Pill, BarChart } from "lucide-react";
import { patientHealthKMS } from './utils/health_kms';
import { initializeUnifiedService } from './UnifiedService';

interface HealthAssistantProps {
  simli_faceid: string;
  vapi_agentid: string;
}

interface VitalSigns {
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  oxygenLevel: string;
  glucoseLevel: string;
}

interface Medication {
  name: string;
  time: string;
  dosage: string;
  instructions?: string;
}

interface Appointment {
  doctor: string;
  specialty: string;
  date: string;
}

interface Activity {
  name: string;
  duration: string;
  time: string;
}

interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
}

const HealthAssistant: React.FC<HealthAssistantProps> = ({ 
  simli_faceid, 
  vapi_agentid,
}) => {
    const [showDottedFace, setShowDottedFace] = useState(false);
    const [healthKnowledgeBase, setHealthKnowledgeBase] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // State variables with typed interfaces
    const [personalInfo, setPersonalInfo] = useState({
      name: "",
      age: 0,
      bloodType: "",
      weight: "",
      height: ""
    });
    
    const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
      heartRate: "60-100 bpm",
      bloodPressure: "120/80",
      temperature: "97.8-99.1°F",
      oxygenLevel: "Above 95%",
      glucoseLevel: "80-130 mg/dL"
    });

    const [upcomingMeds, setUpcomingMeds] = useState<Medication[]>([
      { name: 'Metformin', time: '8:00 AM', dosage: '500mg' },
      { name: 'Lisinopril', time: '9:00 AM', dosage: '10mg' },
      { name: 'Simvastatin', time: '8:00 PM', dosage: '20mg' }
    ]);

    const [appointments, setAppointments] = useState<Appointment[]>([
      { doctor: "Dr. Johnson", specialty: "Endocrinologist", date: "Next Week, 2:00 PM" },
      { doctor: "Dr. Smith", specialty: "Cardiologist", date: "Tomorrow, 10:00 AM" }
    ]);

    const [activities, setActivities] = useState<Activity[]>([
      { name: "Morning Walk", duration: "20 mins", time: "7:00 AM" },
      { name: "Light Exercise", duration: "15 mins", time: "4:00 PM" }
    ]);

    const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
      { name: "Mary Smith", role: "Daughter", phone: "555-0123" },
      { name: "Dr. Smith", role: "Primary Care Physician", phone: "555-0456" }
    ]);

    useEffect(() => {
        const fetchHealthKnowledgeBase = async () => {
          try {
            setIsLoading(true);
            const unifiedService = initializeUnifiedService();
            const knowledgeBase = await unifiedService.getHealthKnowledgeBase();
            
            if (knowledgeBase) {
              setHealthKnowledgeBase(knowledgeBase);
              parseAndUpdateHealthData(knowledgeBase);
            }
          } catch (err) {
            console.error('Error fetching from Unified, falling back to local file:', err);
            
            try {
              // Fetch local file
              const response = await fetch('/health-knowledge-base.md');
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const localContent = await response.text();
              
              setHealthKnowledgeBase(localContent);
              parseAndUpdateHealthData(localContent);
              setError('Using local health data (Unified service unavailable)');
              
              // Clear error message after 5 seconds
              setTimeout(() => setError(null), 5000);
            } catch (localError) {
              console.error('Error fetching local file:', localError);
              setError('Failed to fetch health data from both Unified and local source');
            }
          } finally {
            setIsLoading(false);
          }
        };
  
        fetchHealthKnowledgeBase();
      }, []);

    const parseAndUpdateHealthData = (content: string) => {
      // Parse personal information
      const nameMatch = content.match(/Name: (.+)/);
      const ageMatch = content.match(/Age: (\d+)/);
      const bloodTypeMatch = content.match(/Blood Type: (.+)/);
      const weightMatch = content.match(/Weight: (.+)/);
      const heightMatch = content.match(/Height: (.+)/);

      setPersonalInfo({
        name: nameMatch?.[1] || "",
        age: parseInt(ageMatch?.[1] || "0"),
        bloodType: bloodTypeMatch?.[1] || "",
        weight: weightMatch?.[1] || "",
        height: heightMatch?.[1] || ""
      });

      // Parse medications
      const medicationsSection = content.match(/## Medications([\s\S]*?)(?=##)/)?.[1] || "";
      const medications: Medication[] = [];
      const medRegex = /### (.+)\n[\s\S]*?Dosage: (.+)\n[\s\S]*?Schedule: (.+)\n/g;
      let medMatch;
      while ((medMatch = medRegex.exec(medicationsSection)) !== null) {
        medications.push({
          name: medMatch[1],
          dosage: medMatch[2],
          time: medMatch[3].split(',')[0].trim()
        });
      }
      setUpcomingMeds(medications);

      // Parse vital signs targets
      const vitalsSection = content.match(/### Target Vital Signs([\s\S]*?)(?=##|$)/)?.[1] || "";
      const bpMatch = vitalsSection.match(/Blood Pressure: (.+)/);
      const hrMatch = vitalsSection.match(/Heart Rate: (.+)/);
      const bgMatch = vitalsSection.match(/Blood Glucose: (.+)/);
      const o2Match = vitalsSection.match(/Oxygen Level: (.+)/);
      const tempMatch = vitalsSection.match(/Temperature: (.+)/);

      setVitalSigns({
        bloodPressure: bpMatch?.[1] || vitalSigns.bloodPressure,
        heartRate: hrMatch?.[1] || vitalSigns.heartRate,
        glucoseLevel: bgMatch?.[1] || vitalSigns.glucoseLevel,
        oxygenLevel: o2Match?.[1] || vitalSigns.oxygenLevel,
        temperature: tempMatch?.[1] || vitalSigns.temperature
      });

      // Parse daily activities
      const routineSection = content.match(/## Daily Health Routine([\s\S]*?)(?=##)/)?.[1] || "";
      const activities: Activity[] = [];
      const activityRegex = /- (\d+:\d+ [AP]M): (.+?) \((\d+ \w+)\)/g;
      let activityMatch;
      while ((activityMatch = activityRegex.exec(routineSection)) !== null) {
        activities.push({
          time: activityMatch[1],
          name: activityMatch[2],
          duration: activityMatch[3]
        });
      }
      setActivities(activities);

      // Parse emergency contacts
      const emergencySection = content.match(/## Emergency Contacts([\s\S]*?)(?=##)/)?.[1] || "";
      const contacts: EmergencyContact[] = [];
      const contactRegex = /Name: (.+)\nPhone: (.+)/g;
      let contactMatch;
      while ((contactMatch = contactRegex.exec(emergencySection)) !== null) {
        contacts.push({
          name: contactMatch[1],
          role: contactMatch[1].includes("Dr.") ? "Doctor" : "Family",
          phone: contactMatch[2]
        });
      }
      setEmergencyContacts(contacts);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden p-8">
            {isLoading && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500/80 text-white px-4 py-2 rounded-lg">
                    Loading health knowledge base...
                </div>
            )}
            
            {error && (
                <div className="fixed top-4 right-4 bg-red-500/80 text-white px-4 py-2 rounded-lg">
                    {error}
                </div>
            )}

            {/* Center Circle with Video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-20"></div>
                    <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                        <SimliVapi
                            agentId={vapi_agentid}
                            simli_faceid={simli_faceid}
                            onStart={() => setShowDottedFace(false)}
                            onClose={() => setShowDottedFace(true)}
                            showDottedFace={showDottedFace}
                        />
                    </div>
                </div>
            </div>

            {/* Vital Signs - Top */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 w-auto">
                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-400" />
                            <span className="text-white">{vitalSigns.heartRate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-green-400" />
                            <span className="text-white">{vitalSigns.bloodPressure}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Thermometer className="w-5 h-5 text-yellow-400" />
                            <span className="text-white">{vitalSigns.temperature}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Stethoscope className="w-5 h-5 text-blue-400" />
                            <span className="text-white">{vitalSigns.oxygenLevel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BarChart className="w-5 h-5 text-purple-400" />
                            <span className="text-white">{vitalSigns.glucoseLevel}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left Panel - Medications and Activities */}
            <div className="fixed left-8 top-1/2 -translate-y-1/2 w-80 space-y-4">
                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Pill className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-semibold text-white">Daily Medications</h2>
                    </div>
                    <div className="space-y-3">
                        {upcomingMeds.map((med, index) => (
                            <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">{med.name}</span>
                                    <span className="text-blue-300">{med.time}</span>
                                </div>
                                <span className="text-sm text-blue-200">{med.dosage}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5 text-green-400" />
                        <h2 className="text-lg font-semibold text-white">Daily Activities</h2>
                    </div>
                    <div className="space-y-3">
                        {activities.map((activity, index) => (
                            <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">{activity.name}</span>
                                    <span className="text-green-300">{activity.time}</span>
                                </div>
                                <span className="text-sm text-green-200">{activity.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Appointments and Emergency */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 w-80 space-y-4">
                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <h2 className="text-lg font-semibold text-white">Medical Appointments</h2>
                    </div>
                    <div className="space-y-3">
                        {appointments.map((apt, index) => (
                            <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <p className="text-white font-medium">{apt.doctor}</p>
                                <p className="text-sm text-purple-300">{apt.specialty}</p>
                                <p className="text-sm text-purple-200">{apt.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Phone className="w-5 h-5 text-red-400" />
                        <h2 className="text-lg font-semibold text-white">Emergency Contacts</h2>
                    </div>
                    <div className="space-y-2">
                    {emergencyContacts.map((contact, index) => (
                            <button 
                                key={index} 
                                className={`w-full p-3 ${
                                    contact.role === "Doctor" 
                                        ? "bg-white/5 text-white" 
                                        : "bg-red-500/20 text-red-100"
                                } rounded-lg hover:bg-white/10 transition-colors text-left`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{contact.name}</span>
                                    <span className="text-sm opacity-75">{contact.role}</span>
                                </div>
                                <span className="text-sm opacity-75">{contact.phone}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Patient Info Banner - Bottom */}
            {personalInfo.name && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-auto">
                    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 shadow-lg">
                        <div className="flex gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">Patient:</span>
                                <span className="text-white">{personalInfo.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">Age:</span>
                                <span className="text-white">{personalInfo.age}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">Blood Type:</span>
                                <span className="text-white">{personalInfo.bloodType}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">Weight:</span>
                                <span className="text-white">{personalInfo.weight}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">Height:</span>
                                <span className="text-white">{personalInfo.height}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HealthAssistant;