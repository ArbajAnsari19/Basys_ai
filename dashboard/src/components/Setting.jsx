import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="email" className="w-32">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" className="flex-grow" />
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="password" className="w-32">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="flex-grow" />
            </div>
            <Button>Update Account</Button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch id="sms-notifications" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing">Data Sharing</Label>
              <Switch id="data-sharing" />
            </div>
            <Button variant="outline">Export Patient Data</Button>
          </div>
        </div>
      </div>
    </div>
  )
}