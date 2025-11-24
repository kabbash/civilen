import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primary-button";

export function HeroSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Container with margins */}
        {/* Peach Background Container with rounded corners */}
        <div className=" bg-[#f5e6e0] rounded-[8px] overflow-visible mx-4 lg:mx-10 mt-20">
          {/* Content Container */}
          <div className=" flex items-center min-h-[500px] lg:min-h-[772px]">
            {/* Left Side - Text Content */}
            <div className=" z-10 shrink-0 w-full px-6 lg:px-20 py-12 lg:py-20">
              <div className="max-w-[780px]">
                {/* Hero Text */}
                <div className="flex flex-col gap-2 mb-12">
                  <h1 className="font-gotham-bold text-4xl lg:text-[96px] lg:leading-[1.1] text-black">
                    Master the PE Structural Exam
                  </h1>
                  <p className="font-gotham-book text-base lg:text-lg leading-[27px] text-black max-w-[600px]">
                    Uncompromising practice exams designed to perfectly mirror the NCEES CBT format. 
                    Get exam-ready with materials built by practicing structural engineers.
                  </p>
                </div>

                {/* CTA Button */}
                <Link href="/books" className="inline-flex flex-col gap-1 items-start">
                  <PrimaryButton className="w-auto">
                    View Practice Exams & Solutions
                  </PrimaryButton>
                  
                  {/* NCEES Badge */}
                  <div className="flex items-center gap-1 mt-1">
                    <Image
                      src="/images/icons/seal-check.svg"
                      alt="Verified"
                      width={20}
                      height={20}
                    />
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
        <div className=" absolute right-0 top-0 bottom-0 w-[72%] h-full pointer-events-none">
          <Image
            src="/images/hero/engineer-construction.png"
            alt="Structural Engineer"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
    </section>
  );
}

