"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Activity,
  Waves,
  Layers,
  FlaskConical,
  Settings,
  BookOpen,
  Bot,
  Palette,
  Home,
  FileText,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { icon: Home, label: "首页", path: "/" },
  { icon: Activity, label: "仪表盘", path: "/dashboard" },
  { icon: FileText, label: "预警研报", path: "/report" },
  { icon: Waves, label: "资金流", path: "/heat-map" },
  { icon: Layers, label: "社交雷达", path: "/radar" },
  { icon: Layers, label: "DeFi", path: "/defi" },
  { icon: FlaskConical, label: "策略实验室", path: "/lab" },
  { icon: BookOpen, label: "文档", path: "/docs" },
  { icon: Settings, label: "设置", path: "/settings" },
];

interface AppNavProps {
  variant?: "sidebar" | "top" | "bottom";
  orientation?: "horizontal" | "vertical";
}

export function AppNav({ variant = "top", orientation = "horizontal" }: AppNavProps) {
  const pathname = usePathname();

  if (variant === "sidebar") {
    return (
      <nav className={cn(
        "w-56 border-r border-white/10 bg-zinc-900/50 p-4 space-y-1",
        orientation === "vertical"
      )}>
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-cyan flex items-center justify-center text-sm font-bold text-black">
              龙
            </div>
            <div>
              <div className="text-sm font-bold text-white neon-cyan">币安AI龙爪手</div>
              <div className="text-xs text-zinc-500">OpenClaw AI</div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 px-2 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">主题</span>
            <div className="flex-1 ml-3">
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (variant === "bottom") {
    return (
      <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-zinc-900/95 backdrop-blur-lg md:hidden z-50">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all",
                  isActive ? "text-cyan-400" : "text-zinc-400"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
          <div className="flex flex-col items-center gap-1 px-3 py-1">
            <ThemeToggle />
            <span className="text-xs text-zinc-500">主题</span>
          </div>
        </div>
      </nav>
    );
  }

  // Top navigation (default)
  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all",
              isActive
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
