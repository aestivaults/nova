import { ReactNode } from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
