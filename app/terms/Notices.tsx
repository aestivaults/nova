import { AlertTriangle } from "lucide-react";
import { importantNotices } from "../data/data";
import { getColorClasses } from "../utils/getIcons";

export default function Notices() {
  return (
    <div className="relative mb-16 sm:mb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-primary-500/5 rounded-3xl blur-xl -z-10"></div>
      <div className="relative glass-card rounded-3xl overflow-hidden border border-red-500/20 backdrop-blur-sm">
        <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="relative p-3 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 shadow-red-glow">
              <AlertTriangle className="w-6 h-6 text-red-400 relative z-10" />
              <div className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              ⚠️ Critical Risk Disclosures
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {importantNotices.map((notice, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl border bg-black/30 backdrop-blur-sm border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:bg-red-500/5 ${getColorClasses(notice.color)}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-2xl -translate-x-full group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`p-2 rounded-xl bg-${notice.color}-500/10 border border-${notice.color}-500/30 flex-shrink-0 shadow-${notice.color}-glow`}
                  >
                    <AlertTriangle
                      className={`w-4 h-4 text-${notice.color}-400`}
                    />
                  </div>
                  <h3
                    className={`font-black text-lg tracking-tight ${getColorClasses(notice.color).split(" ")[1]}`}
                  >
                    {notice.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm font-light tracking-wide relative z-10">
                  {notice.description}
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700/20">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    high risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
