"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "仪表盘", icon: "📊" },
  { href: "/heat-map", label: "资金流", icon: "🌊" },
  { href: "/radar", label: "社交雷达", icon: "📡" },
  { href: "/defi", label: "DeFi", icon: "🔀" },
  { href: "/lab", label: "策略实验室", icon: "🧪" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-primary">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass-elevated flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-cyan flex items-center justify-center text-sm font-bold text-black">
              CF
            </div>
            <span className="font-bold text-white neon-cyan">CryptoFlow AI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status */}
        <div className="p-4 border-t border-white/10">
          <div className="glass rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-xs text-zinc-400">OpenClaw 已连接</span>
            </div>
            <div className="text-xs text-zinc-500">localhost:18789</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
