import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "danger" | "neon";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            // Variants
            "default": "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700",
            "primary": "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,255,245,0.3)]",
            "secondary": "bg-purple-500 text-white hover:bg-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]",
            "ghost": "bg-transparent text-zinc-300 hover:bg-zinc-800/50 hover:text-white",
            "danger": "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_0_15px_rgba(255,0,68,0.3)]",
            "neon": "bg-transparent text-cyan-400 border border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,245,0.4)]",
          }[variant],
          {
            // Sizes
            "sm": "px-3 py-1.5 text-sm",
            "md": "px-4 py-2 text-sm",
            "lg": "px-6 py-3 text-base",
          }[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
