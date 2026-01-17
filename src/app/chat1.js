"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

const BACKEND_MOOD_URL = "https://sukoon-backend-ul6s.onrender.com/mood"; 

export default function Chat1({ onStartChat, onStartBreathing }) {
  const [mood, setMood] = useState("Loading mood...");

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await fetch(BACKEND_MOOD_URL);
        if (!res.ok) throw new Error("Failed to fetch mood");
        const data = await res.json();
        console.log(data)
        setMood(data);
      } catch (error) {
        setMood("Let’s start with how you’re feeling today.");
      }
    };

    fetchMood();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-[#F3F6FF] font-sans overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-main.jpg"
          alt="Background"
          fill
          className="object-cover object-bottom opacity-60"
          priority
        />
      </div>

      {/* Top Navbar */}
      <nav className="z-10 w-full p-6 flex justify-between items-center bg-white/30 backdrop-blur-sm">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8D63C6] via-[#6731AD] to-[#400095] bg-clip-text text-transparent">
          Sukoon
        </h1>

        <div className="bg-black/80 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md">
          <User size={20} className="text-white" />
        </div>
      </nav>

      {/* Main Dashboard */}
      <main className="z-10 w-full max-w-2xl px-6 mt-16 space-y-10">

        {/* Mood Card (CONNECTED) */}
        <div className="w-full bg-white rounded-[1rem] p-10 shadow-sm flex h-[200px] items-center justify-center border border-purple-50">
          <span className="text-[#5F6D7E] text-lg font-medium text-center italic">
            {mood}
          </span>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4">

          {/* Chat Assistant */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-purple-50 flex flex-col items-start space-y-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">
              🤖
            </div>
            <h2 className="text-xl font-bold text-[#332258]">Chat Assistant</h2>
            <p className="text-xs text-[#5F6D7E] leading-relaxed">
              Feeling overwhelmed? Vent without judgment. This is a safe space to talk.
            </p>
            <button
              onClick={onStartChat}
              className="text-sm font-bold text-[#2a006e] border-2 border-[#2a006e]/20 px-4 py-2 rounded-full hover:bg-[#2a006e] hover:text-white transition-all w-full"
            >
              Start Chatting
            </button>
          </div>

          {/* Breathing Tools */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-purple-50 flex flex-col items-start space-y-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">
              🧘
            </div>
            <h2 className="text-xl font-bold text-[#2a006e]">Breathing Tools</h2>
            <p className="text-xs text-[#5F6D7E] leading-relaxed">
              Take a short pause to reset your mind with guided breathing.
            </p>
            <button
              onClick={onStartBreathing}
              className="text-sm font-bold text-[#2a006e] border-2 border-[#2a006e]/20 px-4 py-2 rounded-full hover:bg-[#2a006e] hover:text-white transition-all w-full"
            >
              Start Breathing
            </button>
          </div>

        </div>

        {/* Footer Disclaimer */}
        <footer className="text-center pt-10">
          <p className="text-[#5F6D7E] text-xs font-medium">
            AI support only — not medical advice.<br />
            Please consult a professional if needed.
          </p>
        </footer>

      </main>
    </div>
  );
}
