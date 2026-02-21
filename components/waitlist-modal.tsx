"use client";

import { useI18n } from "@/lib/i18n";
import { useState, useEffect, useCallback } from "react";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setForm({ name: "", email: "", company: "", role: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Join the waitlist"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(11,11,15,0.95)] backdrop-blur-xl p-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#6B7280] hover:text-[#D1D5DB] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="h-16 w-16 rounded-full bg-[rgba(124,58,237,0.15)] flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#7C3AED"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#D1D5DB] mb-2">
              {"You're on the list!"}
            </h3>
            <p className="text-[#6B7280] leading-relaxed mb-6">
              {t("modalSuccessText")}
            </p>
            <button
              onClick={onClose}
              className="rounded-xl bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] px-6 py-2.5 text-sm font-medium text-[#D1D5DB] hover:bg-[rgba(124,58,237,0.25)] transition-colors cursor-pointer"
            >
              {t("modalClose")}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#D1D5DB] mb-1">
                {t("modalTitle")}
              </h3>
              <p className="text-sm text-[#6B7280]">{t("modalSubtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="wl-name"
                  className="block text-sm font-medium text-[#6B7280] mb-1.5"
                >
                  {t("modalName")} <span className="text-[#7C3AED]">*</span>
                </label>
                <input
                  id="wl-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("modalNamePlaceholder")}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[#D1D5DB] placeholder:text-[#4B5563] outline-none focus:border-[rgba(124,58,237,0.5)] focus:ring-1 focus:ring-[rgba(124,58,237,0.3)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="wl-email"
                  className="block text-sm font-medium text-[#6B7280] mb-1.5"
                >
                  {t("modalEmail")} <span className="text-[#7C3AED]">*</span>
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t("modalEmailPlaceholder")}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[#D1D5DB] placeholder:text-[#4B5563] outline-none focus:border-[rgba(124,58,237,0.5)] focus:ring-1 focus:ring-[rgba(124,58,237,0.3)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="wl-company"
                  className="block text-sm font-medium text-[#6B7280] mb-1.5"
                >
                  {t("modalCompany")}
                </label>
                <input
                  id="wl-company"
                  type="text"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  placeholder={t("modalCompanyPlaceholder")}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[#D1D5DB] placeholder:text-[#4B5563] outline-none focus:border-[rgba(124,58,237,0.5)] focus:ring-1 focus:ring-[rgba(124,58,237,0.3)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="wl-role"
                  className="block text-sm font-medium text-[#6B7280] mb-1.5"
                >
                  {t("modalRole")}
                </label>
                <input
                  id="wl-role"
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder={t("modalRolePlaceholder")}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[#D1D5DB] placeholder:text-[#4B5563] outline-none focus:border-[rgba(124,58,237,0.5)] focus:ring-1 focus:ring-[rgba(124,58,237,0.3)] transition-colors"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-[#EF4444]">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 w-full rounded-xl bg-[#7C3AED] py-3.5 text-sm font-bold text-[#FFFFFF] transition-all duration-300 hover:bg-[#6D28D9] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer glow-pulse"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    {t("modalSubmitting")}
                  </span>
                ) : (
                  t("modalSubmit")
                )}
              </button>

              <p className="text-xs text-[#4B5563] text-center">
                {t("modalDisclaimer")}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
