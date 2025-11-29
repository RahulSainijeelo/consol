import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Clock } from "lucide-react";

interface Profile {
  phoneNumbers?: string[];
  workingHours?: string;
}

interface ContactInfoProps {
  profile: Profile | null;
  profileLoading: boolean;
}

export function ContactInfo({ profile, profileLoading }: ContactInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          style={{
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Contact Information
        </CardTitle>
        <CardDescription style={{ color: "var(--color-text-secondary)" }}>
          Reach out directly via phone or email for any inquiries
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start">
          <Phone
            className="h-5 w-5 mr-3 mt-0.5 shrink-0"
            style={{ color: "var(--color-accent)" }}
            aria-hidden="true"
          />
          <div>
            <Label
              className="font-medium mb-1 block"
              style={{ color: "var(--color-text-primary)" }}
            >
              Phone Numbers
            </Label>
            {profileLoading ? (
              <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>
            ) : (
              profile?.phoneNumbers?.map((num, i) => (
                <p key={i} style={{ color: "var(--color-text-secondary)" }}>
                  {num}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="flex items-start">
          <Clock
            className="h-5 w-5 mr-3 mt-0.5 shrink-0"
            style={{ color: "var(--color-accent)" }}
            aria-hidden="true"
          />
          <div>
            <Label
              className="font-medium mb-1 block"
              style={{ color: "var(--color-text-primary)" }}
            >
              Working Hours
            </Label>
            <p style={{ color: "var(--color-text-secondary)" }}>
              {profileLoading
                ? "Loading..."
                : profile?.workingHours || "Mon-Sat: 9:00 AM - 6:00 PM"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
