import { Metadata } from "next";

import PageHeader from "@/ui/PageHeader/PageHeader";
import DetailCategory from "@/ui/MenuDashboardAdmin/Category/DetailCategory/DetailCategory";
export const metadata: Metadata = {
  title: "Category",
  description: "List of all categories",
};
const AdminDetailCategoryPage = () => {
  return (
    <>
      <PageHeader
        title="Detail Category"
        description="Manage information of detail category"
      />
      <DetailCategory />
    </>
  );
};

export default AdminDetailCategoryPage;
