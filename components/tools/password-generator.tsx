'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

function generatePassword(length: number, options: {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let chars = ''
  if (options.uppercase) chars += uppercase
  if (options.lowercase) chars += lowercase
  if (options.numbers) chars += numbers
  if (options.symbols) chars += symbols

  if (!chars) return ''

  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const handleGenerate = () => {
    const newPassword = generatePassword(length, options)
    setPassword(newPassword)
    setCopied(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleToggle = (key: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleClear = () => {
    setPassword('')
  }

  return (
    <div className="grid gap-4">
      <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
        <div>
          <label className="block text-sm font-medium mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="128"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'uppercase' as const, label: 'Uppercase (A-Z)' },
            { key: 'lowercase' as const, label: 'Lowercase (a-z)' },
            { key: 'numbers' as const, label: 'Numbers (0-9)' },
            { key: 'symbols' as const, label: 'Symbols (!@#$...)' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => handleToggle(key)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {password && (
        <div className="p-4 rounded-lg bg-secondary border border-border">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-foreground break-all">{password}</code>
            <button
              onClick={handleCopy}
              className="ml-2 p-2 hover:bg-primary/20 rounded transition-colors"
              title="Copy"
            >
              <Copy className="w-4 h-4 text-primary" />
            </button>
          </div>
          {copied && <p className="text-xs text-primary mt-2">Copied to clipboard!</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          disabled={!password}
          className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm inline-flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium text-sm inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="p-4 rounded-lg bg-card border border-border">
        <h3 className="font-semibold text-sm mb-2">Tips for Strong Passwords:</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Use at least 12 characters</li>
          <li>• Mix uppercase, lowercase, numbers, and symbols</li>
          <li>• Avoid personal information</li>
          <li>• Use unique passwords for each account</li>
        </ul>
      </div>
    </div>
  )
}
