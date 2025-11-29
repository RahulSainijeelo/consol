import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/data";
import { CheckCircle } from "lucide-react";

interface ServiceDetailsDialogProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceDetailsDialog({
  service,
  open,
  onOpenChange,
}: ServiceDetailsDialogProps) {
  if (!service) return null;

  const serviceFeatures = [
    "Professional development with attention to detail",
    "Modern technologies and best practices",
    "Free consultation and project estimation",
    "Timely delivery and project completion",
    "Clean, maintainable code structure",
    "Post-launch support and maintenance",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-accent)",
          borderRadius: "var(--radius-xl)",
          fontFamily: "var(--font-primary)",
        }}
      >
        <DialogHeader className="space-y-3">
          <DialogTitle
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: "600",
            }}
          >
            {service.title}
          </DialogTitle>
          <DialogDescription
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="aspect-video relative overflow-hidden rounded-lg mt-4">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h4
              className="font-semibold mb-4 text-lg"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              What We Offer:
            </h4>
            <ul className="space-y-3">
              {serviceFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle
                    className="h-5 w-5 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing or additional info section */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: "var(--color-background-secondary)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <h5
              className="font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              💡 Why Choose Us?
            </h5>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              We combine technical expertise with creative innovation to deliver
              solutions that not only meet your requirements but exceed your
              expectations.
            </p>
          </div>

          <div className="pt-2">
            <Link href="#contact" onClick={() => onOpenChange(false)}>
              <Button
                className="w-full transition-all duration-300 hover:shadow-lg"
                style={{
                  background: "var(--gradient-accent)",
                  color: "var(--color-text-primary)",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
