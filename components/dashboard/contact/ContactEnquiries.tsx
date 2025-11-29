"use client";

import { useState } from "react";
import { useEnquiries } from "./useEnquiries";
import { EnquiryTable } from "./EnquiryTable";
import { EnquiryDetailsDialog } from "./EnquiryDetailsDialog";
import { Phone, MessageSquare, Mail } from "lucide-react";

export function ContactEnquiries() {
  const { enquiries, loading, updateStatus } = useEnquiries();
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleCall = (mobile: string) => {
    window.location.href = `tel:${mobile}`;
  };

  const handleSMS = (mobile: string) => {
    window.location.href = `sms:${mobile}`;
  };

  const handleEmail = (email: string, name: string) => {
    const subject = `Regarding Your Project Inquiry - ${name}`;
    const body = `Hello ${name},\n\nThank you for your interest in our tech solutions. We'd like to discuss your project requirements in detail.\n\nBest regards,\nTech Solutions Team`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // Updated message for tech services instead of construction
  const handleWhatsApp = (mobile: string, name: string) => {
    const message = `Hello ${name}, this is Tech Solutions Team regarding your enquiry about our digital services. We'd be happy to discuss your project requirements.`;
    window.open(
      `https://wa.me/${mobile}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div
      className="space-y-6"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "var(--font-primary)",
      }}
    >
      {/* Header Section */}
      <div
        className="flex items-center justify-between p-6 rounded-lg border"
        style={{
          backgroundColor: "#f8fafc",
          borderColor: "#e2e8f0",
          borderWidth: "1px",
        }}
      >
        <div>
          <h2
            className="text-2xl font-semibold mb-1"
            style={{
              color: "#000000",
              fontFamily: "var(--font-heading)",
            }}
          >
            Contact Enquiries
          </h2>
          <p className="text-base" style={{ color: "#64748b" }}>
            Manage and respond to client inquiries
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4">
          <div
            className="text-center px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#dbeafe" }}
          >
            <div className="text-lg font-semibold" style={{ color: "#1e40af" }}>
              {enquiries?.length || 0}
            </div>
            <div className="text-xs" style={{ color: "#64748b" }}>
              Total
            </div>
          </div>
          <div
            className="text-center px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#fef3c7" }}
          >
            <div className="text-lg font-semibold" style={{ color: "#d97706" }}>
              {enquiries?.filter((e) => e.status === "pending")?.length || 0}
            </div>
            <div className="text-xs" style={{ color: "#64748b" }}>
              Pending
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="rounded-lg border"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
          borderWidth: "1px",
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#f3f4f6" }}>
          <h3
            className="text-lg font-medium mb-2"
            style={{
              color: "#000000",
              fontFamily: "var(--font-heading)",
            }}
          >
            Recent Enquiries
          </h3>

          {/* Action Legend */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#dcfce7" }}
              >
                <Phone className="h-4 w-4" style={{ color: "#16a34a" }} />
              </div>
              <span style={{ color: "#64748b" }}>Call</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#dbeafe" }}
              >
                <MessageSquare
                  className="h-4 w-4"
                  style={{ color: "#2563eb" }}
                />
              </div>
              <span style={{ color: "#64748b" }}>WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#fef3c7" }}
              >
                <Mail className="h-4 w-4" style={{ color: "#d97706" }} />
              </div>
              <span style={{ color: "#64748b" }}>Email</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <EnquiryTable
            enquiries={enquiries}
            loading={loading}
            onView={(enquiry) => {
              setSelectedEnquiry(enquiry);
              setIsViewOpen(true);
            }}
            onCall={handleCall}
            onWhatsApp={handleWhatsApp}
            onSMS={handleSMS}
            onStatusChange={updateStatus}
          />
        </div>
      </div>

      {/* Enquiry Details Dialog */}
      <EnquiryDetailsDialog
        enquiry={selectedEnquiry}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        onCall={handleCall}
        onWhatsApp={handleWhatsApp}
        onSMS={handleSMS}
      />
    </div>
  );
}
