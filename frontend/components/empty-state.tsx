import { Search, Zap } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2 text-balance text-center">
        Find Your Next Clients
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-6 text-pretty">
        Search for businesses in any city to discover leads with digital gaps.
        Generate AI-powered pitch angles to close more deals.
      </p>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>Enter a city name above</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>Select a business type filter</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>Click Search to find leads</span>
        </div>
      </div>
    </div>
  );
}
