"use client";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import Acceptance from "./Acceptance";
import Contact from "./Contact";
import Header from "./Header";
import Notices from "./Notices";
import TermsDescription from "./Terms";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 ">
        <div className="py-12 sm:py-16 lg:py-20">
          <Header />
          <Notices />
          <TermsDescription />
          <Contact />
          <Acceptance />
        </div>
      </main>
      <Footer />
    </div>
  );
}
