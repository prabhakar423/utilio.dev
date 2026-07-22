'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export function Base64Decoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleDecode = () => {
    setError('')
    setCopied(false)
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (err) {
      setError('Invalid Base64')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Base64 Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste Base64 text to decode...'
            className="w-full h-64 p-3 font-mono text-sm border border-border rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Plain Text Output</label>
          <textarea
            value={output}
            readOnly
            placeholder='Decoded text will appear here...'
            className="w-full h-64 p-3 font-mono text-sm border border-border rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDecode}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          Decode
        </button>
        <button
          onClick={handleCopy}
          disabled={!output}
          className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm inline-flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
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
        <h3 className="font-semibold text-sm mb-2">Example:</h3>
        <p className="text-xs text-muted-foreground mb-2">Input: SGVsbG8gV29ybGQ=</p>
        <p className="text-xs text-muted-foreground">Output: Hello World</p>
      </div>
    </div>
  )
}
