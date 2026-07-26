'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function calculateAge(birthDate: string) {
  if (!birthDate) return null

  const birth = new Date(birthDate)
  const today = new Date()
  if (birth > today) return null

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    months--
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))

  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1)
  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )

  return { years, months, days, totalDays, daysUntilBirthday }
}

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const maxDate = new Date().toISOString().split('T')[0]

  const age = useMemo(() => calculateAge(birthDate), [birthDate])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Date of birth">
        <ToolInput
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={maxDate}
        />
      </ToolPanel>

      {birthDate && !age && (
        <p className="text-sm text-destructive">Birth date cannot be in the future.</p>
      )}

      {age && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ToolStat label="Years" value={age.years} accent />
            <ToolStat label="Months" value={age.months} />
            <ToolStat label="Days" value={age.days} />
            <ToolStat label="Total days" value={age.totalDays.toLocaleString()} />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ToolStat label="Next birthday in" value={`${age.daysUntilBirthday} days`} accent />
            <ToolStat label="Total hours" value={(age.totalDays * 24).toLocaleString()} />
            <ToolStat label="Total minutes" value={(age.totalDays * 24 * 60).toLocaleString()} />
          </div>
        </>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => setBirthDate('')} />
      </ToolActions>
    </div>
  )
}
