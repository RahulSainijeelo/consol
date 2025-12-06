import { Metadata } from "next";
import { DashboardClientWrapper } from "./DashboardClientWrapper";

export const metadata: Metadata = {
  title: "Dashboard - Con-Soul",
  description: "dashboard for managing Con-Soul services and content",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientWrapper>{children}</DashboardClientWrapper>;
}
