import { NextResponse } from 'next/server'
import { truncateDb } from '@/lib/db/truncate'

export async function GET() {
  await truncateDb()
  return NextResponse.json({})
}
