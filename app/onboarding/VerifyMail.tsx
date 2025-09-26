"use client";
import { AlertCircle, CheckCircle, Mail, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/ui/button";
import { useSetParams } from "../hooks/useSetParams";
import { api } from "../utils/api";

export default function VerifyMail() {
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resent, setResent] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { setParams } = useSetParams();

  const [timeLeft, setTimeLeft] = useState(300);
  useEffect(() => {
    if (!resent || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setResent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, resent]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
    setCodeError("");
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setCodeError("Please enter a valid 6-digit code.");
      return;
    }

    setIsVerifying(true);
    setCodeError("");

    try {
      const res = await api.get(`/mail/verifyMail?code=${verificationCode}`);
      if (res.data.data) {
        setParams({ step: 2 });
      } else {
        setCodeError(
          "Invalid verification code. Please try again or request a new one."
        );
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setCodeError(
        "Verification failed. Please try again or request a new code."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (resent) return;

    setIsResending(true);
    try {
      const res = await api.post(`/mail/verifyMail`);
      if (res.status !== 200) {
        setCodeError("Failed to resend code. Please try again later.");
        return;
      }

      setResent(true); // Hide resend option after successful resend

      setCodeError(""); // Clear any previous errors
      setVerificationCode(""); // Clear the input field
    } catch (error) {
      console.error("Resend failed:", error);
      setCodeError("Failed to resend code. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerifyCode();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Mail className="w-5 h-5 text-primary-400" />
        <h2 className="text-xl font-semibold">Verify Your Email</h2>
      </div>
      <p className="text-primary-200 mb-6 text-center">
        Enter the 6-digit code sent to your email
      </p>
      <div className="mb-4 relative">
        <input
          type="text"
          className="form-input text-center tracking-widest text-2xl font-mono w-full pr-10"
          placeholder="------"
          value={verificationCode}
          onChange={handleCodeChange}
          onKeyDown={handleKeyPress}
          maxLength={6}
          disabled={isVerifying}
        />
        <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400 opacity-50" />
        {isVerifying && (
          <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400 animate-spin" />
        )}
      </div>
      {codeError && (
        <div className="mt-2 flex items-center gap-2 text-red-400 text-sm mb-4">
          <AlertCircle className="w-4 h-4" />
          {codeError}
        </div>
      )}
      <Button
        fullWidth
        onClick={handleVerifyCode}
        disabled={isVerifying || verificationCode.length !== 6}
        className={isVerifying ? "opacity-75 cursor-not-allowed" : ""}
      >
        {isVerifying ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </Button>

      <div className="mt-6 pt-4 border-t border-primary-700">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Button
            variant="outline"
            onClick={handleResendCode}
            disabled={isResending || resent}
            className={`flex items-center gap-2 ${
              isResending
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-700/20"
            }`}
          >
            {isResending ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-3 h-3" />
                Resend Code
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-xs text-primary-300">
          Didn&apos;t receive the code? We can send you a new one.
        </p>
      </div>

      {resent && (
        <div className="flex items-center justify-center gap-2 my-6">
          <div className={`flex items-center gap-2 text-primary-400 text-sm `}>
            <span className="font-mono text-base">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs">until you can resend</span>
          </div>
        </div>
      )}
    </div>
  );
}
