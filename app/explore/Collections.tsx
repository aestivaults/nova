import Button from "@/app/components/ui/button";
import { ArrowRight, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { getCollections } from "../lib/getcollections";
import ExploreCollectionList from "./CollectionList";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/Footer";
import { PageLoader } from "../components/ui/Loader";

export default async function Collections() {
  const { error, collections } = await getCollections("2");

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
    <section className="py-12 bg-gradient-to-b from-dark to-darker">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>

        <ExploreCollectionList collections={collections} />

        <div className="text-center mt-10">
          <Link href="/collections">
            <Button
              variant="outline"
              size="medium"
              icon={<ArrowRight />}
              iconPosition="right"
            >
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
