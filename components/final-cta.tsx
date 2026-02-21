"use client";

import { useI18n } from "@/lib/i18n";

interface FinalCtaProps {
  onOpenWaitlist: () => void;
}

export function FinalCta({ onOpenWaitlist }: FinalCtaProps) {
  const { t } = useI18n();
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#D1D5DB] leading-tight mb-4 text-balance">
          {t("ctaHeading1")}
          <br />
          <span className="gradient-text">{t("ctaHeading2")}</span>
        </h2>

        <p className="text-lg text-[#6B7280] mb-10">{t("ctaSubtext")}</p>

        <button
          onClick={onOpenWaitlist}
          className="group relative rounded-2xl bg-[#7C3AED] px-10 py-5 text-lg font-bold text-[#FFFFFF] transition-all duration-300 hover:bg-[#6D28D9] hover:scale-105 glow-pulse cursor-pointer"
        >
          {t("ctaButton")}
        </button>

        <p className="mt-6 text-sm text-[#6B7280]">{t("ctaCaption")}</p>
      </div>
    </section>
  );
}
