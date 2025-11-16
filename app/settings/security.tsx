import UpdateEmail from "./security/updateEmail";
import UpdatePassword from "./security/updatePassword";
import Logout from "./security/Logout";
import { Shield } from "lucide-react";

export default function Security() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Security Settings</h2>
      </div>

      <UpdatePassword />
      <UpdateEmail />
      <Logout />
    </div>
  );
}
