// src/app/page.js
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-[#E5D9F7] via-[#E8D4F0] to-[#D8E0F8] font-sans">
      
      {/* --- Background Image --- */}
      {/* object-cover use kar rahe hain, lekin mobile design desktop par fail jaata hai. 
          Ye expected behavior hai single portrait image ke saath. */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/bg-main.png" 
          alt="Background"
          fill
          className="object-cover object-bottom" // Phool hamesha bottom mein rahenge
          priority
        />
      </div>

      {/* --- Main Content --- */}
      {/* mb-20 add kiya hai taaki text center se thoda upar shift ho jaye */}
      <div className="z-10 text-center max-w-2xl mb-20"> 
        
        {/* Heading - EXACT COLORS aur Structure */}
        {/* text-[#332258] deep violet color hai */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#332258] leading-tight mb-4 tracking-tight">
          You’re not alone.{" "}
          {/* text-[#7C4DFF] bright purple color hai */}
          <span className="text-[#7C4DFF]">Sukoon</span> is <br />
          your space to breathe.
        </h1>

        {/* Subtitle - EXACT COLOR */}
        {/* text-[#5F6D7E] blue-gray color hai */}
        <p className="text-[#5F6D7E] text-base md:text-xl mb-10 font-medium max-w-md mx-auto">
          Quiet support, whenever you need it.
        </p>

        {/* Button - EXACT COLOR aur Width */}
        {/* bg-[#330086] deep violet button background */}
        {/* w-full max-w-xs add kiya taaki button mobile pe chauda dikhe */}
        <button className="bg-[#330086] text-white font-bold py-4 px-12 rounded-full shadow-xl hover:bg-[#2a006e] hover:scale-105 transition-all duration-300 w-full max-w-[280px] text-lg">
          Get Started
        </button>
      </div>

    </main>
  );
}