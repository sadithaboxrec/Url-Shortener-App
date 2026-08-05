import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-violet-600 text-white shadow-sm shadow-violet-200 hover:bg-violet-700 focus:ring-violet-200",
    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus:ring-slate-200",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex min-h-11 items-center justify-center gap-2
        rounded-xl px-5 py-2.5 text-sm font-semibold
        transition-colors focus:outline-none focus:ring-4
        disabled:cursor-not-allowed disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}
