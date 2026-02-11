import { Metadata } from "next";
import Payment from "./Payment";
export const metadata: Metadata = {
  title: "Payment",
  description: "Payment after transaction page",
};
export default function PaymentPage() {
  return <Payment />;
}
