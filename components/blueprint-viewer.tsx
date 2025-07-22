"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import House3DPreview from "./house-3d-preview"
import { Eye, Download, Share2, Maximize2 } from "lucide-react"

interface BlueprintViewerProps {
  blueprintData: {
    floors: number
    rooms: number
    sqft: number
    budget: number
    lifestyle: string[]
    imageUrl?: string
    generatedAt: string
  }
  isVisible: boolean
  onClose: () => void
}

export default function BlueprintViewer({ blueprintData, isVisible, onClose }: BlueprintViewerProps) {
  const [activeTab, setActiveTab] = useState("2d")
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!isVisible) return null

  const specs = [
    { label: "Floors", value: blueprintData.floors },
    { label: "Rooms", value: blueprintData.rooms },
    { label: "Area", value: `${blueprintData.sqft} sqft` },
    { label: "Budget", value: `₹${blueprintData.budget.toLocaleString()}` },
  ]

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isFullscreen ? "p-0" : ""}`}
    >
      <Card
        className={`bg-[#102323] border-[#224949] text-white max-w-6xl w-full ${isFullscreen ? "h-full max-w-none rounded-none" : "max-h-[90vh]"} overflow-hidden`}
      >
        <CardHeader className="border-b border-[#224949]">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-white">Generated Blueprint</CardTitle>
              <p className="text-[#90cbcb] text-sm mt-1">
                Created on {new Date(blueprintData.generatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-[#90cbcb] hover:text-white hover:bg-[#224949]"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-[#90cbcb] hover:text-white hover:bg-[#224949]"
              >
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Specifications */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">Specifications</h3>
              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-[#183434] rounded-lg border border-[#316868]"
                  >
                    <span className="text-[#90cbcb] text-sm">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Lifestyle Features */}
              <div className="mt-6">
                <h4 className="text-md font-medium mb-3 text-white">Lifestyle Features</h4>
                <div className="flex flex-wrap gap-2">
                  {blueprintData.lifestyle.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#224949] text-[#0cf2f2] border-[#0cf2f2]">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <Button className="w-full bg-[#0cf2f2] text-[#102323] hover:bg-[#0cf2f2]/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download Blueprint
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#224949] text-[#90cbcb] hover:bg-[#224949] bg-transparent"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Design
                </Button>
              </div>
            </div>

            {/* Blueprint Views */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#183434] border border-[#316868]">
                  <TabsTrigger
                    value="2d"
                    className="data-[state=active]:bg-[#0cf2f2] data-[state=active]:text-[#102323] text-[#90cbcb]"
                  >
                    2D Blueprint
                  </TabsTrigger>
                  <TabsTrigger
                    value="3d"
                    className="data-[state=active]:bg-[#0cf2f2] data-[state=active]:text-[#102323] text-[#90cbcb]"
                  >
                    3D Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="2d" className="mt-4">
                  <div className="bg-[#183434] rounded-lg border border-[#316868] p-4">
                    {blueprintData.imageUrl ? (
                      <img
                        src={blueprintData.imageUrl || "/placeholder.svg"}
                        alt="Generated Blueprint"
                        className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-[400px] text-[#90cbcb]">
                        <div className="text-center">
                          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Blueprint image will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="3d" className="mt-4">
                  <House3DPreview
                    floors={blueprintData.floors}
                    rooms={blueprintData.rooms}
                    sqft={blueprintData.sqft}
                    isVisible={activeTab === "3d"}
                  />

                  {/* 3D Info Panel */}
                  <div className="mt-4 p-4 bg-[#183434] rounded-lg border border-[#316868]">
                    <h4 className="text-white font-medium mb-2">3D Model Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-[#90cbcb]">Total Volume:</span>
                        <p className="text-white font-medium">
                          {(blueprintData.sqft * blueprintData.floors * 10).toLocaleString()} cu ft
                        </p>
                      </div>
                      <div>
                        <span className="text-[#90cbcb]">Floor Height:</span>
                        <p className="text-white font-medium">10 ft</p>
                      </div>
                      <div>
                        <span className="text-[#90cbcb]">Rooms/Floor:</span>
                        <p className="text-white font-medium">
                          {Math.ceil(blueprintData.rooms / blueprintData.floors)}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#90cbcb]">Avg Room Size:</span>
                        <p className="text-white font-medium">
                          {Math.round(blueprintData.sqft / blueprintData.rooms)} sqft
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
