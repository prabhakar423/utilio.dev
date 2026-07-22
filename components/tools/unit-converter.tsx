'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type UnitType = 'length' | 'weight' | 'temperature'

const CONVERSIONS: Record<string, Record<string, number | ((v: number) => number)>> = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084, in: 39.3701, yd: 1.09361 },
  weight: { kg: 1, g: 1000, mg: 1e6, lb: 2.20462, oz: 35.274, t: 0.001 },
  temperature: {
    c: (v) => v,
    f: (v) => (v - 32) * 5 / 9,
    k: (v) => v - 273.15,
  },
}

const FROM_TEMP: Record<string, (v: number) => number> = {
  c: (v) => v,
  f: (v) => (v * 9 / 5) + 32,
  k: (v) => v + 273.15,
}

const UNITS: Record<UnitType, { id: string; label: string }[]> = {
  length: [
    { id: 'm', label: 'Meters' }, { id: 'km', label: 'Kilometers' }, { id: 'cm', label: 'Centimeters' },
    { id: 'mm', label: 'Millimeters' }, { id: 'mi', label: 'Miles' }, { id: 'ft', label: 'Feet' },
    { id: 'in', label: 'Inches' }, { id: 'yd', label: 'Yards' },
  ],
  weight: [
    { id: 'kg', label: 'Kilograms' }, { id: 'g', label: 'Grams' }, { id: 'mg', label: 'Milligrams' },
    { id: 'lb', label: 'Pounds' }, { id: 'oz', label: 'Ounces' }, { id: 't', label: 'Metric tons' },
  ],
  temperature: [
    { id: 'c', label: 'Celsius' }, { id: 'f', label: 'Fahrenheit' }, { id: 'k', label: 'Kelvin' },
  ],
}

export function UnitConverter() {
  const [type, setType] = useState<UnitType>('length')
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('ft')
  const [result, setResult] = useState<number | null>(null)

  const convert = () => {
    const v = parseFloat(value)
    if (Number.isNaN(v)) { setResult(null); return }

    if (type === 'temperature') {
      const toC = (CONVERSIONS.temperature[from] as (n: number) => number)(v)
      setResult(FROM_TEMP[to](toC))
    } else {
      const base = v / (CONVERSIONS[type][from] as number)
      setResult(base * (CONVERSIONS[type][to] as number))
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        {(['length', 'weight', 'temperature'] as UnitType[]).map((t) => (
          <Button key={t} type="button" size="sm" variant={type === t ? 'default' : 'outline'}
            onClick={() => { setType(t); setFrom(UNITS[t][0].id); setTo(UNITS[t][1]?.id ?? UNITS[t][0].id); setResult(null) }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
          className="rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
        <select value={from} onChange={(e) => setFrom(e.target.value)}
          className="rounded-xl border border-border/80 px-4 py-2.5 text-sm">
          {UNITS[type].map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)}
          className="rounded-xl border border-border/80 px-4 py-2.5 text-sm">
          {UNITS[type].map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
        </select>
      </div>
      <Button type="button" onClick={convert}>Convert</Button>
      {result !== null && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <div className="text-2xl font-bold text-primary">{result.toFixed(4)}</div>
          <div className="mt-1 text-sm text-muted-foreground">{UNITS[type].find((u) => u.id === to)?.label}</div>
        </div>
      )}
    </div>
  )
}
