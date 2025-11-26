import * as React from "react";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative h-12 px-6 py-[18px]",
          "flex items-center justify-center gap-2.5",
          "bg-orange-gradient cursor-pointer",
          "font-gotham-medium text-lg leading-[27px] text-white",
          "transition-all duration-200",
          "hover:bg-orange-gradient-reverse hover:shadow-lg",
          "active:bg-[#ea5422]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export { PrimaryButton };
