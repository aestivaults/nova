import NavTabs from "@/app/components/ui/Tabs";
import { ethPrice, processDailyAverages } from "@/app/lib/getethprice";
import Deposit from "./Deposit";
import TransactionOverview from "./TransactionOverview";
import WalletOverview from "./walletOverview";
import Withdraw from "./Withdraw";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/Footer";

export default async function Wallet({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.tab || "overview";

  const price = await ethPrice();
  const ethereumvalue = price instanceof Error ? 0 : price;
  const balanceHistory = await processDailyAverages();

  return (
    <>
      <Navbar />
      <div className="py-25">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Wallet</h1>
              <p className="text-white/70">
                Manage your crypto wallet and transactions
              </p>
            </div>
          </div>
          <WalletOverview
            ethereumvalue={ethereumvalue}
            balanceHistory={balanceHistory}
          />
          <NavTabs tabs={tabs} />
          {activeTab === "overview" && <TransactionOverview />}
          {activeTab === "deposit" && <Deposit />}
          {activeTab === "withdraw" && <Withdraw />}
        </div>
      </div>
      <Footer />
    </>
  );
}

const tabs = [
  { key: "overview", label: "Transactions" },
  { key: "deposit", label: "Deposit" },
  { key: "withdraw", label: "Withdraw" },
];
