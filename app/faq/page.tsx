"use client";
import { Search, HelpCircle, Plus, Minus, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import Footer from "../components/layout/Footer";
import { faqCategories } from "../data/data";
import Navbar from "../components/layout/navbar";

// Define types for FAQ and Category
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "primary" | "secondary";
  faqs: FAQ[];
}

// Type for the openSections state
interface OpenSections {
  [categoryId: string]: { [faqId: string]: boolean };
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openSections, setOpenSections] = useState<OpenSections>({});

  const toggleSection = (categoryId: string, faqId: string): void => {
    setOpenSections((prev: OpenSections) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [faqId]: !prev[categoryId]?.[faqId],
      },
    }));
  };

  const filteredFAQs: FAQCategory[] = faqCategories
    .map((category: FAQCategory) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq: FAQ) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category: FAQCategory) => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden pt-20 md:pt-0">
      <Navbar />

      <main className="container mx-auto ">
        <div className="px-4 py-8 sm:py-12 lg:py-16 relative z-10">
          <section className="text-center mb-6 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm text-purple-300 text-xs font-mono font-semibold mb-6 sm:mb-8 tracking-wider">
              <Zap className="w-3 h-3" />
              AUREUSNOVA FAQ v2.0
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              NFT FAQ Hub
              <span className="block text-2xl sm:text-3xl md:text-4xl font-mono text-white/80">
                Smart Contract Ready
              </span>
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed text-gray-300 font-light">
              Decentralized answers to your Web3 questions.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {" "}
                Gas optimized.
              </span>
            </p>
            {/* Search */}
            <div className="max-w-lg mx-auto relative mb-10 sm:mb-12 group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl border border-purple-500/20 blur-sm -z-10"></div>
              <Search className="absolute left-5 z-7 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 sm:w-6 sm:h-6 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Search blockchain queries..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-purple-500/20 bg-black/50 backdrop-blur-xl text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 text-base font-mono tracking-wide shadow-2xl"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                <span>Web3</span>
              </div>
            </div>
            {/* Search Results Info */}
            {searchTerm && (
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-gray-700 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
                  <p className="text-sm font-mono text-cyan-400">
                    {filteredFAQs.length > 0
                      ? `🔍 ${filteredFAQs.reduce((acc, cat) => acc + cat.faqs.length, 0)} results indexed`
                      : `⛓️ No on-chain results for "${searchTerm}"`}
                  </p>
                </div>
              </div>
            )}
          </section>
          {/* FAQ Categories */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category: FAQCategory) => (
                <div
                  key={category.id}
                  className="group relative overflow-hidden rounded-3xl"
                >
                  {/* Category Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      category.color === "primary"
                        ? "from-purple-500/5 via-pink-500/5 to-cyan-500/5"
                        : "from-cyan-500/5 via-blue-500/5 to-purple-500/5"
                    } rounded-3xl blur-xl -z-10 transition-all duration-700 group-hover:opacity-100 opacity-50`}
                  ></div>
                  <div
                    className={`relative p-1 rounded-3xl bg-gradient-to-r ${
                      category.color === "primary"
                        ? "from-purple-500/20 to-pink-500/20"
                        : "from-cyan-500/20 to-blue-500/20"
                    } border border-purple-500/30 backdrop-blur-sm`}
                  >
                    <div className="bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50">
                      <div className="p-6 sm:p-8 lg:p-10">
                        {/* Category Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 relative">
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div
                              className={`relative p-3 sm:p-4 rounded-2xl flex-shrink-0 bg-gradient-to-br ${
                                category.color === "primary"
                                  ? "from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-purple-glow"
                                  : "from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-cyan-glow"
                              }`}
                            >
                              <category.icon
                                className={`w-6 h-6 sm:w-7 sm:h-7 relative z-10 ${
                                  category.color === "primary"
                                    ? "text-purple-400"
                                    : "text-cyan-400"
                                }`}
                              />
                              {/* Animated Ring */}
                              <div
                                className={`absolute inset-0 rounded-2xl animate-ping ${
                                  category.color === "primary"
                                    ? "bg-purple-500/20"
                                    : "bg-cyan-500/20"
                                }`}
                              ></div>
                            </div>
                            <div>
                              <h2
                                className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                                  category.color === "primary"
                                    ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                    : "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                                }`}
                              >
                                {category.category}
                              </h2>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                                  {category.faqs.length}{" "}
                                  {category.faqs.length === 1
                                    ? "query"
                                    : "queries"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-mono text-gray-400 flex items-center gap-2 ml-auto">
                            <ArrowRight className="w-4 h-4" />
                            <span>Explore</span>
                          </div>
                        </div>
                        {/* FAQ Items */}
                        <div className="space-y-4 sm:space-y-5">
                          {category.faqs.map((faq: FAQ) => {
                            const isOpen: boolean =
                              openSections[category.id]?.[faq.id] || false;
                            return (
                              <div
                                key={faq.id}
                                className="group/faq relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-black/40"
                              >
                                {/* Question */}
                                <button
                                  onClick={() =>
                                    toggleSection(category.id, faq.id)
                                  }
                                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-pink-500/5"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-70 group-hover/faq:opacity-100 transition-all duration-300 shadow-lg"></div>
                                    <div>
                                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover/faq:text-purple-300 transition-colors">
                                        {faq.question}
                                      </h3>
                                      <div className="flex items-center gap-2 mt-1 opacity-0 group-hover/faq:opacity-100 transition-opacity">
                                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-mono text-gray-500">
                                          on-chain verified
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/50 group-hover/faq:bg-gray-800/50 backdrop-blur-sm transition-all duration-200 border border-gray-700/50">
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        isOpen
                                          ? "bg-gradient-to-r from-green-400 to-cyan-400 scale-110"
                                          : "bg-gradient-to-r from-purple-400 to-pink-400"
                                      }`}
                                    ></div>
                                    {isOpen ? (
                                      <Minus className="w-4 h-4 text-gray-400 group-hover/faq:text-purple-400 transition-colors" />
                                    ) : (
                                      <Plus className="w-4 h-4 text-gray-400 group-hover/faq:text-purple-400 transition-colors" />
                                    )}
                                  </div>
                                </button>
                                {/* Answer */}
                                <div
                                  className={`overflow-hidden transition-all duration-500 ease-out ${
                                    isOpen
                                      ? "max-h-96 opacity-100"
                                      : "max-h-0 opacity-0"
                                  }`}
                                >
                                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-700/30 bg-black/20 backdrop-blur-sm">
                                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light tracking-wide">
                                      {faq.answer}
                                    </p>
                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700/20">
                                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
                                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                                        verified • {new Date().getFullYear()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6 sm:mb-8 mx-auto shadow-purple-glow">
                    <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                  </div>
                  <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                    No Results Found
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
                    Your query returned no results. Try searching for different
                    blockchain terms or browse all categories.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-purple-glow transform hover:-translate-y-1 font-mono tracking-wide"
                  >
                    <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Reset Search
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Contact Support */}
          <div className="relative mt-16 sm:mt-20 lg:mt-24">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-3xl blur-xl -z-10"></div>
            <div className="relative glass-card rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm">
              <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50">
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-500/30 shadow-purple-glow mb-6 sm:mb-8 mx-auto">
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-gradient-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                    Need Emergency Support?
                  </h3>
                  <p className="text-gray-300 mb-8 sm:mb-10 leading-relaxed text-lg max-w-2xl mx-auto font-light">
                    Can&apos;t find your answer in the blockchain? Our Web3
                    support team is ready to help you navigate the decentralized
                    world.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="/help"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-purple-glow transform hover:-translate-y-1 font-mono tracking-wide overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <HelpCircle className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="relative z-10">Help Center</span>
                    </a>
                    <a
                      href="/chat"
                      className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl border-2 border-purple-500/30 bg-black/30 backdrop-blur-sm text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-200 transition-all duration-300 font-mono tracking-wide relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative z-10 w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 animate-ping"></div>
                      <span className="relative z-10">Live Web3 Chat</span>
                    </a>
                  </div>
                  {/* Bottom Status */}
                  <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-700/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      Support: 24/7 • On-Chain
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
