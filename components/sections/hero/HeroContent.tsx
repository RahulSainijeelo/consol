// HeroContent.tsx
import { Skeleton } from "@/components/ui/skeleton";
import ContactActions from "./ContactActions";
import { Code, Palette, Smartphone, Bot, Globe, Blocks } from "lucide-react";

interface Profile {
  name?: string;
  bio?: string;
  experience?: string;
  phoneNumbers?: string[];
  email?: string;
}

interface HeroContentProps {
  loading: boolean;
  profile: Profile | null;
  onShare: () => void;
}

const services = [
  { icon: Blocks, name: "Blockchain", desc: "Smart Contracts & Web3" },
  { icon: Smartphone, name: "Mobile Apps", desc: "iOS & Android" },
  { icon: Globe, name: "Web Development", desc: "Full-stack Solutions" },
  { icon: Palette, name: "Design", desc: "UI/UX & Branding" },
  { icon: Bot, name: "AI & Chatbots", desc: "Intelligent Automation" },
  { icon: Code, name: "Custom Software", desc: "Tailored Solutions" },
];

export default function HeroContent({
  loading,
  profile,
  onShare,
}: HeroContentProps) {
  return (
    <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col min-h-screen justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "var(--gradient-accent)",
                color: "var(--color-text-primary)",
              }}
            >
              ✨ Your Vision, Our Expertise
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {loading ? (
              <Skeleton className="h-16 w-2/3 mx-auto mb-4" />
            ) : (
              <>
                Premium Freelance
                <br />
                <span style={{ color: "var(--color-accent)" }}>
                  Tech Solutions
                </span>
              </>
            )}
          </h1>

          <p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {loading ? (
              <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            ) : (
              "From blockchain innovation to AI-powered solutions. We transform ideas into digital reality with cutting-edge technology and exceptional design."
            )}
          </p>

          <ContactActions
            phoneNumber={profile?.phoneNumbers?.[0] || ""}
            email={profile?.email || ""}
            profileName={profile?.name || "Tech Solutions Team"}
            onShare={onShare}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="group p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "var(--transition-normal)",
              }}
            >
              <service.icon
                className="h-8 w-8 mx-auto mb-2 transition-colors"
                style={{ color: "var(--color-accent)" }}
              />
              <h3
                className="font-semibold text-sm text-center mb-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                {service.name}
              </h3>
              <p
                className="text-xs text-center"
                style={{ color: "var(--color-text-muted)" }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="backdrop-blur-md rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-xl)",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Header Section */}
            <div
              className="text-center py-12 px-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {loading ? (
                <Skeleton className="h-10 w-64 mx-auto" />
              ) : (
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                    background: "var(--gradient-accent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  About {profile?.name || "Our Team"}
                </h2>
              )}

              {loading ? (
                <Skeleton className="h-6 w-96 mx-auto" />
              ) : (
                <p
                  className="text-xl max-w-3xl mx-auto"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  Crafting digital experiences that drive results
                </p>
              )}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 p-8">
              {/* Left Column - About Text */}
              <div className="lg:col-span-2 space-y-6">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p
                      className="text-lg leading-relaxed"
                      style={{
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.8",
                      }}
                    >
                      {profile?.bio ||
                        "We are a dedicated team of developers, designers, and blockchain specialists committed to delivering exceptional digital solutions. Our expertise spans across modern technologies, from cutting-edge web applications to innovative mobile solutions, ensuring your vision becomes reality."}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      <div
                        className="text-center p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {profile?.experience || "5+"}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Years Experience
                        </div>
                      </div>

                      <div
                        className="text-center p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: "var(--color-accent)" }}
                        >
                          50+
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Projects Completed
                        </div>
                      </div>

                      <div
                        className="text-center p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: "var(--color-accent)" }}
                        >
                          100%
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Client Satisfaction
                        </div>
                      </div>

                      <div
                        className="text-center p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: "var(--color-accent)" }}
                        >
                          24/7
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Support Available
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Why Choose Us */}
              <div className="space-y-6">
                <div
                  className="p-6 rounded-2xl h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(155, 168, 171, 0.1) 0%, rgba(155, 168, 171, 0.05) 100%)",
                    border: "1px solid rgba(155, 168, 171, 0.2)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <div className="text-center mb-6">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        background: "var(--gradient-accent)",
                        color: "var(--color-background)",
                      }}
                    >
                      🚀
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        color: "var(--color-text-primary)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      Why Choose Us?
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: "💬",
                        text: "Direct communication, no middlemen",
                      },
                      { icon: "⚡", text: "Agile development process" },
                      { icon: "🛠️", text: "Post-launch support included" },
                      { icon: "💰", text: "Competitive pricing" },
                      { icon: "🔒", text: "Secure & scalable solutions" },
                      { icon: "📱", text: "Mobile-first approach" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                          style={{
                            background: "rgba(155, 168, 171, 0.2)",
                            color: "var(--color-accent)",
                          }}
                        >
                          {item.icon}
                        </div>
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div
                    className="mt-8 pt-6 border-t border-opacity-20"
                    style={{ borderColor: "var(--color-accent)" }}
                  >
                    <button
                      className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
                      style={{
                        background: "var(--gradient-accent)",
                        color: "var(--color-background)",
                        border: "none",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "0 4px 15px rgba(155, 168, 171, 0.3)",
                      }}
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Let's Work Together
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div
              className="text-center py-8 px-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(155, 168, 171, 0.08) 0%, rgba(155, 168, 171, 0.02) 100%)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <p
                className="text-lg mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Ready to bring your ideas to life?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1"
                  style={{
                    background: "transparent",
                    color: "var(--color-accent)",
                    border: "2px solid var(--color-accent)",
                    borderRadius: "var(--radius-lg)",
                  }}
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Our Work
                </button>
                <button
                  className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1"
                  style={{
                    background: "var(--gradient-accent)",
                    color: "var(--color-background)",
                    border: "none",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "0 4px 15px rgba(155, 168, 171, 0.3)",
                  }}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Start Your Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
