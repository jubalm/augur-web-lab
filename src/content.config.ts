import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const review = { placeholder: z.boolean().default(false), needsReview: z.boolean().default(false), source: z.string() };
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(), description: z.string(), publishedAt: z.coerce.date(),
    category: z.enum(['Research', 'Guide', 'Explainer', 'Community', 'Update', 'Report']),
    cover: z.enum(['bonds', 'steps', 'fork', 'field']), readingMinutes: z.number().int().positive(),
    ...review,
  }),
});
const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(), description: z.string(), order: z.number().int().optional(),
    group: z.enum(['Start here', 'For builders', 'Overview', 'Research']),
    terms: z.array(z.string()).default([]), readingMinutes: z.number().int().positive().optional(),
    ...review,
  }),
});
export const collections = { blog, learn };
