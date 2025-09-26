"use client";

import { projectId, networks } from "@/app/config";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "next-reown-appkit",
  description: "next-reown-appkit",
  url: "http://localhost:3000", // ✅ match dev URL
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
export const modal = createAppKit({
  adapters: [],
  projectId,
  networks,
  metadata,
  themeMode: "dark",
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: [],
    email: false,
  },
  themeVariables: {
    "--w3m-accent": "#000000",
  },
});

function ContextProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ContextProvider;
