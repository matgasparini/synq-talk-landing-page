"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Brain, Headphones } from "lucide-react"
import { useI18n, type TranslationKey } from "@/lib/i18n"

const steps: { icon: typeof Mic; titleKey: TranslationKey; descKey: TranslationKey; color: string }[] = [
  { icon: Mic, titleKey: "howStep1Title", descKey: "howStep1Desc", color: "#7C3AED" },
  { icon: Brain, titleKey: "howStep2Title", descKey: "howStep2Desc", color: "#3B82F6" },
  { icon: Headphones, titleKey: "howStep3Title", descKey: "howStep3Desc", color: "#06B6D4" },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#D1D5DB] mb-4">
          {t("howTitle")}
        </h2>
        <p className="text-center text-[#6B7280] mb-16 text-lg">
          {t("howSubtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className={`glass rounded-3xl p-8 text-center transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}33` }}
                >
                  <Icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <div className="text-xs font-bold text-[#6B7280] mb-3 tracking-widest uppercase">
                  {t("howStep")} {i + 1}
                </div>
                <h3 className="text-xl font-bold text-[#D1D5DB] mb-3">{t(step.titleKey)}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{t(step.descKey)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
