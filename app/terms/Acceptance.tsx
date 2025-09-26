import { Shield } from "lucide-react";

export default function Acceptance() {
  return (
    <div className="relative mt-12 sm:mt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-3xl blur-xl -z-10"></div>
      <div className="relative glass-card rounded-3xl overflow-hidden border border-green-500/20 backdrop-blur-sm">
        <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500/15 to-cyan-500/15 border border-green-500/30 shadow-green-glow mb-6 sm:mb-8 mx-auto">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Smart Contract Acknowledgment
          </h3>
          <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base max-w-3xl mx-auto font-light">
            By continuing to interact with AUREUSNOVA smart contracts, you
            acknowledge that you have read, understood, and agree to be bound by
            these legally enforceable Terms of Service.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-semibold">
              {" "}
              This constitutes on-chain agreement.
            </span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-700/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              immutable • verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
