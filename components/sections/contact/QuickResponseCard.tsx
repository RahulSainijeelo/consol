import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface QuickResponseCardProps {
  phoneNumber?: string;
}

export function QuickResponseCard({
  phoneNumber = "9999999999",
}: QuickResponseCardProps) {
  const handleCall = () => {
    if (phoneNumber) window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          style={{
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Get a Quick Response
        </CardTitle>
        <CardDescription style={{ color: "var(--color-text-secondary)" }}>
          For immediate assistance or a quick quote, contact us directly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleCall}
          style={{
            color: "var(--color-text-primary)",
            borderColor: "var(--color-accent)",
          }}
        >
          <Phone className="h-4 w-4" style={{ color: "var(--color-accent)" }} />
          <span>Call: {phoneNumber}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
