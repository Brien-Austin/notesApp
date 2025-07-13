import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded px-4 py-2 font-medium transition-colors focus:outline-none",
  {
    variants: {
      color: {
        gray: "bg-gray-200 text-gray-800 hover:bg-gray-100/25 focus:bg-gray-100/25",
        blue: "bg-blue-600 text-white hover:bg-blue-700",
        green: "bg-green-600 text-white hover:bg-green-700",
        red: "bg-red-600 text-white hover:bg-red-700 cursor-pointer",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
      variant: {
        solid: "",
        outline:
          "bg-transparent border-l-2 border-r-2  border-t-2  border-b-4 rounded-lg cursor-pointer",
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
        class: "border-sky-600 text-gray-800 hover:bg-sky-100/25",
      },
      {
        variant: "outline",
        color: "blue",
        class: "border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer",
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
    ],
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "gray" | "blue" | "green" | "red";
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
};

export function Button({
  color,
  size,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ color, size, variant, className })}
      {...props}
    />
  );
}
