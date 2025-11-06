"use client";
import Button from "@/app/components/ui/button";
import Header from "../Header";

export default function Settings() {
  return (
    <div className="py-25">
      <div className="container">
        <Header />
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6">Platform Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Fee Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Minting Fee (ETH)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="0.15"
                      defaultValue="0.15"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="form-label">Transaction Fee (%)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="2.5"
                      defaultValue="2.5"
                      step="0.1"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="form-label">Creator Royalty (%)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="10"
                      defaultValue="10"
                      step="0.1"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Wallet Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">
                      Platform Wallet Address
                    </label>
                    <input
                      type="text"
                      className="form-input font-mono"
                      placeholder="0x..."
                      defaultValue="0xAureusNova"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Minimum Withdrawal (ETH)
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="0.05"
                      defaultValue="0.05"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">General Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Platform Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="AureusNova"
                      defaultValue="AureusNova"
                    />
                  </div>

                  <div>
                    <label className="form-label">Support Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="support@AureusNova.com"
                      defaultValue="support@AureusNova.com"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="maintenance-mode"
                      type="checkbox"
                      className="h-4 w-4 rounded bg-white/5 border-white/20 text-primary-500 focus:ring-primary-500"
                    />

                    <label htmlFor="maintenance-mode" className="ml-2 block">
                      Maintenance Mode
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="allow-new-users"
                      type="checkbox"
                      className="h-4 w-4 rounded bg-white/5 border-white/20 text-primary-500 focus:ring-primary-500"
                      defaultChecked
                    />

                    <label htmlFor="allow-new-users" className="ml-2 block">
                      Allow New User Registrations
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">API Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">API Key</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="form-input font-mono"
                        placeholder="API key"
                        defaultValue="sk_AureusNova_8a4c7b9d2e1f"
                        readOnly
                      />

                      <Button className="ml-2" variant="secondary">
                        Regenerate
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="enable-api"
                      type="checkbox"
                      className="h-4 w-4 rounded bg-white/5 border-white/20 text-primary-500 focus:ring-primary-500"
                      defaultChecked
                    />

                    <label htmlFor="enable-api" className="ml-2 block">
                      Enable API Access
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-6 flex justify-end gap-4">
            <Button variant="secondary">Cancel</Button>

            <Button variant="primary">Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
