// ContactActions.tsx
import { Button } from "@/components/ui/button";
import { Share2, Phone, Mail, MessageSquare, Calendar } from "lucide-react";

interface ContactActionsProps {
  phoneNumber: string;
  email: string;
  profileName: string;
  onShare: () => void;
}

export default function ContactActions({
  phoneNumber,
  email,
  profileName,
  onShare,
}: ContactActionsProps) {
  const handleCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleEmail = () => {
    if (email) {
      window.location.href = `mailto:${email}?subject=Project Inquiry&body=Hello ${profileName}, I'm interested in discussing a project with your team.`;
    }
  };

  const handleBookConsultation = () => {
    // You can integrate with Calendly or similar booking system
    window.open("#contact", "_self");
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <Button
        onClick={handleCall}
        size="lg"
        className="gap-2 px-6 py-3"
        style={{
          background: "var(--gradient-accent)",
          color: "var(--color-text-primary)",
          border: "none",
          borderRadius: "var(--radius-lg)",
          transition: "var(--transition-normal)",
        }}
      >
        <Phone className="h-5 w-5" />
        <span>Call Now</span>
      </Button>

      <Button
        onClick={handleEmail}
        variant="secondary"
        size="lg"
        className="gap-2 px-6 py-3"
        style={{
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-accent)",
          borderRadius: "var(--radius-lg)",
          transition: "var(--transition-normal)",
        }}
      >
        <Mail className="h-5 w-5" />
        <span>Email Us</span>
      </Button>

      <Button
        onClick={handleBookConsultation}
        variant="outline"
        size="lg"
        className="gap-2 px-6 py-3"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          color: "var(--color-text-primary)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "var(--radius-lg)",
          transition: "var(--transition-normal)",
        }}
      >
        <Calendar className="h-5 w-5" />
        <span>Book Consultation</span>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="gap-2 px-6 py-3"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          color: "var(--color-text-primary)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "var(--radius-lg)",
          transition: "var(--transition-normal)",
        }}
      >
        <a href="#contact">
          <MessageSquare className="h-5 w-5" />
          <span>Get Quote</span>
        </a>
      </Button>

      <Button
        onClick={onShare}
        variant="ghost"
        size="icon"
        className="p-3"
        style={{
          color: "var(--color-text-primary)",
          borderRadius: "var(--radius-lg)",
          transition: "var(--transition-normal)",
        }}
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
