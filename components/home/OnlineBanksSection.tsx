import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

export function OnlineBanksSection() {
  return (
    <section className="container mx-auto px-4 py-12 lg:px-20 lg:py-16">
      <SectionHeader>Ultimate Exam Prep: Online Question Banks</SectionHeader>

      {/* Coming Soon Container */}
      <div className="relative flex w-full items-center justify-end overflow-hidden rounded-lg p-6 lg:p-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/online-banks/background.jpg"
            alt="Construction workers"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[rgba(234,84,34,0.05)] mix-blend-lighten" />
        </div>

        {/* Coming Soon Card */}
        <div className="relative z-10 flex max-w-[481px] flex-col items-center gap-6 rounded-[4px] bg-white/80 p-6 backdrop-blur-[10px] lg:p-8">
          {/* Coming Soon Badge */}
          <div className="relative h-[165px] w-[220px]">
            <Image
              src="/images/online-banks/coming-soon-badge.png"
              alt="Coming Soon"
              fill
              sizes="220px"
              className="object-contain"
            />
          </div>

          {/* Description Text */}
          <p className="font-gotham-medium text-center text-lg leading-[27px] text-black">
            The online banks will include hundreds of exam-like problems covering all topics.
            Problems are ordered by ascending difficulty to ensure outstanding practice on every
            small point in the design codes.
          </p>
        </div>
      </div>
    </section>
  );
}
