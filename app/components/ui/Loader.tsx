export function Spinner({
  size = "medium", // small, medium, large
  color = "primary", // primary, secondary, white, success, danger
  className = "",
}: {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "white" | "success" | "danger";
  className?: string;
}) {
  // Size classes
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  // Color classes
  const colorClasses = {
    primary: "border-primary-200 border-t-primary-500",
    secondary: "border-secondary-200 border-t-secondary-500",
    white: "border-light/20 border-t-light",
    success: "border-green-200 border-t-green-500",
    danger: "border-red-200 border-t-red-500",
  };

  return (
    <div
      className={`
          inline-block rounded-full
          animate-spin
          ${sizeClasses[size]}
          ${colorClasses[color]}
          ${className}
        `}
    ></div>
  );
}

// Page Loading Animation
export function PageLoader({
  fullScreen = true,
  message = "Loading...",
  showMessage = true,
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        ${
          fullScreen
            ? "fixed inset-0 z-50 bg-darker bg-opacity-80 backdrop-blur-sm"
            : "py-12"
        }
      `}
    >
      <div className="relative">
        <Spinner size="large" />
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-primary-500 scale-150"></div>
      </div>

      {showMessage && (
        <p className="mt-4 text-light/70 font-medium">{message}</p>
      )}
    </div>
  );
}

// Skeleton Loading Components
export function SkeletonItem({
  type = "rect", // rect, circle, text, title
  width,
  height,
  className = "",
}: {
  type?: "rect" | "circle" | "text" | "title";
  width?: string;
  height?: string;
  className?: string;
}) {
  // Base classes for all skeleton types
  const baseClasses = "animate-pulse bg-light/5 rounded";

  // Type-specific classes
  const typeClasses = {
    rect: "rounded",
    circle: "rounded-full",
    text: "h-4 rounded",
    title: "h-6 rounded",
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
      style={{
        width: width || "100%",
        height:
          height ||
          (type === "text" ? "1rem" : type === "title" ? "1.5rem" : "100%"),
      }}
    ></div>
  );
}

// NFT Card Skeleton
export function NFTCardSkeleton({ className = "" }) {
  return (
    <div className={`glass-card overflow-hidden ${className}`}>
      <SkeletonItem type="rect" height="250px" />

      <div className="p-4">
        <SkeletonItem type="title" className="mb-2 w-3/4" />
        <SkeletonItem type="text" className="mb-4 w-1/2" />

        <div className="flex justify-between items-center mb-4">
          <SkeletonItem type="text" width="40%" />
          <SkeletonItem type="text" width="30%" />
        </div>

        <div className="flex space-x-2">
          <SkeletonItem type="rect" height="36px" className="flex-1" />
          <SkeletonItem type="circle" width="36px" height="36px" />
        </div>
      </div>
    </div>
  );
}

// Grid of NFT Card Skeletons
export function NFTGridSkeleton({ count = 8, columns = 4, className = "" }) {
  return (
    <div className="container">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-6 ${className}`}
      >
        {Array.from({ length: count }).map((_, index) => (
          <NFTCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

// Profile Info Skeleton
export function ProfileSkeleton({ className = "" }) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center mb-6">
        <SkeletonItem
          type="circle"
          width="80px"
          height="80px"
          className="mr-4"
        />

        <div className="flex-1">
          <SkeletonItem type="title" className="mb-2" />
          <SkeletonItem type="text" width="60%" className="mb-2" />
          <SkeletonItem type="text" width="40%" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <SkeletonItem type="rect" height="60px" />
        <SkeletonItem type="rect" height="60px" />
        <SkeletonItem type="rect" height="60px" />
      </div>

      <SkeletonItem type="text" className="mb-2" />
      <SkeletonItem type="text" width="90%" className="mb-2" />
      <SkeletonItem type="text" width="80%" />
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = "",
}) {
  return (
    <div className={`glass-card overflow-hidden ${className}`}>
      {showHeader && (
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-light/10">
          {Array.from({ length: columns }).map((_, index) => (
            <SkeletonItem key={`header-${index}`} type="text" width="70%" />
          ))}
        </div>
      )}

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid grid-cols-4 gap-4 p-4 border-b border-light/10 last:border-0"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonItem
              key={`cell-${rowIndex}-${colIndex}`}
              type="text"
              width={`${Math.random() * 50 + 30}%`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
