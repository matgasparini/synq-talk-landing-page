"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useI18n } from "@/lib/i18n"

const headlineKeys = [
  { lang: "en", key: "heroHeadline" as const },
  { lang: "pt", key: "heroHeadline" as const },
  { lang: "es", key: "heroHeadline" as const },
  { lang: "fr", key: "heroHeadline" as const },
]

const headlinesByLocale = {
  en: [
    "Speak freely. We sync the rest.",
    "Fale livremente. Nós sincronizamos o resto.",
    "Habla libremente. Nosotros sincronizamos el resto.",
    "Parlez librement. On synchronise le reste.",
  ],
  pt: [
    "Fale livremente. Nós sincronizamos o resto.",
    "Speak freely. We sync the rest.",
    "Habla libremente. Nosotros sincronizamos el resto.",
    "Parlez librement. On synchronise le reste.",
  ],
  es: [
    "Habla libremente. Nosotros sincronizamos el resto.",
    "Speak freely. We sync the rest.",
    "Fale livremente. Nós sincronizamos o resto.",
    "Parlez librement. On synchronise le reste.",
  ],
  fr: [
    "Parlez librement. On synchronise le reste.",
    "Speak freely. We sync the rest.",
    "Fale livremente. Nós sincronizamos o resto.",
    "Habla libremente. Nosotros sincronizamos el resto.",
  ],
}

const langLabels = ["EN", "PT", "ES", "FR"]

interface HeroSectionProps {
  onOpenWaitlist: () => void
}

export function HeroSection({ onOpenWaitlist }: HeroSectionProps) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const { t, locale } = useI18n()

  const headlines = headlinesByLocale[locale]

  useEffect(() => {
    setCurrent(0)
  }, [locale])

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % headlines.length)
        setFading(false)
      }, 800)
    }, 4000)
    return () => clearInterval(interval)
  }, [headlines.length])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouse.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const resize = () => {
      canvas.width = canvas.offsetWidth * 0.5
      canvas.height = canvas.offsetHeight * 0.5
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const mx = mouse.current.x * w
      const my = mouse.current.y * h
      const t = Date.now() * 0.001

      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, w * 0.5)
      gradient.addColorStop(0, "rgba(124,58,237,0.15)")
      gradient.addColorStop(0.4, "rgba(59,130,246,0.08)")
      gradient.addColorStop(0.7, "rgba(6,182,212,0.04)")
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      const g2 = ctx.createRadialGradient(
        w * 0.3 + Math.sin(t * 0.5) * w * 0.1,
        h * 0.6 + Math.cos(t * 0.3) * h * 0.1,
        0,
        w * 0.3,
        h * 0.6,
        w * 0.35
      )
      g2.addColorStop(0, "rgba(124,58,237,0.06)")
      g2.addColorStop(1, "transparent")
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "auto" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#7C3AED] animate-pulse" />
          <span className="text-sm text-[#6B7280]">{t("heroBadge")}</span>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight gradient-text mb-4 pb-2 leading-tight"
          aria-label="Synq Talk — Real-Time AI Meeting Translator"
        >
          Synq Talk.
        </h1>
        <p className="sr-only">
          Real-time AI translation with the lowest latency on the market. Works with Zoom, Google Meet, and Microsoft Teams.
        </p>

        <div className="h-[80px] md:h-[100px] flex flex-col items-center justify-center mb-6">
          <p
            className={`text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#D1D5DB] transition-all duration-700 ease-in-out ${
              fading ? "opacity-0 blur-sm scale-95" : "opacity-100 blur-0 scale-100"
            }`}
          >
            {headlines[current]}
          </p>
          <span
            className={`mt-2 text-xs font-mono text-[#6B7280] tracking-widest transition-all duration-700 ease-in-out ${
              fading ? "opacity-0" : "opacity-60"
            }`}
          >
            {langLabels[current]}
          </span>
        </div>

        <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl leading-relaxed mb-10">
          {t("heroSubtext")}
        </p>

        <button
          onClick={onOpenWaitlist}
          className="group relative rounded-2xl bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] px-8 py-4 text-lg font-semibold text-[#FFFFFF] transition-all duration-300 hover:bg-[rgba(124,58,237,0.25)] hover:border-[rgba(124,58,237,0.5)] glow-pulse hover:scale-105 cursor-pointer"
        >
          {t("heroJoinWaitlist")}
        </button>

        <p className="mt-4 text-sm text-[#6B7280]">
          {t("heroEarlyAccess")}
        </p>
      </div>
    </section>
  )
}
