"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Button from "@/app/components/ui/button";
import { TransactionProps } from "@/app/types/transactions";
import { api } from "@/app/utils/api";

interface UpdateTransactionParams {
  tx: TransactionProps;
  status: "approved" | "rejected";
}

export default function ActionButton({ tx }: { tx: TransactionProps }) {
  const [pendingStatus, setPendingStatus] = useState<
    "approved" | "rejected" | null
  >(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["transactions", "update"],
    mutationFn: async ({ tx, status }: UpdateTransactionParams) => {
      return api.post("/admin/transactions", {
        id: tx._id,
        status,
        user: tx.user,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      console.error("Transaction update failed:", error);
      // Optional: toast.error("Failed to update transaction");
    },
    onSettled: () => {
      setPendingStatus(null);
    },
  });

  const handleAction = (status: "approved" | "rejected") => {
    setPendingStatus(status);
    mutation.mutate({ tx, status });
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        variant="outline"
        size="small"
        disabled={!!pendingStatus}
        onClick={() => handleAction("rejected")}
        className="text-red-400 border-red-400/30 hover:bg-red-400/10"
      >
        {pendingStatus === "rejected" && mutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Reject"
        )}
      </Button>

      <Button
        variant="outline"
        size="small"
        disabled={!!pendingStatus}
        onClick={() => handleAction("approved")}
        className="text-green-400 border-green-400/30 hover:bg-green-400/10"
      >
        {pendingStatus === "approved" && mutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Approve"
        )}
      </Button>
    </div>
  );
}
