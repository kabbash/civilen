import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primary-button";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Container with margins */}
      {/* Peach Background Container with rounded corners */}
      <div className="mx-4 mt-20 overflow-visible rounded-[8px] bg-[#f5e6e0] lg:mx-10">
        {/* Content Container */}
        <div className="flex min-h-[500px] items-center lg:min-h-[772px]">
          {/* Left Side - Text Content */}
          <div className="z-10 w-full shrink-0 px-6 py-12 lg:px-20 lg:py-20">
            <div className="max-w-[780px]">
              {/* Hero Text */}
              <div className="mb-12 flex flex-col gap-2">
                <h1 className="font-gotham-bold text-4xl text-black lg:text-[96px] lg:leading-[1.1]">
                  Master the PE Structural Exam
                </h1>
                <p className="font-gotham-book max-w-[600px] text-base leading-[27px] text-black lg:text-lg">
                  Uncompromising practice exams designed to perfectly mirror the NCEES CBT format.
                  Get exam-ready with materials built by practicing structural engineers.
                </p>
              </div>

              {/* CTA Button */}
              <Link href="/books" className="inline-flex flex-col items-start gap-1">
                <PrimaryButton className="w-auto">View Practice Exams & Solutions</PrimaryButton>

                {/* NCEES Badge */}
                <div className="mt-1 flex items-center gap-1">
                  <Image src="/images/icons/seal-check.svg" alt="Verified" width={20} height={20} />
                  <span className="font-gotham-book text-xs leading-[21px] text-[#2e2d2d]">
                    Aligned with current NCEES standards
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image - Overflows peach container on the right */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 h-full w-[72%]">
        <Image
          src="/images/hero/engineer-construction.png"
          alt="Structural Engineer"
          fill
          className="object-cover object-center mix-blend-darken"
          priority
        />
      </div>
    </section>
  );
}
