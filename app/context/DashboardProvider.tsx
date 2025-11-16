"use client";
import { createContext, ReactNode, useContext } from "react";
import { Bid } from "../types/bids";
import { NftPayload } from "../types/nftTypes";

interface DashboardContextType {
  Bids: Bid[];
  Nfts: NftPayload[];
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export default function DashboardProvider({
  Bids,
  Nfts,
  children,
}: {
  children: ReactNode;
  Nfts: NftPayload[];
  Bids: Bid[];
}) {
  // Context value
  const value: DashboardContextType = { Bids, Nfts };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook for using the notification context
export function useDashboardProvider() {
  const context = useContext(DashboardContext);
  if (context === null) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
