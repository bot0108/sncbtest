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
    <Card className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-orange-300/30 shadow-2xl relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 pointer-events-none"></div>

      <CardHeader className="pb-6 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-white drop-shadow-lg">{title}</CardTitle>
          {onClose && (
            <button
              onClick={onClose}
              className="text-orange-300 hover:text-white transition-colors duration-200 p-2 hover:bg-orange-500/20 rounded-lg"
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
