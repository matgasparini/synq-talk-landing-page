"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

interface NavigationProps {
  onOpenWaitlist: () => void;
}

export function Navigation({ onOpenWaitlist }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(11,11,15,0.8)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img
            src="/icon.svg"
            alt="Synq Talk logo"
            className="h-8 w-8 rounded-lg"
            width={32}
            height={32}
          />
          <span className="text-lg font-bold text-[#D1D5DB]">Synq Talk</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-[#6B7280] hover:text-[#D1D5DB] transition-colors"
          >
            {t("navFeatures")}
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-[#6B7280] hover:text-[#D1D5DB] transition-colors"
          >
            {t("navHowItWorks")}
          </a>
          <a
            href="#testimonials"
            className="text-sm text-[#6B7280] hover:text-[#D1D5DB] transition-colors"
          >
            {t("navTestimonials")}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={onOpenWaitlist}
            className="rounded-xl bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] px-4 py-2 text-sm font-medium text-[#D1D5DB] hover:bg-[rgba(124,58,237,0.25)] transition-colors cursor-pointer"
          >
            {t("navGetAccess")}
          </button>
        </div>
      </div>
    </nav>
  );
}
