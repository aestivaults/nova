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
      <div className="min-h-screen flex mt-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl -z-10">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-900/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-900/30 rounded-full blur-2xl"></div>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
