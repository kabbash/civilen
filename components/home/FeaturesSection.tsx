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
    <section className="container px-4 lg:px-20 py-12 lg:py-16 mx-auto">
      {/* Centered with space between cards */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
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

