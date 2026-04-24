import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // All content lives under content/{de,en}/ — one collection, locale is resolved
    // from the path prefix (/de/... or /en/...). Pages query by locale-scoped path.
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
  },
})
