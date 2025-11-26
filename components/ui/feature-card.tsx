import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  count: string;
  iconUrl?: string;
  className?: string;
}

export function FeatureCard({
  title,
  count,
  iconUrl = "/images/icons/feature-icon.svg",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn("relative mt-[80px] min-h-[240px] md:mt-[120px] md:min-h-[290px]", className)}
    >
      <div
        className="absolute -top-[7%] left-1/2 flex h-[120px] w-[128px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-contain bg-center bg-no-repeat md:h-[160px] md:w-[170px]"
        style={{ backgroundImage: `url(${iconUrl})` }}
      >
        <p className="font-gotham-medium text-[36px] font-bold text-white md:text-[48px]">
          {count}
        </p>
      </div>
      <div className="font-gotham-medium mt-6 flex min-h-[160px] items-center justify-center rounded-[4px] bg-[#FFF1EC] px-4 py-4 text-center text-[22px] font-medium md:min-h-[190px] md:px-7 md:text-[28px]">
        <p>{title}</p>
      </div>
    </div>
  );
}
