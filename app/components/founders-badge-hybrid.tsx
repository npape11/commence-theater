"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

interface FoundersBadgeHybridProps {
  initialClaimed: number
  initialRemaining: number
}

export function FoundersBadgeHybrid({ initialClaimed, initialRemaining }: FoundersBadgeHybridProps) {
  const [claimed, setClaimed] = useState(initialClaimed)
  const [remaining, setRemaining] = useState(initialRemaining)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Mark as hydrated after initial render
    setIsHydrated(true)

    // Set up real-time subscription using ANON key only
    const channel = supabase
      .channel("waitlist-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "waitlist",
        },
                  async (payload) => {
            // Real-time update received

          try {
            const { count: foundersCount } = await supabase
              .from("waitlist")
              .select("*", { count: "exact", head: true })
              .eq("founders", true)

            const newClaimed = foundersCount || 0
            const newRemaining = Math.max(0, 100 - newClaimed)

            setClaimed(newClaimed)
            setRemaining(newRemaining)
          } catch (error) {
            console.error("Error fetching updated founders count:", error)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3 sm:p-4" suppressHydrationWarning>
      <Star className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 fill-purple-600" />
      <div className="text-center">
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 mb-1 sm:mb-2 text-xs sm:text-sm">
          Theater Founders Club
        </Badge>
        <p className="text-xs sm:text-sm font-medium text-gray-700">{claimed} / 100 Theater Founders joined</p>
        <p className="text-xs text-gray-500">
          {remaining > 0 ? `${remaining} exclusive spots remaining` : "All founding spots claimed!"}
        </p>
        {!isHydrated && (
          <p className="text-xs text-gray-400 mt-1">Loading real-time updates...</p>
        )}
      </div>
    </div>
  )
} 