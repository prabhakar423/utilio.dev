export const privacyMetaSuffix = ' Runs locally in your browser — no upload.'

export const localProcessingBadge = 'Runs locally · No upload'

/** Trim description to fit ~160 chars with privacy suffix for meta tags. */
export function withPrivacyMetaDescription(description: string): string {
  const max = 160
  if (description.includes('browser') || description.includes('upload')) {
    return description.length <= max ? description : `${description.slice(0, max - 3).trimEnd()}...`
  }
  if (description.length + privacyMetaSuffix.length <= max) {
    return description + privacyMetaSuffix
  }
  const trimmed = description.slice(0, max - privacyMetaSuffix.length - 3).trimEnd()
  return `${trimmed}...${privacyMetaSuffix}`
}
