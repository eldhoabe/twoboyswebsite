import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Product categories as a content collection rather than a TS data
 * array (contrast with data/stages.ts): each category is a markdown
 * file with structured frontmatter *and* free-form body copy, which
 * is the right shape when non-developers may eventually edit these
 * files directly, or when a category needs a longer written
 * description than a one-line string comfortably holds.
 *
 * The zod schema is the contract — a malformed frontmatter field
 * fails `astro build`/`astro check` instead of shipping broken data.
 */
const products = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    icon: z.enum(['foundation', 'steel', 'pipes', 'roof']),
    order: z.number().int().nonnegative(),
    summary: z.string().max(160),
    brands: z
      .array(
        z.object({
          name: z.string(),
          note: z.string().optional(),
        })
      )
      .min(1),
  }),
});

export const collections = { products };
