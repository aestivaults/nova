import { FileText, Gavel, Mail, Zap } from "lucide-react";

export default function Contact() {
  return (
    <div className="relative mt-16 sm:mt-20 lg:mt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-pink-900/20 to-cyan-900/20 rounded-3xl blur-xl -z-10"></div>
      <div className="relative glass-card rounded-3xl overflow-hidden border border-primary-500/20 backdrop-blur-sm">
        <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50">
          <div className="text-center relative mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-pink-400 to-cyan-400">
              Legal Questions?
            </h2>
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-lg max-w-2xl mx-auto font-light">
              Need clarification on our smart contract terms or blockchain
              compliance?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent rounded-2xl -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/20 to-pink-500/20 border border-primary-500/30 shadow-primary-glow">
                    <FileText className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Legal Contact
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>legal@AUREUSNOVA.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                    <span>123 Digital Avenue, Crypto City, CC 12345</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Zap className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-2xl -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-cyan-glow">
                    <Gavel className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Dispute Resolution
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-400">
                  <div>• Contact support team first</div>
                  <div>• Allow 30 days for resolution</div>
                  <div>• Consider blockchain mediation</div>
                  <div>• Review arbitration requirements</div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-700/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono uppercase tracking-wider">
                      24/7 legal support
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
