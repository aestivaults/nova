import { FileText } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import Contact from "./Contact";
import Header from "./Header";
import Information from "./Information";
import KeyPoints from "./KeyPoints";

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto">
        <div className="px-4 py-8 sm:py-12 lg:py-16">
          {/* Header */}
          <Header />
          <KeyPoints />
          <Information />
          <Contact />

          <div className="bg-gradient-to-r from-primary-500/8 via-secondary-500/5 to-primary-500/8 border border-primary-500/15 my-8 sm:my-12 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-primary-500/20 border border-primary-500/30 flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary-300 text-sm sm:text-base">
                    Policy Updates
                  </h3>
                  <p className="text-secondary-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    We&apos;ll notify you of significant changes via email or
                    platform notification.
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right mt-2 sm:mt-0">
                <p className="text-xs sm:text-sm text-secondary-500 italic">
                  Your continued use constitutes acceptance of updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
