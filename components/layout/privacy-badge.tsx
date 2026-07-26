import { Lock, WifiOff } from 'lucide-react'

export function PrivacyBadge() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
        <Lock className="size-4 shrink-0" />
        Private by design
      </div>
      <p className="text-sm text-muted-foreground">
        Everything runs in your browser. Your input is never uploaded, stored, or logged on our
        servers.
      </p>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:ml-auto sm:shrink-0">
        <WifiOff className="size-3.5" />
        Works offline after load
      </div>
    </div>
  )
}
