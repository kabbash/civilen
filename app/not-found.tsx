import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { NotFoundIllustration } from "@/components/ui/404-illustration";

export default function NotFound() {
  return (
    <main className="relative w-full min-h-screen bg-white flex flex-col">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-10 w-[847px] max-w-full px-4">
          {/* Content Section */}
          <div className="flex flex-col items-center gap-6 w-full">
            {/* 404 Illustration */}
            <div className="w-[453px] h-[302px] max-w-full">
              <NotFoundIllustration />
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center text-center w-full">
              <h1 className="font-gotham-medium text-4xl leading-[54px] text-black mb-0">
                Error 404: Structural Anomaly Detected
              </h1>
              <p className="font-gotham-medium text-lg leading-[27px] text-black max-w-[800px]">
                It looks like you've encountered a zero-shear zone—the page you requested is currently offline or the URL has a design flaw.
              </p>
            </div>
          </div>

          {/* Back to Home Button */}
          <Link href="/" className="w-full max-w-[847px]">
            <PrimaryButton className="w-full">
              Back to Home Page
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </main>
  );
}

