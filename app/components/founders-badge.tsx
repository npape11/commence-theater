import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface FoundersBadgeProps {
  claimed: number
  remaining: number
}

export function FoundersBadge({ claimed, remaining }: FoundersBadgeProps) {
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