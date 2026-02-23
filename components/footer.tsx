import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/icon.svg"
            alt="Synq Talk logo"
            className="h-8 w-8 rounded-lg"
            width={32}
            height={32}
          />
          <span className="text-sm font-semibold text-[#6B7280]">
            Synq Talk
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-[#6B7280]">
          <a href="/privacy" className="hover:text-[#D1D5DB] transition-colors">
            {t("footerPrivacy")}
          </a>
          <a href="/terms" className="hover:text-[#D1D5DB] transition-colors">
            {t("footerTerms")}
          </a>
          <a
            href="mailto:contact@synq.talk"
            className="hover:text-[#D1D5DB] transition-colors"
          >
            {t("footerContact")}
          </a>
        </div>

        <p className="text-xs text-[#6B7280]">{t("footerTagline")}</p>
      </div>
    </footer>
  );
}
