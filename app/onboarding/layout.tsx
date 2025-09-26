import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
}
