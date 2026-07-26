'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function computeBmi(weight: string, height: string, unit: 'metric' | 'imperial') {
  let w = parseFloat(weight)
  let h = parseFloat(height)
  if (Number.isNaN(w) || Number.isNaN(h) || w <= 0 || h <= 0) return null

  if (unit === 'imperial') {
    w *= 0.453592
    h *= 2.54
  }

  const hM = h / 100
  const bmi = w / (hM * hM)

  let category = 'Normal weight'
  if (bmi < 18.5) category = 'Underweight'
  else if (bmi < 25) category = 'Normal weight'
  else if (bmi < 30) category = 'Overweight'
  else category = 'Obese'

  return { bmi, category }
}

export function BmiCalculator() {
  const [weight, setWeight] = useState('70')
  const [height, setHeight] = useState('175')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')

  const result = useMemo(
    () => computeBmi(weight, height, unit),
    [weight, height, unit],
  )

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant={unit === 'metric' ? 'default' : 'outline'} onClick={() => setUnit('metric')}>
          Metric (kg, cm)
        </Button>
        <Button type="button" size="sm" variant={unit === 'imperial' ? 'default' : 'outline'} onClick={() => setUnit('imperial')}>
          Imperial (lbs, in)
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`}>
          <ToolInput type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </ToolPanel>
        <ToolPanel label={`Height (${unit === 'metric' ? 'cm' : 'in'})`}>
          <ToolInput type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolStat label="BMI" value={result.bmi.toFixed(1)} accent />
          <ToolStat label="Category" value={result.category} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setWeight('70'); setHeight('175') }} />
      </ToolActions>
    </div>
  )
}
