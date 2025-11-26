import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { NotFoundIllustration } from "@/components/ui/404-illustration";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-white">
      {/* Main Content - Centered */}
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="flex w-[847px] max-w-full flex-col items-center gap-10 px-4">
          {/* Content Section */}
          <div className="flex w-full flex-col items-center gap-6">
            {/* 404 Illustration */}
            <div className="h-[302px] w-[453px] max-w-full">
              <NotFoundIllustration />
            </div>

            {/* Text Content */}
            <div className="flex w-full flex-col items-center text-center">
              <h1 className="font-gotham-medium mb-0 text-4xl leading-[54px] text-black">
                Error 404: Structural Anomaly Detected
              </h1>
              <p className="font-gotham-medium max-w-[800px] text-lg leading-[27px] text-black">
                It looks like you've encountered a zero-shear zone—the page you requested is
                currently offline or the URL has a design flaw.
              </p>
            </div>
          </div>

          {/* Back to Home Button */}
          <Link href="/" className="w-full max-w-[847px]">
            <PrimaryButton className="w-full">Back to Home Page</PrimaryButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
