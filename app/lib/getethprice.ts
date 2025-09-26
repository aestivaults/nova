import { balanceHistory, CoinGeckoPricePoint } from "../types/general";

export async function ethPrice() {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  return data?.USD;
}

async function fetchEthereumData(): Promise<CoinGeckoPricePoint[]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7`
    );
    if (!response.ok) {
      console.log("Failed to fetch data");
      return [];
    }
    const data: { prices: CoinGeckoPricePoint[] } = await response.json();

    return data.prices;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const processDailyAverages = async (): Promise<balanceHistory[]> => {
  const data = await fetchEthereumData();

  const dailyData: Record<
    string,
    { total: number; count: number; date: Date }
  > = {};

  data.forEach(([timestamp, price]) => {
    const date = new Date(timestamp);
    const dayKey = date.toISOString().split("T")[0];
    if (!dailyData[dayKey]) {
      dailyData[dayKey] = { total: 0, count: 0, date };
    }
    dailyData[dayKey].total += price;
    dailyData[dayKey].count += 1;
  });

  return Object.values(dailyData)
    .map(({ total, count, date }) => ({
      date: date.toISOString().split("T")[0],
      balance: total / count, // Average price for the day
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date
    .slice(-7); // Take the last 7 days
};
