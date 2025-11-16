import { balanceHistory as BalanceHistoryType } from "@/app/types/general";
import {
  formatCurrency,
  formatDate,
  formatEthPrice,
} from "@/app/utils/formatters";

type WalletChartProps = {
  balanceHistory: BalanceHistoryType[] | null | undefined;
};

export default function WalletChart({ balanceHistory }: WalletChartProps) {
  const isValidHistory =
    Array.isArray(balanceHistory) &&
    balanceHistory.length > 0 &&
    balanceHistory.every(
      (entry) => entry.date && typeof entry.balance === "number"
    );

  if (!isValidHistory) {
    return (
      <div className="bg-white/5 rounded-lg p-6 text-center text-white/60">
        <p>ETH chart data is currently unavailable.</p>
      </div>
    );
  }

  const maxBalance = Math.max(...balanceHistory.map((e) => e.balance));
  const minBalance = Math.min(...balanceHistory.map((e) => e.balance));
  const yAxisTicks = [
    minBalance,
    minBalance + (maxBalance - minBalance) / 2,
    maxBalance,
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">ETH History</h2>

      <div className="bg-white/5 rounded-lg p-4 h-64 flex font-sans">
        <div className="flex flex-col h-full w-12 text-white/60 text-xs">
          {yAxisTicks.map((value, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-end pr-2"
              style={{
                transform: `translateY(${
                  (index / (yAxisTicks.length - 1)) * 10
                }px)`,
              }}
            >
              {formatEthPrice(value)}
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="relative flex-1 flex flex-col justify-end">
            <div className="absolute inset-0">
              {yAxisTicks.map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full border-t border-white/10"
                  style={{
                    bottom: `${(index / (yAxisTicks.length - 1)) * 100}%`,
                  }}
                ></div>
              ))}
            </div>

            <div className="w-full h-full flex">
              {balanceHistory.map((entry, index) => {
                const isUp =
                  index > 0 &&
                  entry.balance > balanceHistory[index - 1].balance;
                const isDown =
                  index > 0 &&
                  entry.balance < balanceHistory[index - 1].balance;

                return (
                  <div
                    key={index}
                    className="flex-1 h-full flex justify-center items-end relative"
                    title={`${formatDate(entry.date)}: ${formatEthPrice(
                      entry.balance
                    )}`}
                  >
                    <div
                      className={`w-2/3 rounded-t ${
                        isUp
                          ? "bg-gradient-to-t from-primary-500 to-primary-400"
                          : isDown
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                      style={{
                        height: `${
                          ((entry.balance - minBalance) /
                            (maxBalance - minBalance)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-6 border-t border-white/10 flex justify-between text-xs text-white/60 pt-1">
            {balanceHistory.map((entry, index) => (
              <div key={index}>
                {new Date(entry.date).toLocaleString("default", {
                  weekday: "short",
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-sm text-white/60">Ethereum Market Cap</p>
          <p className="text-xl font-bold">$4.8B</p>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-sm text-white/60">ETH Price</p>
          <p className="text-xl font-bold">
            {/* Optional: calculate price if you pass it as prop separately */}
            {formatCurrency(
              balanceHistory[balanceHistory.length - 1].balance,
              "USD"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
