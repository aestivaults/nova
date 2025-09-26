import { User } from "@/app/types/user";
import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Socials({ user }: { user: User }) {
  const socials = user.socialMedia || {};

  const iconBaseClasses =
    "p-3 rounded-lg text-gray-600 hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-center";

  return (
    <div className="glass-card lg:col-span-1  p-8">
      <h3 className="text-xl font-bold mb-6 text-white">Social Media</h3>
      <div className="flex gap-6">
        {/* Instagram */}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="User Instagram"
          className={iconBaseClasses}
          href={socials.instagram || "#"}
          passHref
        >
          <Instagram size={24} />
        </Link>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="User Twitter"
          className={iconBaseClasses}
          href={socials.twitter || "#"}
          passHref
        >
          <Twitter size={24} />
        </Link>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="User Discord"
          className={iconBaseClasses}
          href={socials.discord || "#"}
          passHref
        >
          <h2 className="font-bold text-2xl">D</h2>
        </Link>
      </div>
    </div>
  );
}
