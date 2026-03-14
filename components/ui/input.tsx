import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  glass?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, glass = true, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg px-3 py-2 text-sm",
          "placeholder:text-zinc-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          glass && "glass bg-glass border-zinc-700",
          !glass && "bg-zinc-900/50 border-zinc-700 border",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
