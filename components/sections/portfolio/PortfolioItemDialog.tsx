import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PortfolioItemDialogProps {
  item: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PortfolioItemDialog({
  item,
  open,
  onOpenChange,
}: PortfolioItemDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  const navigateGalleryImage = (direction: "next" | "prev") => {
    let newIndex =
      direction === "next" ? currentImageIndex + 1 : currentImageIndex - 1;

    if (newIndex < 0) newIndex = item.images.length - 1;
    if (newIndex >= item.images.length) newIndex = 0;

    setCurrentImageIndex(newIndex);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto",
          "mobile-portfolio-modal"
        )}
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-accent)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-video mt-4 overflow-hidden rounded-lg">
          <Image
            src={item.images?.[currentImageIndex] || "/placeholder-image.jpg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            className="object-cover"
          />
          {item.images && item.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  border: "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGalleryImage("prev");
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  border: "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGalleryImage("next");
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image counter */}
          {item.images && item.images.length > 1 && (
            <div
              className="absolute bottom-2 right-2 px-2 py-1 rounded-full text-sm"
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
              }}
            >
              {currentImageIndex + 1} / {item.images.length}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3
              className="font-semibold text-xl mb-2"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {item.title}
            </h3>
            <div
              className="inline-block px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-primary-900)",
              }}
            >
              {item.category}
            </div>
          </div>

          {item.description && (
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item.description}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
