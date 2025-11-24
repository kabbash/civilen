import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

export function OnlineBanksSection() {
  return (
    <section className="container px-4 lg:px-20 py-12 lg:py-16 mx-auto">
      <SectionHeader>
        Ultimate Exam Prep: Online Question Banks
      </SectionHeader>
      
      {/* Coming Soon Container */}
      <div className="relative w-full rounded-lg overflow-hidden p-6 lg:p-10 flex items-center justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/online-banks/background.jpg"
            alt="Construction workers"
            fill
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[rgba(234,84,34,0.05)] mix-blend-lighten" />
        </div>

        {/* Coming Soon Card */}
        <div className="relative z-10 backdrop-blur-[10px] bg-white/80 rounded-[4px] p-6 lg:p-8 max-w-[481px] flex flex-col items-center gap-6">
          {/* Coming Soon Badge */}
          <div className="w-[220px] h-[165px] relative">
            <Image
              src="/images/online-banks/coming-soon-badge.png"
              alt="Coming Soon"
              fill
              className="object-contain"
            />
          </div>

          {/* Description Text */}
          <p className="font-gotham-medium text-lg leading-[27px] text-black text-center">
            The online banks will include hundreds of exam-like problems covering all topics. 
            Problems are ordered by ascending difficulty to ensure outstanding practice on every 
            small point in the design codes.
          </p>
        </div>
      </div>
    </section>
  );
}

