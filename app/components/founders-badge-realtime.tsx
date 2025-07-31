"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

export function FoundersBadgeRealtime() {
  const [claimed, setClaimed] = useState(0)
  const [remaining, setRemaining] = useState(100)

  useEffect(() => {
    // Function to fetch and update counts
    async function updateCounts() {
      try {
        const { count: foundersCount } = await supabase
          .from("waitlist")
          .select("id", { count: "exact", head: true })
          .eq("founders", true)

        const newClaimed = foundersCount || 0
        const newRemaining = Math.max(0, 100 - newClaimed)

        setClaimed(newClaimed)
        setRemaining(newRemaining)
      } catch (error) {
        console.error("Error fetching founders count:", error)
      }
    }

    // Get initial count
    updateCounts()

    // Subscribe to changes
    const channel = supabase
      .channel("waitlist-founders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "waitlist",
          filter: "founders=true"
        },
        // Just update counts when any change occurs
        () => updateCounts()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
      <Star className="h-6 w-6 text-purple-600 fill-purple-600" />
      <div className="text-center">
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 mb-2">
          Theater Founders Club
        </Badge>
        <p className="text-sm font-medium text-gray-700">{claimed} / 100 Theater Founders joined</p>
        <p className="text-xs text-gray-500">
          {remaining > 0 ? `${remaining} exclusive spots remaining` : "All founding spots claimed!"}
        </p>
      </div>
    </div>
  )
}
