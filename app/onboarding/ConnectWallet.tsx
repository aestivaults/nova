"use client";
import Button from "@/app/components/ui/button";
import { LucideSkipForward, SkipForward, Wallet } from "lucide-react";
import Image from "next/image";
import { useSetParams } from "../hooks/useSetParams";
import { useAppKit } from "@reown/appkit/react";
export default function ConnectWallet() {
  const { navigate } = useSetParams();
  const { open } = useAppKit();
  return (
    <div className="animate-fade-in text-center">
      <div className="flex items-center gap-3 mb-4 justify-center">
        <Wallet className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
      </div>
      <p className="text-indigo-200 mb-6">
        Link your crypto wallet to start trading NFTs securely.
      </p>
      <div className="mb-6">
        <Image
          src="/wallet.png" // Your wallet graphic
          alt="Connect Wallet"
          width={200}
          height={200}
          className="mx-auto animate-bounce-slow"
        />
      </div>
      <Button fullWidth variant="primary" onClick={() => open()}>
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
      <p className="text-xs text-indigo-300 mt-4">
        We support MetaMask, WalletConnect, and more.
      </p>
      <Button
        fullWidth
        className="mt-6"
        icon={<LucideSkipForward />}
        variant="secondary"
        onClick={() => navigate("/dashboard")}
      >
        Skip
      </Button>
    </div>
  );
}
