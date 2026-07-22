'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'JOIN', 'LEFT', 'RIGHT', 'INNER',
  'OUTER', 'ON', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT',
  'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP',
  'INDEX', 'VIEW', 'DISTINCT', 'UNION', 'ALL', 'NULL', 'IS', 'LIKE', 'BETWEEN',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'PRIMARY', 'KEY', 'FOREIGN',
  'REFERENCES', 'DEFAULT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
]

function formatSql(input: string): string {
  let sql = input.replace(/\s+/g, ' ').trim()
  KEYWORDS.forEach((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi')
    sql = sql.replace(regex, kw)
  })

  const breakBefore = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'UNION', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET']
  breakBefore.forEach((kw) => {
    sql = sql.replace(new RegExp(`\\b${kw}\\b`, 'g'), `\n${kw}`)
  })

  return sql.trim()
}

export function SqlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const format = () => {
    setOutput(formatSql(input))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="SQL input">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC"
        />
      </ToolPanel>

      <ToolActions>
        <Button type="button" onClick={format}>
          Format SQL
        </Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy
        </Button>
      </ToolActions>

      {output && (
        <ToolPanel label="Formatted SQL">
          <ToolTextarea value={output} readOnly className="min-h-48" />
        </ToolPanel>
      )}
    </div>
  )
}
