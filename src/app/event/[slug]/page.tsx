import LandingPageLayout from "@/ui/LandingPage/LandingPageLayout";
import { Metadata } from "next";
import DetailEvent from "@/ui/EventExplore/DetailEvent/DetailEvent";
export const metadata: Metadata = {
  title: "Detail Event",
  description: "Detail Event by Slug",
};
export default function DetailEventPage() {
  return (
    <LandingPageLayout>
      <DetailEvent />
    </LandingPageLayout>
  );
}
