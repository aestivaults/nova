"use client";
import Button from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useNotifications } from "@/app/context/NotificationProvider";
import { api } from "@/app/utils/api";
import { AxiosError } from "axios";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function UpdateEmail() {
  const { user } = useAuth();
  const { toast } = useNotifications();

  const [email, setEmail] = useState(user?.email);

  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    verificationCode: "",
  });
  const router = useRouter();

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [sendingCode, setSendingCode] = useState(false);

  const resetMessages = () => {
    setEmailSuccess("");
    setEmailError("");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    resetMessages();
  };

  const handleSendCode = async () => {
    try {
      setSendingCode(true);

      if (!/\S+@\S+\.\S+/.test(emailForm.newEmail)) {
        setEmailError("Please enter a valid email address.");
        return;
      }

      await api.post(`/mail/updateEmail?email=${emailForm.newEmail}`);

      setIsCodeSent(true);
      setEmailSuccess("Verification code sent to your new email.");
    } catch (err) {
      console.log(err);
      setEmailError(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : "something went wrong"
      );
      toast("error", "system", "Error!", "something went wrong", 500);
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setSendingCode(true);
      if (!emailForm.verificationCode) {
        setEmailError("Please enter the verification code.");
        return;
      }

      await api.get(
        `/mail/updateEmail?code=${emailForm.verificationCode}&newEmail=${emailForm.newEmail}`
      );

      setEmailSuccess("Email updated successfully.");
      setIsCodeSent(false);
      setEmail(emailForm.newEmail);
      setEmailForm({ newEmail: "", verificationCode: "" });
      router.refresh();
    } catch (err) {
      console.log(err);
      setEmailError(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : "something went wrong"
      );
      toast(
        "error",
        "system",
        "Error!",
        ` ${
          err instanceof AxiosError
            ? err?.response?.data?.message
            : "something went wrong"
        }`,
        500
      );
    } finally {
      setSendingCode(false);
    }
  };

  return (
    <div className="mb-8 p-4 border border-white/10 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Change Email</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="form-label">Current Email</label>
          <div className="form-input bg-white/5 cursor-not-allowed">
            {email}
          </div>
        </div>
        <div>
          <label htmlFor="newEmail" className="form-label">
            New Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="newEmail"
              className="form-input pl-10"
              placeholder="Enter new email address"
              value={emailForm.newEmail}
              onChange={handleEmailChange}
              disabled={isCodeSent || sendingCode}
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </div>
        {isCodeSent && (
          <div>
            <label className="form-label">Verification Code</label>
            <div className="relative">
              <input
                type="text"
                name="verificationCode"
                className="form-input pl-10"
                placeholder="Enter 6-digit code"
                value={emailForm.verificationCode}
                onChange={handleEmailChange}
                disabled={sendingCode}
                required
              />
              <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            </div>
            <p className="text-xs text-white/60 mt-1">
              Check your new email for the code. Expires in 5 minutes.
            </p>
          </div>
        )}
      </div>
      {emailError && (
        <div className="mt-2 p-2 bg-red/10 rounded flex items-center gap-2 text-red-400">
          <AlertCircle className="w-4 h-4" />
          {emailError}
        </div>
      )}
      {emailSuccess && (
        <div className="mt-2 p-2 bg-green/10 rounded flex items-center gap-2 text-green-400">
          <CheckCircle className="w-4 h-4" />
          {emailSuccess}
        </div>
      )}
      <div className="flex justify-end mt-6 gap-3">
        {!isCodeSent ? (
          <Button
            disabled={sendingCode}
            isLoading={sendingCode}
            variant="outline"
            onClick={handleSendCode}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Code
          </Button>
        ) : (
          <>
            <Button
              disabled={sendingCode}
              variant="secondary"
              onClick={() => {
                setIsCodeSent(false);
                resetMessages();
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={sendingCode}
              isLoading={sendingCode}
              variant="primary"
              onClick={handleVerifyCode}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify & Update
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
