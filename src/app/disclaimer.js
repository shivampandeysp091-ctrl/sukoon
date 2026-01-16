import Image from "next/image";

export default function Disclaimer() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-[#E5D9F7] via-[#E8D4F0] to-[#D8E0F8] font-sans">
      
      {/* --- Background Image --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/bg-main.png" 
          alt="Background"
          fill
          className="object-cover object-bottom" 
          priority
        />
      </div>

      {/* --- Disclaimer Card --- */}
      <div className="z-10 text-center max-w-sm w-full bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-white/40 shadow-sm mb-10"> 
        
        <h1 className="text-2xl font-bold text-[#332258] mb-6">
          Important Disclaimer
        </h1>

        <p className="text-[#5F6D7E] text-base leading-relaxed mb-10 font-medium">
          This AI offers emotional support and mindfulness-based guidance, 
          but it does not provide medical advice. It should not be used 
          as a replacement for professional care. If you are experiencing 
          a crisis or serious concerns, please reach out to a mental health 
          professional or emergency services immediately.
        </p>

        <button className="bg-[#2a006e] text-white font-bold py-4 px-12 rounded-2xl shadow-md hover:bg-[#6b96f0] hover:scale-[1.02] transition-all duration-300 w-full text-lg">
          Accept and Continue
        </button>
      </div>

    </main>
  );
}