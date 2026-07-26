'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

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

function simplify(num: number, den: number) {
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

  const { result, error } = useMemo(() => {
    const a = parseFraction(first)
    const b = parseFraction(second)
    if (!first.trim() || !second.trim()) return { result: null, error: '' }
    if (!a || !b) return { result: null, error: 'Enter valid fractions like 3/4 or whole numbers like 2' }
    const value = operate(a, b, operation)
    if (!value) return { result: null, error: 'Cannot divide by zero' }
    return {
      result: value.den === 1 ? `${value.num}` : `${value.num}/${value.den}`,
      error: '',
    }
  }, [first, second, operation])

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['add', '+ Add'],
            ['subtract', '− Subtract'],
            ['multiply', '× Multiply'],
            ['divide', '÷ Divide'],
          ] as const
        ).map(([op, label]) => (
          <Button key={op} type="button" variant={operation === op ? 'default' : 'outline'} size="sm" onClick={() => setOperation(op)}>
            {label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="First fraction">
          <ToolInput type="text" value={first} onChange={(e) => setFirst(e.target.value)} placeholder="1/2" className="font-mono" />
        </ToolPanel>
        <ToolPanel label="Second fraction">
          <ToolInput type="text" value={second} onChange={(e) => setSecond(e.target.value)} placeholder="1/4" className="font-mono" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}
      {result && <ToolStat label="Result" value={result} accent />}

      <ToolActions>
        <ToolClearButton onClear={() => { setFirst('1/2'); setSecond('1/4'); setOperation('add') }} />
      </ToolActions>
    </div>
  )
}
