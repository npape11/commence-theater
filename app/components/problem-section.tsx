export function ProblemSection() {
  return (
    <section className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Theater Management Shouldn't Be This Hard</h2>
        <p className="text-lg text-gray-600 mb-8">
          You're juggling spreadsheets for patron data, struggling with outdated ticketing systems, and spending hours
          on tasks that should be automated. Meanwhile, your patrons expect the seamless digital experience they get
          everywhere else.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Current Challenges</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Disconnected systems for ticketing, patron data, and marketing</li>
              <li>• Manual processes for season planning and show management</li>
              <li>• Limited insights into patron behavior and preferences</li>
              <li>• Difficulty managing group sales and corporate packages</li>
              <li>• Time-consuming box office operations</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Our Solution</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Unified platform designed specifically for theaters</li>
              <li>• Automated workflows for common theater operations</li>
              <li>• Deep patron insights and relationship management</li>
              <li>• Streamlined group sales and revenue optimization</li>
              <li>• AI-powered assistance for daily operations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
