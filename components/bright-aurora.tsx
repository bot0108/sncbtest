"use client"

import { useEffect, useRef } from "react"

interface BrightAuroraProps {
  colorScheme?: "vibrant" | "sunset" | "ocean"
}

export default function BrightAurora({ colorScheme = "vibrant" }: BrightAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }> = []

    const colorMaps = {
      vibrant: [
        "rgba(59, 130, 246, 0.4)",
        "rgba(249, 115, 22, 0.4)",
        "rgba(251, 191, 36, 0.4)",
        "rgba(255, 255, 255, 0.3)",
      ],
      sunset: [
        "rgba(251, 146, 60, 0.4)",
        "rgba(251, 191, 36, 0.4)",
        "rgba(239, 68, 68, 0.4)",
        "rgba(255, 255, 255, 0.3)",
      ],
      ocean: [
        "rgba(14, 165, 233, 0.4)",
        "rgba(6, 182, 212, 0.4)",
        "rgba(34, 197, 94, 0.4)",
        "rgba(255, 255, 255, 0.3)",
      ],
    }

    const colors = colorMaps[colorScheme]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 40)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 120 + 60,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [colorScheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 25%, #fef3c7 50%, #fed7aa 75%, #ffffff 100%)" }}
    />
  )
}
