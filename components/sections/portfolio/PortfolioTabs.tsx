import { cn } from "@/lib/utils";

interface PortfolioTabsProps {
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function PortfolioTabs({
  categories,
  activeTab,
  setActiveTab,
}: PortfolioTabsProps) {
  // Don't render if no categories
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex justify-center mb-12">
      <div
        className="inline-flex rounded-full p-1"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-accent)",
        }}
      >
        <div
          className="flex overflow-x-auto no-scrollbar gap-1"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300",
                "text-sm md:text-base",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                activeTab === category ? "shadow-md" : "hover:shadow-sm"
              )}
              style={{
                backgroundColor:
                  activeTab === category
                    ? "var(--color-accent)"
                    : "transparent",
                color:
                  activeTab === category
                    ? "var(--color-primary-900)"
                    : "var(--color-text-primary)",
                transition: "var(--transition-normal)",
              }}
            >
              {category === "all" ? "All Projects" : category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
