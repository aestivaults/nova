import { ArrowDown, ArrowUp, Receipt, SwatchBookIcon } from "lucide-react";

// Get transaction icon based on type
export const getTransactionIcon = (type: string) => {
  switch (type) {
    case "incoming":
      return <ArrowDown className=" text-green-500" />;
    case "outgoing":
      return <ArrowUp className=" text-red-500" />;
    case "fee":
      return <Receipt className="-yellow-500" />;
    default:
      return <SwatchBookIcon className=" text-primary-500" />;
  }
};

export // Get transaction status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
          Completed
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-400">
          Pending
        </span>
      );
    case "failed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900/30 text-red-400">
          Failed
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-900/30 text-gray-400">
          Unknown
        </span>
      );
  }
};

export const transactions = [
  {
    id: 1,
    type: "incoming",
    amount: 1.25,
    from: "0x1a2b3c4d5e6f7g8h9i0j",
    to: "0x9i8u7y6t5r4e3w2q13443fdffdfdfd",
    hash: "0x7c2bLa9087d3E2F1C3c4D5e6F7g8H9i0J1k2L3m4N5o6P7",
    status: "completed",
    timestamp: "2025-07-05T12:00:00.000Z",
    note: "Payment for Cosmic Drift #42",
  },
  {
    id: 2,
    type: "outgoing",
    amount: 0.5,
    from: "0x9i8u7y6t5r4e3w2q13443fdffdfdfd",
    to: "0x9i8u7y6t5r4e3w2q1",
    hash: "0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T1u2",
    status: "completed",
    timestamp: "2025-07-05T12:00:00.000Z",
    note: "Bid on Neon Genesis #7",
  },
  {
    id: 3,
    type: "incoming",
    amount: 2.8,
    from: "0x2w3e4r5t6y7u8i9o0p",
    to: "0x9i8u7y6t5r4e3w2q13443fdffdfdfd",
    hash: "0x3e4R5t6Y7u8I9o0P1a2S3d4F5g6H7j8K9l0Z1x2C3v",
    status: "completed",
    timestamp: "2025-07-05T12:00:00.000Z",
    note: "Sale of Digital Dreams #18",
  },
  {
    id: 4,
    type: "fee",
    amount: 0.15,
    from: "0x9i8u7y6t5r4e3w2q13443fdffdfdfd",
    to: "0xAureusNova",
    hash: "0x4t5Y6u7I8o9P0a1S2d3F4g5H6j7K8l9Z0x1C2v3B4n",
    status: "completed",
    timestamp: "2025-07-05T12:00:00.000Z",
    note: "Minting fee for Abstract Realm #9",
  },
  {
    id: 5,
    type: "outgoing",
    amount: 0.8,
    from: "0x9i8u7y6t5r4e3w2q13443fdffdfdfd",
    to: "0x5t6y7u8i9o0p1a2s3d4",
    hash: "0x5y6U7i8O9p0A1s2D3f4G5h6J7k8L9z0X1c2V3b4N5m",
    status: "pending",
    timestamp: "2025-07-05T12:00:00.000Z",
    note: "Purchase of Ethereal #28",
  },
];
