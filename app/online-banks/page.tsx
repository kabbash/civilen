import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Online Banks | CivilEn Publishing",
  description: "Practice problems for PE Structural Exams - Coming Soon",
};

export default function OnlineBanksPage() {
  return (
    <main className="relative min-h-screen w-full bg-white">
      {/* Hero Section with Library Background */}
      <section className="relative h-[986px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/online-banks/background.png"
            alt="Library Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Title */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ea7922] to-[#ea5422] px-10 py-2.5">
          <h1 className="font-gotham-bold text-5xl leading-[72px] whitespace-nowrap text-white">
            PE Structural Practice Banks
          </h1>
        </div>

        {/* Content Card */}
        <div className="absolute top-[292px] left-1/2 w-[848px] max-w-[calc(100%-80px)] -translate-x-1/2">
          <div className="flex flex-col items-center gap-8 bg-white/90 px-8 py-12 backdrop-blur-sm">
            {/* Coming Soon Badge */}
            <div className="relative h-[280px] w-[240px]">
              <Image
                src="/images/online-banks/coming-soon-badge.png"
                alt="Coming Soon"
                fill
                className="object-contain"
              />
            </div>

            {/* Description Text */}
            <div className="flex w-full flex-col gap-6">
              <p className="font-gotham-book text-left text-lg leading-[27px] text-black">
                The CivilEn Online Banks will include hundreds of exam-like problems covering all
                topics of the PE Structural Exams.
              </p>
              <p className="font-gotham-book text-left text-lg leading-[27px] text-black">
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
