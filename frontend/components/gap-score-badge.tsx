import { cn } from "@/lib/utils";

interface GapScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function GapScoreBadge({ score, size = "md" }: GapScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (score >= 40) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "High Gap";
    if (score >= 40) return "Medium";
    return "Low Gap";
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        getScoreColor(score),
        sizeClasses[size]
      )}
    >
      <span>{score}</span>
      <span className="opacity-75">|</span>
      <span className="font-medium">{getScoreLabel(score)}</span>
    </div>
  );
}
