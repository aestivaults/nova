import Button from "@/app/components/ui/button";
import { formatDate, formatEthPrice } from "@/app/utils/formatters";
import { getStatusBadge, getTransactionIcon } from "@/app/data/wallet";
import { Download, ExternalLink, Filter, SwitchCamera } from "lucide-react";
import { createServerApi } from "@/app/utils/api";
import { cookies } from "next/headers";
import { TransactionProps } from "@/app/types/transactions";
import { AxiosError } from "axios";

export default async function TransactionOverview() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const serverapi = createServerApi(token, refreshToken);
  let transactions: TransactionProps[] = [];
  try {
    const res = await serverapi.get("/users/transactions");

    if (res.data.data && Array.isArray(res.data.data)) {
      transactions = res.data.data;
    }
  } catch (err) {
    console.log(err instanceof AxiosError ? err.response?.data.error : err);
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium">Recent Transactions</h3>

        <div className="flex gap-2">
          <Button variant="text" size="small">
            <Filter />
          </Button>

          <Button variant="text" size="small">
            <Download />
          </Button>
        </div>
      </div>

      {transactions.length > 0 ? (
        <div>
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  {getTransactionIcon(tx.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium mb-1 capitalize">{tx.type}</h4>
                    <div
                      className={`font-bold ${
                        tx.type === "deposit" ? "text-green-400" : "text-white"
                      }`}
                    >
                      {tx.note.includes("Deposit") ? "+" : "-"}
                      {formatEthPrice(tx.amount)}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="text-sm text-white/60">
                      {formatDate(tx.createdAt, "datetime")}
                    </div>
                    <div>{getStatusBadge(tx.status)}</div>
                  </div>

                  {tx.note && (
                    <div className="mt-2 text-sm text-white/70">
                      Note: {tx.note}
                    </div>
                  )}

                  <div className="mt-2 text-xs text-white/50 font-mono">
                    {tx.txHash}
                  </div>
                </div>

                <Button variant="text" size="small" title="View on Etherscan">
                  <ExternalLink />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="mb-4">
            <SwitchCamera
              size={35}
              className="text-5xl max-w-md mx-auto text-white/20"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">No Transactions</h3>
          <p className="text-white/60 mb-6">
            You haven&apos;t made any transactions yet.
          </p>
        </div>
      )}
    </div>
  );
}
