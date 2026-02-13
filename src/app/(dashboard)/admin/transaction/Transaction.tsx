"use client";

import DataTable from "@/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";

import DropdownAction from "@/ui/DropdownAction/DropdownAction";
import useTransaction from "./useTransaction";
import { COLUMN_LIST_Transaction } from "./transactionConstant";
import convertIDR from "@/utils/currency";
import DeleteTransactionModal from "@/ui/AdminDashboardMenu/TransactionAdmin/DeleteTransactionModal/DeleteTransactionModal";

const Transaction = () => {
  const router = useRouter();

  const deleteTransactionModal = useDisclosure();
  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
    selectedId,
    setSelectedId,
  } = useTransaction();

  const renderCell = useCallback(
    (Transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = Transaction[columnKey as keyof typeof Transaction];

      switch (columnKey) {
        case "total":
          return convertIDR(Number(cellValue));
        case "status":
          return (
            <Chip
              color={
                cellValue === "completed"
                  ? "success"
                  : cellValue === "pending" || "cancelled"
                    ? "warning"
                    : "danger"
              }
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
                router.push(`/admin/transaction/${Transaction.orderId}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${Transaction.orderId}`);
                deleteTransactionModal.onOpen();
              }}
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
      <DeleteTransactionModal
        {...deleteTransactionModal}
        refetchTransaction={refetchTransactions}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Transaction;
