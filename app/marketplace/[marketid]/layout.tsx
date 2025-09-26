import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-20">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
