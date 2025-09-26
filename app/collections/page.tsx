import { TriangleAlert } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import CollectionCard from "../components/ui/CollectionCard";
import { PageLoader } from "../components/ui/Loader";
import { getCollections } from "../lib/getcollections";
import CollectionGrid from "./CollectionGrid";
import FilterCollection from "./FilterCollection";
import Hero from "./Hero";
import Pagination from "../components/ui/Pagination";

export default async function Collections({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const value = await searchParams;
  const page = value.page || "1";
  const { error, collections, pagination } = await getCollections(page);

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="min-h-screen grid items-center">
          <div className="container flex-col flex items-center justify-center h-[400px] glass-card py-24">
            <TriangleAlert
              className="max-w-4xl mx-auto text-red-500"
              size={35}
            />
            <p className="text-red-500">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!collections) {
    return <PageLoader />;
  }

  return (
    <div>
      <Navbar />
      <div className="py-24">
        <div className="container">
          <Hero />
          {collections.length > 0 && (
            <CollectionCard
              variant="featured"
              collection={
                collections[Math.floor(Math.random() * collections.length)]
              }
            />
          )}
          <FilterCollection />
          <CollectionGrid collections={collections} />
          {pagination && pagination?.page > 1 && (
            <Pagination pagination={pagination} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
