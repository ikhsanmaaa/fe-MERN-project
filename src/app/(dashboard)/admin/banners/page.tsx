import { Metadata } from "next";
import PageHeader from "@/ui/PageHeader/PageHeader";
import Banner from "./Banner";
export const metadata: Metadata = {
  title: "Banner",
  description: "List of all categories",
};
const AdminBannerPage = () => {
  return (
    <>
      <PageHeader
        title="Banner"
        description="List of all categories, create new Banner, and manage existing Banner"
      />
      <Banner />
    </>
  );
};

export default AdminBannerPage;
