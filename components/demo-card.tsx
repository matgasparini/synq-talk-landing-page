"use client"

import { useEffect, useState, useRef } from "react"
import { useI18n } from "@/lib/i18n"

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-[#7C3AED] transition-all duration-150"
          style={{
            height: active
              ? `${8 + Math.sin(Date.now() * 0.005 + i * 0.5) * 12 + Math.random() * 8}px`
              : "4px",
            opacity: active ? 0.6 + Math.random() * 0.4 : 0.2,
          }}
        />
      ))}
    </div>
  )
}

function WaveformAnimated() {
  const [, setTick] = useState(0)
  const active = useRef(true)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 100)
    return () => clearInterval(id)
  }, [])

  return <Waveform active={active.current} />
}

export function DemoCard() {
  const { t } = useI18n()
  const translatedText = t("demoTranslatedText")
  const [visibleChars, setVisibleChars] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    setVisibleChars(0)
  }, [translatedText])

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= translatedText.length) {
          setTimeout(() => {
            setVisibleChars(0)
            setCycle((c) => c + 1)
          }, 2000)
          clearInterval(typingInterval)
          return prev
        }
        return prev + 1
      })
    }, 35)
    return () => clearInterval(typingInterval)
  }, [cycle, translatedText])

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
            <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
            <div className="h-3 w-3 rounded-full bg-[#22C55E]" />
            <span className="ml-4 text-sm text-[#6B7280] font-mono">synq.talk/live</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Source side */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#7C3AED]">
                  {t("demoEnglish")}
                </span>
                <span className="text-xs text-[#6B7280]">{t("demoSpeaker")}</span>
              </div>

              <div className="rounded-2xl bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.15)] p-4">
                <WaveformAnimated />
                <p className="mt-3 text-sm text-[#D1D5DB]">
                  {`"${t("demoOriginalText")}"`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-[#22C55E]"
                      style={{ height: `${6 + i * 3}px` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#6B7280]">{t("demoSignal")}</span>
              </div>
            </div>

            {/* Translated side */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#06B6D4]">
                  {t("demoPortuguese")}
                </span>
                <span className="text-xs text-[#6B7280]">{t("demoTranslation")}</span>
              </div>

              <div className="rounded-2xl bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)] p-4 min-h-[88px]">
                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  {translatedText.slice(0, visibleChars)}
                  {visibleChars < translatedText.length && (
                    <span className="cursor-blink text-[#06B6D4]">|</span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs text-[#22C55E]">{t("demoLatency")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-[#6B7280]">
          {t("demoCaption")}
        </p>
      </div>
    </section>
  )
}
