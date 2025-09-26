import { ArrowRight, Calendar, Mail, Zap } from "lucide-react";
import Button from "../components/ui/button";

export default function Apply() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="group relative overflow-hidden rounded-3xl max-w-4xl mx-auto">
        <div className="relative glass-card rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Partnership Application
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Join our ecosystem and unlock new revenue opportunities
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white block mb-2 font-mono tracking-wide">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className="form-input w-full form-input font-mono tracking-wide"
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white block mb-2 font-mono tracking-wide">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    className="w-full form-input font-mono tracking-wide"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white block mb-2 font-mono tracking-wide">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    className="w-full form-input font-mono tracking-wide"
                    placeholder="contact@yourcompany.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white block mb-2 font-mono tracking-wide">
                    Partner Type *
                  </label>
                  <select className="w-full form-select font-mono tracking-wide">
                    <option value="">Select integration type...</option>
                    <option value="marketplace">NFT Marketplace</option>
                    <option value="wallet">Wallet Provider</option>
                    <option value="gaming">Gaming Platform</option>
                    <option value="defi">DeFi Protocol</option>
                    <option value="analytics">Analytics & Tools</option>
                    <option value="creative">Creative Platform</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white block mb-2 font-mono tracking-wide">
                  Expected Monthly Volume
                </label>
                <select className="w-full form-select font-mono tracking-wide">
                  <option value="">Select volume range...</option>
                  <option value="100k">$100K - $500K</option>
                  <option value="500k">$500K - $1M</option>
                  <option value="1m">$1M+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white block mb-2 font-mono tracking-wide">
                  Tell us about your platform * (200-500 words)
                </label>
                <textarea
                  rows={4}
                  className="form-textarea font-mono tracking-wide"
                  placeholder="Describe your platform, user base, technical capabilities, and how you plan to integrate with AUREUSNOVA's ecosystem..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white block mb-2 font-mono tracking-wide">
                  Integration Requirements
                </label>
                <textarea
                  rows={3}
                  className="form-textarea font-mono tracking-wide"
                  placeholder="Describe your specific technical requirements, preferred APIs, expected timelines, and integration goals..."
                ></textarea>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-purple-500 bg-gray-800 border-gray-600/50 focus:ring-purple-500/30 focus:ring-offset-0 rounded"
                />
                <label className="text-sm text-gray-400 leading-relaxed cursor-pointer select-none">
                  I agree to the{" "}
                  <span className="text-purple-400 hover:underline transition-colors">
                    Terms of Service
                  </span>
                  ,
                  <span className="text-purple-400 hover:underline transition-colors">
                    Privacy Policy
                  </span>
                  , and
                  <span className="text-purple-400 hover:underline transition-colors">
                    Partnership Agreement
                  </span>
                  . I understand this creates a legally binding smart contract
                  relationship.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="group w-full relative  text-white font-bold transition-all duration-300 transform hover:-translate-y-1 font-mono tracking-wide"
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <Mail className="w-4 h-4" />
                  <span>Submit Partnership Application</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-700/30 text-center">
              <div className="text-xs text-gray-500 mb-4 font-mono uppercase tracking-wider">
                Applications reviewed within 48 hours • 24/7 support available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-3xl blur-xl -z-10"></div>
        <div className="relative glass-card rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
          <div className="p-8 sm:p-10 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-black mb-8 sm:mb-10 text-center bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
              Need Help Applying?
            </h3>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  Partnership Team
                </h4>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-mono text-purple-400">
                        partnerships@AUREUSNOVA.com
                      </div>
                      <div>Primary contact for all partnership inquiries</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-mono text-cyan-400">
                        +1 (555) 123-4567
                      </div>
                      <div>Available 24/7 for technical questions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-mono text-pink-400">
                        Response SLA: 24 hours
                      </div>
                      <div>Guaranteed response time for all inquiries</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-pink-400" />
                  Schedule Discovery Call
                </h4>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50">
                    <div className="font-semibold mb-2 text-white">
                      30-minute technical discovery
                    </div>
                    <div className="space-y-1">
                      <div>• Discuss your specific integration needs</div>
                      <div>• Review technical architecture</div>
                      <div>• Explore revenue opportunities</div>
                      <div>• Q&A with senior engineers</div>
                    </div>
                  </div>

                  <Button
                    size="large"
                    fullWidth
                    className="transform hover:-translate-y-1 font-mono tracking-wide overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <Calendar className="w-4 h-4" />
                      <span>Book Discovery Call</span>
                    </div>
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-700/30 text-xs text-gray-500 font-mono uppercase tracking-wider">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Available now • 24/7 scheduling</span>
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
