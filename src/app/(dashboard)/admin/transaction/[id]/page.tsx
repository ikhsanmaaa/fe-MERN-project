import { Metadata } from "next";

import PageHeader from "@/ui/PageHeader/PageHeader";
import DetailTransaction from "@/ui/AdminDashboardMenu/TransactionAdmin/DetailTransaction/DetailTransaction";
export const metadata: Metadata = {
  title: "Transaction",
  description: "Detail of Transaction selected",
};
const AdminDetailTransactionPage = () => {
  return (
    <>
      <PageHeader
        title="Detail Transaction"
        description="Detail of Transaction"
      />
      <DetailTransaction />
    </>
  );
};

export default AdminDetailTransactionPage;
