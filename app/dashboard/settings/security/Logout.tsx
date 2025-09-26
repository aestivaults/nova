"use client";
import Button from "@/app/components/ui/button";
import Dialog from "@/app/components/ui/Dialog";
import Modal from "@/app/components/ui/Modal";
import { useAuth } from "@/app/context/AuthContext";
import { LogOut as LogOutIcon } from "lucide-react";

export default function Logout() {
  const { logout } = useAuth();
  return (
    <div className="p-4 border border-white/10 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <LogOutIcon className="w-5 h-5 text-red-400" />
        <h3 className="text-lg font-semibold text-red-400">Logout</h3>
      </div>
      <p className="text-white/70 mb-4">
        Sign out from this device. You will be redirected to the login page.
      </p>
      <Modal.Open name="logoutDialog">
        <Button variant="danger" className="w-full sm:w-auto">
          <LogOutIcon className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </Modal.Open>
      <Dialog
        name="logoutDialog"
        title="Confirm Logout"
        message="Are you sure you want to log out? This will end your current session."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={logout}
        type="danger"
        confirmButtonVariant="danger"
      />
    </div>
  );
}
