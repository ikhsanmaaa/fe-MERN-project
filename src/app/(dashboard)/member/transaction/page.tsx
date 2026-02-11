import { Metadata } from "next";
import PageHeader from "@/ui/PageHeader/PageHeader";
import Transaction from "./Transaction";
export const metadata: Metadata = {
  title: "Transaction",
  description: "List of all transaction",
};
const MemberTransactionPage = () => {
  return (
    <>
      <PageHeader title="Transaction" description="List of all Transaction" />
      <Transaction />
    </>
  );
};

export default MemberTransactionPage;
