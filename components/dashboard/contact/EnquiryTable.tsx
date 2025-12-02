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
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
      <div className="rounded-lg border border-white/10 overflow-hidden bg-white/5">
        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300 font-semibold">View</TableHead>
              <TableHead className="text-gray-300 font-semibold">Client Name</TableHead>
              <TableHead className="text-gray-300 font-semibold">Service Type</TableHead>
              <TableHead className="text-gray-300 font-semibold">Date & Time</TableHead>
              <TableHead className="text-gray-300 font-semibold">Status</TableHead>
              <TableHead className="text-right text-gray-300 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-white/10 hover:bg-white/5">
                <TableCell><Skeleton className="h-8 w-8 rounded bg-white/10" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24 bg-white/10" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20 bg-white/10" /></TableCell>
                <TableCell><Skeleton className="h-4 w-28 bg-white/10" /></TableCell>
                <TableCell><Skeleton className="h-6 w-16 rounded-full bg-white/10" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded ml-auto bg-white/10" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!enquiries || enquiries.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 p-12 text-center bg-white/5">
        <div className="text-6xl mb-4 opacity-50">📋</div>
        <h3 className="text-xl font-semibold mb-2 text-white">
          No Enquiries Yet
        </h3>
        <p className="text-gray-400">
          New client enquiries will appear here when they contact you.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden bg-white/5">
      <Table>
        <TableHeader>
          <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
            <TableHead className="font-semibold text-gray-300">View</TableHead>
            <TableHead className="font-semibold text-gray-300">Client Name</TableHead>
            <TableHead className="font-semibold text-gray-300">Service Type</TableHead>
            <TableHead className="font-semibold text-gray-300">Date & Time</TableHead>
            <TableHead className="font-semibold text-gray-300">Status</TableHead>
            <TableHead className="text-right font-semibold text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry) => {
            const statusClasses = getStatusColor(enquiry.status);

            return (
              <TableRow
                key={enquiry.id}
                className="hover:bg-white/5 transition-colors border-white/10"
              >
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(enquiry)}
                    aria-label="View details"
                    className="hover:bg-blue-500/10 text-blue-400 hover:text-blue-300"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium text-white text-sm">
                  {enquiry.name}
                </TableCell>
                <TableCell className="text-gray-300 text-sm">
                  {enquiry.serviceType}
                </TableCell>
                <TableCell className="text-gray-400 text-xs">
                  {formatDate(enquiry.time)}
                </TableCell>
                <TableCell>
                  <Badge className={`font-medium text-xs px-3 py-1 border ${statusClasses}`}>
                    {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-white/10 text-gray-400"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-gray-900 border-white/10 text-white"
                    >
                      <DropdownMenuLabel className="text-gray-400 text-xs font-semibold">
                        Quick Actions
                      </DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView(enquiry)} className="gap-2 focus:bg-white/10 focus:text-white cursor-pointer">
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onCall(enquiry.mobile)} className="gap-2 text-green-400 focus:bg-green-500/10 focus:text-green-300 cursor-pointer">
                        <Phone className="h-4 w-4" />
                        Call Client
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onWhatsApp(enquiry.mobile, enquiry.name)} className="gap-2 text-green-500 focus:bg-green-500/10 focus:text-green-400 cursor-pointer">
                        <MessageSquare className="h-4 w-4" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSMS(enquiry.mobile)} className="gap-2 text-blue-400 focus:bg-blue-500/10 focus:text-blue-300 cursor-pointer">
                        <MessageCircle className="h-4 w-4" />
                        Send SMS
                      </DropdownMenuItem>
                      {onEmail && enquiry.email && (
                        <DropdownMenuItem onClick={() => onEmail(enquiry.email, enquiry.name)} className="gap-2 text-yellow-400 focus:bg-yellow-500/10 focus:text-yellow-300 cursor-pointer">
                          <Mail className="h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator className="bg-white/10" />

                      <DropdownMenuLabel className="text-gray-400 text-xs font-semibold">
                        Update Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onStatusChange(enquiry.id, "new")} className="text-blue-400 focus:bg-blue-500/10 focus:text-blue-300 cursor-pointer">
                        Mark as New
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusChange(enquiry.id, "contacted")} className="text-yellow-400 focus:bg-yellow-500/10 focus:text-yellow-300 cursor-pointer">
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusChange(enquiry.id, "completed")} className="text-green-400 focus:bg-green-500/10 focus:text-green-300 cursor-pointer">
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
