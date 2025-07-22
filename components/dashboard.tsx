"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import BlueprintViewer from "./blueprint-viewer"
import {
  Home,
  Plus,
  DollarSign,
  Bookmark,
  Settings,
  HelpCircle,
  CuboidIcon as Cube,
  Calendar,
  TrendingUp,
} from "lucide-react"

interface GeneratedBlueprint {
  floors: number
  rooms: number
  sqft: number
  budget: number
  lifestyle: string[]
  imageUrl?: string
  generatedAt: string
  id: string
}

const sidebarItems = [
  { title: "Home", icon: Home, active: true },
  { title: "New Blueprint", icon: Plus },
  { title: "Budget Estimator", icon: DollarSign },
  { title: "Saved Projects", icon: Bookmark },
  { title: "Settings", icon: Settings },
]

const lifestyleOptions = [
  "Pet Friendly",
  "Night Shift Worker",
  "Heavy Kitchen Use",
  "Home Office",
  "Elderly Friendly",
  "Child Safe",
  "Entertainment Focus",
  "Minimalist Living",
]

const previousDesigns = [
  {
    id: "1",
    title: "Modern Farmhouse",
    date: "2 weeks ago",
    cost: "₹2.5L",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Coastal Retreat",
    date: "1 month ago",
    cost: "₹3.2L",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Urban Loft",
    date: "3 months ago",
    cost: "₹1.8L",
    image: "/placeholder.svg?height=200&width=300",
  },
]

function AppSidebar() {
  return (
    <Sidebar className="bg-slate-50 border-r border-slate-200">
      <SidebarHeader className="p-4">
        <h1 className="text-lg font-bold text-slate-900">MODELUM</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.active} className="w-full justify-start">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade</Button>
          <div className="mt-4">
            <SidebarMenuButton className="w-full justify-start text-slate-600">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </SidebarMenuButton>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default function Dashboard() {
  const [formData, setFormData] = useState({
    floors: 2,
    rooms: 4,
    sqft: 1500,
    budget: 250000,
    lifestyle: [] as string[],
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBlueprint, setGeneratedBlueprint] = useState<GeneratedBlueprint | null>(null)
  const [showBlueprintViewer, setShowBlueprintViewer] = useState(false)

  const handleLifestyleChange = (option: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      lifestyle: checked ? [...prev.lifestyle, option] : prev.lifestyle.filter((item) => item !== option),
    }))
  }

  const handleGenerateBlueprint = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("http://localhost:5000/generate_house", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          floors: formData.floors,
          rooms: formData.rooms,
          sqft: formData.sqft,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate blueprint")
      }

      const result = await response.json()
      const blueprint: GeneratedBlueprint = {
        ...formData,
        imageUrl: `http://localhost:5000${result.image}`,
        generatedAt: new Date().toISOString(),
        id: Date.now().toString(),
      }
      setGeneratedBlueprint(blueprint)
      setShowBlueprintViewer(true)
    } catch (error) {
      console.error("Failed to generate blueprint:", error)
      // Create a mock blueprint for demo purposes when API is not available
      const blueprint: GeneratedBlueprint = {
        ...formData,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Generated+Blueprint",
        generatedAt: new Date().toISOString(),
        id: Date.now().toString(),
      }
      setGeneratedBlueprint(blueprint)
      setShowBlueprintViewer(true)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Dashboard</h2>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Welcome Section */}
          <div className="flex flex-wrap justify-between gap-3">
            <h1 className="text-3xl font-bold text-slate-900 min-w-72">Welcome back, Alex 👋</h1>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">Create New Design</Button>
            <Button variant="outline">Upload Lifestyle Preferences</Button>
            <Button variant="outline">Estimate Budget</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Blueprint Generation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cube className="h-5 w-5" />
                    Generate House Blueprint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="floors">Number of Floors</Label>
                      <Input
                        id="floors"
                        type="number"
                        min="1"
                        max="5"
                        value={formData.floors}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, floors: Number.parseInt(e.target.value) || 1 }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Number of Rooms</Label>
                      <Input
                        id="rooms"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.rooms}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, rooms: Number.parseInt(e.target.value) || 1 }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sqft">Area (sq ft)</Label>
                      <Input
                        id="sqft"
                        type="number"
                        min="500"
                        max="10000"
                        value={formData.sqft}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, sqft: Number.parseInt(e.target.value) || 500 }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget (₹)</Label>
                      <Input
                        id="budget"
                        type="number"
                        min="100000"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, budget: Number.parseInt(e.target.value) || 100000 }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Lifestyle Preferences</Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {lifestyleOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option}
                            checked={formData.lifestyle.includes(option)}
                            onCheckedChange={(checked) => handleLifestyleChange(option, checked as boolean)}
                          />
                          <Label htmlFor={option} className="text-sm font-normal">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateBlueprint}
                    disabled={isGenerating}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Blueprint...
                      </>
                    ) : (
                      <>
                        <Cube className="h-4 w-4 mr-2" />
                        Generate 3D Blueprint
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{formData.budget.toLocaleString()}</div>
                  <p className="text-sm text-slate-600 mt-1">Estimated Budget</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 text-sm font-medium">+15%</span>
                    <span className="text-slate-600 text-sm">vs last project</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cost per sq ft</span>
                    <span className="font-medium">₹{Math.round(formData.budget / formData.sqft)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg room size</span>
                    <span className="font-medium">{Math.round(formData.sqft / formData.rooms)} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total volume</span>
                    <span className="font-medium">{(formData.sqft * formData.floors * 10).toLocaleString()} cu ft</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Blueprint Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Designs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {previousDesigns.map((design) => (
                  <div key={design.id} className="group cursor-pointer">
                    <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-3">
                      <img
                        src={design.image || "/placeholder.svg"}
                        alt={design.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{design.title}</h3>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {design.date}
                        </span>
                        <Badge variant="secondary">{design.cost}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>

      {/* Blueprint Viewer Modal */}
      {generatedBlueprint && (
        <BlueprintViewer
          blueprintData={generatedBlueprint}
          isVisible={showBlueprintViewer}
          onClose={() => setShowBlueprintViewer(false)}
        />
      )}
    </SidebarProvider>
  )
}
