import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Configure application and user settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will allow users to manage their profile, notification preferences, language settings, and other application-wide configurations.</p>
        </CardContent>
      </Card>
    </main>
  );
}
