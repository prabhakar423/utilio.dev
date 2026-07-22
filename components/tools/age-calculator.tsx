'use client'

import { useState } from 'react'

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
  } | null>(null)

  const handleCalculate = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))

    setAge({ years, months, days, totalDays })
  }

  const getNextBirthday = () => {
    if (!birthDate) return null
    const birth = new Date(birthDate)
    const today = new Date()
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }
    const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil
  }

  const maxDate = new Date().toISOString().split('T')[0]

  return (
    <div className="grid gap-4">
      <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
        <div>
          <label className="block text-sm font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={maxDate}
            className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          onClick={handleCalculate}
          disabled={!birthDate}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Calculate Age
        </button>
      </div>

      {age && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary">{age.years}</div>
              <div className="text-xs text-muted-foreground mt-1">Years</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary">{age.months}</div>
              <div className="text-xs text-muted-foreground mt-1">Months</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary">{age.days}</div>
              <div className="text-xs text-muted-foreground mt-1">Days</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <div className="text-3xl font-bold text-accent">{age.totalDays.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Days</div>
            </div>
          </div>

          {getNextBirthday() !== null && (
            <div className="p-4 rounded-lg bg-secondary border border-border">
              <div className="text-sm font-medium text-foreground mb-1">Next Birthday In:</div>
              <div className="text-2xl font-bold text-primary">{getNextBirthday()} days</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm font-medium text-foreground mb-1">Total Hours</div>
              <div className="text-xl font-bold text-primary">{(age.totalDays * 24).toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm font-medium text-foreground mb-1">Total Minutes</div>
              <div className="text-xl font-bold text-primary">{(age.totalDays * 24 * 60).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
