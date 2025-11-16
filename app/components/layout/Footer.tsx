import Image from "next/image";
import ThemeSelector from "../ui/Themeselector";
import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-darker py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-primary-800/20 blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-64 h-64 rounded-full bg-secondary-800/20 blur-3xl -bottom-20 -right-20"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full relative bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mr-2">
                <Image
                  alt="aureus nova logo"
                  fill
                  sizes="40px"
                  src="/logo.png"
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-orbitron font-bold gradient-text">
                AureusNova
              </span>
            </div>

            <p className="text-light/70 mb-6 text-sm">
              The next generation NFT marketplace for digital collectibles and
              creative assets.
            </p>

            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-light/70 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter />
              </Link>
              <Link
                href="#"
                className="text-light/70 hover:text-primary-400 transition-colors"
                aria-label="Discord"
              >
                Discord
              </Link>
              <Link
                href="#"
                className="text-light/70 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram />
              </Link>
              <Link
                href="#"
                className="text-light/70 hover:text-primary-400 transition-colors"
                aria-label="Telegram"
              >
                Telegram
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-semibold font-orbitron mb-6">
              Marketplace
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/explore"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  All NFTs
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Collections
                </Link>
              </li>

              <li>
                <Link
                  href="/auctions"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Live Auctions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-orbitron mb-6">
              Account
            </h3>
            <ul className="space-y-3 text-sm">
              <li></li>
              <li>
                <Link
                  href="/dashboard/my-nfts"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  My NFTs
                </Link>
              </li>
              <li>
                <Link
                  href="/wallet"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  My Wallet
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/notifications"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Notifications
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-orbitron mb-6">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  partners
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Faq
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-light/70 hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <ThemeSelector className="block text-light/70 md:hidden  hover:text-primary-400 w-40 transition-colors" />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-light/50">
          <div className="mb-4 md:mb-0">
            © {year} AureusNova. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/privacy"
              className="hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-primary-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
