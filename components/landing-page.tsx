"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  HomeIcon as House,
  Ruler,
  Sun,
  TreePalm,
  DollarSign,
  Settings,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react"

interface LandingPageProps {
  onNavigate: (page: "landing" | "login" | "dashboard") => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#102323] text-white font-['Space_Grotesk']">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-3 border-b border-[#224949]">
        <div className="flex items-center gap-4">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold">MODELUM</h2>
        </div>
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-9">
            <a href="#" className="text-sm font-medium hover:text-[#0cf2f2] transition-colors">
              Product
            </a>
            <a href="#" className="text-sm font-medium hover:text-[#0cf2f2] transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium hover:text-[#0cf2f2] transition-colors">
              Resources
            </a>
          </nav>
          <div className="flex gap-2">
            <Button
              onClick={() => onNavigate("dashboard")}
              className="bg-[#0cf2f2] text-[#102323] hover:bg-[#0cf2f2]/90 font-bold"
            >
              Get Started
            </Button>
            <Button
              onClick={() => onNavigate("login")}
              variant="outline"
              className="bg-[#224949] border-[#224949] text-white hover:bg-[#316868] font-bold"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      <div className="px-40 py-5">
        <div className="max-w-[960px] mx-auto">
          {/* Hero Section */}
          <div
            className="relative min-h-[480px] flex flex-col justify-end px-10 pb-10 rounded-xl bg-gradient-to-b from-black/10 to-black/40 bg-cover bg-center mb-8"
            style={{ backgroundImage: `url('/placeholder.svg?height=480&width=960&text=Modern+Architecture')` }}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-black leading-tight tracking-tight">Build Like a Pro, Without the Pro</h1>
                <p className="text-base leading-normal opacity-90">
                  Enter your vision. Let AI design your blueprint in 10 minutes. Experience the future of home design
                  with MODELUM.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => onNavigate("dashboard")}
                  size="lg"
                  className="bg-[#0cf2f2] text-[#102323] hover:bg-[#0cf2f2]/90 font-bold"
                >
                  Try Modelum
                </Button>
                <Button
                  onClick={() => onNavigate("dashboard")}
                  size="lg"
                  variant="outline"
                  className="bg-[#224949] border-[#224949] text-white hover:bg-[#316868] font-bold"
                >
                  Generate Now
                </Button>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  title: "Input Your Preferences",
                  description:
                    "Tell us about your lifestyle, family size, and design preferences. Our AI adapts to your specific needs.",
                  image: "/placeholder.svg?height=200&width=300&text=Input+Preferences",
                },
                {
                  title: "AI Generates Your Blueprint",
                  description:
                    "Our advanced AI algorithms create a custom home blueprint tailored to your input, optimizing for space and functionality.",
                  image: "/placeholder.svg?height=200&width=300&text=AI+Generation",
                },
                {
                  title: "Review and Refine",
                  description:
                    "Review the generated blueprint, make adjustments, and finalize your dream home design with ease.",
                  image: "/placeholder.svg?height=200&width=300&text=Review+Design",
                },
              ].map((step, index) => (
                <div key={index} className="space-y-3">
                  <div className="aspect-video bg-[#224949] rounded-xl overflow-hidden">
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{step.title}</h3>
                    <p className="text-[#90cbcb] text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: House,
                  title: "Lifestyle Design",
                  description: "Tailor every aspect of your home to fit your unique lifestyle and preferences.",
                },
                {
                  icon: Ruler,
                  title: "Precise Measurements",
                  description: "Receive accurate measurements and detailed specifications for construction.",
                },
                {
                  icon: Sun,
                  title: "Natural Light Optimization",
                  description: "Maximize natural light exposure in your home for bright, inviting spaces.",
                },
                {
                  icon: TreePalm,
                  title: "Sustainable Design",
                  description: "Incorporate eco-friendly materials and energy-efficient designs.",
                },
                {
                  icon: DollarSign,
                  title: "Budget Estimator",
                  description: "Get reliable cost estimates to plan your budget effectively.",
                },
                {
                  icon: Settings,
                  title: "10-Minute Delivery",
                  description: "Generate professional blueprints in just 10 minutes with AI.",
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-[#183434] border-[#316868] p-4">
                  <CardContent className="p-0 space-y-3">
                    <feature.icon className="h-6 w-6 text-white" />
                    <div>
                      <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-[#90cbcb] text-sm">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8">Use Cases</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: "First-Time Homebuyers",
                  description: "Design your dream starter home with a focus on affordability and future expansion.",
                  image: "/placeholder.svg?height=200&width=200&text=First+Home",
                },
                {
                  title: "Growing Families",
                  description:
                    "Create a spacious and functional home that accommodates your family's needs and activities.",
                  image: "/placeholder.svg?height=200&width=200&text=Family+Home",
                },
                {
                  title: "Empty Nesters",
                  description: "Downsize to a comfortable and low-maintenance home that suits your evolving lifestyle.",
                  image: "/placeholder.svg?height=200&width=200&text=Retirement+Home",
                },
              ].map((useCase, index) => (
                <div key={index} className="space-y-3">
                  <div className="aspect-square bg-[#224949] rounded-xl overflow-hidden">
                    <img
                      src={useCase.image || "/placeholder.svg"}
                      alt={useCase.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{useCase.title}</h3>
                    <p className="text-[#90cbcb] text-sm">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8">Testimonials</h2>
            <div
              className="relative bg-gradient-to-t from-black/40 to-transparent rounded-xl overflow-hidden min-h-[200px] flex items-end p-6"
              style={{ backgroundImage: `url('/placeholder.svg?height=200&width=960&text=Happy+Customer')` }}
            >
              <div className="max-w-[440px]">
                <p className="text-2xl font-bold mb-2">
                  "MODELUM transformed our vision into reality. The AI-generated blueprint was incredibly detailed and
                  saved us weeks of planning."
                </p>
                <p className="font-medium">Sarah Miller, Homeowner</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-20">
            <div className="max-w-[720px] mx-auto space-y-6">
              <h1 className="text-4xl font-black leading-tight">Build Your Dream Home with MODELUM</h1>
              <p className="text-base">
                Experience the future of home design. Create your perfect blueprint in minutes.
              </p>
              <Button
                onClick={() => onNavigate("dashboard")}
                size="lg"
                className="bg-[#0cf2f2] text-[#102323] hover:bg-[#0cf2f2]/90 font-bold px-8"
              >
                Start Designing
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#224949] py-10">
        <div className="max-w-[960px] mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {["Product", "Pricing", "Resources", "Contact", "Terms of Service", "Privacy Policy"].map((link) => (
              <a key={link} href="#" className="text-[#90cbcb] hover:text-white transition-colors min-w-40 text-center">
                {link}
              </a>
            ))}
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <Twitter className="h-6 w-6 text-[#90cbcb] hover:text-white cursor-pointer transition-colors" />
            <Instagram className="h-6 w-6 text-[#90cbcb] hover:text-white cursor-pointer transition-colors" />
            <Facebook className="h-6 w-6 text-[#90cbcb] hover:text-white cursor-pointer transition-colors" />
          </div>
          <p className="text-[#90cbcb] text-center">© 2023 MODELUM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
