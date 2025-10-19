"use client";
import { generateWalletAddress } from "@/app/backend/jwt/create_ids";
import Button from "@/app/components/ui/button";
import { useNotifications } from "@/app/context/NotificationProvider";
import { api } from "@/app/utils/api";
import { AxiosError } from "axios";
import { Copy, TriangleAlert } from "lucide-react";
import { useState } from "react";

export default function Deposit() {
  const { toast } = useNotifications();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState({ deposit: false, wallet: false });
  const depositwallet = "0xd5d1cA5824cF7f40878F6259b9103a6e2bEDfF50";
  const handleDepositRequest = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast("warning", "system", "Error!", "Enter a valid amount", 4000);
      return;
    }

    try {
      setIsLoading({ deposit: true, wallet: false });
      const res = await api.post("/transactions", {
        type: "Deposit",
        note: "Wallet Deposit",
        amount: Number(amount),
        toAddress: depositwallet,
        network: "Ethereum",
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
        setAmount("");
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
      setIsLoading({ deposit: false, wallet: false });
    }
  };

  const [ethAmount, setEthAmount] = useState("");

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-6">Deposit ETH</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <p className="mb-4">
            Send ETH to the address below to deposit funds into your wallet.
          </p>

          <div className="mb-6">
            <label className="form-label">Wallet Address</label>
            <div className="flex items-center">
              <div className="bg-white/5 rounded-lg px-4 py-3 flex-1 font-mono overflow-hidden truncate">
                {depositwallet}
              </div>
              <button
                className="ml-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                title="Copy address"
              >
                <Copy />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="form-label">Amount to Deposit (ETH)</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              isLoading={isLoading.deposit}
              fullWidth
              className="mt-3"
              onClick={handleDepositRequest}
            >
              Submit Deposit Request
            </Button>
          </div>

          <div className="glass-card p-4 mb-6 border border-yellow-500/30 bg-yellow-500/5">
            <div className="flex items-start">
              <TriangleAlert />
              <div>
                <h4 className="font-medium mb-1">Important</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Only send ETH to this address</li>
                  <li>• Sending other tokens may result in permanent loss</li>
                  <li>• Minimum deposit: 0.01 ETH</li>
                  <li>• Deposits typically take 10-30 minutes to process</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <Button variant="secondary">View Transactions</Button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-6 w-full max-w-[250px]">
            <div className="p-4 bg-white rounded-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${depositwallet}`}
                alt="Wallet QR Code"
                className="w-full h-auto"
              />
            </div>
          </div>

          <p className="text-sm text-white/60 text-center mb-4">
            Scan this QR code to deposit ETH
          </p>

          <div className="glass-card p-4 mt-8">
            <h3 className="font-semibold mb-2">Deposit Directly from Wallet</h3>
            <input
              type="number"
              placeholder="Enter ETH amount"
              className="form-input"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
            />
            <Button isLoading={isLoading.wallet} fullWidth className="mt-2">
              Deposit from Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
