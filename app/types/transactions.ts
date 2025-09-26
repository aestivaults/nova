import { User } from "./user";

export type TransactionInput = {
  type: string;
  status: string;
  user: string;
  note: string;
  amount: number;

  toAddress: string;
  fee?: number;
  network?: string;
  txHash?: string;
};

export type TransactionProps = Omit<TransactionInput, "user"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};
