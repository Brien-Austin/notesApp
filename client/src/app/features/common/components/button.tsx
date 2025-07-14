import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded px-4 py-2 font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      color: {
        gray: "bg-gray-200 text-gray-800 hover:bg-gray-100/25 focus:bg-gray-100/25",
        indigo: "bg-indigo-600 text-white hover:bg-indigo-700",
        green: "bg-green-600 text-white hover:bg-green-700",
        red: "bg-red-600 text-white hover:bg-red-700",
        primary:
          "bg-indigo-600 text-white border-2 border-indigo-600 hover:bg-indigo-700",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
      variant: {
        solid: "",
        outline:
          "bg-transparent border-l-2 border-r-2 border-t-2 border-b-4 rounded-lg",
        primary: "",
      },
    },
    defaultVariants: {
      color: "gray",
      size: "md",
      variant: "solid",
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "gray",
        class: "border-indigo-600 text-gray-800 hover:bg-indigo-100/25",
      },
      {
        variant: "outline",
        color: "indigo",
        class: "border-indigo-600 text-indigo-600 hover:bg-indigo-50",
      },
      {
        variant: "outline",
        color: "green",
        class: "border-green-600 text-green-600 hover:bg-green-50",
      },
      {
        variant: "outline",
        color: "red",
        class: "border-red-600 text-red-600 hover:bg-red-50",
      },
      {
        variant: "primary",
        color: "primary",
        class: "border-2 border-indigo-600",
      },
    ],
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "gray" | "indigo" | "green" | "red" | "primary";
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "primary";
  loading?: boolean;
  loadingText?: string;
};

export function Button({
  color,
  size,
  variant,
  className = "",
  loading = false,
  loadingText,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = buttonVariants({ color, size, variant });
  return (
    <button
      className={`${baseClasses} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-current"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText || "Loading..."}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
