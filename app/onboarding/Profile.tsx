"use client";
import Button from "@/app/components/ui/button";
import { RefreshCw, Users } from "lucide-react";
import { useState } from "react";
import { useSetParams } from "../hooks/useSetParams";
import { api } from "../utils/api";
import { useNotifications } from "../context/NotificationProvider";

export default function Profile() {
  const { setParams } = useSetParams();
  const { toast } = useNotifications();
  const [isLoading, setIsloading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    userType: "",
    tradingStyle: "",
    preferredBlockchain: "",
    experienceLevel: "",
    availability: "",
  });

  const handleProfileSubmit = async () => {
    try {
      setIsloading(true);
      const res = await api.post("/users/onboarding", profileForm);
      if (res.status === 200) {
        toast("success", "system", "Success!", "profile updated", 5000);
        setParams({ step: 3 });
      } else {
        toast(
          "error",
          "system",
          "Error!",
          "something went wrong please try again ",
          5000
        );
        return;
      }
    } catch (error) {
      toast(
        "error",
        "system",
        "Error!",
        `something went wrong please try again ${error instanceof Error ? error.message : ""}`,
        5000
      );
    }
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="animate-fade-in">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Users className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-semibold">Set Up Your Profile</h2>
      </div>
      <p className="text-indigo-200 mb-6 text-center">
        Tell us what you&apos;re looking for in the NFT world!
      </p>
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          <div>
            <label className="form-label">User Type</label>
            <select
              name="userType"
              required
              className="form-select"
              value={profileForm.userType}
              onChange={handleProfileChange}
            >
              <option value="">Select type</option>
              <option value="Collector">Collector - Hunt rare NFTs</option>
              <option value="Trader">Trader - Flip for profits</option>
              <option value="Artist">Artist - Create & Sell</option>
              <option value="Investor">Investor - Long-term holds</option>
            </select>
          </div>
          <div>
            <label className="form-label">Trading Style</label>
            <input
              type="text"
              name="tradingStyle"
              required
              className="form-input"
              placeholder="e.g., Day trader, HODLer"
              value={profileForm.tradingStyle}
              onChange={handleProfileChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          <div>
            <label className="form-label">Preferred Blockchain</label>
            <select
              name="preferredBlockchain"
              className="form-select"
              required
              value={profileForm.preferredBlockchain}
              onChange={handleProfileChange}
            >
              <option value="">Select blockchain</option>
              <option value="Ethereum">Ethereum - Classic powerhouse</option>
              <option value="Solana">Solana - Speed demon</option>
              <option value="Polygon">Polygon - Scalable layer</option>
              <option value="Bitcoin">Bitcoin - Ordinals revolution</option>
            </select>
          </div>
          <div>
            <label className="form-label">Experience Level</label>
            <select
              name="experienceLevel"
              className="form-select"
              required
              value={profileForm.experienceLevel}
              onChange={handleProfileChange}
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner - Just starting out</option>
              <option value="Intermediate">
                Intermediate - Some trades under belt
              </option>
              <option value="Expert">Expert - Seasoned crypto vet</option>
            </select>
          </div>
        </div>
        <div>
          <label className="form-label">Availability</label>
          <input
            type="text"
            required
            name="availability"
            className="form-input"
            placeholder="e.g., Weekends, Full-time"
            value={profileForm.availability}
            onChange={handleProfileChange}
          />
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={handleProfileSubmit}
          disabled={isLoading}
          className={isLoading ? "opacity-75 cursor-not-allowed" : "mt-4"}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              uploading...
            </>
          ) : (
            "Next: Select Theme"
          )}
        </Button>
      </form>
    </div>
  );
}
