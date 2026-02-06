import Home from "@/ui/LandingPage/Home/Home";
import LandingPageLayout from "@/ui/LandingPage/LandingPageLayout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};
export default function HomePage() {
  return (
    <LandingPageLayout>
      <Home />
    </LandingPageLayout>
  );
}
