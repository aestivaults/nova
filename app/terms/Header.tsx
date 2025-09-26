import { Zap } from "lucide-react";

export default function Header() {
  return (
    <section className="text-center">
      <div className=" inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-dark-500/10 border border-primary-500/20 backdrop-blur-sm text-primary-300 text-xs font-mono font-semibold mb-6 sm:mb-8 tracking-wider">
        <Zap className="w-3 h-3" />
        Legal Protocol v2.0
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-primary-400 via-dark-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
        Smart Contract Terms
        <span className="block text-2xl sm:text-3xl md:text-4xl font-mono text-white/80">
          Legally Binding Agreement
        </span>
      </h1>
      <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed text-gray-300 font-light">
        Immutable terms for the decentralized NFT marketplace.
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary-400">
          {" "}
          On-chain enforceable.
        </span>
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-mono mb-8">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Last updated: December 2024</span>
        <span className="text-primary-400">| Effective: January 1, 2025</span>
      </div>
    </section>
  );
}
