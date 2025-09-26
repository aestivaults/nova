import { ArrowRight } from "lucide-react";
import { termsDescription } from "../data/data";
import { getColorClasses } from "../utils/getIcons";

export default function TermsDescription() {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {termsDescription.map((section) => (
        <div
          key={section.id}
          className="group relative overflow-hidden rounded-3xl"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(section.color)} rounded-3xl blur-xl -z-10 transition-all duration-700 group-hover:opacity-100 opacity-50`}
          ></div>

          <div
            className={`relative p-1 rounded-3xl bg-gradient-to-r ${getColorClasses(section.color).split(" ")[0]} border border-primary-500/30 backdrop-blur-sm`}
          >
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div
                    className={`relative p-3 sm:p-4 rounded-2xl flex-shrink-0 bg-gradient-to-br ${getColorClasses(section.color)} shadow-primary-glow`}
                  >
                    <section.icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 relative z-10 ${getColorClasses(section.color).split(" ")[3]}`}
                    />
                    {/* Animated Ring */}
                    <div
                      className={`absolute inset-0 rounded-2xl animate-ping ${getColorClasses(section.color).split(" ")[0]}`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className={`text-xl sm:text-2xl lg:text-3xl font-black mb-4 sm:mb-6 tracking-tight ${getColorClasses(section.color).split(" ")[3]}`}
                    >
                      {section.title}
                    </h2>
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-300 leading-relaxed font-light tracking-wide">
                      <p>{section.content}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-700/30">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                        verified • {new Date().getFullYear()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
