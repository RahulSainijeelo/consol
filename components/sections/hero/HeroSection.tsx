// HeroSection.tsx
"use client";
import ShareDialog from "./ShareDialog";
import HeroContent from "./HeroContent";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface Profile {
  name?: string;
  bio?: string;
  experience?: string;
  phoneNumbers?: string[];
  email?: string;
  address?: string;
}

interface HeroSectionProps {
  profile: Profile | null;
  loading: boolean;
}

export function HeroSection({ profile, loading }: HeroSectionProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Share logic
  const handleShare = async () => {
    if (!profile) return;
    const shareData = {
      title: `${
        profile.name || "Tech Solutions Team"
      } - Premium Freelance Services`,
      text:
        profile.bio ||
        "Professional blockchain, web development, mobile apps, and AI solutions",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setIsShareOpen(true);
      }
    } catch (err) {
      toast({
        title: "Could not share content",
        description: "Please try copying the link manually.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Website link has been copied to clipboard",
    });
    setIsShareOpen(false);
  };

  return (
    <section
      className="relative min-h-screen"
      style={{ background: "var(--gradient-primary)" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-accent)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-primary-600)" }}
        />
      </div>

      {/* Main Content */}
      <HeroContent loading={loading} profile={profile} onShare={handleShare} />

      {/* Share dialog for browsers that don't support navigator.share */}
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        profile={profile}
        copyToClipboard={copyToClipboard}
      />
    </section>
  );
}
