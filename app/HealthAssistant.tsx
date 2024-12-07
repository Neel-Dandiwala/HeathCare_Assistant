"use client";
import React, { useState } from "react";
import SimliVapi from "./SimliVapi";
import { Heart, Activity, Brain, Thermometer, Stethoscope, Calendar, Phone, Bell, Pill, BarChart } from "lucide-react";
import { patientHealthKMS } from './utils/health_kms';

interface HealthAssistantProps {
  simli_faceid: string;
  vapi_agentid: string;
}

const HealthAssistant: React.FC<HealthAssistantProps> = ({ simli_faceid, vapi_agentid }) => {
    const [showDottedFace, setShowDottedFace] = useState(false);
    const [vitalSigns, setVitalSigns] = useState({
      heartRate: "72 bpm",
      bloodPressure: "120/80",
      temperature: "98.6°F",
      oxygenLevel: "98%",
      glucoseLevel: "95 mg/dL"
    });
    const [upcomingMeds, setUpcomingMeds] = useState([
      { name: 'Metformin', time: '8:00 AM', dosage: '500mg' },
      { name: 'Lisinopril', time: '12:00 PM', dosage: '10mg' },
      { name: 'Simvastatin', time: '8:00 PM', dosage: '20mg' },
    ]);
    const [appointments, setAppointments] = useState([
        { doctor: "Dr. Smith", specialty: "Cardiologist", date: "Tomorrow, 10:00 AM" },
        { doctor: "Dr. Johnson", specialty: "Endocrinologist", date: "Next Week, 2:00 PM" },
    ]);
    const [activities, setActivities] = useState([
      { name: "Morning Walk", duration: "20 mins", time: "7:00 AM" },
      { name: "Light Exercise", duration: "15 mins", time: "4:00 PM" },
    ]);
  
    const onStart = () => {
      setShowDottedFace(false);
    };
  
    const onClose = () => {
      setShowDottedFace(true);
    };
  
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden p-8">
          {/* Center Circle with Video */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-20"></div>
              {/* Video container */}
              <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <SimliVapi
                  agentId={vapi_agentid}
                  simli_faceid={simli_faceid}
                  onStart={onStart}
                  onClose={onClose}
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
                <button className="w-full p-3 bg-red-500/20 text-red-100 rounded-lg hover:bg-red-500/30 transition-colors">
                  Emergency Services
                </button>
                <button className="w-full p-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
                  Primary Doctor
                </button>
                <button className="w-full p-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
                  Family Contact
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default HealthAssistant;