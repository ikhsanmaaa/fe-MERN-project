"use client";
import ButtonSuccess from "@/ui/ButtonSuccess/ButtonSuccess";
import Image from "next/image";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const { mutateUpdateOrderStatus, orderId, transactionStatus } = usePayment();

  const isSuccess =
    transactionStatus === "settlement" || transactionStatus === "capture";

  const isFailed =
    transactionStatus === "deny" ||
    transactionStatus === "cancel" ||
    transactionStatus === "expire";

  useEffect(() => {
    if (!orderId || !transactionStatus) return;
    mutateUpdateOrderStatus({
      orderId,
      transactionStatus,
    });
  }, [orderId, transactionStatus]);

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.png"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            isSuccess
              ? "/images/illustration/success.svg"
              : "/images/illustration/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-danger-500">
          {isSuccess
            ? `Payment for order id ${orderId} is success!`
            : `Payment for order id ${orderId} is failed!`}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {isSuccess
            ? "Thank you for purchasing ticket!"
            : "Confirmation ticket payment is invalid!"}
        </p>
        <ButtonSuccess
          label="check your transaction here"
          pathname={`/member/transaction/${orderId}`}
        />
      </div>
    </div>
  );
};

export default Payment;
