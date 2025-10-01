"use client";
import { ArrowRight, Zap } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import { supportSections } from "../data/data";
import { SupportFAQ, SupportSection } from "../types/support";

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden pt-20 md:pt-0">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-10 lg:py-14 relative z-10">
          <section className="text-center mb-6 sm:mb-8 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full  border border-purple-500/20 backdrop-blur-sm  text-xs sm:text-sm font-mono font-semibold tracking-wider mb-4 sm:mb-6">
              <Zap className="w-3 h-3" />
              AUREUSNOVA Support v2.0
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight">
              Support Nexus
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-white/80">
                NovaVerse Assistance
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed text-gray-300 font-light">
              Navigate the realms of NFTs with AI-powered support.
              <span className="text-transparent bg-clip-text ">
                {" "}
                Eternal Availability.
              </span>
            </p>
          </section>

          {/* Support Sections - Always Visible */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
            {supportSections.map((section: SupportSection) => (
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
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-6 sm:mb-8 relative">
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div
                            className={`relative p-2.5 sm:p-3 rounded-2xl flex-shrink-0 bg-gradient-to-br ${
                              section.color === "primary"
                                ? "from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-purple-glow"
                                : "from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-cyan-glow"
                            }`}
                          >
                            <section.icon
                              className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 ${
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
                              className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${
                                section.color === "primary"
                                  ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                  : "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                              }`}
                            >
                              {section.title}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                              <span className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-wider">
                                {section.faqs.length} Protocols
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-gray-400 flex items-center gap-2 ml-auto">
                          <ArrowRight className="w-4 h-4" />
                          <span>Scan</span>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {section.faqs.map((faq: SupportFAQ) => (
                          <div
                            key={faq.id}
                            className="group/faq relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-black/40"
                          >
                            <div className="p-4 sm:p-5 text-left">
                              <div className="flex items-center gap-3 mb-1.5">
                                <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-70 group-hover/faq:opacity-100 transition-all duration-300 shadow-lg"></div>
                                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover/faq:text-purple-300 transition-colors">
                                  {faq.question}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 mb-3 opacity-100">
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
                                <span className="text-xs font-mono text-gray-500">
                                  verified
                                </span>
                              </div>
                              <div className="border-t border-gray-700/30 pt-3 bg-black/20 backdrop-blur-sm">
                                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-light tracking-wide">
                                  {faq.answer}
                                </p>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700/20">
                                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
                                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                                    verified • 2025
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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
