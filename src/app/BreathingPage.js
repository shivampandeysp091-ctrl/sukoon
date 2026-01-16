"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { User, Play, Pause, ArrowLeft } from 'lucide-react';

export default function BreathingPage({ onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [breathingPhase, setBreathingPhase] = useState("Breathe In");

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setBreathingPhase("Session Complete");
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let cycle = null;
    if (isPlaying && timeLeft > 0) {
      cycle = setInterval(() => {
        setBreathingPhase((prev) => (prev === "Breathe In" ? "Breathe Out" : "Breathe In"));
      }, 4000);
    }
    return () => clearInterval(cycle);
  }, [isPlaying]);

  return (
    <main className="min-h-screen w-full bg-[#EBEAFF] flex flex-col items-center px-6 font-sans relative overflow-hidden">
      
      {/* 1. Background Image - Set to z-0 and pointer-events-none */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/images/bg-main.jpg" 
          alt="Background" 
          fill 
          className="object-cover object-bottom opacity-40" 
          priority 
        />
      </div>

      {/* 2. Fixed Header - Set to z-30 to stay on the very top */}
      <header className="fixed top-0 left-0 w-full z-30 px-6 py-6 flex justify-between items-center bg-white/20 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/40 rounded-full transition-all active:scale-90 text-gray-800"
          >
            <ArrowLeft size={30} className="text-[#400095]" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8D63C6] via-[#6731AD] to-[#400095] bg-clip-text text-transparent leading-tight">
                Sukoon
            </h1>
            <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Breathing Tool</span>
          </div>
        </div>

        <div className="bg-black/80 p-2.5 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md">
          <User size={20} className="text-white" />
        </div>
      </header>

      {/* 3. Content Area - Set to z-10 and flex-1 to push the footer down */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full pt-32 pb-20">
        
        {/* Timer */}
        <div className="text-7xl font-light text-black mb-10 font-montserrat tracking-tighter">
          {formatTime(timeLeft)}
        </div>

        {/* Visual Circle Area */}
        <div className="relative mb-12">
          <div className="w-72 h-72 bg-white/40 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center shadow-inner">
            <div
              className={`rounded-full bg-[#FF5C7F] shadow-2xl shadow-pink-200 transition-all ease-in-out duration-[4000ms] ${
                !isPlaying ? "w-28 h-28 opacity-80" : 
                breathingPhase === "Breathe In"
                  ? "w-60 h-60 scale-105" 
                  : "w-24 h-24 scale-95"
              }`}
            ></div>
          </div>
        </div>

        {/* Instruction Text */}
        <h2 className="text-3xl font-bold text-[#400095] mb-12 font-montserrat">
          {isPlaying ? breathingPhase : "Ready?"}
        </h2>

        {/* Play/Pause Button - Higher z-index to ensure it is clickable */}
        <button
          onClick={togglePlay}
          className="relative z-40 bg-[#94ABFF] w-24 h-24 rounded-[28px] flex items-center justify-center shadow-2xl hover:bg-[#8299ee] active:scale-90 transition-all duration-300"
        >
          {isPlaying ? (
              <Pause size={40} fill="white" className="text-white" />
          ) : (
              <Play size={40} fill="white" className="text-white ml-1" />
          )}
        </button>
      </div>

      {/* 4. Footer Disclaimer */}
      <footer className="relative z-10 pb-10 w-full text-center opacity-60">
        <p className="text-gray-500 text-[11px] font-medium leading-relaxed font-montserrat">
          AI support only - not medical advice.<br/>
          Please consult a doctor.
        </p>
      </footer>

    </main>
  );
}