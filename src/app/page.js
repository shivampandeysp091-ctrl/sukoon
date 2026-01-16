"use client"; // Required for buttons and state
import { useState } from "react";
import Image from "next/image";
import Disclaimer from "./disclaimer";

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // If the button was clicked, show the Disclaimer instead
  if (showDisclaimer) {
    return <Disclaimer />;
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-[#E5D9F7] via-[#E8D4F0] to-[#D8E0F8] font-sans">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/bg-main.png" 
          alt="Background"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="z-10 text-center max-w-2xl mb-20"> 
        <h1 className="text-4xl md:text-6xl font-bold text-[#332258] leading-tight mb-4 tracking-tight">
          You’re not alone. <span className="text-[inline-block bg-gradient-to-r from-[#7C4DFF] via-[#A855F7] to-[#6366F1] bg-clip-text text-transparent]">Sukoon</span> is <br />
          your space to breathe.
        </h1>

        <p className="text-[#5F6D7E] text-base md:text-xl mb-10 font-medium max-w-md mx-auto">
          Quiet support, whenever you need it.
        </p>

        {/* Updated Button to trigger the state change */}
        <button 
          onClick={() => setShowDisclaimer(true)}
          className="bg-[#330086] text-white font-bold py-4 px-12 rounded-full shadow-xl hover:bg-[#2a006e] hover:scale-105 transition-all duration-300 w-full max-w-[280px] text-lg"
        >
          Get Started
        </button>
      </div>
    </main>
  );
}