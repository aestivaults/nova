"use client";
import { ArrowRight, Shield, Zap } from "lucide-react";
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
              Cookie Quantum Policy
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

          {/* Consent Management */}
          <div className="relative mt-16 sm:mt-20 lg:mt-24">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-3xl blur-xl -z-10"></div>
            <div className="relative glass-card rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm">
              <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50">
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-500/30 shadow-purple-glow mb-6 sm:mb-8 mx-auto">
                    <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-gradient-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                    Manage Quantum Consent
                  </h3>
                  <p className="text-gray-300 mb-8 sm:mb-10 leading-relaxed text-lg max-w-2xl mx-auto font-light">
                    Exercise control over your digital footprint in the
                    multiverse.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="/settings"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-purple-glow transform hover:-translate-y-1 font-mono tracking-wide overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <Shield className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="relative z-10">Update Preferences</span>
                    </a>
                    <a
                      href="/contact"
                      className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl border-2 border-purple-500/30 bg-black/30 backdrop-blur-sm text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-200 transition-all duration-300 font-mono tracking-wide relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative z-10 w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 animate-ping"></div>
                      <span className="relative z-10">Oracle Inquiry</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-700/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      Policy: Active • On-Chain
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
