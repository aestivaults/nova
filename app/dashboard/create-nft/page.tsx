import { generateNftTokenId } from "@/app/backend/jwt/create_ids";
import { verifyJwt } from "@/app/backend/jwt/verifyjwt";
import { retryUploadImage } from "@/app/lib/uploadImages";
import { CollectionPayload } from "@/app/types/collection";
import { NftInput } from "@/app/types/nftTypes";
import { createServerApi } from "@/app/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MintForm from "./MintForm";

export default async function CreateNFTPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverapi = createServerApi(token, refreshToken);

  let user_id: string = "";

  if (token) {
    const decoded = verifyJwt(token);
    if (decoded) user_id = decoded._id;
  }

  let collections: CollectionPayload[] = [];

  const res = await serverapi.get("/users/collections");
  if (Array.isArray(res.data.data)) collections = res.data.data;

  async function handleMint(formdata: FormData) {
    "use server";
    const serverApi = createServerApi(token, refreshToken);
    const nft = formdata.get("nft_image") as File;
    if (!nft || !nft.size) {
      const message = encodeURIComponent("NFT wasnt selected");
      redirect(`/error?message=${message}&redirect=/dashboard/create-nft`);
    }

    const [nftres] = await Promise.allSettled([retryUploadImage(nft, "nfts")]);

    if (nftres.status === "rejected") {
      const message = encodeURIComponent("Failed to mint nft");
      redirect(`/error?message=${message}&redirect=/dashboard/create-nft`);
    }

    const payload: NftInput = {
      title: formdata.get("name") as string,
      description: formdata.get("description") as string,
      owning_collection: formdata.get("collection") as string,
      creator: user_id,
      owner: user_id,
      token_id: generateNftTokenId(),
      type: formdata.get("auctionEndTime") ? "auction" : "sale",
      price: Number(formdata.get("price")),
      likes_count: 0,
      media_type: "image",
      media_url: nftres.value,
      current_bid: 0,
      metadata: {
        contract: "0x1234567890abcdef1234567890abcdef12345678",
        blockchain: "Ethereum",
        tokenStandard: "ERC-721",
      },
    };
    const auctionEndTime = formdata.get("auctionEndTime") as string;
    if (auctionEndTime) {
      const [year, month, day] = auctionEndTime.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      const isoString = date.toISOString().replace("Z", "+00:00");

      payload.auctionEndTime = isoString;
      payload.current_bid = Number(formdata.get("price"));
    }

    const res = await serverApi.post("/nfts", payload);
    if (res.data.error) {
      const message = encodeURIComponent(
        "Failed to create NFT Please Try again"
      );
      redirect(`/error?message=${message}&redirect=/dashboard/create-nft`);
    }
    if (res.data.data) {
      const message = encodeURIComponent("NFT Created Successfully!");
      redirect(`/success?message=${message}&redirect=/dashboard?tab=owned`);
    }
  }

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
        <form className="p-8" action={handleMint}>
          <MintForm collections={collections} />
        </form>
      </div>
    </section>
  );
}
