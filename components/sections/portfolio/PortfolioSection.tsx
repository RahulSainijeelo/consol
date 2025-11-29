"use client";

import { useState } from "react";
import { usePortfolioItems } from "./usePortfolioItems";
import { PortfolioTabs } from "./PortfolioTabs";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { PortfolioItemDialog } from "./PortfolioItemDialog";

interface PortfolioSectionProps {
  profile: any;
  loading: boolean;
}

export function PortfolioSection({ profile, loading }: PortfolioSectionProps) {
  const { portfolioItems, categories } = usePortfolioItems();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Filter items based on active tab
  const filteredItems =
    activeTab === "all"
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category?.toLowerCase() === activeTab
        );

  // Don't show tabs if there are no portfolio items
  const hasPortfolioItems = portfolioItems && portfolioItems.length > 0;

  return (
    <section
      id="portfolio"
      className="py-20"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-primary)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Our Portfolio
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Browse through our completed projects to see the quality of our
            workmanship.
          </p>
        </div>

        {/* Show tabs only if there are portfolio items */}
        {hasPortfolioItems && (
          <PortfolioTabs
            categories={categories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Carousel */}
        <PortfolioCarousel
          items={filteredItems}
          loading={loading}
          onCardClick={(item) => setSelectedItem(item)}
        />
      </div>

      {/* Portfolio Item Detail Dialog */}
      <PortfolioItemDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
      />
    </section>
  );
}
