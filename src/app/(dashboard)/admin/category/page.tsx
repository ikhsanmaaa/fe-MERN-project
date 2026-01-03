import { Metadata } from "next";
import Category from "./category";
import PageHeader from "@/ui/PageHeader/PageHeader";
export const metadata: Metadata = {
  title: "Category",
  description: "List of all categories",
};
const AdminCategoryPage = () => {
  return (
    <>
      <PageHeader
        title="Category"
        description="List of all categories, create new category, and manage existing category"
      />
      <Category />
    </>
  );
};

export default AdminCategoryPage;
