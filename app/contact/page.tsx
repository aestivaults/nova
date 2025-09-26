"use client";
import { Globe, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Implement actual submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden pt-20 md:pt-0">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 backdrop-blur-md text-blue-200 text-sm font-mono font-bold mb-8 tracking-wide shadow-lg">
            <Mail className="w-4 h-4" />
            AUREUSNOVA Contact v3.0
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent leading-none">
            Connect With Us
            <span className="block text-3xl sm:text-4xl md:text-5xl font-mono text-blue-100/70 mt-2">
              Quantum Support
            </span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-blue-100/80 font-light tracking-wide">
            Reach out for legal inquiries, technical support, or any concerns.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">
              {" "}
              We&apos;re here to assist in the metaverse.
            </span>
          </p>
        </section>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-blue-500/30 transition-all hover:shadow-blue-glow">
            <Mail className="w-12 h-12 text-blue-300 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-blue-100 mb-2 text-center">
              Email Support
            </h3>
            <p className="text-blue-200/80 text-center mb-4">
              For general inquiries and support.
            </p>
            <a
              href="mailto:support@aureusnova.com"
              className="block text-center text-blue-300 hover:text-blue-100 font-mono"
            >
              support@aureusnova.com
            </a>
          </div>
          <div className="p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-purple-500/30 transition-all hover:shadow-purple-glow">
            <Phone className="w-12 h-12 text-purple-300 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-purple-100 mb-2 text-center">
              Legal Contact
            </h3>
            <p className="text-purple-200/80 text-center mb-4">
              For legal matters and compliance.
            </p>
            <a
              href="mailto:legal@aureusnova.com"
              className="block text-center text-purple-300 hover:text-purple-100 font-mono"
            >
              legal@aureusnova.com
            </a>
          </div>
          <div className="p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-indigo-500/30 transition-all hover:shadow-indigo-glow">
            <Globe className="w-12 h-12 text-indigo-300 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-indigo-100 mb-2 text-center">
              Technical Troubles
            </h3>
            <p className="text-indigo-200/80 text-center mb-4">
              For platform issues and bugs.
            </p>
            <a
              href="mailto:tech@aureusnova.com"
              className="block text-center text-indigo-300 hover:text-indigo-100 font-mono"
            >
              tech@aureusnova.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl blur-2xl -z-10"></div>
          <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/40 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 text-center">
              Send a Quantum Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-4 rounded-lg border-2 border-blue-500/30 bg-black/50 text-blue-100 placeholder-blue-300/70 focus:border-purple-500/50 transition-all font-mono"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-4 rounded-lg border-2 border-blue-500/30 bg-black/50 text-blue-100 placeholder-blue-300/70 focus:border-purple-500/50 transition-all font-mono"
                required
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-4 rounded-lg border-2 border-blue-500/30 bg-black/50 text-blue-100 placeholder-blue-300/70 focus:border-purple-500/50 transition-all font-mono"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="w-full p-4 rounded-lg border-2 border-blue-500/30 bg-black/50 text-blue-100 placeholder-blue-300/70 focus:border-purple-500/50 transition-all font-mono"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg font-mono flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Transmit Message
              </button>
            </form>
          </div>
        </div>

        {/* Chat Bot Suggestion */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            Instant Support
          </h3>
          <p className="text-blue-100/80 mb-6">
            For real-time assistance, we recommend integrating a chat bot like
            Tidio or Intercom. These can be easily added to your site with a
            script tag. Sign up at their websites and follow the integration
            guide for Next.js.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.tidio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-mono hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Explore Tidio
            </a>
            <a
              href="https://www.intercom.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border-2 border-blue-500/30 text-blue-300 font-mono hover:bg-blue-500/20 transition-all"
            >
              Explore Intercom
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
