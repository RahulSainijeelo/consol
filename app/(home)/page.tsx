import { Metadata } from 'next';
import { HeroSection } from "@/components/homepage/HeroSection";
import { UpcomingTrips } from "@/components/homepage/UpcomingTrips";
import { PreviousTrips } from "@/components/homepage/PreviousTrips";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BottomTabBar from "@/components/layout/BottomTabBar";
export const metadata: Metadata = {
  title: "",
  description: "",
  keywords: '',
  openGraph: {
    title: "",
    description: "",
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-black pb-16 md:pb-0">
      <Header />
      <HeroSection />
      <UpcomingTrips />
      <PreviousTrips />
      <Footer />
      <BottomTabBar />
    </main>
  );
}
