import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

export function EnquiryDetailsDialog({
  enquiry,
  open,
  onOpenChange,
  onCall,
  onWhatsApp,
  onSMS,
}: {
  enquiry: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCall: (mobile: string) => void;
  onWhatsApp: (mobile: string, name: string) => void;
  onSMS: (mobile: string) => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500 hover:bg-blue-600";
      case "contacted":
        return "bg-amber-500 hover:bg-amber-600";
      case "completed":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (!enquiry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md responsive-portfolio-modal">
        <DialogHeader>
          <DialogTitle>Enquiry Details</DialogTitle>
          <DialogDescription>
            Received on {formatDate(enquiry.time)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold">Customer Information</h3>
            <p className="mt-1">Name: {enquiry.name}</p>
            <p>Mobile: {enquiry.mobile}</p>
          </div>
          <div>
            <h3 className="font-semibold">Service Required</h3>
            <p className="mt-1">{enquiry.serviceType}</p>
          </div>
          <div>
            <h3 className="font-semibold">Message</h3>
            <p className="mt-1 text-gray-700">{enquiry.message}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <Badge className={`mt-1 ${getStatusColor(enquiry.status)}`}>
              {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
            </Badge>
          </div>
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onCall(enquiry.mobile)}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onWhatsApp(enquiry.mobile, enquiry.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onSMS(enquiry.mobile)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              SMS
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
