'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolInput,
  ToolPanel,
  ToolSelect,
  ToolStat,
} from '@/components/tools/tool-ui'

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

function convertValue(type: UnitType, value: string, from: string, to: string): number | null {
  const v = parseFloat(value)
  if (Number.isNaN(v)) return null

  if (type === 'temperature') {
    const toC = (CONVERSIONS.temperature[from] as (n: number) => number)(v)
    return FROM_TEMP[to](toC)
  }

  const base = v / (CONVERSIONS[type][from] as number)
  return base * (CONVERSIONS[type][to] as number)
}

export function UnitConverter() {
  const [type, setType] = useState<UnitType>('length')
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('ft')

  useEffect(() => {
    setFrom(UNITS[type][0].id)
    setTo(UNITS[type][1]?.id ?? UNITS[type][0].id)
  }, [type])

  const result = useMemo(
    () => convertValue(type, value, from, to),
    [type, value, from, to],
  )

  const toLabel = UNITS[type].find((u) => u.id === to)?.label ?? to
  const resultText = result !== null ? `${result.toFixed(6).replace(/\.?0+$/, '')} ${toLabel}` : ''

  const swap = () => {
    setFrom(to)
    setTo(from)
    if (result !== null) setValue(String(result))
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {(['length', 'weight', 'temperature'] as UnitType[]).map((t) => (
          <Button
            key={t}
            type="button"
            size="sm"
            variant={type === t ? 'default' : 'outline'}
            onClick={() => setType(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <ToolPanel label="Value">
          <ToolInput type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </ToolPanel>
        <Button type="button" variant="outline" size="sm" onClick={swap} className="sm:mb-0.5">
          ⇄ Swap
        </Button>
        <div className="hidden sm:block" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="From">
          <ToolSelect value={from} onChange={(e) => setFrom(e.target.value)}>
            {UNITS[type].map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </ToolSelect>
        </ToolPanel>
        <ToolPanel label="To">
          <ToolSelect value={to} onChange={(e) => setTo(e.target.value)}>
            {UNITS[type].map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </ToolSelect>
        </ToolPanel>
      </div>

      {result !== null && (
        <ToolStat label="Result" value={result.toFixed(4)} accent />
      )}

      <ToolActions>
        <ToolCopyButton text={resultText} label="Copy result" disabled={!resultText} />
        <ToolClearButton
          onClear={() => {
            setValue('1')
            setType('length')
            setFrom('m')
            setTo('ft')
          }}
        />
      </ToolActions>
    </div>
  )
}
