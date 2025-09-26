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
    <div className="space-y-8 sm:space-y-10">
      {/* Partner Types */}
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Partner Ecosystem
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Diverse blockchain projects building on our infrastructure
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerTypes.map((type, index) => (
                <div
                  key={index}
                  className={`group/card relative p-6 sm:p-8 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-${type.color}-500/30 transition-all duration-300 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700"></div>
                  <div
                    className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${getColorClasses(type.color)} mb-6 flex-shrink-0 w-fit mx-auto shadow-purple-glow`}
                  >
                    <type.icon
                      className={`w-6 h-6 ${getColorClasses(type.color).split(" ")[3]}`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-black mb-3 tracking-tight ${getColorClasses(type.color).split(" ")[3]}`}
                  >
                    {type.type}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {type.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-${type.color}-500/10 border border-${type.color}-500/30 text-${type.color}-400 text-sm font-mono tracking-wide">
                      <div className="w-2 h-2 bg-gradient-to-r from-${type.color}-400 to-pink-400 rounded-full animate-pulse"></div>
                      {type.count} partners
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs text-gray-500">
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

      <div className="space-y-8 sm:space-y-10">
        <div className="group relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl blur-xl -z-10"></div>
          <div className="relative glass-card rounded-3xl overflow-hidden border border-pink-500/20 backdrop-blur-sm">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Featured Partners
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 text-pink-400 text-sm font-mono tracking-wide">
                  <Zap className="w-3 h-3" />
                  Live Integrations
                </div>
              </div>

              <div className="space-y-6">
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
                      className={`group/card relative p-6 sm:p-8 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-${tierColor}-500/30 transition-all duration-300 overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-${tierColor}-500/5 to-transparent rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700"></div>

                      <div className="flex items-start gap-6 sm:gap-8">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700/50 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse opacity-30"></div>
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain relative z-10 p-2"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black/50 ${tierColor === "purple" ? "bg-purple-500" : tierColor === "cyan" ? "bg-cyan-500" : "bg-pink-500"}`}
                          ></div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <h3 className="text-xl sm:text-2xl font-black text-white truncate">
                              {partner.name}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 text-sm font-mono tracking-wide">
                              {partner.tier}
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 text-gray-400 text-sm font-mono tracking-wide">
                              {partner.type}
                            </div>
                          </div>

                          <p className="text-gray-400 mb-6 leading-relaxed text-base">
                            {partner.description}
                          </p>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="space-y-1">
                              <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">
                                Integration
                              </span>
                              <div className="font-semibold text-white">
                                {partner.integration}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">
                                Volume
                              </span>
                              <div className="font-semibold text-white">
                                {partner.volume}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">
                                Since
                              </span>
                              <div className="font-semibold text-white">
                                {partner.joinDate}
                              </div>
                            </div>
                            <div className="flex items-center justify-end sm:justify-center lg:justify-end">
                              <button className="group relative p-2 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/30 transition-all duration-300">
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-700/30">
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
            <div className="p-8 sm:p-10 lg:p-12">
              <h3 className="text-2xl sm:text-3xl font-black mb-8 sm:mb-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                What Our Partners Say
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
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
                    className="group/card relative p-6 sm:p-8 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700"></div>

                    <div className="flex items-center gap-2 mb-6 opacity-70 group-hover/card:opacity-100 transition-opacity">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Award
                          key={i}
                          className="w-5 h-5 text-gradient-primary"
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 italic mb-6 leading-relaxed text-base font-light relative z-10">
                      {`"${testimonial.quote}"`}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
                      </div>
                      <div className="relative z-10">
                        <p className="text-white font-semibold text-sm">
                          {testimonial.author}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-mono uppercase tracking-wider">
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
    </div>
  );
}
