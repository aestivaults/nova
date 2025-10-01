import { partnerTypes } from "../data/data";
import { getColorClasses } from "../utils/getIcons";
import {
  ArrowRight,
  Award,
  CheckCircle,
  ExternalLink,
  Zap,
} from "lucide-react";
import { featuredPartners } from "../data/data";

export default function Overview() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm">
          <div className="p-4 sm:p-6 lg:p-8">
            {" "}
            {/* Reduced padding */}
            <div className="text-center mb-4 sm:mb-6">
              {" "}
              {/* Reduced margin */}
              <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Partner Ecosystem
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
                Diverse blockchain projects building on our infrastructure
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {" "}
              {/* Reduced gap */}
              {partnerTypes.map((type, index) => (
                <div
                  key={index}
                  className={`group/card relative p-4 sm:p-6 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-${type.color}-500/30 transition-all duration-300 overflow-hidden`} // reduced padding
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700"></div>
                  <div
                    className={`p-2 sm:p-4 rounded-2xl bg-gradient-to-br ${getColorClasses(type.color)} mb-4 sm:mb-6 flex-shrink-0 w-fit mx-auto shadow-purple-glow`}
                  >
                    <type.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${getColorClasses(type.color).split(" ")[3]}`}
                    />
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-black mb-2 sm:mb-3 tracking-tight ${getColorClasses(type.color).split(" ")[3]}`}
                  >
                    {type.type}
                  </h3>
                  <p className="text-gray-400 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    {type.description}
                  </p>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gradient-to-r from-${type.color}-500/10 border border-${type.color}-500/30 text-${type.color}-400 text-xs sm:text-sm font-mono tracking-wide`}
                    >
                      <div
                        className={`w-2 h-2 bg-gradient-to-r from-${type.color}-400 to-pink-400 rounded-full animate-pulse`}
                      ></div>
                      {type.count} partners
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs sm:text-sm text-gray-500">
                    {type.examples.map((example, exIndex) => (
                      <span key={exIndex} className="font-mono">
                        • {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-pink-500/20 backdrop-blur-sm">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-0">
                Featured Partners
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 text-pink-400 text-xs sm:text-sm font-mono tracking-wide">
                <Zap className="w-3 h-3" />
                Live Integrations
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {featuredPartners.map((partner, index) => {
                const tierColor =
                  partner.tier === "Platinum"
                    ? "purple"
                    : partner.tier === "Gold"
                      ? "cyan"
                      : "pink";
                return (
                  <div
                    key={index}
                    className={`group/card relative p-4 sm:p-6 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-${tierColor}-500/30 transition-all duration-300 overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-${tierColor}-500/5 to-transparent rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700`}
                    ></div>

                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700/50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse opacity-30"></div>
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain relative z-10 p-1 sm:p-2"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black/50 ${
                            tierColor === "purple"
                              ? "bg-purple-500"
                              : tierColor === "cyan"
                                ? "bg-cyan-500"
                                : "bg-pink-500"
                          }`}
                        ></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-black text-white truncate">
                            {partner.name}
                          </h3>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-mono tracking-wide">
                            {partner.tier}
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 text-gray-400 text-xs sm:text-sm font-mono tracking-wide">
                            {partner.type}
                          </div>
                        </div>

                        <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                          {partner.description}
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                          <div className="space-y-1">
                            <span className="text-gray-500 font-mono uppercase tracking-wider">
                              Integration
                            </span>
                            <div className="font-semibold text-white text-sm sm:text-base">
                              {partner.integration}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-gray-500 font-mono uppercase tracking-wider">
                              Volume
                            </span>
                            <div className="font-semibold text-white text-sm sm:text-base">
                              {partner.volume}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-gray-500 font-mono uppercase tracking-wider">
                              Since
                            </span>
                            <div className="font-semibold text-white text-sm sm:text-base">
                              {partner.joinDate}
                            </div>
                          </div>
                          <div className="flex items-center justify-end sm:justify-center lg:justify-end">
                            <button className="group relative p-1.5 sm:p-2 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/30 transition-all duration-300">
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-700/30">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-wider">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>live integration</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-blue-500/20 backdrop-blur-sm">
          <div className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              What Our Partners Say
            </h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  quote:
                    "AUREUSNOVA's API integration was seamless. Our users love the expanded NFT trading capabilities. Revenue up 300% in Q4.",
                  author: "Sarah Chen, CTO @ MetaGallery",
                  rating: 5,
                },
                {
                  quote:
                    "The partnership team's support has been exceptional. Revenue has increased 40% since integration. Best decision we made.",
                  author: "Mike Rodriguez, CEO @ GameVerse Studios",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group/card relative p-4 sm:p-6 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700"></div>

                  <div className="flex items-center gap-1.5 mb-4 opacity-70 group-hover/card:opacity-100 transition-opacity">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award
                        key={i}
                        className="w-4 sm:w-5 h-4 sm:h-5 text-gradient-primary"
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base font-light relative z-10">
                    {`"${testimonial.quote}"`}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="relative z-10">
                      <p className="text-white font-semibold text-xs sm:text-sm">
                        {testimonial.author}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 font-mono uppercase tracking-wider">
                        <CheckCircle className="w-3 h-3" />
                        <span>verified partner</span>
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
  );
}
