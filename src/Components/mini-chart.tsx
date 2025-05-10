

import { useEffect, useRef } from "react"

interface MiniChartProps {
  data: number[]
  change7d: number
}

export default function MiniChart({ data, change7d }: MiniChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw chart
    const color = change7d >= 0 ? "#22c55e" : "#ef4444"
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5

    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue

    ctx.beginPath()
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * rect.width
      const y = rect.height - ((value - minValue) / range) * rect.height

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Add a subtle gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
    gradient.addColorStop(0, `${color}20`)
    gradient.addColorStop(1, `${color}01`)

    ctx.lineTo(rect.width, rect.height)
    ctx.lineTo(0, rect.height)
    ctx.fillStyle = gradient
    ctx.fill()
  }, [data, change7d])

  return (
    <div className="h-12 w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
