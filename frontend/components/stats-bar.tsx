import { Users, TrendingUp, Globe, Phone } from "lucide-react";
import type { Business } from "./business-card";

interface StatsBarProps {
  businesses: Business[];
}

export function StatsBar({ businesses }: StatsBarProps) {
  const total = businesses.length;
  const highGap = businesses.filter((b) => b.gapScore >= 70).length;
  const missingWebsite = businesses.filter((b) => !b.website).length;
  const missingPhone = businesses.filter((b) => !b.phone).length;

  const stats = [
    {
      label: "Total Found",
      value: total,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "High Gap Score",
      value: highGap,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      label: "No Website",
      value: missingWebsite,
      icon: Globe,
      color: "text-amber-400",
    },
    {
      label: "No Phone",
      value: missingPhone,
      icon: Phone,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg bg-secondary ${stat.color}`}
          >
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
