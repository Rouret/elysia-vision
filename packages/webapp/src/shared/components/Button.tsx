import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  onClick: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  LeftIcon?: LucideIcon;
  RightIcon?: LucideIcon;
};

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
};

const sizeClasses = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

export const Button = ({
  label,
  onClick,
  variant = "primary",
  size = "md",
  LeftIcon,
  RightIcon,
}: Props) => {
  return (
    <button
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {LeftIcon && <LeftIcon className="w-4 h-4" />}
      {label}
      {RightIcon && <RightIcon className="w-4 h-4" />}
    </button>
  );
};
