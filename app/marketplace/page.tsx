import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/navbar";
import { NFTGridSkeleton } from "@/app/components/ui/Loader";
import Hero from "./Hero";
import MarketFilterList from "./MarketFilter";
import MarketGrid from "./MarketGrid";
import { getNfts } from "../lib/getnfts";
import Pagination from "../components/ui/Pagination";
import { Suspense } from "react";

export default async function Market({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const value = await searchParams;
  const page = value.page || "1";
  const { data, error, pagination } = await getNfts(page);

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="pt-24">
          <Hero />

          {error ? (
            <div className="text-center mt-10 text-red-500">
              <p>Error loading NFTs: {error}</p>
            </div>
          ) : !data ? (
            <NFTGridSkeleton />
          ) : (
            <>
              <MarketFilterList />
              <MarketGrid nfts={data} />
              {pagination && <Pagination pagination={pagination} />}
            </>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
