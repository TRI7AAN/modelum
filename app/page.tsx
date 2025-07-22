"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#102323] text-white">
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
        <div className="flex gap-2">
          <Button className="bg-[#0cf2f2] text-[#102323] hover:bg-[#0cf2f2]/90 font-bold">Get Started</Button>
          <Button variant="outline" className="bg-[#224949] border-[#224949] text-white hover:bg-[#316868] font-bold">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-10 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black leading-tight">Build Like a Pro, Without the Pro</h1>
            <p className="text-xl text-[#90cbcb] max-w-2xl mx-auto">
              Enter your vision. Let AI design your blueprint in 10 minutes. Experience the future of home design with
              MODELUM.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-[#0cf2f2] text-[#102323] hover:bg-[#0cf2f2]/90 font-bold px-8">
              Try Modelum
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-[#224949] border-[#224949] text-white hover:bg-[#316868] font-bold px-8"
              asChild
            >
              <a href="/blueprint-demo">Blueprint & Chart Demo</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-10 py-20 bg-[#183434]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Lifestyle Design",
                description: "Tailor every aspect of your home to fit your unique lifestyle and preferences.",
              },
              {
                title: "Budget Estimator",
                description: "Get reliable cost estimates to plan your budget effectively.",
              },
              {
                title: "10-Minute Delivery",
                description: "Generate professional blueprints in just 10 minutes with AI.",
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-[#224949] border-[#316868] text-white">
                <CardHeader>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#90cbcb]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#224949] py-8">
        <div className="max-w-6xl mx-auto px-10 text-center">
          <p className="text-[#90cbcb]">© 2023 MODELUM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
