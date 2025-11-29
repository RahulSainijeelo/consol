import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Phone,
  MessageSquare,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EnquiryTableProps {
  enquiries: any[];
  loading: boolean;
  onView: (enquiry: any) => void;
  onCall: (mobile: string) => void;
  onWhatsApp: (mobile: string, name: string) => void;
  onSMS: (mobile: string) => void;
  onEmail?: (email: string, name: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function EnquiryTable({
  enquiries,
  loading,
  onView,
  onCall,
  onWhatsApp,
  onSMS,
  onEmail,
  onStatusChange,
}: EnquiryTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return {
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          hoverColor: "#2563eb",
        };
      case "contacted":
        return {
          backgroundColor: "#f59e0b",
          color: "#ffffff",
          hoverColor: "#d97706",
        };
      case "completed":
        return {
          backgroundColor: "#10b981",
          color: "#ffffff",
          hoverColor: "#059669",
        };
      default:
        return {
          backgroundColor: "#6b7280",
          color: "#ffffff",
          hoverColor: "#4b5563",
        };
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";
    return (
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (loading) {
    return (
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#f8fafc" }}>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                View
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Client Name
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Service Type
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Date & Time
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Status
              </TableHead>
              <TableHead
                className="text-right"
                style={{ color: "#374151", fontWeight: "600" }}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} style={{ borderColor: "#f3f4f6" }}>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 rounded ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!enquiries || enquiries.length === 0) {
    return (
      <div
        className="rounded-lg border p-12 text-center"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <div className="text-6xl mb-4 opacity-50">📋</div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "#000000" }}>
          No Enquiries Yet
        </h3>
        <p style={{ color: "#6b7280" }}>
          New client enquiries will appear here when they contact you.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
      }}
    >
      <Table>
        <TableHeader>
          <TableRow
            style={{
              backgroundColor: "#f8fafc",
              borderColor: "#e5e7eb",
            }}
          >
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              View
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Client Name
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Service Type
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Date & Time
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Status
            </TableHead>
            <TableHead
              className="text-right font-semibold"
              style={{ color: "#374151" }}
            >
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry, index) => {
            const statusColors = getStatusColor(enquiry.status);

            return (
              <TableRow
                key={enquiry.id}
                className="hover:bg-gray-50 transition-colors"
                style={{
                  borderColor: "#f3f4f6",
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
                }}
              >
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(enquiry)}
                    aria-label="View details"
                    className="hover:bg-blue-50"
                    style={{
                      color: "#3b82f6",
                      borderRadius: "6px",
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell
                  className="font-medium"
                  style={{
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  {enquiry.name}
                </TableCell>
                <TableCell
                  style={{
                    color: "#4b5563",
                    fontSize: "14px",
                  }}
                >
                  {enquiry.serviceType}
                </TableCell>
                <TableCell
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                  }}
                >
                  {formatDate(enquiry.time)}
                </TableCell>
                <TableCell>
                  <Badge
                    className="font-medium text-xs px-3 py-1"
                    style={{
                      backgroundColor: statusColors.backgroundColor,
                      color: statusColors.color,
                      border: "none",
                      borderRadius: "20px",
                    }}
                  >
                    {enquiry.status.charAt(0).toUpperCase() +
                      enquiry.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        style={{ color: "#6b7280" }}
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <DropdownMenuLabel
                        style={{
                          color: "#374151",
                          fontWeight: "600",
                          fontSize: "12px",
                        }}
                      >
                        Quick Actions
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => onView(enquiry)}
                        className="gap-2"
                        style={{ color: "#374151" }}
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onCall(enquiry.mobile)}
                        className="gap-2"
                        style={{ color: "#059669" }}
                      >
                        <Phone className="h-4 w-4" />
                        Call Client
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onWhatsApp(enquiry.mobile, enquiry.name)}
                        className="gap-2"
                        style={{ color: "#25d366" }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSMS(enquiry.mobile)}
                        className="gap-2"
                        style={{ color: "#3b82f6" }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Send SMS
                      </DropdownMenuItem>
                      {onEmail && enquiry.email && (
                        <DropdownMenuItem
                          onClick={() => onEmail(enquiry.email, enquiry.name)}
                          className="gap-2"
                          style={{ color: "#d97706" }}
                        >
                          <Mail className="h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator
                        style={{ backgroundColor: "#f3f4f6" }}
                      />

                      <DropdownMenuLabel
                        style={{
                          color: "#374151",
                          fontWeight: "600",
                          fontSize: "12px",
                        }}
                      >
                        Update Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(enquiry.id, "new")}
                        style={{ color: "#3b82f6" }}
                      >
                        Mark as New
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(enquiry.id, "contacted")}
                        style={{ color: "#f59e0b" }}
                      >
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(enquiry.id, "completed")}
                        style={{ color: "#10b981" }}
                      >
                        Mark as Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
