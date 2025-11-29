"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ManageArticles } from "@/components/dashboard/portfolio/ManageArticles";
import { TopLoadingBar } from "@/components/ui/TopLoadingBar";
export default function Dashboard() {
  return (
    <>
      {/* <TopLoadingBar/> */}
      <div
        className="flex min-h-screen flex-col"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "var(--font-primary)",
        }}
      >
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
          <div
            className="flex items-center justify-between pb-4 border-b"
            style={{
              background: "#fff",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
                style={{
                  color: "#000",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Dashboard
              </h1>
              <p className="text-base" style={{ color: "#4b5563" }}>
                Manage your articles
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                style={{
                  background: "#fff",
                  borderColor: "#d1d5db",
                  color: "#111827",
                  fontWeight: 500,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <Link href="/">View Website</Link>
              </Button>
            </div>
          </div>
          {/* review, enquiries tabs */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <Tabs defaultValue="news" className="space-y-6">
              <div className="w-full overflow-x-auto no-scrollbar md:overflow-visible flex justify-center">
                <TabsList
                  className="flex min-w-max md:min-w-0 p-1 rounded-xl shadow-sm"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    WebkitOverflowScrolling: "touch",
                    display:"none"
                  }}
                >

                  <TabsTrigger
                    value="news"
                    className="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200"
                    style={{
                      color: "#4b5563",
                      fontWeight: "500",
                      minWidth: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    // data-active-style={{
                    //   backgroundColor: "#10b981",
                    //   color: "#ffffff",
                    //   boxShadow: "0 2px 4px 0 rgba(16, 185, 129, 0.3)",
                    // }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Article
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* <TabsContent value="enquiries" className="space-y-4">
                <div style={{ color: "#000000" }}>
                  <ContactEnquiries />
                </div>
              </TabsContent> */}
              <TabsContent value="news" className="space-y-4">
                <div style={{ color: "#000000" }}>
                  <ManageArticles />
                </div>
              </TabsContent>
              {/* <TabsContent value="reviews" className="space-y-4">
                <div style={{ color: "#000000" }}>
                  <ManageReviews />
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
