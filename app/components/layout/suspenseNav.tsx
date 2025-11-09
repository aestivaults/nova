"use client";

import { useSetParams } from "@/app/hooks/useSetParams";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Dialog from "@/app/components/ui/Dialog";
import Modal from "@/app/components/ui/Modal";
import { useAuth } from "@/app/context/AuthContext";
import { formatEthPrice } from "@/app/utils/formatters";
import {
  ArrowDown,
  ChevronDown,
  Gavel,
  ImageIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Menu,
  WalletCardsIcon,
  X,
} from "lucide-react";
import Button from "../ui/button";
import NotificationCenter from "../ui/NotificationCenter";

export default function SuspenseNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { navigate } = useSetParams();

  const pathname = usePathname();

  const { user, isAuthenticated, logout } = useAuth();

  // Handle scroll events to add background to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;
      if (userMenuOpen && !target.closest(".user-menu")) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  // Navigation links
  const navlinks = [
    { name: "Explore", path: "/explore" },
    { name: "Market", path: "/marketplace" },
    { name: "Collections", path: "/collections" },
  ];

  return (
    <Modal>
      <nav
        className={`navbar transition-all duration-300 ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <div className="container navbar-container">
          <Link href="/" className="navbar-logo">
            <div className="w-10 h-10 rounded-full relative bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center mr-2">
              <Image
                alt="aureus nova logo"
                fill
                sizes="40px"
                src="/logo.png"
                className="object-cover"
              />
            </div>
            <span className=" text-primary-400">AureusNova</span>
          </Link>
          {/* Primary Navigation */}
          <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            {navlinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link ${pathname === link.path ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile-only links (shown only on mobile when menu is open) */}
            <div className="flex flex-col w-full mt-6 md:hidden">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`nav-link mb-4 ${
                      pathname === "/dashboard" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/wallet"
                    className={`nav-link mb-4 ${
                      pathname === "/dashboard/wallet" ? "active" : ""
                    }`}
                  >
                    Wallet
                  </Link>
                  <Modal.Open name={"logoutDialog"}>
                    <Button
                      variant="outline"
                      size="medium"
                      fullWidth
                      className="mt-4"
                    >
                      Logout
                    </Button>
                  </Modal.Open>
                </>
              ) : (
                <>
                  <Button
                    onClick={() =>
                      navigate("/auth/login", {
                        state: { from: pathname },
                      })
                    }
                    variant="secondary"
                    size="medium"
                    fullWidth
                    className="mb-3"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/auth/register", {
                        state: { from: pathname },
                      })
                    }
                    variant="primary"
                    size="medium"
                    fullWidth
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* Right side actions*/}
          <div className="flex items-center gap-4">
            {/* Auth buttons or User menu */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="notification-badge hidden sm:block">
                  <NotificationCenter />
                </div>
                {/* User Menu */}
                <div className="user-menu relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                    onClick={toggleUserMenu}
                  >
                    <div className="relative user-avatar overflow-hidden">
                      <Image
                        fill
                        src={user?.avatar}
                        sizes="40px"
                        alt={user?.username ?? "user"}
                        className="object-cover animate-glow"
                      />
                    </div>
                    <span className="hidden md:block">{user?.username}</span>
                    <ChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {/* Dropdown menu  */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-darker rounded-lg shadow-lg z-50 glass-card border border-light/10 fade-in">
                      <div className="px-4 py-2 border-b border-light/10">
                        <p className="text-sm text-light/80">wallet</p>
                        <p className="text-sm font-medium">
                          {formatEthPrice(user?.walletBalance ?? 0)}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-light/5"
                      >
                        <LayoutDashboardIcon className="w-5" /> Dashboard
                      </Link>

                      <Link
                        href="/dashboard/wallet"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-light/5"
                      >
                        <WalletCardsIcon className="w-5" /> Wallet
                      </Link>
                      <Link
                        href="/dashboard?tab=owned"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-light/5"
                      >
                        <ImageIcon className="w-5" /> My Nfts
                      </Link>
                      <Link
                        href="/my-bids"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-light/5"
                      >
                        <Gavel className="w-5" /> My Bids
                      </Link>
                      <Link
                        href="/received-bids"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-light/5"
                      >
                        <ArrowDown className="w-5" /> Received Bids
                      </Link>
                      <Modal.Open name={"logoutDialog"}>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-light/5 w-full text-left">
                          <LogOutIcon className="w-5" /> Logout
                        </button>
                      </Modal.Open>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Button
                  onClick={() =>
                    navigate("/auth/login", {
                      state: { from: pathname },
                    })
                  }
                  variant="secondary"
                >
                  Login
                </Button>
                <Button
                  onClick={() =>
                    navigate("/auth/register", {
                      state: { from: pathname },
                    })
                  }
                  variant="primary"
                >
                  Sign Up
                </Button>
              </div>
            )}
            {/* Mobile menu toggle */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X /> : <Menu className="w-5" />}
            </button>
          </div>
        </div>
        <Dialog
          name="logoutDialog"
          title={"Logout"}
          message={
            "Are you sure you want to log out? You will be redirected to the login page."
          }
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={logout}
          type="danger" // info, success, warning, danger
          confirmButtonVariant="danger"
        />
      </nav>
    </Modal>
  );
}
