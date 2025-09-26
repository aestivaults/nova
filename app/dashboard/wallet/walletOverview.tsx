"use client";

import Button from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useSetParams } from "@/app/hooks/useSetParams";
import { balanceHistory } from "@/app/types/general";
import { formatCurrency, formatNumber } from "@/app/utils/formatters";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
  type Provider,
} from "@reown/appkit/react";
import { BrowserProvider, formatEther } from "ethers";
import { ArrowDown, ArrowUp, Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import WalletChart from "./WalletChart";

export default function WalletOverview({
  ethereumvalue,
  balanceHistory,
}: {
  ethereumvalue: number;
  balanceHistory: balanceHistory[];
}) {
  const { user } = useAuth();
  const { open } = useAppKit();
  const { setParams } = useSetParams();
  const handleTabChange = (tab: string) => {
    setParams({ tab: tab });
  };

  const [balance, setbalance] = useState(0);

  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetworkCore();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  useEffect(() => {
    const handleGetBalance = async () => {
      if (!isConnected || !address) return;
      const provider = new BrowserProvider(walletProvider, chainId);
      const balance = await provider.getBalance(address);
      const eth = formatEther(balance);
      setbalance(Number(eth));
    };

    handleGetBalance();
  }, [walletProvider, chainId, address, isConnected]);

  return (
    <div className="glass-card p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Wallet Address</h2>
            <div className="flex items-center">
              {isConnected ? (
                <>
                  <div className="bg-white/5 rounded-lg px-4 py-3 flex-1 font-mono overflow-hidden truncate">
                    {address}
                  </div>
                  <button
                    className="ml-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    title="Copy address"
                  >
                    <Copy />
                  </button>
                </>
              ) : (
                <div className="bg-white/5 flex items-center gap-3 rounded-lg px-4 py-3 flex-1 text-white/50">
                  No wallet connected{" "}
                  <Button onClick={() => open()} variant="primary">
                    {" "}
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Balances</h2>
            <div className="bg-white/5 rounded-lg p-4 space-y-4">
              {/* Total Balance */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    height={30}
                    width={30}
                    src="/eth.png"
                    alt="ETH"
                    className="mr-2"
                  />
                  <div>
                    <p className="font-medium">Total Balance</p>
                    <p className="text-sm text-white/60">Vault + Wallet</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">
                    {formatNumber((user?.walletBalance || 0) + balance)} ETH
                  </p>
                  <p className="text-sm text-white/60">
                    {formatCurrency(
                      ((user?.walletBalance || 0) + balance) * ethereumvalue,
                      "USD"
                    )}
                  </p>
                </div>
              </div>

              {/* Deposited Balance */}
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <div>
                  <p className="font-medium">Deposited Balance</p>
                  <p className="text-sm text-white/60">On-platform (Vault)</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {formatNumber(user?.walletBalance || 0)} ETH
                  </p>
                  <p className="text-sm text-white/60">
                    {formatCurrency(
                      (user?.walletBalance || 0) * ethereumvalue,
                      "USD"
                    )}
                  </p>
                </div>
              </div>

              {/* Wallet Balance */}
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <div>
                  <p className="font-medium">Wallet Balance</p>
                  <p className="text-sm text-white/60">Connected Wallet</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatNumber(balance)} ETH</p>
                  <p className="text-sm text-white/60">
                    {formatCurrency(balance * ethereumvalue, "USD")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <Button
              variant="primary"
              fullWidth
              onClick={() => handleTabChange("deposit")}
            >
              <ArrowDown className="down mr-2" /> Deposit
            </Button>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => handleTabChange("send")}
            >
              <ArrowUp className=" mr-2" /> Send
            </Button>
          </div>
        </div>

        <WalletChart balanceHistory={balanceHistory} />
      </div>
    </div>
  );
}
