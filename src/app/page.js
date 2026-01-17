"use client";
import { useState } from "react";
import Image from "next/image";
import Disclaimer from "./disclaimer";
import Chat1 from "./chat1";
import ChatPage from "./ChatPage";
import BreathingPage from "./BreathingPage"; // Ensure your Gemini chat file is named ChatPage.js

export default function Home() {
  // Use a string state to handle the 4-stage flow
  const [currentStep, setCurrentStep] = useState("home");

  if (currentStep === "breathing") {
    return <BreathingPage onBack={() => setCurrentStep("dashboard")} />;
  }
  // 1. Chat Interface (Gemini AI)
  if (currentStep === "chatting") {
    return <ChatPage  onBack={() => setCurrentStep("dashboard")}/>;
  }

  // 2. Dashboard (Mood Box & Cards)
  if (currentStep === "dashboard") {
    return <Chat1 onStartChat={() => setCurrentStep("chatting")}
    onStartBreathing={() => setCurrentStep("breathing")} />;
  }

  // 3. Disclaimer
  if (currentStep === "disclaimer") {
    return <Disclaimer onAccept={() => setCurrentStep("dashboard")} />;
  }

  // 4. Landing Page
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-[#E5D9F7] via-[#E8D4F0] to-[#D8E0F8] font-sans">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/bg-main.jpg" 
          alt="Background"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      <div className="z-10 text-center max-w-3xl mt-15"> 
        <h1 className="text-3xl md:text-6xl font-bold text-[#332258] leading-tight mb-2 tracking-tight">
          You’re not alone.{" "}
          {/* Updated with your specific hex gradation */}
          <span className="inline-block bg-gradient-to-r from-[#8D63C6] via-[#6731AD] to-[#400095] bg-clip-text text-transparent">
            Sukoon
          </span>{" "}
          is 
          your space to breathe.
        </h1>

        <p className="text-[#5F6D7E] text-base md:text-xl mb-8 font-medium max-w-md mx-auto">
          Quiet support, whenever you need it.
        </p>

        <button 
          onClick={() => setCurrentStep("disclaimer")}
          className="bg-[#330086] text-white font-bold py-2 px-12 -mt-5 rounded-full shadow-xl hover:bg-[#2a006e] hover:scale-105 transition-all duration-300 w-full max-w-[200px] text-lg"
        >
          Get Started
        </button>
      </div>
    </main>
  );
}