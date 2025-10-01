import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import Apply from "./Apply";
import Integration from "./Integration";
import Overview from "./Overview";
import Tiers from "./Tiers";
import Header from "./Header";
import TabNav from "./TabNav";

export default async function OurPartners({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.tab || "overview";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto">
        <div className="py-12 sm:py-16 lg:py-20">
          <Header />
          <TabNav />
          {activeTab === "overview" && <Overview />}
          {activeTab === "tiers" && <Tiers />}
          {activeTab === "integration" && <Integration />}
          {activeTab === "apply" && <Apply />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
