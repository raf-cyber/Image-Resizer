import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
        variant === "primary"
          ? "btn-primary"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
