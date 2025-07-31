"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, MessageSquare, Calendar, Users, Ticket, Play, ArrowRight, TrendingUp } from "lucide-react"

interface FeatureModalProps {
  children: React.ReactNode
  feature: {
    id: string
    title: string
    description: string
    longDescription: string
    icon: string
    benefits: string[]
    comingSoon?: boolean
  }
}

const iconMap = {
  camera: Camera,
  message: MessageSquare,
  calendar: Calendar,
  users: Users,
  ticket: Ticket,
  trending: TrendingUp,
}

export function FeatureModal({ children, feature }: FeatureModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Ticket

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">{feature.title}</DialogTitle>
                {feature.comingSoon && (
                  <Badge variant="secondary" className="mt-1">
                    Coming Soon
                  </Badge>
                )}
              </div>
            </div>
            <DialogDescription className="text-base leading-relaxed">{feature.longDescription}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Video Placeholder */}
            <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <p className="text-purple-700 text-sm font-medium">Feature Demo Video</p>
                <p className="text-xs text-purple-600">(Coming Soon)</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Benefits for Your Theater:</h4>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-800 mb-3">
                Ready to transform your theater operations? Join our waitlist to be notified when this feature launches!
              </p>
              <Button onClick={() => setIsOpen(false)} className="w-full bg-purple-600 hover:bg-purple-700">
                Join Theater Founders Club
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
