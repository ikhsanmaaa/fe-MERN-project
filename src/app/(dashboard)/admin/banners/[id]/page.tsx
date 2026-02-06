import { Metadata } from "next";

import PageHeader from "@/ui/PageHeader/PageHeader";
import DetailBanner from "@/ui/MenuDashboardAdmin/Banner/DetailBanner/DetailBanner";
export const metadata: Metadata = {
  title: "Banner",
  description: "Detail of Banner selected",
};
const AdminDetailBannerPage = () => {
  return (
    <>
      <PageHeader
        title="Detail Banner"
        description="Manage information of detail Banner"
      />
      <DetailBanner />
    </>
  );
};

export default AdminDetailBannerPage;
