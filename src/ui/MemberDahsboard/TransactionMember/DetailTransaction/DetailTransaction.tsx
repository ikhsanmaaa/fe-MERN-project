"use client";
import { Card } from "@heroui/react";
import useDetailTransaction from "./useDetailTransaction";

const DetailTransaction = () => {
  const { dataOrder, dataEvent, dataTickets } = useDetailTransaction();
  console.log(dataEvent);
  console.log(dataTickets);
  console.log(dataOrder);
  return (
    <div>
      <Card></Card>
    </div>
  );
};

export default DetailTransaction;
