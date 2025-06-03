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
    <Card className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-slate-900/20 pointer-events-none"></div>

      <CardHeader className="pb-6 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-white">{title}</CardTitle>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-lg"
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
