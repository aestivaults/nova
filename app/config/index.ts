import { sepolia, mainnet } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = "b24b52b16f02d47d4dfb348816b9849e"; // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [sepolia, mainnet] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];
