import { cva } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
  {
    variants: {
      color: {
        gray: "bg-gray-200 text-gray-800",
        blue: "bg-blue-200 text-blue-800",
        green: "bg-green-200 text-green-800",
        red: "bg-red-200 text-red-800",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      color: "gray",
      size: "sm",
    },
  }
);

type TagProps = {
  tag: string;
  color?: "gray" | "blue" | "green" | "red";
  size?: "sm" | "md" | "lg";
};

export function Tag({ tag, color, size }: TagProps) {
  return <span className={tagVariants({ color, size })}>{tag}</span>;
}
