import { AlertCircle, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { partnerTiers } from "../data/data";
import { getColorClasses } from "../utils/getIcons";
export default function Tiers() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-orange-500/20 backdrop-blur-sm">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Partnership Tiers
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose your integration level and unlock corresponding benefits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {partnerTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`group/card relative rounded-2xl overflow-hidden border-2 ${getColorClasses(tier.color)} transition-all duration-300 hover:border-opacity-100 hover:shadow-2xl hover:shadow-${tier.color}-500/25 transform hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent -skew-x-12 -translate-x-full group-hover/card:translate-x-full transition-transform duration-700"></div>

                  <div className="relative p-6 sm:p-8">
                    {tier.tier === "Platinum" && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold font-mono tracking-wide shadow-lg">
                        🔥 Most Popular
                      </div>
                    )}

                    <div className="text-center mb-6 sm:mb-8">
                      <h3
                        className={`text-2xl sm:text-3xl font-black mb-2 tracking-tight ${getColorClasses(tier.color).split(" ")[3]}`}
                      >
                        {tier.tier}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-gray-600/50 text-gray-400 text-sm font-mono tracking-wide">
                        <TrendingUp className="w-3 h-3" />
                        {tier.minVolume}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center gap-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50 group-hover/card:border-gray-600/50 transition-all duration-300"
                        >
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-br ${getColorClasses(tier.color)} flex-shrink-0 shadow-sm`}
                          >
                            <CheckCircle
                              className={`w-4 h-4 ${getColorClasses(tier.color).split(" ")[3]}`}
                            />
                          </div>
                          <span className="text-gray-300 font-medium relative z-10">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full group relative py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-glow transform hover:-translate-y-0.5 font-mono tracking-wide overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10">
                        Apply for {tier.tier}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
          <div className="p-8 sm:p-10 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
              Feature Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm relative">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-4 pr-6 font-bold text-white">
                      Feature
                    </th>
                    <th className="text-center py-4 px-2 font-bold text-gray-300 border-l border-gray-700/50">
                      Silver
                    </th>
                    <th className="text-center py-4 px-2 font-bold text-gray-300 border-l border-gray-700/50">
                      Gold
                    </th>
                    <th className="text-center py-4 px-2 font-bold text-gray-300 border-l border-gray-700/50">
                      Platinum
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  {[
                    ["API Rate Limits", "1K/hour", "10K/hour", "Unlimited"],
                    ["Revenue Share", "Standard", "Enhanced", "Premium + 2%"],
                    ["Support Level", "Community", "Business", "24/7 Priority"],
                    ["Marketing Co-op", "❌", "✅", "✅ Premium"],
                    ["Custom Features", "❌", "Limited", "Full Access"],
                    ["Dedicated Manager", "❌", "❌", "✅ Personal"],
                    ["White Label", "❌", "❌", "✅ Complete"],
                    ["API Analytics", "Basic", "Advanced", "Enterprise"],
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-4 pr-6 font-semibold text-white">
                        {row[0]}
                      </td>
                      {row.slice(1).map((cell, cellIndex) => {
                        const tier = ["Silver", "Gold", "Platinum"][cellIndex];
                        const isAvailable = cell !== "❌";
                        const tierColor =
                          tier === "Platinum"
                            ? "purple"
                            : tier === "Gold"
                              ? "cyan"
                              : "pink";

                        return (
                          <td
                            key={cellIndex}
                            className="py-4 px-2 text-center border-l border-gray-700/30 relative"
                          >
                            {isAvailable ? (
                              <div
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-${tierColor}-500/10 border border-${tierColor}-500/30 text-${tierColor}-400 font-mono text-xs tracking-wide`}
                              >
                                <CheckCircle
                                  className={`w-3 h-3 ${isAvailable ? "text-green-400" : "text-gray-500"}`}
                                />
                                <span>{cell}</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-500 font-mono text-xs tracking-wide">
                                <AlertCircle className="w-3 h-3 text-gray-500" />
                                <span>{cell}</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700/30 text-center">
              <p className="text-gray-400 mb-4">
                Ready to unlock premium partnership benefits?
              </p>
              <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-purple-glow transform hover:-translate-y-1 font-mono tracking-wide">
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Upgrade Partnership</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
