"use client"

import { useState, useRef, useEffect } from "react"
import { useI18n, localeLabels, localeFull, type Locale } from "@/lib/i18n"
import { Globe } from "lucide-react"

const locales: Locale[] = ["en", "pt", "es", "fr"]

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1.5 text-xs font-medium text-[#6B7280] hover:text-[#D1D5DB] hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
        aria-label="Change language"
      >
        <Globe className="w-3.5 h-3.5" />
        {localeLabels[locale]}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(11,11,15,0.95)] backdrop-blur-xl p-1 min-w-[140px] z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l)
                setOpen(false)
              }}
              className={`flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                locale === l
                  ? "bg-[rgba(124,58,237,0.15)] text-[#D1D5DB]"
                  : "text-[#6B7280] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#D1D5DB]"
              }`}
            >
              <span>{localeFull[l]}</span>
              <span className="text-xs opacity-50">{localeLabels[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
