"use client";

import Button from "@/app/components/ui/button";
import { useSetParams } from "@/app/hooks/useSetParams";
import { balanceHistory } from "@/app/types/general";
import { User } from "@/app/types/user";
import { api } from "@/app/utils/api";
import { formatCurrency, formatNumber } from "@/app/utils/formatters";
import { ArrowDown, ArrowUp, Loader } from "lucide-react";
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { setParams } = useSetParams();
  const handleTabChange = (tab: string) => {
    setParams({ tab: tab });
  };

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const { data } = await api.get("/users");
      setUser(data.data);
      setLoading(false);
    }
    getUser();
  }, []);

  return (
    <div className="glass-card p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Wallet Address</h2>
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
                  </div>
                </div>
                <div className="text-right">
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <p className="text-xl font-bold">
                      {formatNumber(user?.walletBalance || 0)} ETH
                    </p>
                  )}
                </div>
              </div>

              {/* Deposited Balance */}
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <div>
                  <p className="font-medium">Dollar Estimate</p>
                  <p className="text-sm text-white/60">
                    On-platform (rates may vary)
                  </p>
                </div>
                <div className="text-right">
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <p className="text-xl font-bold">
                      {formatCurrency(
                        (user?.walletBalance || 0) * ethereumvalue,
                        "USD"
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Wallet Balance */}
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
