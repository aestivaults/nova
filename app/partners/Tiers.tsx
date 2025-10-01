import { AlertCircle, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { partnerTiers } from "../data/data";
import { getColorClasses } from "../utils/getIcons";
import Button from "../components/ui/button";
export default function Tiers() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-orange-500/20 backdrop-blur-sm">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-3 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Partnership Tiers
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                Choose your integration level and unlock corresponding benefits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {partnerTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`group/card relative rounded-2xl overflow-hidden border-2 ${getColorClasses(tier.color)} transition-all duration-300 hover:border-opacity-100 hover:shadow-xl hover:shadow-${tier.color}-500/20 transform hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent -skew-x-12 -translate-x-full group-hover/card:translate-x-full transition-transform duration-700"></div>

                  <div className="relative p-4 sm:p-6">
                    <div className="text-center mb-5 sm:mb-6">
                      <h3
                        className={`text-xl sm:text-2xl font-black mb-1 tracking-tight ${getColorClasses(tier.color).split(" ")[3]}`}
                      >
                        {tier.tier}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-gray-600/50 text-gray-400 text-xs font-mono tracking-wide">
                        <TrendingUp className="w-3 h-3" />
                        {tier.minVolume}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center gap-2 p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-700/50 group-hover/card:border-gray-600/50 transition-all duration-300"
                        >
                          <div
                            className={`p-1.5 rounded-lg bg-gradient-to-br ${getColorClasses(tier.color)} flex-shrink-0 shadow-sm`}
                          >
                            <CheckCircle
                              className={`w-3.5 h-3.5 ${getColorClasses(tier.color).split(" ")[3]}`}
                            />
                          </div>
                          <span className="text-gray-300 font-medium text-sm relative z-10">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button fullWidth>Apply for {tier.tier}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="relative glass-card rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl sm:text-2xl font-black mb-5 sm:mb-6 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
              Feature Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm relative">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-3 pr-4 font-bold text-white">
                      Feature
                    </th>
                    <th className="text-center py-3 px-1 sm:px-2 font-bold text-gray-300 border-l border-gray-700/50">
                      Silver
                    </th>
                    <th className="text-center py-3 px-1 sm:px-2 font-bold text-gray-300 border-l border-gray-700/50">
                      Gold
                    </th>
                    <th className="text-center py-3 px-1 sm:px-2 font-bold text-gray-300 border-l border-gray-700/50">
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
                      <td className="py-3 pr-4 font-semibold text-white">
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
                            className="py-3 px-1 sm:px-2 text-center border-l border-gray-700/30 relative"
                          >
                            {isAvailable ? (
                              <div
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-${tierColor}-500/10 border border-${tierColor}-500/30 text-${tierColor}-400 font-mono text-xs tracking-wide`}
                              >
                                <CheckCircle
                                  className={`w-3 h-3 ${isAvailable ? "text-green-400" : "text-gray-500"}`}
                                />
                                <span>{cell}</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-500 font-mono text-xs tracking-wide">
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

            <div className="mt-6 pt-4 border-t border-gray-700/30 text-center">
              <p className="text-gray-400 mb-3 text-sm sm:text-base">
                Ready to unlock premium partnership benefits?
              </p>
              <Button fullWidth variant="outline">
                Upgrade Partnership
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
