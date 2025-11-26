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
    <section className="container mx-auto px-4 py-12 lg:px-20 lg:py-16">
      {/* Centered with space between cards */}
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            count={feature.count}
            className="w-full lg:w-[416px]"
          />
        ))}
      </div>
    </section>
  );
}
