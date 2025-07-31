import Image from "next/image"
import { NavbarClient } from "./navbar-client"

export function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Server rendered */}
          <div className="flex items-center space-x-2">
            <Image
              src="/commence-logo.png"
              alt="Commence - A Trusted Name in CRM"
              width={180}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Client-side navigation for interactivity */}
          <NavbarClient />
        </div>
      </div>
    </nav>
  )
}
