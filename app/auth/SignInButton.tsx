"use client";
import { useSetParams } from "@/app/hooks/useSetParams";
import Button from "@/app/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function SignInButton() {
  const [loading, setLoading] = useState(false);
  const { searchParams } = useSetParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // await signIn("google", { callbackUrl: callbackUrl || "/" }); // "google" is the ID of the provider
    } catch (error) {
      console.error("Sign-in error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant="secondary"
        type="submit"
        size="medium"
        fullWidth
        onClick={handleSignIn}
        disabled={loading}
        className="flex items-center justify-center gap-2"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={24}
          width={24}
        />
        {loading ? "Signing in..." : <span>Continue with Google</span>}
      </Button>
    </div>
  );
}
