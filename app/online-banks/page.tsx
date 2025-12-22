import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Online Banks | CivilEn Publishing",
  description: "Practice problems for PE Structural Exams - Coming Soon",
};

export default function OnlineBanksPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero Section with Library Background */}
      <section className="relative h-[800px] w-full overflow-hidden md:h-[986px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/online-banks/background.jpg"
            alt="Library Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Title */}
        <div className="absolute top-[30px] left-1/2 max-w-[90%] -translate-x-1/2 bg-gradient-to-r from-[#ea7922] to-[#ea5422] px-4 py-2 md:top-[50px] md:px-10 md:py-2.5">
          <h1 className="font-gotham-bold text-center text-2xl leading-[36px] text-white md:text-5xl md:leading-[72px] md:whitespace-nowrap">
            PE Structural Practice Banks
          </h1>
        </div>

        {/* Content Card */}
        <div className="absolute top-[120px] left-1/2 w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] -translate-x-1/2 md:top-[190px] md:w-[848px] md:max-w-[calc(100%-80px)]">
          <div className="flex flex-col items-center gap-6 bg-white/90 px-4 py-8 backdrop-blur-sm md:gap-8 md:px-8 md:py-12">
            {/* Coming Soon Badge */}
            <div className="relative h-[200px] w-[172px] md:h-[280px] md:w-[240px]">
              <Image
                src="/images/online-banks/coming-soon-badge.png"
                alt="Coming Soon"
                fill
                sizes="(max-width: 768px) 172px, 240px"
                className="object-contain"
              />
            </div>

            {/* Description Text */}
            <div className="flex w-full flex-col gap-4 md:gap-6">
              <p className="font-gotham-book text-left text-base leading-[24px] text-black md:text-lg md:leading-[27px]">
                The CivilEn Online Banks will include hundreds of exam-like problems covering all
                topics of the PE Structural Exams.
              </p>
              <p className="font-gotham-book text-left text-base leading-[24px] text-black md:text-lg md:leading-[27px]">
                The problems are designed to cover all topics, from the easiest questions to the
                most difficult ones, arranged in ascending order of complexity. This ensures you
                achieve outstanding practice on every small point in the design codes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

