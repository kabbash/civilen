import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | CivilEn Publishing",
  description: "SE Exam Strategies & Resources - Tips, strategies, and insights for the PE Structural Exam",
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

