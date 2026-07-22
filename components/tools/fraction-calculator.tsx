'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

type Operation = 'add' | 'subtract' | 'multiply' | 'divide'

function parseFraction(value: string): { num: number; den: number } | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (trimmed.includes('/')) {
    const [n, d] = trimmed.split('/').map((part) => Number(part.trim()))
    if (Number.isNaN(n) || Number.isNaN(d) || d === 0) return null
    return { num: n, den: d }
  }
  const whole = Number(trimmed)
  if (Number.isNaN(whole)) return null
  return { num: whole, den: 1 }
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

function simplify(num: number, den: number): { num: number; den: number } {
  if (den < 0) {
    num = -num
    den = -den
  }
  const g = gcd(num, den)
  return { num: num / g, den: den / g }
}

function operate(a: { num: number; den: number }, b: { num: number; den: number }, op: Operation) {
  switch (op) {
    case 'add':
      return simplify(a.num * b.den + b.num * a.den, a.den * b.den)
    case 'subtract':
      return simplify(a.num * b.den - b.num * a.den, a.den * b.den)
    case 'multiply':
      return simplify(a.num * b.num, a.den * b.den)
    case 'divide':
      if (b.num === 0) return null
      return simplify(a.num * b.den, a.den * b.num)
  }
}

export function FractionCalculator() {
  const [first, setFirst] = useState('1/2')
  const [second, setSecond] = useState('1/4')
  const [operation, setOperation] = useState<Operation>('add')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    const a = parseFraction(first)
    const b = parseFraction(second)
    if (!a || !b) {
      setError('Enter valid fractions like 3/4 or whole numbers like 2')
      setResult(null)
      return
    }
    const value = operate(a, b, operation)
    if (!value) {
      setError('Cannot divide by zero')
      setResult(null)
      return
    }
    setResult(value.den === 1 ? `${value.num}` : `${value.num}/${value.den}`)
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {([
          ['add', '+ Add'],
          ['subtract', '− Subtract'],
          ['multiply', '× Multiply'],
          ['divide', '÷ Divide'],
        ] as const).map(([op, label]) => (
          <Button
            key={op}
            type="button"
            variant={operation === op ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOperation(op)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">First fraction</label>
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            placeholder="1/2"
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Second fraction</label>
          <input
            type="text"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            placeholder="1/4"
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <Button type="button" onClick={calculate}>Calculate</Button>
      {result && <ToolStat label="Result" value={result} accent />}
    </div>
  )
}
