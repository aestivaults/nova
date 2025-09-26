"use client";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  type Provider,
} from "@reown/appkit/react-core";
import Button from "../ui/button";
import { Wallet2Icon } from "lucide-react";

export const ActionButtonList = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount(); // AppKit hook to get the address and check if the user is connected
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  // function to sing a msg
  const handleSignMsg = async () => {
    const message = "Hello Reown AppKit!"; // message to sign
    try {
      const result = (await walletProvider.request({
        method: "personal_sign",
        params: [message, address],
      })) as { signature: string };
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "something went wrong";
      console.log("error", errMessage);
      throw new Error(errMessage);
    }
  };

  //   const handleDisconnect = async () => {
  //     try {
  //       await disconnect();
  //     } catch (error) {
  //       console.error("Failed to disconnect:", error);
  //     }
  //   };
  return (
    <div className="flex justify-center items-center">
      {!isConnected ? (
        <Button
          size="small"
          icon={<Wallet2Icon />}
          fullWidth
          onClick={() => open()}
        >
          Connect Wallet
        </Button>
      ) : (
        <appkit-button />
      )}
    </div>
  );
};
