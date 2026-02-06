import LandingPageLayout from "@/ui/LandingPage/LandingPageLayout";
import { Metadata } from "next";
import Event from "./Event";
export const metadata: Metadata = {
  title: "Event",
  description: "Event",
};
export default function EventPage() {
  return (
    <LandingPageLayout>
      <Event />
    </LandingPageLayout>
  );
}
