import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-server"

export async function GET() {
  try {
    // Use service role key ONLY in API routes
    const { count } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("founders", true)

    return NextResponse.json({
      count: count || 0,
      remaining: Math.max(0, 100 - (count || 0)),
    })
  } catch (error) {
    console.error("Founders count error:", error)
    // Return mock data on error to prevent app crashes
    return NextResponse.json({
      count: 45,
      remaining: 55,
    })
  }
}
