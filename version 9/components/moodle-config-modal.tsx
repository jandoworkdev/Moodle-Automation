"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, CheckCircle, XCircle, Loader2 } from "lucide-react"
import type { MoodleConfig } from "@/lib/moodle-api"
import { saveMoodleConfig } from "@/lib/moodle-config"

interface MoodleConfigModalProps {
  config: MoodleConfig
  isConnected: boolean
  isLoading: boolean
  error: string | null
  onConfigUpdate: (config: MoodleConfig) => void
  onTestConnection: () => Promise<boolean>
}

export function MoodleConfigModal({
  config,
  isConnected,
  isLoading,
  error,
  onConfigUpdate,
  onTestConnection,
}: MoodleConfigModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<MoodleConfig>(config)
  const [testing, setTesting] = useState(false)

  const handleSave = async () => {
    onConfigUpdate(formData)
    saveMoodleConfig(formData)

    setTesting(true)
    const success = await onTestConnection()
    setTesting(false)

    if (success) {
      setOpen(false)
    }
  }

  const handleTest = async () => {
    setTesting(true)
    await onTestConnection()
    setTesting(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
        >
          <Settings className="w-4 h-4 mr-2" />
          Moodle Config
          {isConnected ? (
            <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 ml-2 text-red-500" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#27d4ba] tracking-wider">MOODLE CONFIGURATION</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Connection Status */}
          <Card className="bg-neutral-800 border-neutral-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">CONNECTION STATUS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isLoading || testing ? (
                    <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                  ) : isConnected ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-neutral-300">
                    {isLoading || testing ? "Testing..." : isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>
                <Badge className={isConnected ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}>
                  {isConnected ? "ONLINE" : "OFFLINE"}
                </Badge>
              </div>
              {error && <div className="mt-2 text-sm text-red-400 bg-red-500/10 p-2 rounded">{error}</div>}
            </CardContent>
          </Card>

          {/* Configuration Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-sm font-medium text-neutral-300 tracking-wider">
                MOODLE URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://your-moodle-site.com"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="mt-1 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
              />
              <p className="text-xs text-neutral-500 mt-1">The base URL of your Moodle installation</p>
            </div>

            <div>
              <Label htmlFor="token" className="text-sm font-medium text-neutral-300 tracking-wider">
                WEB SERVICE TOKEN
              </Label>
              <Input
                id="token"
                type="password"
                placeholder="Your Moodle web service token"
                value={formData.token}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                className="mt-1 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Generate this token in Moodle: Site administration → Server → Web services → Manage tokens
              </p>
            </div>

            <div>
              <Label htmlFor="loginMethod" className="text-sm font-medium text-neutral-300 tracking-wider">
                LOGIN METHOD
              </Label>
              <Select
                value={formData.loginMethod}
                onValueChange={(value: "token" | "oauth" | "basic") => setFormData({ ...formData, loginMethod: value })}
              >
                <SelectTrigger className="mt-1 bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="token" className="text-white hover:bg-neutral-700">
                    Token Authentication
                  </SelectItem>
                  <SelectItem value="oauth" className="text-white hover:bg-neutral-700">
                    OAuth 2.0
                  </SelectItem>
                  <SelectItem value="basic" className="text-white hover:bg-neutral-700">
                    Basic Authentication
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-neutral-500 mt-1">Token authentication is recommended for security</p>
            </div>
          </div>

          {/* Setup Instructions */}
          <Card className="bg-neutral-800 border-neutral-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SETUP INSTRUCTIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-neutral-400">
              <div>1. Enable web services in Moodle: Site administration → Advanced features</div>
              <div>2. Create a web service: Site administration → Server → Web services → External services</div>
              <div>3. Add required functions to the service (core_user_get_users, core_course_get_courses, etc.)</div>
              <div>4. Create a token: Site administration → Server → Web services → Manage tokens</div>
              <div>5. Assign the token to a user with appropriate capabilities</div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleTest}
              disabled={testing || isLoading || !formData.url || !formData.token}
              className="bg-neutral-700 hover:bg-neutral-600 text-white"
            >
              {testing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
            <Button
              onClick={handleSave}
              disabled={testing || isLoading || !formData.url || !formData.token}
              className="bg-[#27d4ba] hover:bg-[#27d4ba]/80 text-white"
            >
              Save & Connect
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
