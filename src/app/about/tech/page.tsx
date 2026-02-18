import { Metadata } from "next";
import PageHeader from "@/ui/PageHeader/PageHeader";
import Tech from "./tech";
export const metadata: Metadata = {
  title: "Tech-used",
  description: "About tech used",
};
const CreatorPage = () => {
  return <Tech />;
};

export default CreatorPage;
