export type UserInput = {
  name: string;
  email: string;
  owner_id: string;
  avatar: string;
  username: string;
  walletBalance: number;
  isVerified: boolean;
  role: string;
  location: string;
  userType: string;
  badges: string[];
  experienceLevel: string;
  availability: string;
  tags: string[];
  tradingStyle: string;
  preferredBlockchain: string;
  nftsOwned: number;
  nftsSold: number;
  followers: number;
  totalVolume: number;
  favoriteCategories: string[];
  socialMedia: { twitter: string; discord: string; instagram: string };
};

export type User = UserInput & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
