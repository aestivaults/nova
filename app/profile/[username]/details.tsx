import { User } from "@/app/types/user";
import { formatDate } from "@/app/utils/formatters";

export default async function Details({ user }: { user: User }) {
  return (
    <div className="glass-card p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Bio & Other Details</h3>
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h4 className="text-gray-400 text-sm mb-2"> Role</h4>
            <p className="text-white font-medium">{user?.userType}</p>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">
              3 Favorite Categories
            </h4>
            <p className="text-white font-medium">
              {user?.favoriteCategories?.join(", ")}
            </p>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">Preferred Blockchain</h4>
            <p className="text-white font-medium">
              {user?.preferredBlockchain}
            </p>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">City or Region</h4>
            <p className="text-white font-medium">{user?.location}</p>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">Badges</h4>
            <div className="flex flex-wrap gap-2">
              {user?.badges?.map((badge, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Experience Level</h4>
            <p className="text-white font-medium">{user?.experienceLevel}</p>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">Trading Style</h4>
            <p className="text-white font-medium">{user?.tradingStyle}</p>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">Member Since</h4>
            <p className="text-white font-medium">
              {formatDate(user?.createdAt)}
            </p>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">Availability</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 font-medium">
                {user?.availability}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-gray-400 text-sm mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {user?.tags?.map((tag, index) => (
                <span key={index} className="text-gray-300 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
