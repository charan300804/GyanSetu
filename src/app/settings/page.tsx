
"use client";

import { ProfileSettings } from "@/components/settings/profile-settings";
import { PasswordSettings } from "@/components/settings/password-settings";

export default function SettingsPage() {

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <h1 className="text-2xl font-bold">Settings</h1>
        <div className="grid gap-6">
            <ProfileSettings />
            <PasswordSettings />
        </div>
    </main>
  );
}
