import { Metadata } from "next";
import { DashboardClientWrapper } from "./DashboardClientWrapper";

export const metadata: Metadata = {
  title: "Dashboard - Kuruksetra",
  description: "dashboard for managing Kuruksetra services and content",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientWrapper>{children}</DashboardClientWrapper>;
}
