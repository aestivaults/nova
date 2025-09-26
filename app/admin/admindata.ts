// Mock data for platform stats
export const platformStats = {
  totalUsers: 12458,
  totalNFTs: 48721,
  totalCollections: 2145,
  total_volume: 9872.5,
  newUsers: 126,
  newNFTs: 342,
  pendingTransactions: 18,
  reportedItems: 8,
};

// Mock data for reported items
export const reportedItems = [
  {
    id: 1,
    type: "nft",
    title: "Cosmic Drift #42",
    creator: "DigitalDreamer",
    reason: "Copyright Infringement",
    reportedBy: "User123",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: "pending",
  },
  {
    id: 2,
    type: "collection",
    title: "Neon City",
    creator: "NeonArtist",
    reason: "Misleading Description",
    reportedBy: "User456",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "pending",
  },
  {
    id: 3,
    type: "user",
    title: "FakeCreator",
    creator: "FakeCreator",
    reason: "Impersonation",
    reportedBy: "BlockchainArtist",
    timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
    status: "pending",
  },
];
