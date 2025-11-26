import { FeatureCard } from "@/components/ui/feature-card";

export function FeaturesSection() {
  const features = [
    {
      title: "Online Bank Problems",
      count: "1200+",
    },
    {
      title: "CBT-Style Practice Questions",
      count: "80+",
    },
    {
      title: "Solutions with Step-by-Step Logic",
      count: "100%",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 lg:px-20 lg:py-16">
      {/* Centered with space between cards */}
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:flex-row lg:gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            count={feature.count}
            className="w-full max-w-[416px] lg:w-[416px]"
          />
        ))}
      </div>
    </section>
  );
}
