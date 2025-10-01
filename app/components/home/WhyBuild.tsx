import { whyBuild } from "@/app/data/data";
import { getColorClasses } from "@/app/utils/getIcons";

export default function WhyBuild() {
  return (
    <div className="container">
      <div className="group relative overflow-hidden">
        <div className="relative">
          <div className="py-8">
            <h3 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-10 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Why Build With AUREUSNOVA?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyBuild.map((benefit, index) => (
                <div
                  key={index}
                  className={`group/card relative p-6 sm:p-8 rounded-2xl border bg-black/30 backdrop-blur-sm border-gray-800/50 hover:border-${benefit.color}-500/30 transition-all duration-300 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-${benefit.color}-500/5 to-transparent rounded-2xl -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700"></div>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-br ${getColorClasses(benefit.color)} flex-shrink-0 shadow-purple-glow`}
                    >
                      <benefit.icon
                        className={`w-5 h-5 ${getColorClasses(benefit.color).split(" ")[3]}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-black text-lg tracking-tight mb-2 ${getColorClasses(benefit.color).split(" ")[3]}`}
                      >
                        {benefit.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-sm font-light">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      on-chain verified
                    </span>
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
