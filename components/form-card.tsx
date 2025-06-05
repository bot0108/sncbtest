"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface FormCardProps {
  title: string
  onClose?: () => void
  children: React.ReactNode
  variant?: "login" | "register"
}

export function FormCard({ title, onClose, children, variant = "login" }: FormCardProps) {
  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-2xl relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-orange-50/30 pointer-events-none"></div>

      <CardHeader className="pb-6 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-gray-800">{title}</CardTitle>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Bezárás"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">{children}</CardContent>
    </Card>
  )
}
