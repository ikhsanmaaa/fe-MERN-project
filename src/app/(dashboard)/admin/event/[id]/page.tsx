import { Metadata } from "next";

import PageHeader from "@/ui/PageHeader/PageHeader";
import DetailEvent from "@/ui/AdminDashboardMenu/Event/DetailEvent/DetailEvent";
export const metadata: Metadata = {
  title: "Event",
  description: "Detail of event",
};
const AdminDetailEventPage = () => {
  return (
    <>
      <PageHeader
        title="Detail Event"
        description="Manage information of detail Event"
      />
      <DetailEvent />
    </>
  );
};

export default AdminDetailEventPage;
