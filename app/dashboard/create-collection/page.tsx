import { verifyJwt } from "@/app/backend/jwt/verifyjwt";
import { retryUploadImage } from "@/app/lib/uploadImages";
import { CollectionInput } from "@/app/types/collection";
import { createServerApi } from "@/app/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateCollection from "./CreateCollection";

export default async function CreateCollectionPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let user_id: string = "";

  if (token) {
    const decoded = verifyJwt(token);
    if (decoded) user_id = decoded._id;
  }

  async function handleSubmit(formdata: FormData) {
    "use server";
    const serverApi = createServerApi(token, refreshToken);

    const logo = formdata.get("logo_image") as File;
    const banner = formdata.get("banner_image") as File;

    if (!logo || !logo.size || !banner || !banner.size) {
      const message = encodeURIComponent(
        "Banner or logo image wasn't selected"
      );
      redirect(
        `/error?message=${message}&redirect=/dashboard/create-collection`
      );
    }

    const [logoRes, bannerRes] = await Promise.allSettled([
      retryUploadImage(logo, "collections"),
      retryUploadImage(banner, "collections"),
    ]);

    if (logoRes.status === "rejected" || bannerRes.status === "rejected") {
      throw new Error("Failed to upload images");
    }

    const userPayload = {
      instagram: formdata.get("instagram") as string,
      twitter: formdata.get("twitter") as string,
      discord: formdata.get("discord") as string,
    };

    const payload: CollectionInput = {
      name: formdata.get("name") as string,
      description: formdata.get("description") as string,
      category: formdata.get("category") as string,
      royalties: Number(formdata.get("royalties")) || 0,
      logo_image: logoRes.value,
      banner_image: bannerRes.value,
      featured: false,
      floor_price: 0,
      owner: user_id,
      creator: user_id,
      total_volume: 0,
      owners: [user_id], // will be filled by backend
      nfts: [],
    };

    const res = await serverApi.post("/collections", payload);
    if (res.data.error) {
      const message = encodeURIComponent(
        "Failed to create collection Please Try again"
      );
      redirect(
        `/error?message=${message}&redirect=/dashboard/create-collection`
      );
    }
    if (res.data.data) {
      const message = encodeURIComponent("Collection Created Successfully!");
      redirect(
        `/success?message=${message}&redirect=/dashboard?tab=collections`
      );
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
              Create Collection
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Launch your own NFT collection and join the future of digital
              ownership
            </p>
          </div>

          <div className="relative">
            <div className="max-w-6xl mx-auto px-3">
              <form action={handleSubmit}>
                <CreateCollection />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
