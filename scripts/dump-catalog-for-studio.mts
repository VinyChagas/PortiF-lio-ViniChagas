import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { projects } from '../src/data/projects/catalog'
import { technologies } from '../src/data/technologies'
import { projectStatuses } from '../src/data/projects/status'
import { projectCategories } from '../src/data/projects/categories'

function serialize(value: unknown): unknown {
  if (value == null) return value
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value
  if (Array.isArray(value)) return value.map(serialize)
  if (typeof value === 'object') {
    // Vite may turn image imports into strings (URLs)
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = serialize(v)
    }
    return out
  }
  return String(value)
}

const payload = {
  exportedAt: new Date().toISOString(),
  source: {
    system: 'portfolio-vinichagas',
    repoPath: resolve('.'),
    catalogFile: 'src/data/projects/catalog.ts',
  },
  technologies: serialize(technologies),
  statuses: projectStatuses,
  categories: projectCategories,
  projects: serialize(projects),
}

const out = resolve('/tmp/portfolio-migrate/catalog-export.json')
writeFileSync(out, JSON.stringify(payload, null, 2))
console.log(JSON.stringify({ ok: true, out, count: (projects as unknown[]).length }))
