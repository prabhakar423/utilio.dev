import { cn } from '@/lib/utils'

interface ToolPanelProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function ToolPanel({ label, children, className }: ToolPanelProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  )
}

interface ToolTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  mono?: boolean
}

export function ToolTextarea({ mono = true, className, ...props }: ToolTextareaProps) {
  return (
    <textarea
      className={cn(
        'min-h-56 w-full resize-y rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm shadow-inner transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
        mono && 'font-mono',
        className,
      )}
      {...props}
    />
  )
}

interface ToolActionsProps {
  children: React.ReactNode
}

export function ToolActions({ children }: ToolActionsProps) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}

interface ToolStatProps {
  label: string
  value: string | number
  accent?: boolean
}

export function ToolStat({ label, value, accent }: ToolStatProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/70 p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn('mt-1 text-2xl font-semibold', accent && 'text-primary')}>{value}</div>
    </div>
  )
}

interface ToolExampleProps {
  title?: string
  children: React.ReactNode
}

export function ToolExample({ title = 'Example', children }: ToolExampleProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-2 overflow-x-auto text-xs text-muted-foreground">{children}</div>
    </div>
  )
}

interface ToolErrorProps {
  message: string
}

export function ToolError({ message }: ToolErrorProps) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {message}
    </div>
  )
}

interface ToolShortcutHintProps {
  action?: string
}

export function ToolShortcutHint({ action = 'run' }: ToolShortcutHintProps) {
  return (
    <span className="self-center text-xs text-muted-foreground">Ctrl+Enter to {action}</span>
  )
}

const fieldClassName =
  'w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20'

export function ToolInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClassName, className)} {...props} />
}

export function ToolSelect({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(fieldClassName, className)} {...props} />
}

interface ToolResultProps {
  variant: 'success' | 'error' | 'warning'
  title: string
  children?: React.ReactNode
}

export function ToolResult({ variant, title, children }: ToolResultProps) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        variant === 'success' && 'border-emerald-500/30 bg-emerald-500/10',
        variant === 'error' && 'border-destructive/30 bg-destructive/10',
        variant === 'warning' && 'border-orange-500/30 bg-orange-500/10',
      )}
    >
      <div className="font-semibold">{title}</div>
      {children && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
    </div>
  )
}
