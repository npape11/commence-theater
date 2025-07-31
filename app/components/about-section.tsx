export function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Commence Theater?</h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          For over two decades, Commence has been a trusted name in CRM solutions. Now we're bringing that expertise
          specifically to the theater industry, combining our proven technology with deep understanding of performing
          arts operations.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry Expertise</h3>
            <p className="text-gray-600">
              We understand the unique challenges of theater operations - from season planning and patron relationships
              to box office management and show coordination.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Technology</h3>
            <p className="text-gray-600">
              Built on 25+ years of CRM innovation, our platform combines reliability with cutting-edge features
              designed specifically for the performing arts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
