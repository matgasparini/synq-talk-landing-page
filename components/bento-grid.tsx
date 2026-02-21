"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Zap, Shield, MousePointerClick } from "lucide-react"
import { useI18n } from "@/lib/i18n"

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const flags = ["🇺🇸", "🇧🇷", "🇪🇸", "🇫🇷", "🇩🇪", "🇯🇵", "🇰🇷", "🇨🇳", "🇮🇹", "🇷🇺", "🇸🇦", "🇮🇳"]

function LanguagesCard() {
  const { t } = useI18n()
  return (
    <div className="relative overflow-hidden">
      <Globe className="w-8 h-8 text-[#7C3AED] mb-4" />
      <h3 className="text-xl font-bold text-[#D1D5DB] mb-2">{t("bentoLangsTitle")}</h3>
      <p className="text-sm text-[#6B7280] mb-6">{t("bentoLangsDesc")}</p>
      <div className="flex flex-wrap gap-2">
        {flags.map((f, i) => (
          <span
            key={i}
            className="text-2xl animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  )
}

function LatencyCard() {
  const { t } = useI18n()
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 120)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <Zap className="w-8 h-8 text-[#06B6D4] mb-4" />
      <h3 className="text-xl font-bold text-[#D1D5DB] mb-2">{t("bentoLatencyTitle")}</h3>
      <p className="text-sm text-[#6B7280] mb-4">{t("bentoLatencyDesc")}</p>
      <div className="flex items-end gap-[3px] h-10">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-[4px] rounded-full bg-[#06B6D4] transition-all duration-100"
            style={{
              height: `${6 + Math.sin(Date.now() * 0.006 + i * 0.6) * 14 + Math.random() * 6}px`,
              opacity: 0.5 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function PrivacyCard() {
  const { t } = useI18n()
  return (
    <div>
      <Shield className="w-8 h-8 text-[#3B82F6] mb-4" />
      <h3 className="text-xl font-bold text-[#D1D5DB] mb-2">{t("bentoPrivacyTitle")}</h3>
      <p className="text-sm text-[#6B7280]">{t("bentoPrivacyDesc")}</p>
      <div className="mt-4 flex items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-[rgba(59,130,246,0.2)] overflow-hidden">
          <div className="h-full w-full bg-[#3B82F6] rounded-full animate-pulse" />
        </div>
        <span className="text-xs text-[#3B82F6] font-mono">AES-256</span>
      </div>
    </div>
  )
}

function InstallCard() {
  const { t } = useI18n()
  const badges = [
    { name: "Zoom", color: "#2D8CFF" },
    { name: "Google Meet", color: "#00897B" },
    { name: "Teams", color: "#6264A7" },
  ]
  return (
    <div>
      <MousePointerClick className="w-8 h-8 text-[#8B5CF6] mb-4" />
      <h3 className="text-xl font-bold text-[#D1D5DB] mb-2">{t("bentoInstallTitle")}</h3>
      <p className="text-sm text-[#6B7280] mb-4">{t("bentoInstallDesc")}</p>
      <div className="flex flex-wrap gap-2">
        {badges.map((b) => (
          <span
            key={b.name}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border"
            style={{
              borderColor: `${b.color}33`,
              background: `${b.color}15`,
              color: b.color,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: b.color }} />
            {b.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export function BentoGrid() {
  const { ref, visible } = useInView()
  const { t } = useI18n()

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#D1D5DB] mb-4">
          {t("bentoTitle")}
        </h2>
        <p className="text-center text-[#6B7280] mb-16 text-lg">
          {t("bentoSubtitle")}
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="md:col-span-2 glass rounded-3xl p-8 hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-300">
            <LanguagesCard />
          </div>
          <div className="glass rounded-3xl p-8 hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-300">
            <LatencyCard />
          </div>
          <div className="glass rounded-3xl p-8 hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-300">
            <PrivacyCard />
          </div>
          <div className="md:col-span-2 glass rounded-3xl p-8 hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-300">
            <InstallCard />
          </div>
        </div>
      </div>
    </section>
  )
}
