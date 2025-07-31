import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, MessageSquare, Calendar, Users, Ticket, ArrowRight, TrendingUp, MapPin } from "lucide-react"
import { FeatureModal } from "./feature-modal"

const features = [
  {
    id: "seat-management",
    title: "Smart Seat Management & Dynamic Pricing",
    description:
      "Optimize revenue with intelligent seat pricing based on demand, show popularity, and historical data. Manage accessibility seating and group bookings effortlessly.",
    longDescription:
      "Transform your box office operations with AI-powered seat management. Our system automatically adjusts pricing based on demand patterns, show popularity, time until performance, and historical sales data. Manage accessibility seating requirements, group sales, and corporate packages all in one place. Real-time availability updates prevent double bookings and optimize revenue for every performance.",
    icon: "ticket",
    color: "text-purple-600",
    benefits: [
      "Dynamic pricing that maximizes revenue per performance",
      "Automated accessibility seating compliance and management",
      "Group sales and corporate package handling",
      "Real-time seat availability across all sales channels",
      "Historical analytics to optimize future pricing strategies",
      "Integration with existing ticketing systems",
    ],
  },
  {
    id: "patron-relationships",
    title: "Patron Relationship Management",
    description:
      "Build lasting relationships with your audience. Track patron preferences, purchase history, and engagement to create personalized experiences that keep them coming back.",
    longDescription:
      "Go beyond basic customer data with comprehensive patron relationship management designed for theaters. Track individual preferences, seating choices, show attendance history, and engagement patterns. Create targeted marketing campaigns for different patron segments, manage season ticket holders, and identify your most valuable patrons for VIP treatment.",
    icon: "users",
    color: "text-blue-600",
    benefits: [
      "Complete patron profiles with preferences and history",
      "Season ticket holder management and renewal automation",
      "Segmented marketing campaigns based on show preferences",
      "VIP patron identification and special treatment tracking",
      "Donation and membership management integration",
      "Automated birthday and anniversary communications",
    ],
  },
  {
    id: "show-scheduling",
    title: "Show & Event Management",
    description:
      "Streamline your entire season from planning to performance. Manage show schedules, artist contracts, venue rentals, and coordinate all moving parts seamlessly.",
    longDescription:
      "Comprehensive show and event management that handles every aspect of your theater operations. From initial season planning to final curtain call, manage show schedules, artist and crew contracts, rehearsal spaces, venue rentals for special events, and coordinate marketing timelines. Built-in conflict detection prevents double bookings and ensures smooth operations.",
    icon: "calendar",
    color: "text-green-600",
    benefits: [
      "Complete season planning and show scheduling",
      "Artist and crew contract management",
      "Venue rental coordination for special events",
      "Rehearsal space and resource scheduling",
      "Marketing timeline coordination",
      "Conflict detection and resolution tools",
    ],
  },
  {
    id: "revenue-analytics",
    title: "Theater Revenue Analytics",
    description:
      "Deep insights into your theater's financial performance. Track revenue by show, season, patron segment, and identify opportunities for growth.",
    longDescription:
      "Powerful analytics designed specifically for theater operations. Track revenue performance by individual shows, entire seasons, patron segments, and sales channels. Identify your most profitable shows, understand patron spending patterns, and forecast future performance. Compare year-over-year performance and get actionable insights to improve your bottom line.",
    icon: "trending",
    color: "text-orange-600",
    benefits: [
      "Revenue tracking by show, season, and patron segment",
      "Profitability analysis for individual productions",
      "Patron lifetime value and spending pattern analysis",
      "Sales channel performance comparison",
      "Forecasting and budgeting tools for future seasons",
      "Automated financial reporting for stakeholders",
    ],
  },
  {
    id: "ar-theater",
    title: "Virtual Theater Tours & Seat Preview",
    description:
      "Let patrons explore your theater virtually before they buy. Upload photos to create immersive AR experiences showing the view from any seat in your venue.",
    longDescription:
      "Revolutionary AR technology that transforms how patrons experience your theater before they visit. Simply upload 3-4 photos of your theater interior, and our AI creates a fully immersive AR environment. Patrons can virtually walk through your space, see the exact view from their potential seats, and understand sight lines for specific performances. This reduces customer service calls and increases booking confidence, especially for first-time visitors.",
    icon: "camera",
    color: "text-indigo-600",
    benefits: [
      "Create immersive AR experiences from just 3-4 photos",
      "Show exact sight lines and stage visibility from any seat",
      "Reduce customer service calls about seating questions",
      "Increase booking confidence for first-time patrons",
      "Mobile-friendly AR that works on any device",
      "Integration with your existing seating charts and ticketing",
    ],
    comingSoon: true,
  },
  {
    id: "theater-ai",
    title: "Theater Operations AI Assistant",
    description:
      "AI assistant trained specifically on theater operations. Get instant answers about bookings, show performance, patron inquiries, and operational decisions.",
    longDescription:
      "Meet your new AI assistant, specifically trained on theater operations, box office management, and patron services. Using advanced RAG technology, it understands theater terminology, industry best practices, and common operational challenges. Access your venue's specific data to get personalized insights about show performance, patron behavior, and operational efficiency. Perfect for training new staff and providing 24/7 operational support.",
    icon: "message",
    color: "text-rose-600",
    benefits: [
      "Trained specifically on theater operations and terminology",
      "Instant access to your venue's performance and patron data",
      "Natural language queries for complex box office questions",
      "24/7 support for staff training and operational questions",
      "Show performance analysis and recommendations",
      "Patron service automation and response suggestions",
    ],
    comingSoon: true,
  },
]

const iconMap = {
  camera: Camera,
  message: MessageSquare,
  calendar: Calendar,
  users: Users,
  ticket: Ticket,
  trending: TrendingUp,
  mappin: MapPin,
}

export function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Theater Operations</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Every feature designed specifically for theaters, from box office management to patron relationships and show
          operations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Ticket
          return (
            <FeatureModal key={feature.id} feature={feature}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                <CardHeader className="text-center relative">
                  {feature.comingSoon && (
                    <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
                      Coming Soon
                    </Badge>
                  )}
                  <IconComponent
                    className={`h-12 w-12 ${feature.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  />
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">{feature.description}</CardDescription>
                  <div className="flex items-center justify-center text-sm text-purple-600 font-medium group-hover:text-purple-700">
                    Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </FeatureModal>
          )
        })}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Ready to revolutionize your theater operations?</p>
        <a href="#waitlist" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
          Join the waitlist for early access
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
