import { runMigrate } from '@/lib/db/migrate'
import { NextResponse } from 'next/server'

export async function GET() {
  await runMigrate()
  return NextResponse.json({})
}
