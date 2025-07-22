"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginPageProps {
  onNavigate: (page: "landing" | "login" | "dashboard") => void
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login/signup
    onNavigate("dashboard")
  }

  return (
    <div className="min-h-screen bg-white flex font-['Manrope']">
      {/* Left side - Image */}
      <div className="flex-1 hidden lg:block">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/placeholder.svg?height=800&width=600&text=Modern+Architecture+Blueprint')` }}
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-[360px] flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">
              {isLogin ? "Welcome back" : "Create Account"}
            </CardTitle>
            <p className="text-slate-600 text-sm">
              {isLogin ? "Sign in to your MODELUM account" : "Join MODELUM and start designing"}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-slate-100 hover:bg-slate-200 border-0">
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="h-14 bg-slate-100 border-0 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="h-14 bg-slate-100 border-0 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    className="h-14 bg-slate-100 border-0 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-bold">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-slate-600 text-sm underline hover:text-slate-900"
              >
                {isLogin ? "New to Modelum? Create an account" : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigate("landing")}
                className="text-slate-500 text-sm hover:text-slate-700"
              >
                ← Back to home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
