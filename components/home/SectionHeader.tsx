import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <div className={cn("relative w-full h-[54px] mb-8 lg:mb-12", className)}>
      {/* Background gradient bar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-[820px] h-4 bg-gradient-to-r from-[#ea7922] to-[#ea5422] opacity-10" />
      
      {/* Title */}
      <h2 className="absolute inset-0 flex items-center justify-center font-gotham-medium text-2xl lg:text-4xl leading-[54px] text-[#ea5422] text-center px-4">
        {children}
      </h2>
    </div>
  );
}


