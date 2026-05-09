"use client";

import { useState } from "react";
import {
  Phone,
  Globe,
  Mail,
  MapPin,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { GapScoreBadge } from "./gap-score-badge";

export interface Business {
  id: string;
  name: string;
  phone?: string;
  website?: string;
  email?: string;
  address?: string;
  type: string;
  gapScore: number;
  pitchAngle?: string;
  gaps?: string[];
}

interface BusinessCardProps {
  business: Business;
  onGeneratePitch: (business: Business) => void;
  isGeneratingPitch: boolean;
}

export function BusinessCard({
  business,
  onGeneratePitch,
  isGeneratingPitch,
}: BusinessCardProps) {
  const [copied, setCopied] = useState(false);

  const missingFields = [];
  if (!business.website) missingFields.push("Website");
  if (!business.phone) missingFields.push("Phone");
  if (!business.email) missingFields.push("Email");

  const copyPitch = async () => {
    if (business.pitchAngle) {
      await navigator.clipboard.writeText(business.pitchAngle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between p-4 border-b border-border">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-card-foreground truncate">
              {business.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {business.type}
          </p>
        </div>
        <GapScoreBadge score={business.gapScore} />
      </div>

      <div className="p-4 space-y-3 flex-1">
        <div className="space-y-2">
          <ContactRow
            icon={Phone}
            value={business.phone}
            placeholder="No phone listed"
            isMissing={!business.phone}
          />
          <ContactRow
            icon={Globe}
            value={business.website}
            placeholder="No website"
            isMissing={!business.website}
            isLink
          />
          <ContactRow
            icon={Mail}
            value={business.email}
            placeholder="No email"
            isMissing={!business.email}
          />
          {business.address && (
            <ContactRow
              icon={MapPin}
              value={business.address}
              placeholder=""
              isMissing={false}
            />
          )}
        </div>

        {missingFields.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-sm text-amber-400">
              Missing: {missingFields.join(", ")}
            </span>
          </div>
        )}

        {business.pitchAngle && (
          <div className="relative p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Pitch Angle
              </span>
              <button
                onClick={copyPitch}
                className="ml-auto p-1 rounded hover:bg-primary/20 transition-colors"
                title="Copy pitch"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-primary" />
                )}
              </button>
            </div>
            <p className="text-sm text-card-foreground leading-relaxed">
              {business.pitchAngle}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => onGeneratePitch(business)}
          disabled={isGeneratingPitch || !!business.pitchAngle}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {isGeneratingPitch
              ? "Generating..."
              : business.pitchAngle
              ? "Pitch Generated"
              : "Generate Pitch"}
          </span>
        </button>
      </div>
    </article>
  );
}

function ContactRow({
  icon: Icon,
  value,
  placeholder,
  isMissing,
  isLink,
}: {
  icon: React.ElementType;
  value?: string;
  placeholder: string;
  isMissing: boolean;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon
        className={`w-4 h-4 shrink-0 ${
          isMissing ? "text-red-400" : "text-muted-foreground"
        }`}
      />
      {value ? (
        isLink ? (
          <a
            href={value.startsWith("http") ? value : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline truncate flex items-center gap-1"
          >
            {value}
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-sm text-card-foreground truncate">{value}</span>
        )
      ) : (
        <span className="text-sm text-red-400 italic">{placeholder}</span>
      )}
    </div>
  );
}
