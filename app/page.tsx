"use client";
import React, { useEffect, useState } from "react";
import SimliVapi from "@/app/SimliVapi";
import DottedFace from "./Components/DottedFace";
import SimliHeaderLogo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import Image from "next/image";
import GitHubLogo from "@/media/github-mark-white.svg";
import HealthAssistant from "./HealthAssistant";

interface avatarSettings {
  vapi_agentid: string;
  simli_faceid: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  vapi_agentid: "2e4f7d2d-41db-4b34-8aab-6adae810ba06",
  simli_faceid: "0c2b8b04-5274-41f1-a21c-d5c98322efa9",
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen items-center font-abc-repro font-normal text-sm text-white">
      <div>
        <div className="w-full h-full">
          
          <HealthAssistant
            vapi_agentid={avatar.vapi_agentid}
            simli_faceid={avatar.simli_faceid}
           
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
