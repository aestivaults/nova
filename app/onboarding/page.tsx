import { getNfts } from "../lib/getnfts";
import { NftPayload } from "../types/nftTypes";
import ConnectWallet from "./ConnectWallet";
import OnBoardingSlide from "./OnBoardingSlide";
import Profile from "./Profile";
import ThemePage from "./Theme";
import VerifyMail from "./VerifyMail";

export default async function Onboarding({
  searchParams,
}: {
  searchParams: Promise<{ step: string }>;
}) {
  const params = await searchParams;
  const step = params.step || "1";

  let nfts: NftPayload[] = [];
  let error: string | null = null;

  try {
    const { data, error: errMessage } = await getNfts(step);
    if (error) {
      error = errMessage;
    } else {
      nfts = data || [];
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "failed to fetch nfts";
    console.log(err);
  }

  const slidesToShow = nfts.filter((nft) => nft.media_type === "image");

  return (
    <div className="md:h-screen md:grid md:grid-cols-2 w-full">
      <OnBoardingSlide error={error} nfts={slidesToShow} />

      <div className="w-full h-full md:overflow-scroll ">
        <div className="px-2 md:px-8 py-20 flex items-center justify-center flex-col">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary-300 via-white to-secondary-300 bg-clip-text text-transparent animate-fade-in">
              Welcome to <span className="text-white">AureusNova</span>
            </h1>
            <p className="mt-3 text-primary-400 text-md md:text-xl animate-fade-in delay-100">
              Step into the future of NFT trading and digital ownership.
            </p>
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8 animate-fade-in delay-200">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    parseFloat(step) >= s
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 shadow-md scale-110"
                      : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
          {step === "1" && <VerifyMail />}
          {step === "2" && <Profile />}
          {step === "3" && <ThemePage />}
          {step === "4" && <ConnectWallet />}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>Step {step} of 4</span>
              <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-200 to-secondary-300 transition-all duration-700 ease-out"
                  style={{ width: `${(parseInt(step) / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
