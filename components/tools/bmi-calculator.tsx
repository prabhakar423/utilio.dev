'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function BmiCalculator() {
  const [weight, setWeight] = useState('70')
  const [height, setHeight] = useState('175')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null)

  const calculate = () => {
    let w = parseFloat(weight)
    let h = parseFloat(height)
    if (Number.isNaN(w) || Number.isNaN(h) || w <= 0 || h <= 0) {
      setResult(null)
      return
    }

    if (unit === 'imperial') {
      w = w * 0.453592
      h = h * 2.54
    }

    const hM = h / 100
    const bmi = w / (hM * hM)

    let category = 'Normal weight'
    if (bmi < 18.5) category = 'Underweight'
    else if (bmi < 25) category = 'Normal weight'
    else if (bmi < 30) category = 'Overweight'
    else category = 'Obese'

    setResult({ bmi, category })
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={unit === 'metric' ? 'default' : 'outline'}
          onClick={() => setUnit('metric')}
        >
          Metric (kg, cm)
        </Button>
        <Button
          type="button"
          size="sm"
          variant={unit === 'imperial' ? 'default' : 'outline'}
          onClick={() => setUnit('imperial')}
        >
          Imperial (lbs, in)
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Height ({unit === 'metric' ? 'cm' : 'in'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <Button type="button" onClick={calculate}>
        Calculate BMI
      </Button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolStat label="BMI" value={result.bmi.toFixed(1)} accent />
          <ToolStat label="Category" value={result.category} />
        </div>
      )}
    </div>
  )
}
