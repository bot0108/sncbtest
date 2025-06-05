"use client"

import { useEffect, useRef } from "react"

interface OrangeAuroraProps {
  colorScheme?: "orange" | "sunset" | "fire"
}

export default function OrangeAurora({ colorScheme = "orange" }: OrangeAuroraProps) {
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
      opacity: number
      pulseSpeed: number
    }> = []

    const colorMaps = {
      orange: [
        "rgba(251, 146, 60, 0.6)", // orange-400
        "rgba(249, 115, 22, 0.7)", // orange-500
        "rgba(234, 88, 12, 0.5)", // orange-600
        "rgba(251, 191, 36, 0.6)", // amber-400
        "rgba(245, 158, 11, 0.5)", // amber-500
        "rgba(255, 255, 255, 0.4)", // white
      ],
      sunset: [
        "rgba(251, 146, 60, 0.6)",
        "rgba(239, 68, 68, 0.5)",
        "rgba(251, 191, 36, 0.7)",
        "rgba(255, 255, 255, 0.3)",
      ],
      fire: [
        "rgba(239, 68, 68, 0.6)",
        "rgba(251, 146, 60, 0.7)",
        "rgba(245, 158, 11, 0.5)",
        "rgba(255, 255, 255, 0.4)",
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
      const particleCount = Math.min(Math.floor(window.innerWidth / 12), 50)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 150 + 80,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 0.4 - 0.2,
          speedY: Math.random() * 0.4 - 0.2,
          opacity: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update opacity for pulsing effect
        particle.opacity += particle.pulseSpeed
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.pulseSpeed *= -1
        }

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius)

        const colorWithOpacity = particle.color.replace(/[\d.]+\)$/g, `${particle.opacity})`)
        gradient.addColorStop(0, colorWithOpacity)
        gradient.addColorStop(0.7, colorWithOpacity.replace(/[\d.]+\)$/g, `${particle.opacity * 0.3})`))
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges with some randomness
        if (particle.x < -particle.radius || particle.x > canvas.width + particle.radius) {
          particle.speedX *= -1
          particle.speedX += (Math.random() - 0.5) * 0.1
        }
        if (particle.y < -particle.radius || particle.y > canvas.height + particle.radius) {
          particle.speedY *= -1
          particle.speedY += (Math.random() - 0.5) * 0.1
        }
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
      style={{
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #312e81 15%, #1e40af 30%, #1d4ed8 45%, #f97316 60%, #ea580c 75%, #dc2626 90%, #991b1b 100%)",
      }}
    />
  )
}
