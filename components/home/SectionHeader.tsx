import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <div className={cn("relative mb-6 h-[54px] w-full md:mb-8 lg:mb-12", className)}>
      {/* Background gradient bar */}
      <div className="absolute top-1/2 left-1/2 hidden h-4 w-[90%] max-w-[662px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ea7922] to-[#ea5422] opacity-10 md:max-w-[820px] lg:block" />

      {/* Title */}
      <h2 className="font-gotham-medium absolute inset-0 flex items-center justify-center px-4 text-center text-2xl leading-[54px] text-[#ea5422] lg:text-4xl">
        {children}
      </h2>
    </div>
  );
}
