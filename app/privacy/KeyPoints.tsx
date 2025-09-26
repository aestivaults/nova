import { FileText, Lock, Shield, ShieldCheck, User } from "lucide-react";

export default function KeyPoints() {
  return (
    <div className="glass-card border-secondary-800/30 mb-6 sm:mb-8 lg:mb-12 rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-primary-400">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <span className="hidden sm:inline">Key Privacy Points</span>
          <span className="sm:hidden">Key Points</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="group">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
              </div>
              <h3 className="font-semibold text-primary-300 text-sm sm:text-base">
                What We Collect
              </h3>
            </div>
            <p className="text-secondary-300 leading-relaxed text-sm sm:text-base">
              Wallet addresses, transaction data, profile information, and usage
              analytics
            </p>
          </div>
          <div className="group">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-secondary-500/10 group-hover:bg-secondary-500/20 transition-colors">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400" />
              </div>
              <h3 className="font-semibold text-secondary-300 text-sm sm:text-base">
                How We Use It
              </h3>
            </div>
            <p className="text-secondary-300 leading-relaxed text-sm sm:text-base">
              To provide services, ensure security, and improve user experience
            </p>
          </div>
          <div className="group">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
              </div>
              <h3 className="font-semibold text-primary-300 text-sm sm:text-base">
                Your Control
              </h3>
            </div>
            <p className="text-secondary-300 leading-relaxed text-sm sm:text-base">
              Access, correct, or delete your data. Opt out of communications
              anytime
            </p>
          </div>
          <div className="group">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-secondary-500/10 group-hover:bg-secondary-500/20 transition-colors">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400" />
              </div>
              <h3 className="font-semibold text-secondary-300 text-sm sm:text-base">
                Data Security
              </h3>
            </div>
            <p className="text-secondary-300 leading-relaxed text-sm sm:text-base">
              Industry-standard encryption and security measures protect your
              data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
