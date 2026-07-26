'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'JOIN', 'LEFT', 'RIGHT', 'INNER',
  'OUTER', 'ON', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT',
  'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP',
  'INDEX', 'VIEW', 'DISTINCT', 'UNION', 'ALL', 'NULL', 'IS', 'LIKE', 'BETWEEN',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'PRIMARY', 'KEY', 'FOREIGN',
  'REFERENCES', 'DEFAULT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
]

const EXAMPLE = 'SELECT id, name FROM users WHERE active = 1 ORDER BY created_at DESC'

function formatSql(input: string): string {
  let sql = input.replace(/\s+/g, ' ').trim()
  KEYWORDS.forEach((kw) => {
    sql = sql.replace(new RegExp(`\\b${kw}\\b`, 'gi'), kw)
  })
  const breakBefore = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
    'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'UNION', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET',
  ]
  breakBefore.forEach((kw) => {
    sql = sql.replace(new RegExp(`\\b${kw}\\b`, 'g'), `\n${kw}`)
  })
  return sql.trim()
}

export function SqlFormatter() {
  const [input, setInput] = useShareableInput('')

  const output = useMemo(() => (input.trim() ? formatSql(input) : ''), [input])

  return (
    <div className="grid gap-5">
      <ToolPanel label="SQL input">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT * FROM users WHERE active = 1"
        />
      </ToolPanel>

      {output && (
        <ToolPanel label="Formatted SQL">
          <ToolTextarea value={output} readOnly className="min-h-48" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
        <Button type="button" variant="outline" onClick={() => setInput(EXAMPLE)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <p className="font-mono">{EXAMPLE}</p>
      </ToolExample>
    </div>
  )
}
