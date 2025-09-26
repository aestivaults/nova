import { Mail, ShieldCheck, User } from "lucide-react";
import { complianceCountries } from "../data/data";
export default function Contact() {
  return (
    <div className="glass-card border-secondary-800/30 mt-12 sm:mt-16 lg:mt-20 rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-secondary-500/5 via-primary-500/3 to-secondary-500/5">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-secondary-400 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
          <Mail className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <span className="hidden sm:inline">Contact Us About Privacy</span>
          <span className="sm:hidden">Contact Privacy</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <div className="group">
              <h3 className="font-semibold mb-2 sm:mb-3 text-primary-300 flex items-center gap-2 text-sm sm:text-base">
                <User className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                Data Protection Officer
              </h3>
              <p className="text-secondary-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                For privacy-related questions or to exercise your rights:
              </p>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary-500/5 border border-primary-500/20 hover:bg-primary-500/10 transition-colors">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-secondary-300 truncate">
                    privacy@AureusNova.com
                  </span>
                </div>
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-secondary-500/5 border border-white/30">
                  <p className="text-secondary-300 text-xs sm:text-sm">
                    123 Digital Avenue
                  </p>
                  <p className="text-secondary-300 text-xs sm:text-sm">
                    Crypto City, CC 12345
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs sm:text-sm text-green-400">
                    Response time: Within 30 days
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="group">
              <h3 className="font-semibold mb-2 sm:mb-3 text-secondary-300 flex items-center gap-2 text-sm sm:text-base">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                Regional Compliance
              </h3>
              <p className="text-secondary-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                We comply with privacy laws in your jurisdiction:
              </p>
              <div className="space-y-2 sm:space-y-3">
                {complianceCountries.map((compliance, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-200 text-sm ${
                      compliance.color === "primary"
                        ? "bg-primary-500/5 border-white/30 hover:bg-primary-500/10"
                        : "bg-secondary-500/5 border-dark/30 hover:bg-secondary-500/10"
                    }`}
                  >
                    <span className="text-base sm:text-lg flex-shrink-0">
                      {compliance.icon}
                    </span>
                    <span className="text-secondary-300 text-xs sm:text-sm truncate">
                      {compliance.text}
                    </span>
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
