"use client";
import { ArrowRight, Zap } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import { policySections } from "../data/data";

// Define type for Policy Section
export interface PolicySection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "primary" | "secondary";
  content: string;
}

export default function CookiePolicy() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-20 md:pt-0">
      <Navbar />

      <main className="container mx-auto">
        <div className="px-4 py-8 sm:py-12 lg:py-16 relative z-10">
          <section className="text-center mb-6 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm text-purple-300 text-xs font-mono font-semibold mb-6 sm:mb-8 tracking-wider">
              <Zap className="w-3 h-3" />
              AUREUSNOVA Policy v2.0
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Cookie Policy
              <span className="block text-2xl sm:text-3xl md:text-4xl font-mono text-white/80">
                Privacy Entanglement
              </span>
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed text-gray-300 font-light">
              Safeguarding your digital essence in the Web3 cosmos.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {" "}
                Zero-Knowledge Compliant.
              </span>
            </p>
          </section>

          {/* Policy Sections - Always Visible */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {policySections.map((section: PolicySection) => (
              <div
                key={section.id}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    section.color === "primary"
                      ? "from-purple-500/5 via-pink-500/5 to-cyan-500/5"
                      : "from-cyan-500/5 via-blue-500/5 to-purple-500/5"
                  } rounded-3xl blur-xl -z-10 transition-all duration-700 group-hover:opacity-100 opacity-50`}
                ></div>
                <div
                  className={`relative p-1 rounded-3xl bg-gradient-to-r ${
                    section.color === "primary"
                      ? "from-purple-500/20 to-pink-500/20"
                      : "from-cyan-500/20 to-blue-500/20"
                  } border border-purple-500/30 backdrop-blur-sm`}
                >
                  <div className="bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50">
                    <div className="p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 relative">
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div
                            className={`relative p-3 sm:p-4 rounded-2xl flex-shrink-0 bg-gradient-to-br ${
                              section.color === "primary"
                                ? "from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-purple-glow"
                                : "from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-cyan-glow"
                            }`}
                          >
                            <section.icon
                              className={`w-6 h-6 sm:w-7 sm:h-7 relative z-10 ${
                                section.color === "primary"
                                  ? "text-purple-400"
                                  : "text-cyan-400"
                              }`}
                            />
                            <div
                              className={`absolute inset-0 rounded-2xl animate-ping ${
                                section.color === "primary"
                                  ? "bg-purple-500/20"
                                  : "bg-cyan-500/20"
                              }`}
                            ></div>
                          </div>
                          <div>
                            <h2
                              className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                                section.color === "primary"
                                  ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                  : "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                              }`}
                            >
                              {section.title}
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                              <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                                Protocol Active
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm sm:text-base font-mono text-gray-400 flex items-center gap-2 ml-auto">
                          <ArrowRight className="w-4 h-4" />
                          <span>Decrypt</span>
                        </div>
                      </div>
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 backdrop-blur-sm">
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light tracking-wide">
                          {section.content}
                        </p>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700/20">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
                          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                            verified • 2025
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
