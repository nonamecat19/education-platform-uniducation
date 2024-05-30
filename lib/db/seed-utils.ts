import { db } from '@/lib/db'
import { PgTable } from 'drizzle-orm/pg-core'

export function getRandomElement<T>(arr: T[]): T {
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

export function getRandomInt(min: number, max: number): number {
  if (min > max) {
    throw new Error('The min value should not be greater than the max value.');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
