"use client";

import DataTable from "@/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback, useEffect } from "react";

import DropdownAction from "@/ui/DropdownAction/DropdownAction";
import useTransaction from "./useTransaction";
import { COLUMN_LIST_Transaction } from "./transactionConstant";

const Transaction = () => {
  const router = useRouter();

  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
    selectedId,
    setSelectedId,
  } = useTransaction();

  useEffect(() => {
    console.log(dataTransactions);
  }, [dataTransactions]);

  const renderCell = useCallback(
    (Transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = Transaction[columnKey as keyof typeof Transaction];

      switch (columnKey) {
        case "Status":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              labelButtonDetails="Details"
              onPressButtonDetail={() =>
                router.push(`/member/transaction/${Transaction._id}`)
              }
              hideButtonDelete
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [router, setSelectedId],
  );
  return (
    <section>
      <DataTable
        columns={COLUMN_LIST_Transaction}
        data={dataTransactions?.data || []}
        emptyContent="Transactions is empty"
        isLoading={isLoadingTransactions || isRefetchingTransactions}
        totalPages={dataTransactions?.pagination.totalPages}
        renderCell={renderCell}
      />
    </section>
  );
};

export default Transaction;
