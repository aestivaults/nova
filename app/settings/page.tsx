"use client";
import ProfileSettings from "./profilesettings";
import Security from "./security";

export default function Home() {
  return (
    <div className="py-25">
      <div className="container space-y-20">
        <ProfileSettings />
        <Security />
      </div>
    </div>
  );
}
