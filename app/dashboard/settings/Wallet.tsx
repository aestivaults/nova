import Button from "@/app/components/ui/button";
import { truncateAddress } from "@/app/utils/formatters";
import {
  Provider,
  useAppKit,
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
  useAppKitState,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit/react";
import { BrowserProvider, formatEther } from "ethers";
import { WalletCards } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Wallet() {
  const { open } = useAppKit();
  const state = useAppKitState();
  const [balance, setbalance] = useState(0);
  const walletInfo = useWalletInfo();
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetworkCore();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleGetBalance = async () => {
      if (!isConnected || !address) return;
      const provider = new BrowserProvider(walletProvider, chainId);
      const balance = await provider.getBalance(address);
      const eth = formatEther(balance);
      setbalance(Number(eth));
    };

    handleGetBalance();
  }, [walletProvider, chainId, address, isConnected]);

  const { disconnect } = useDisconnect();

  async function handleDisconnect() {
    try {
      setIsLoading(true);
      await disconnect();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-6">Connected Wallet Settings</h2>
      <div className="glass-card p-4 mb-6 border border-white/10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium mb-1">{"Connected Wallet"}</h3>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center mr-2">
                <WalletCards className="text-primary-400" />
              </div>
              {isConnected ? (
                <span className="font-mono text-sm">{address}</span>
              ) : (
                <>
                  <span className="font-mono text-sm">No connected wallet</span>
                </>
              )}
            </div>
          </div>
          {isConnected ? (
            <Button
              isLoading={isLoading}
              onClick={handleDisconnect}
              variant="outline"
              size="small"
            >
              Disconnect
            </Button>
          ) : (
            <Button onClick={() => open()}>Connect Wallet</Button>
          )}
        </div>
      </div>
      {isConnected && address && (
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Wallet Balance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 relative rounded-full bg-primary-900 flex items-center justify-center mr-2">
                    <Image
                      fill
                      src="/eth.png"
                      alt="ETH"
                      className="object-cover"
                    />{" "}
                  </div>
                  <span>Ethereum</span>
                </div>
                <div className="text-2xl font-bold">{balance} ETH</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/10 rounded-lg flex flex-col justify-center text-sm">
              <span className="text-white/70 mb-1">Address:</span>
              <p className="font-mono truncate" title={address}>
                {truncateAddress(address)}
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-lg flex flex-col justify-center text-sm">
              <span className="text-white/70 mb-1">CAIP Address:</span>
              <p className="break-all">{caipAddress}</p>
            </div>

            <div className="p-4 bg-white/10 rounded-lg flex flex-col justify-center text-sm">
              <span className="text-white/70 mb-1">Active Chain:</span>
              <p>{state.activeChain}</p>
            </div>

            <div className="p-4 bg-white/10 rounded-lg flex flex-col justify-center text-sm">
              <span className="text-white/70 mb-1">Wallet:</span>
              <p>{walletInfo.walletInfo?.name?.toString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
