import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // 1. OUTER BACKGROUND: Ye screen ka color set karta hai. 
    // Agar side ka color image se match nahi ho raha, toh ye '#dae2f8' change karo.
    <main className="min-h-screen w-full bg-[#dae2f8] flex justify-center items-center overflow-hidden">
      
      {/* 2. INNER CONTAINER (MOBILE SCREEN): 
          Yahan 'max-w-[480px]' wo number hai jo decide karta hai ki image kitni chaudi hogi.
          Agar image abhi bhi badi lag rahi hai, toh 480 ko kam karke 400 ya 380 kar do. */}
      <div className="relative w-full max-w-[450px] h-screen shadow-none">
        
        {/* --- Background Image --- */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/bg-main.png" 
            alt="Background"
            fill
            // 'object-cover' image ko container me fit karta hai.
            // 'object-bottom' ensure karta hai ki phool (lotus) hamesha dikhein.
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* --- Main Content (Text & Button) --- */}
        {/* 3. TEXT POSITION: '-mt-16' text ko upar khinchta hai. 
            Agar text flowers ke upar aa raha hai, toh isse '-mt-24' karo (aur upar) 
            ya '-mt-10' karo (thoda niche). */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center -mt-16"> 
          
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 tracking-tight font-montserrat">
            <span className="text-[#352166]">You’re not alone. </span>
            <span className="text-[#8a5cf5]">Sukoon</span>
            <span className="text-[#352166]"> is <br /> your space to breathe.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#6b5e8b] text-sm md:text-base mb-10 font-medium font-montserrat">
            Quiet support, whenever you need it.
          </p>

          {/* Button */}
          <Link href="/chat" className="w-full">
            <button className="w-full bg-[#352166] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#2a1a52] active:scale-95 transition-all duration-300 text-lg font-montserrat">
              Get Started
            </button>
          </Link>

        </div>
      </div>
      
    </main>
  );
}