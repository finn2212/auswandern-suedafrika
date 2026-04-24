// Extract plain text from a Nuxt Content minimark body tree and estimate reading time.
// Nuxt Content v3 body shape: { type: 'minimark', value: [...nodes] }
// Each node is either a string or ['tag', props, ...children]

function extractText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) {
    const [, , ...children] = node as [unknown, unknown, ...unknown[]]
    return children.map(extractText).join(' ')
  }
  if (node && typeof node === 'object' && 'value' in node) {
    return extractText((node as { value: unknown }).value)
  }
  return ''
}

export function useReadingTime(body: unknown, wordsPerMinute = 220): {
  words: number
  minutes: number
  label: string
} {
  const text = extractText(body)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / wordsPerMinute))
  return {
    words,
    minutes,
    label: `${minutes} Min. Lesezeit`,
  }
}
