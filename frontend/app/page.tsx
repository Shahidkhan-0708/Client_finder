"use client";

import { useState, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SearchHeader } from "@/components/search-header";
import { BusinessCard, type Business } from "@/components/business-card";
import { StatsBar } from "@/components/stats-bar";
import { EmptyState } from "@/components/empty-state";
import { AlertCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("search");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const calculateGapScore = (business: Partial<Business>): number => {
    let score = 0;
    if (!business.website) score += 40;
    if (!business.phone) score += 30;
    if (!business.email) score += 30;
    return score;
  };

  const handleSearch = useCallback(async (city: string, businessType: string) => {
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await fetch(
        `${API_BASE}/search?city=${encodeURIComponent(city)}&type=${encodeURIComponent(businessType)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch businesses");
      }

      const data = await response.json();

      const mappedBusinesses: Business[] = (data.businesses || data || []).map(
        (b: Record<string, unknown>, index: number) => ({
          id: String(b.id || `${index}-${Date.now()}`),
          name: String(b.name || "Unnamed Business"),
          phone: b.phone ? String(b.phone) : undefined,
          website: b.website ? String(b.website) : undefined,
          email: b.email ? String(b.email) : undefined,
          address: b.address ? String(b.address) : undefined,
          type: businessType,
          gapScore: calculateGapScore({
            phone: b.phone ? String(b.phone) : undefined,
            website: b.website ? String(b.website) : undefined,
            email: b.email ? String(b.email) : undefined,
          }),
        })
      );

      setBusinesses(mappedBusinesses);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to search. Make sure your backend is running at localhost:5000"
      );
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGeneratePitch = useCallback(async (business: Business) => {
    setIsGeneratingPitch(business.id);

    try {
      const response = await fetch(`${API_BASE}/analyze/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: business.name,
            phone: business.phone,
            website: business.website,
            email: business.email,
            address: business.address,
            type: business.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate pitch");
      }

      const data = await response.json();

      setBusinesses((prev) =>
        prev.map((b) =>
          b.id === business.id
            ? {
                ...b,
                pitchAngle: data.pitchAngle || data.pitch || data.analysis?.pitch || "Contact them about improving their online presence.",
                gaps: data.gaps || [],
              }
            : b
        )
      );
    } catch (err) {
      console.error("Failed to generate pitch:", err);
    } finally {
      setIsGeneratingPitch(null);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <SearchHeader onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="mx-4 mt-4 flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {businesses.length > 0 && <StatsBar businesses={businesses} />}

        <div className="flex-1 overflow-auto p-4">
          {!searchPerformed ? (
            <EmptyState />
          ) : isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-muted-foreground">Searching businesses...</p>
              </div>
            </div>
          ) : businesses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-muted-foreground">
                No businesses found. Try a different city or business type.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {businesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onGeneratePitch={handleGeneratePitch}
                  isGeneratingPitch={isGeneratingPitch === business.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
