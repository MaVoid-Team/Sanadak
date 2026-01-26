import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days

    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - parseInt(period))

    // Get top sub-locations
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select('sub_location, id')
      .gte('created_at', daysAgo.toISOString())

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Count quotes by sub-location
    const locationCounts = quotes.reduce((acc: any, quote: any) => {
      const location = quote.sub_location || 'Unknown'
      acc[location] = (acc[location] || 0) + 1
      return acc
    }, {})

    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({
        location,
        count,
      }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 10)

    const totalQuotes = quotes.length
    const uniqueLocations = Object.keys(locationCounts).length

    return NextResponse.json({
      topLocations,
      totalQuotes,
      uniqueLocations,
      period,
    })
  } catch (err) {
    console.error('[v0] Analytics error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
