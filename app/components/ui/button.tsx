import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

interface buttonprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text" | "success" | "danger";
  size?: "medium" | "small" | "large";
  icon?: ReactElement;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  className = "",
  isLoading = false,
  ...props
}: buttonprops) {
  const sizeClasses = {
    small: "text-xs py-1.5 px-3",
    medium: "text-xs md:text-sm py-2 px-4",
    large: "text-base py-3 px-6",
  };

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline:
      "bg-transparent border border-primary-500 text-primary-400 hover:bg-primary-400/10",
    text: "bg-transparent hover:bg-light/5 text-light p-2",
    danger: "bg-red-600 hover:bg-red-700 text-light",
    success: "bg-green-600 hover:bg-green-700 text-light",
    glass:
      "bg-light/10 backdrop-blur-md border border-light/20 text-light hover:bg-light/15",
  };

  return (
    <button
      className={`btn relative overflow-hidden
          ${variantClasses[variant] || variantClasses.primary}
          ${sizeClasses[size] || sizeClasses.medium}
          ${fullWidth ? "w-full" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2 inline-block w-4 h-4 border-2 border-light/20 border-t-light/80 rounded-full animate-spin"></span>
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}

export function IconButton({
  icon,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}: Omit<buttonprops, "iconPostion" | "icon" | "children"> & {
  icon: ReactElement;
}) {
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base",
  };

  return (
    <Button
      variant={variant}
      className={`rounded-full p-0 flex items-center justify-center ${sizeClasses[size]} ${className}`}
      icon={icon}
      {...props}
    >
      {icon}
    </Button>
  );
}
