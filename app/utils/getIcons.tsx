import {
  Bell,
  Gavel,
  Heart,
  PlusCircle,
  ShoppingCart,
  UserPlus,
} from "lucide-react";

export const getActivityIcon = (action: string) => {
  switch (action) {
    case "bid":
      return <Gavel className="text-primary-400" />;
    case "sale":
      return <ShoppingCart className="text-green-500" />;
    case "like":
      return <Heart className="text-red-400" />;
    case "follow":
      return <UserPlus className="text-secondary-400" />;
    case "system":
      return <Bell className="text-yellow-500" />;
    case "mint":
      return <PlusCircle className="text-purple-500" />;
    default:
      return <Bell className="text-gray-400" />;
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
          Approved
        </span>
      );
    case "rejected":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900/30 text-red-400">
          Rejected
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-400">
          Pending
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

export const getColorClasses = (color: string) => {
  const colors = {
    purple:
      "from-primary-500/20 to-pink-500/20 border-primary-500/30 text-primary-400",
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
    pink: "from-pink-500/20 to-primary-500/20 border-pink-500/30 text-pink-400",
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    orange:
      "from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400",
    red: "from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400",
  };
  return colors[color as keyof typeof colors] || colors.purple;
};
