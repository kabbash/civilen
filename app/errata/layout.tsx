import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Errata and Corrections | CivilEn Publishing",
  description: "Report errors and view corrections for our published books",
};

export default function ErrataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
