import { CollectionPayload } from "@/app/types/collection";
import { createServerApi } from "@/app/utils/api";
import { cookies } from "next/headers";
import MintForm from "./MintForm";

export default async function CreateNFTPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverapi = createServerApi(token, refreshToken);

  let collections: CollectionPayload[] = [];

  const res = await serverapi.get("/users/collections");
  if (Array.isArray(res.data.data)) collections = res.data.data;

  return (
    <section>
      <div className="pt-10">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
              Create NFT
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create your own NFT and join the future of digital ownership
            </p>
          </div>
        </div>
      </div>
      <div className="glass-card container">
        <MintForm collections={collections} />
      </div>
    </section>
  );
}
