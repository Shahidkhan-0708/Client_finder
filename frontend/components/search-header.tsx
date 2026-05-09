"use client";

import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";

interface SearchHeaderProps {
  onSearch: (city: string, businessType: string) => void;
  isLoading: boolean;
}

const businessTypes = [
  "restaurant",
  "cafe",
  "hotel",
  "gym",
  "salon",
  "dentist",
  "clinic",
  "pharmacy",
  "bakery",
  "spa",
  "Hospital"
];

export function SearchHeader({ onSearch, isLoading }: SearchHeaderProps) {
  const [city, setCity] = useState("");
  const [businessType, setBusinessType] = useState("restaurant");
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim(), businessType);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xl">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter city or area name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 h-11 px-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          <button
            type="submit"
            disabled={isLoading || !city.trim()}
            className="flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>{isLoading ? "Searching..." : "Search"}</span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {businessTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setBusinessType(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                  businessType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </form>
    </header>
  );
}
