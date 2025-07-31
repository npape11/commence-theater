import Image from "next/image"

export function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="md:col-span-2">
            <Image
              src="/commence-logo.png"
              alt="Commence"
              width={180}
              height={40}
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm mb-4">
              A trusted name in CRM solutions for over 25 years, building the future of customer relationship
              management.
            </p>
            <p className="text-gray-400 text-sm">
              Join our waitlist to be the first to experience our next-generation CRM platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Software Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://commence.com/software-features/" className="hover:text-white transition-colors">
                  All Features
                </a>
              </li>
              <li>
                <a href="https://commence.com/lead-management/" className="hover:text-white transition-colors">
                  Lead Management
                </a>
              </li>
              <li>
                <a href="https://commence.com/sales-opportunity/" className="hover:text-white transition-colors">
                  Sales Opportunity
                </a>
              </li>
              <li>
                <a
                  href="https://commence.com/account-contact-management/"
                  className="hover:text-white transition-colors"
                >
                  Contact Management
                </a>
              </li>
              <li>
                <a href="https://commence.com/reporting-analytics/" className="hover:text-white transition-colors">
                  Reporting & Analytics
                </a>
              </li>
              <li>
                <a href="https://commence.com/commence-mobile/" className="hover:text-white transition-colors">
                  Mobile CRM
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://commence.com/service/" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="https://commence.com/service/sales-enablement/" className="hover:text-white transition-colors">
                  Sales Enablement
                </a>
              </li>
              <li>
                <a
                  href="https://commence.com/service/marketing-enablement/"
                  className="hover:text-white transition-colors"
                >
                  Marketing Enablement
                </a>
              </li>
              <li>
                <a href="https://commence.com/service/lead-generation/" className="hover:text-white transition-colors">
                  Lead Generation
                </a>
              </li>
              <li>
                <a href="https://commence.com/customer-support/" className="hover:text-white transition-colors">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="https://commence.com/online-crm-training/" className="hover:text-white transition-colors">
                  CRM Training
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://commence.com/about/" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://commence.com/pricing/" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="https://commence.com/testimonials/" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="https://commence.com/about/partner-program/" className="hover:text-white transition-colors">
                  Partner Program
                </a>
              </li>
              <li>
                <a href="https://commence.com/contact-us/" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://commence.com/support/" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Commence Corporation. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="https://commence.com/privacy-policy/" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="https://commence.com/terms-of-use/" className="hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="https://commence.com/gdpr-compliance/" className="hover:text-white transition-colors">
                GDPR Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
