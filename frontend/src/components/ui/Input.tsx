import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        id={id}
        className={`
          min-h-12 w-full rounded-xl border bg-white px-4 py-3
          text-slate-950 outline-none transition
          placeholder:text-slate-400
          focus:border-violet-500 focus:ring-4 focus:ring-violet-100
          disabled:cursor-not-allowed disabled:bg-slate-100
          ${error ? "border-red-500" : "border-slate-300"}
          ${className}
        `}
      />

      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
