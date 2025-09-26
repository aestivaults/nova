import { Camera } from "lucide-react";
import Image from "next/image";
import { UserProfile } from "../profilesettings";
import { ChangeEvent, useRef } from "react";
import Button from "@/app/components/ui/button";

export default function ProfileImage({
  profileForm,
  setProfileForm,
  setProfileImg,
}: {
  profileForm: UserProfile;
  setProfileImg: React.Dispatch<React.SetStateAction<File | null>>;
  setProfileForm: React.Dispatch<React.SetStateAction<UserProfile>>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfileImg(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileForm((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-8 p-4 border border-white/10 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Camera className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Profile Photo</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20">
            <Image
              src={profileForm.avatar}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="text-center md:text-left">
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <Button
            variant="outline"
            size="small"
            type="button"
            onClick={handleClick}
            className="px-4 py-2"
          >
            <Camera className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
          <p className="text-xs text-white/60 mt-2">
            PNG, JPG or GIF • Max 2MB • 200x200px recommended
          </p>
        </div>
      </div>
    </div>
  );
}
