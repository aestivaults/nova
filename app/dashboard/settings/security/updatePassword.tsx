"use client";
import Button from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useNotifications } from "@/app/context/NotificationProvider";
import { api } from "@/app/utils/api";
import { AxiosError } from "axios";
import { Eye, EyeOff, Key, Lock } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function UpdatePassword() {
  const { toast, addNotification } = useNotifications();
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast("error", "system", "Oops!", "Passwords do not match!", 5000);
      return;
    }

    const { newPassword, currentPassword } = passwordForm;
    try {
      setIsloading(true);
      const res = await api.patch("/users/password", {
        newPassword,
        currentPassword,
      });

      if (res.status !== 200) {
        toast(
          "error",
          "system",
          "Password updated Failed!",
          `${res.data.message}, please try again`,
          5000
        );

        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        return;
      }

      toast(
        "success",
        "system",
        "Success!",
        "Password updated successfully!",
        5000
      );

      addNotification({
        title: "Password update",
        message: "Password updated successfully",
        type: "success",
        action: "system",
        recipient: user?._id || "",
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err);
      toast(
        "error",
        "system",
        "Password updated Failed!",
        `${err instanceof AxiosError ? err.response?.data.message : "something went wrong"},`,
        5000
      );
    } finally {
      setIsloading(false);
    }
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "current") setShowCurrentPassword(!showCurrentPassword);
    if (field === "new") setShowNewPassword(!showNewPassword);
    if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="mb-8 p-4 border border-white/10 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Lock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Change Password</h3>
      </div>
      <form onSubmit={handlePasswordUpdate}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="form-label">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                className="form-input pr-10"
                placeholder="Enter your current password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="form-label">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                className="form-input pr-10"
                placeholder="Enter new password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-white/60 mt-1">
              Must be at least 8 characters, include uppercase, lowercase,
              number, and symbol.
            </p>
          </div>
          <div>
            <label className="form-label">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-input pr-10"
                placeholder="Confirm new password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button isLoading={isloading} variant="primary" type="submit">
            <Key className="w-4 h-4 mr-2" />
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
