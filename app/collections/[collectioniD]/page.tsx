import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/navbar";
import Button from "@/app/components/ui/button";
import CollectionCard from "@/app/components/ui/CollectionCard";
import { createServerApi } from "@/app/utils/api";
import { Search } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import CollectionList from "./CollectionList";
import { CollectionPayload } from "@/app/types/collection";
import { AxiosError } from "axios";

export default async function CollectionDetail({
  params,
}: {
  params: Promise<{ collectioniD: string }>;
}) {
  const { collectioniD } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverApi = createServerApi(token, refreshToken);

  let data: CollectionPayload | null = null;
  let error = null;

  try {
    const res = await serverApi.get(`/collections/${collectioniD}`);
    data = res.data.data;
  } catch (err) {
    error =
      err instanceof AxiosError
        ? err.response?.data.message
        : "Failed to load NFTs";
  }

  if (!data || error)
    return (
      <main className="py-25">
        <Navbar />
        <div className="container my-25">
          <div className="glass-card p-8 text-center">
            <div className="text-4xl text-light/30 mb-4">
              <Search className="max-w-4xl mx-auto" size={35} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Collection Not Found</h2>
            <p className="text-light/70 mb-6">
              The Collection you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Link href={"/collections"}>
              <Button>Return to Collections</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );

  return (
    <main>
      <Navbar />
      <div className="pt-25">
        <div className="container">
          <div>
            <h1 className="mb-2"> {data?.name}</h1>
            <CollectionCard collection={data} variant="featured" />
          </div>
          <CollectionList data={data.nfts} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
