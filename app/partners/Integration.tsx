import {
  ArrowRight,
  CheckCircle,
  Code,
  Handshake,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";

import { integrationOptions } from "../data/data";
import { getColorClasses } from "../utils/getIcons";
import Button from "../components/ui/button";
export default function Integration() {
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Integration Options */}
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="relative glass-card rounded-3xl overflow-hidden border border-green-500/20 backdrop-blur-sm">
          <div className="p-3 sm:p-8 md:p-10 lg:p-12">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Integration Options
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose your technical integration path and start building
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {integrationOptions.map((option, index) => {
                const colorClasses = getColorClasses(option.color);
                return (
                  <div
                    key={index}
                    className={`group/card relative p-6 sm:p-8 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-opacity-100 hover:shadow-lg hover:shadow-${option.color}-500/25 transition-all duration-300 overflow-hidden`}
                  >
                    {/* Gradient hover background - can't use template literals directly, so use inline styles or dynamic tailwind class */}
                    <div
                      className={`absolute inset-0 rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700`}
                      style={{
                        background: `linear-gradient(to right, rgba(var(--tw-gradient-stops)) 0%, transparent 100%)`,
                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-from, ${option.color} 0%), var(--tw-gradient-to, transparent 100%))`,
                      }}
                    ></div>

                    <div className="flex items-start gap-4 mb-6 relative z-10">
                      <div
                        className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${colorClasses} flex-shrink-0 shadow-lg`}
                      >
                        <option.icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClasses.split(" ")[3]}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-xl font-black tracking-tight mb-2 ${colorClasses.split(" ")[3]}`}
                        >
                          {option.name}
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 relative z-10">
                      {option.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-gray-700/50 group-hover/card:border-gray-600/50 transition-all duration-300"
                        >
                          <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-gray-300 font-medium text-sm relative z-10">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-gray-700/50 text-xs text-gray-500 font-mono tracking-wide relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <Code className="w-3 h-3" />
                        <span className="font-semibold text-gray-300">
                          Technical:
                        </span>
                      </div>
                      <div>{option.technical}</div>
                    </div>

                    <button className="mt-6 w-full group relative py-3 px-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/30 hover:text-purple-400 transition-all duration-300 font-mono tracking-wide overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-xl -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Start Integration
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="relative glass-card rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm">
          <div className="p-3 sm:p-8 md:p-10 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-black mb-8 sm:mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Getting Started
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
              {[
                {
                  step: 1,
                  title: "Apply",
                  description: "Submit partnership application",
                  icon: Handshake,
                },
                {
                  step: 2,
                  title: "Review",
                  description: "Technical assessment & approval",
                  icon: Shield,
                },
                {
                  step: 3,
                  title: "Integrate",
                  description: "API setup & testing phase",
                  icon: Code,
                },
                {
                  step: 4,
                  title: "Launch",
                  description: "Go live with full support",
                  icon: TrendingUp,
                },
              ].map((step, index) => (
                <div key={index} className="group/card relative text-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 p-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl group-hover/card:shadow-purple-glow transition-all duration-300">
                    <div className="w-full h-full rounded-2xl bg-black/80 backdrop-blur-sm flex items-center justify-center">
                      <step.icon
                        className={`w-6 h-6 text-white relative z-10 ${index === 3 ? "animate-bounce" : ""}`}
                      />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur animate-ping opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="absolute -top-4 -right-0 w-6 h-6 bg-green-500/20 border-2 border-green-500/50 rounded-full flex items-center justify-center">
                    <span className="text-green-400 text-xs font-bold">
                      {step.step}
                    </span>
                  </div>

                  <h4 className="font-black text-lg mb-2 text-white tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {index < 3 && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-700/30">
              <div className="badge">
                <CheckCircle className="w-3 h-3" />
                <span>Average time to launch: 14 days</span>
              </div>
              <Button fullWidth>
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Start Integration</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
