"use client";

import { generateWalletAddress } from "@/app/backend/jwt/create_ids";
import Button from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useNotifications } from "@/app/context/NotificationProvider";
import { transactions } from "@/app/data/wallet";
import { api } from "@/app/utils/api";
import {
  formatCurrency,
  formatEthPrice,
  formatRelativeTime,
  truncateAddress,
} from "@/app/utils/formatters";
import { AxiosError } from "axios";
import { ChevronRight, QrCode, TriangleAlert, Wallet } from "lucide-react";
import React, { useState } from "react";
import { number } from "zod";

type WithdrawForm = {
  amount: number;
  toAddress: string;
  note: string;
};

export default function Withdraw() {
  const { user } = useAuth();
  const { toast } = useNotifications();
  const [isloading, setIsLoading] = useState(false);
  const [txForm, setTxForm] = useState<WithdrawForm>({
    amount: 0,
    toAddress: user?.owner_id || "",
    note: "Wallet Withdrawal",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTxForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const parsedAmount = txForm.amount;
  const totalWithFee = parsedAmount + 0.002;

  const handleDepositRequest = async () => {
    if (!txForm.amount || isNaN(txForm.amount) || txForm.amount <= 0) {
      toast("warning", "system", "Error!", "Enter a valid amount", 4000);
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.post("/transactions", {
        type: "Withdrawal",
        ...txForm,
        amount: Number(txForm.amount),

        network: "Ethereum",
        fee: Number(totalWithFee),
        txHash: generateWalletAddress(),
      });

      if (res.status === 200) {
        toast(
          "success",
          "system",
          "Deposit Successfuly",
          "Deposit request submitted and pending approval.",
          4000
        );
        setTxForm({
          amount: 0,
          toAddress: user?.owner_id || "",
          note: "Wallet Withdrawal",
        });
      } else {
        toast(
          "error",
          "system",
          "Error!",
          res.data.data.message || "Failed to submit deposit request.",
          4000
        );
      }
    } catch (err) {
      console.error(
        err instanceof AxiosError ? err?.response?.data?.error : err
      );
      toast("error", "system", "Error!", "Server Error", 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-6">Withdraw ETH</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Withdrawal Address Input */}
          <div className="mb-6">
            <label htmlFor="address" className="form-label">
              Withdrawal Address
            </label>
            <input
              type="text"
              id="toAddress"
              name="toAddress"
              className="form-input font-mono"
              placeholder="0x..."
              value={txForm.toAddress}
              onChange={handleFormChange}
            />
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label htmlFor="amount" className="form-label">
              Amount (ETH)
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                name="amount"
                className="form-input pr-16"
                placeholder="0.00"
                max={user?.walletBalance || 0}
                value={txForm.amount}
                onChange={handleFormChange}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  className="text-xs text-primary-400 hover:text-primary-300"
                  onClick={() =>
                    setTxForm((prev) => ({
                      ...prev,
                      amount: user?.walletBalance || 0,
                    }))
                  }
                >
                  MAX
                </button>
              </div>
            </div>
            <div className="text-xs text-white/60 mt-1">
              Available: {formatEthPrice(user?.walletBalance || 0)}
            </div>
          </div>

          {/* Note Input */}
          <div className="mb-6">
            <label htmlFor="note" className="form-label">
              Note (Optional)
            </label>
            <input
              type="text"
              id="note"
              name="note"
              className="form-input"
              placeholder="Withdrawal reason or memo"
              value={txForm.note}
              onChange={handleFormChange}
            />
          </div>

          {/* Summary Card */}
          <div className="glass-card p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span>Withdrawal Fee</span>
              <span className="font-medium">0.002 ETH</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total (Amount + Fee)</span>
              <span className="font-medium">
                {formatEthPrice(totalWithFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total in USD</span>
              <span className="font-medium">
                {formatCurrency(totalWithFee * 2150, "USD")}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="secondary">Cancel</Button>
            <Button
              variant="primary"
              fullWidth
              isLoading={isloading}
              disabled={!txForm.toAddress || !txForm.amount || isloading}
              onClick={handleDepositRequest}
            >
              Withdraw
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Warnings */}
          <div className="glass-card p-4 border border-yellow-500/30 bg-yellow-500/5 mb-6">
            <div className="flex items-start">
              <TriangleAlert className="text-yellow-500 mr-4 mt-1" />
              <div>
                <h4 className="font-medium mb-1">Before You Withdraw</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Make sure the withdrawal address is correct</li>
                  <li>• Withdrawals are irreversible</li>
                  <li>• External wallets must support ETH</li>
                  <li>• You need enough ETH to cover fees</li>
                  <li>• Some withdrawals may be reviewed before approval</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recent Withdrawals */}
          <div className="glass-card p-4 mb-6">
            <h3 className="font-medium mb-4">Recent Withdrawals</h3>
            {transactions
              .filter((tx) => tx.type === "outgoing")
              .slice(0, 3)
              .map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer mb-2"
                  onClick={() =>
                    setTxForm((prev) => ({ ...prev, address: tx.to }))
                  }
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                      <Wallet className="text-sm" />
                    </div>
                    <div>
                      <div className="font-mono text-sm truncate max-w-[150px]">
                        {truncateAddress(tx.to)}
                      </div>
                      <div className="text-xs text-white/60">
                        {formatRelativeTime(tx.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="text-white/60">
                    <ChevronRight />
                  </div>
                </div>
              ))}
          </div>

          {/* QR Code Scanner */}
          <div className="glass-card p-4">
            <h3 className="font-medium mb-4">Scan Wallet QR</h3>
            <p className="text-sm text-white/70 mb-4">
              Scan a wallet QR code to fill in the withdrawal address
              automatically.
            </p>
            <div className="flex justify-center">
              <Button variant="secondary">
                <QrCode className="mr-1" />
                Scan QR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
