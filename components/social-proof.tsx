"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const testimonials = {
  en: [
    {
      quote: "This is the fastest AI translation experience we've tested.",
      author: "Early Beta User",
      role: "Head of Global Ops",
    },
    {
      quote: "Context-aware translation that actually understands nuance.",
      author: "Product Lead",
      role: "Fortune 500 Company",
    },
    {
      quote: "Seamless integration with our existing meeting workflow.",
      author: "CTO",
      role: "Series B Startup",
    },
  ],
  pt: [
    {
      quote:
        "Esta é a experiência de tradução com IA mais rápida que já testamos.",
      author: "Usuário Beta Inicial",
      role: "Chefe de Operações Globais",
    },
    {
      quote: "Tradução contextual que realmente entende nuances.",
      author: "Líder de Produto",
      role: "Fortune 500 Company",
    },
    {
      quote: "Integração perfeita com nosso fluxo de reuniões existente.",
      author: "CTO",
      role: "Series B Startup",
    },
  ],
  es: [
    {
      quote:
        "Esta es la experiencia de traducción de IA más rápida que hemos probado jamás.",
      author: "Usuario Beta Inicial",
      role: "Jefe de Operaciones Globales",
    },
    {
      quote: "Traducción contextual que realmente entiende los matices.",
      author: "Líder de producto",
      role: "Fortune 500 Company",
    },
    {
      quote:
        "Integración perfecta con nuestro flujo de trabajo de reuniones existente.",
      author: "CTO",
      role: "Series B Startup",
    },
  ],
  fr: [
    {
      quote:
        "Il s'agit de l'expérience de traduction IA la plus rapide que nous ayons jamais testée.",
      author: "Utilisateur bêta initial",
      role: "Directeur des Opérations Mondiales",
    },
    {
      quote:
        "Une traduction contextuelle qui saisit véritablement les nuances.",
      author: "Chef de produit",
      role: "Fortune 500 Company",
    },
    {
      quote:
        "Intégration transparente avec notre flux de travail de réunion existant.",
      author: "CTO",
      role: "Series B Startup",
    },
  ],
};

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { locale, t } = useI18n();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#D1D5DB] mb-16">
          {t("socialTitle")}
        </h2>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {testimonials[locale as keyof typeof testimonials].map((t, i) => (
            <div
              key={i}
              className={`glass rounded-3xl p-8 transition-all duration-700 ${
                i === 0 ? "md:col-span-1 border-[rgba(124,58,237,0.2)]" : ""
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="w-6 h-6 text-[#7C3AED] mb-4 opacity-50" />
              <p className="text-[#D1D5DB] leading-relaxed mb-6 text-base">
                {`"${t.quote}"`}
              </p>
              <div>
                <p className="text-sm font-semibold text-[#D1D5DB]">
                  {"— "}
                  {t.author}
                </p>
                <p className="text-xs text-[#6B7280]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
