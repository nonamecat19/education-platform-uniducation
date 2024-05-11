import { db } from '@/lib/db'
import { PgTable } from 'drizzle-orm/pg-core'

function getRandomElement<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

export function getRandomElementId<T extends { id: string }>(arr: T[]): string {
  const element = getRandomElement(arr)
  return element.id
}

export function getSeed<T>(count: number, makeRow: () => T): T[] {
  const rows: T[] = []

  for (let i = 0; i < count; i++) {
    rows.push(makeRow())
  }

  return rows
}

export function getEntityIds(entity: PgTable): Promise<{ id: string }[]> {
  return db
    .select({
      // @ts-ignore
      id: entity.id,
    })
    .from(entity)
}
