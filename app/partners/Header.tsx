import {
  ExternalLink,
  Globe,
  Handshake,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Button from "../components/ui/button";
export default function Header() {
  return (
    <section className="text-center mb-6 sm:mb-10 relative">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm text-purple-300 text-[10px] sm:text-xs font-mono font-semibold mb-4 sm:mb-6 tracking-wider">
        <Zap className="w-3 h-3" />
        Partnership Network v2.0
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
        Blockchain Ecosystem
        <span className="block text-base sm:text-xl md:text-2xl font-mono text-white/80">
          Decentralized Partnerships
        </span>
      </h1>

      <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed text-gray-300 font-light">
        Join our Web3 partner network and integrate with the leading NFT
        marketplace infrastructure.
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          {" "}
          Unlock on-chain revenue.
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 sm:mb-8 px-4 sm:px-0">
        <Button
          size="large"
          className="group relative inline-flex items-center gap-2.5 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-1 font-mono tracking-wide text-sm sm:text-base"
        >
          <Handshake className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
          <span className="relative z-10">Join Ecosystem</span>
        </Button>
        <Button
          variant="secondary"
          size="large"
          className="group inline-flex items-center gap-2.5 rounded-2xl border-2 border-purple-500/30 transition-all duration-300 font-mono tracking-wide text-sm sm:text-base"
        >
          <ExternalLink className="w-4 h-4 relative z-10" />
          <span className="relative z-10">API Documentation</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        {[
          { label: "Active Partners", value: "58+", icon: Users },
          { label: "Total Volume", value: "$25M+", icon: TrendingUp },
          { label: "API Calls/Day", value: "1.2M+", icon: Zap },
          { label: "Countries", value: "35+", icon: Globe },
        ].map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent rounded-2xl -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            <div className="relative p-4 sm:p-6 text-center">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400 mx-auto mb-2 sm:mb-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
