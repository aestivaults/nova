import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <section className="text-center mb-6 sm:mb-8 lg:mb-12">
      <div className="inline-flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
        <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        Privacy Policy
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
        Your Privacy
        <span className="block">Matters</span>
      </h1>
      <p className="text-lg sm:text-xl max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed text-secondary-300">
        We&apos;re committed to protecting your privacy and being transparent
        about how we collect, use, and share your information.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-xs sm:text-sm text-secondary-400">
        <span>Last updated: December 2024</span>
        <span className="hidden sm:inline">•</span>
        <span>Effective Date: January 1, 2025</span>
      </div>
    </section>
  );
}
