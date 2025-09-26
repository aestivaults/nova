import { createServerApi } from "@/app/utils/api";
import { cookies } from "next/headers";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/navbar";
import Activity from "./Activity";
import Collections from "./collections";
import Details from "./details";
import Profile from "./profile";
import Socials from "./Socials";

async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverApi = createServerApi(token, refreshToken);
  const context = await params;

  const res = await serverApi.get(`/profile/${context.username}`);
  const { user, collections, notifications } = res.data.data;

  return (
    <div className="min-h-screen pt-20 text-white">
      <Navbar />
      <div className="border-b border-white/10 my-6">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-gray-400">
                View all your profile details here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <Profile user={user} />
            <Socials user={user} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Details user={user} />
            <Collections collections={collections} />
            <Activity notifications={notifications} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
