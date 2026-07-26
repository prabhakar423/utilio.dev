'use client'

import { useEffect } from 'react'

export function useToolShortcut(handler: () => void, key = 'Enter', withModifier = true) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modifierOk = withModifier ? event.metaKey || event.ctrlKey : true
      if (modifierOk && event.key === key) {
        event.preventDefault()
        handler()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handler, key, withModifier])
}
