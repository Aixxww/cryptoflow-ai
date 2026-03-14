"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get theme, default to cool-blue if context not available yet
  let theme = "cool-blue" as "cool-blue" | "dopamine";
  let toggleTheme = () => {};

  try {
    const context = useTheme();
    theme = context.theme;
    toggleTheme = context.toggleTheme;
  } catch {
    // Context not available during SSR, use default
  }

  // During SSR, render a simplified version
  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="relative group"
      >
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-cyan-400" />
          <span className="text-xs">冷蓝</span>
        </div>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative group"
    >
      <div className="flex items-center gap-2">
        {theme === "cool-blue" ? (
          <>
            <Sun className="w-4 h-4 text-cyan-400" />
            <span className="text-xs">冷蓝</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs">多巴胺</span>
          </>
        )}
      </div>
      {/* Color indicator */}
      <div
        className={cn(
          "absolute -right-1 -top-1 w-2 h-2 rounded-full transition-all",
          theme === "cool-blue"
            ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,245,0.8)]"
            : "bg-pink-400 shadow-[0_0_8px_rgba(255,107,157,0.8)]"
        )}
      />
    </Button>
  );
}
