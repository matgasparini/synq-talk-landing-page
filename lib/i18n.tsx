"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "en" | "pt" | "es" | "fr";

const translations = {
  en: {
    // Nav
    navFeatures: "Features",
    navHowItWorks: "How It Works",
    navTestimonials: "Testimonials",
    navGetAccess: "Get Access",
    // Hero
    heroBadge: "AI Meeting Translator",
    heroSubtext:
      "Real-time AI translation with the lowest latency on the market — built to understand context, not just words.",
    heroJoinWaitlist: "Join the Waitlist",
    heroEarlyAccess: "Early access for global teams.",
    heroHeadline: "Speak freely. We sync the rest.",
    // Demo
    demoEnglish: "English",
    demoSpeaker: "Speaker",
    demoPortuguese: "Portuguese",
    demoTranslation: "Translation",
    demoSignal: "Signal: Excellent",
    demoLatency: "~120ms latency",
    demoOriginalText: "The real-time translation is working perfectly now.",
    demoTranslatedText:
      "A tradução em tempo real está funcionando perfeitamente agora.",
    demoCaption: "Market-leading low latency. Feels instant.",
    // Bento
    bentoTitle: "Core Capabilities",
    bentoSubtitle: "Built for global speed.",
    bentoLangsTitle: "30+ Languages",
    bentoLangsDesc: "Speak. Listen. Understand.",
    bentoLatencyTitle: "Ultra-Low Latency",
    bentoLatencyDesc: "The lowest delay in the market.",
    bentoPrivacyTitle: "Privacy First",
    bentoPrivacyDesc: "Enterprise-grade encryption.",
    bentoInstallTitle: "One Click Install",
    bentoInstallDesc: "Works where you already meet.",
    // How It Works
    howTitle: "How It Works",
    howSubtitle: "Three steps. Zero friction.",
    howStep: "Step",
    howStep1Title: "Speak naturally.",
    howStep1Desc: "Just talk. In your language. As you always do.",
    howStep2Title: "AI understands context.",
    howStep2Desc: "Our engine captures meaning, not just words.",
    howStep3Title: "Everyone hears in their own language.",
    howStep3Desc: "Almost instantly. No delay. No confusion.",
    // Social Proof
    socialTitle: "Trusted by Early Adopters",
    socialQuote1: "This is the fastest AI translation experience we've tested.",
    socialAuthor1: "Early Beta User",
    socialRole1: "Head of Global Ops",
    socialQuote2: "Context-aware translation that actually understands nuance.",
    socialAuthor2: "Product Lead",
    socialRole2: "Fortune 500 Company",
    socialQuote3: "Seamless integration with our existing meeting workflow.",
    socialAuthor3: "CTO",
    socialRole3: "Series B Startup",
    // Final CTA
    ctaHeading1: "Speak every language.",
    ctaHeading2: "With the lowest latency available.",
    ctaSubtext: "Say it once. Understood everywhere.",
    ctaButton: "Get Early Access",
    ctaCaption: "Instant clarity. Built for global speed.",
    // Footer
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerContact: "Contact",
    footerTagline: "Synq Talk. Context-aware AI.",
    // Waitlist Modal
    modalTitle: "Get Early Access",
    modalSubtitle:
      "Join the waitlist and be among the first to experience real-time AI translation.",
    modalName: "Full Name",
    modalEmail: "Email Address",
    modalCompany: "Company",
    modalRole: "Role",
    modalNamePlaceholder: "Your name",
    modalEmailPlaceholder: "you@company.com",
    modalCompanyPlaceholder: "Company name (optional)",
    modalRolePlaceholder: "Your role (optional)",
    modalSubmit: "Join the Waitlist",
    modalSubmitting: "Submitting...",
    modalSuccessTitle: "You're on the list!",
    modalSuccessText:
      "We'll reach out soon with early access details. Keep an eye on your inbox.",
    modalClose: "Close",
    modalDisclaimer: "We'll never share your information. Unsubscribe anytime.",
  },
  pt: {
    navFeatures: "Recursos",
    navHowItWorks: "Como Funciona",
    navTestimonials: "Depoimentos",
    navGetAccess: "Acesse Agora",
    heroBadge: "Tradutor de Reuniões com IA",
    heroSubtext:
      "Tradução em tempo real com a menor latência do mercado — feita para entender contexto, não apenas palavras.",
    heroJoinWaitlist: "Entrar na Lista de Espera",
    heroEarlyAccess: "Acesso antecipado para equipes globais.",
    heroHeadline: "Fale livremente. Nós sincronizamos o resto.",
    demoEnglish: "Inglês",
    demoSpeaker: "Falante",
    demoPortuguese: "Português",
    demoTranslation: "Tradução",
    demoSignal: "Sinal: Excelente",
    demoLatency: "~120ms de latência",
    demoOriginalText:
      "A tradução em tempo real está funcionando perfeitamente agora.",
    demoTranslatedText: "The real-time translation is working perfectly now.",
    demoCaption: "Menor latência do mercado. Parece instantâneo.",
    bentoTitle: "Capacidades Principais",
    bentoSubtitle: "Feito para velocidade global.",
    bentoLangsTitle: "30+ Idiomas",
    bentoLangsDesc: "Fale. Ouça. Entenda.",
    bentoLatencyTitle: "Latência Ultrabaixa",
    bentoLatencyDesc: "O menor atraso do mercado.",
    bentoPrivacyTitle: "Privacidade em Primeiro Lugar",
    bentoPrivacyDesc: "Criptografia de nível empresarial.",
    bentoInstallTitle: "Instalação com Um Clique",
    bentoInstallDesc: "Funciona onde você já se reúne.",
    howTitle: "Como Funciona",
    howSubtitle: "Três passos. Zero atrito.",
    howStep: "Passo",
    howStep1Title: "Fale naturalmente.",
    howStep1Desc: "Apenas fale. No seu idioma. Como sempre faz.",
    howStep2Title: "A IA entende o contexto.",
    howStep2Desc: "Nosso motor captura significado, não apenas palavras.",
    howStep3Title: "Todos ouvem no seu próprio idioma.",
    howStep3Desc: "Quase instantaneamente. Sem atraso. Sem confusão.",
    socialTitle: "Confiado por Usuários Beta",
    socialQuote1:
      "Esta é a experiência de tradução com IA mais rápida que já testamos.",
    socialAuthor1: "Usuário Beta Inicial",
    socialRole1: "Chefe de Operações Globais",
    socialQuote2: "Tradução contextual que realmente entende nuances.",
    socialAuthor2: "Líder de Produto",
    socialRole2: "Empresa Fortune 500",
    socialQuote3: "Integração perfeita com nosso fluxo de reuniões existente.",
    socialAuthor3: "CTO",
    socialRole3: "Startup Série B",
    ctaHeading1: "Fale todos os idiomas.",
    ctaHeading2: "Com a menor latência disponível.",
    ctaSubtext: "Diga uma vez. Entendido em todo lugar.",
    ctaButton: "Acesso Antecipado",
    ctaCaption: "Clareza instantânea. Feito para velocidade global.",
    footerPrivacy: "Privacidade",
    footerTerms: "Termos",
    footerContact: "Contato",
    footerTagline: "Synq Talk. IA contextual.",
    modalTitle: "Acesso Antecipado",
    modalSubtitle:
      "Entre na lista de espera e seja um dos primeiros a experimentar a tradução em tempo real com IA.",
    modalName: "Nome Completo",
    modalEmail: "Endereço de Email",
    modalCompany: "Empresa",
    modalRole: "Cargo",
    modalNamePlaceholder: "Seu nome",
    modalEmailPlaceholder: "voce@empresa.com",
    modalCompanyPlaceholder: "Nome da empresa (opcional)",
    modalRolePlaceholder: "Seu cargo (opcional)",
    modalSubmit: "Entrar na Lista de Espera",
    modalSubmitting: "Enviando...",
    modalSuccessTitle: "Você está na lista!",
    modalSuccessText:
      "Entraremos em contato em breve com detalhes de acesso antecipado. Fique de olho no seu email.",
    modalClose: "Fechar",
    modalDisclaimer:
      "Nunca compartilharemos suas informações. Cancele quando quiser.",
  },
  es: {
    navFeatures: "Funciones",
    navHowItWorks: "Cómo Funciona",
    navTestimonials: "Testimonios",
    navGetAccess: "Obtener Acceso",
    heroBadge: "Traductor de Reuniones con IA",
    heroSubtext:
      "Traducción en tiempo real con la menor latencia del mercado — diseñada para entender contexto, no solo palabras.",
    heroJoinWaitlist: "Unirse a la Lista de Espera",
    heroEarlyAccess: "Acceso anticipado para equipos globales.",
    heroHeadline: "Habla libremente. Nosotros sincronizamos el resto.",
    demoEnglish: "Inglés",
    demoSpeaker: "Hablante",
    demoPortuguese: "Portugués",
    demoTranslation: "Traducción",
    demoSignal: "Señal: Excelente",
    demoLatency: "~120ms de latencia",
    demoOriginalText:
      "La traducción en tiempo real está funcionando perfectamente ahora.",
    demoTranslatedText: "The real-time translation is working perfectly now.",
    demoCaption: "Menor latencia del mercado. Se siente instantáneo.",
    bentoTitle: "Capacidades Principales",
    bentoSubtitle: "Construido para velocidad global.",
    bentoLangsTitle: "30+ Idiomas",
    bentoLangsDesc: "Habla. Escucha. Entiende.",
    bentoLatencyTitle: "Latencia Ultrabaja",
    bentoLatencyDesc: "El menor retraso del mercado.",
    bentoPrivacyTitle: "Privacidad Primero",
    bentoPrivacyDesc: "Cifrado de nivel empresarial.",
    bentoInstallTitle: "Instalación con Un Clic",
    bentoInstallDesc: "Funciona donde ya te reúnes.",
    howTitle: "Cómo Funciona",
    howSubtitle: "Tres pasos. Cero fricción.",
    howStep: "Paso",
    howStep1Title: "Habla naturalmente.",
    howStep1Desc: "Solo habla. En tu idioma. Como siempre lo haces.",
    howStep2Title: "La IA entiende el contexto.",
    howStep2Desc: "Nuestro motor captura significado, no solo palabras.",
    howStep3Title: "Todos escuchan en su propio idioma.",
    howStep3Desc: "Casi al instante. Sin retraso. Sin confusión.",
    socialTitle: "Confiado por Adoptantes Tempranos",
    socialQuote1:
      "Esta es la experiencia de traducción con IA más rápida que hemos probado.",
    socialAuthor1: "Usuario Beta Temprano",
    socialRole1: "Jefe de Operaciones Globales",
    socialQuote2: "Traducción contextual que realmente entiende matices.",
    socialAuthor2: "Líder de Producto",
    socialRole2: "Empresa Fortune 500",
    socialQuote3:
      "Integración perfecta con nuestro flujo de reuniones existente.",
    socialAuthor3: "CTO",
    socialRole3: "Startup Serie B",
    ctaHeading1: "Habla todos los idiomas.",
    ctaHeading2: "Con la menor latencia disponible.",
    ctaSubtext: "Dilo una vez. Entendido en todas partes.",
    ctaButton: "Acceso Anticipado",
    ctaCaption: "Claridad instantánea. Construido para velocidad global.",
    footerPrivacy: "Privacidad",
    footerTerms: "Términos",
    footerContact: "Contacto",
    footerTagline: "Synq Talk. IA contextual.",
    modalTitle: "Acceso Anticipado",
    modalSubtitle:
      "Únete a la lista de espera y sé de los primeros en experimentar la traducción en tiempo real con IA.",
    modalName: "Nombre Completo",
    modalEmail: "Correo Electrónico",
    modalCompany: "Empresa",
    modalRole: "Cargo",
    modalNamePlaceholder: "Tu nombre",
    modalEmailPlaceholder: "tu@empresa.com",
    modalCompanyPlaceholder: "Nombre de la empresa (opcional)",
    modalRolePlaceholder: "Tu cargo (opcional)",
    modalSubmit: "Unirse a la Lista de Espera",
    modalSubmitting: "Enviando...",
    modalSuccessTitle: "Estás en la lista!",
    modalSuccessText:
      "Te contactaremos pronto con detalles de acceso anticipado. Mantén un ojo en tu bandeja de entrada.",
    modalClose: "Cerrar",
    modalDisclaimer:
      "Nunca compartiremos tu información. Cancela cuando quieras.",
  },
  fr: {
    navFeatures: "Fonctionnalités",
    navHowItWorks: "Comment ça marche",
    navTestimonials: "Témoignages",
    navGetAccess: "Obtenir l'accès",
    heroBadge: "Traducteur de Réunions IA",
    heroSubtext:
      "Traduction en temps réel avec la plus faible latence du marché — conçue pour comprendre le contexte, pas seulement les mots.",
    heroJoinWaitlist: "Rejoindre la Liste d'Attente",
    heroEarlyAccess: "Accès anticipé pour les équipes internationales.",
    heroHeadline: "Parlez librement. On synchronise le reste.",
    demoEnglish: "Anglais",
    demoSpeaker: "Locuteur",
    demoPortuguese: "Portugais",
    demoTranslation: "Traduction",
    demoSignal: "Signal : Excellent",
    demoLatency: "~120ms de latence",
    demoOriginalText:
      "La traduction en temps réel fonctionne parfaitement maintenant.",
    demoTranslatedText: "The real-time translation is working perfectly now.",
    demoCaption:
      "Latence la plus basse du marché. Ressemble à de l'instantané.",
    bentoTitle: "Capacités Principales",
    bentoSubtitle: "Conçu pour la vitesse mondiale.",
    bentoLangsTitle: "30+ Langues",
    bentoLangsDesc: "Parlez. Écoutez. Comprenez.",
    bentoLatencyTitle: "Latence Ultra-faible",
    bentoLatencyDesc: "Le délai le plus bas du marché.",
    bentoPrivacyTitle: "Confidentialité d'abord",
    bentoPrivacyDesc: "Chiffrement de niveau entreprise.",
    bentoInstallTitle: "Installation en Un Clic",
    bentoInstallDesc: "Fonctionne là où vous vous réunissez déjà.",
    howTitle: "Comment ça Marche",
    howSubtitle: "Trois étapes. Zéro friction.",
    howStep: "Étape",
    howStep1Title: "Parlez naturellement.",
    howStep1Desc: "Parlez simplement. Dans votre langue. Comme toujours.",
    howStep2Title: "L'IA comprend le contexte.",
    howStep2Desc: "Notre moteur capture le sens, pas seulement les mots.",
    howStep3Title: "Chacun entend dans sa propre langue.",
    howStep3Desc: "Presque instantanément. Sans délai. Sans confusion.",
    socialTitle: "Approuvé par les Premiers Utilisateurs",
    socialQuote1:
      "C'est l'expérience de traduction IA la plus rapide que nous ayons testée.",
    socialAuthor1: "Utilisateur Bêta",
    socialRole1: "Directeur des Opérations Mondiales",
    socialQuote2:
      "Une traduction contextuelle qui comprend vraiment les nuances.",
    socialAuthor2: "Responsable Produit",
    socialRole2: "Entreprise Fortune 500",
    socialQuote3:
      "Intégration transparente avec notre flux de réunions existant.",
    socialAuthor3: "CTO",
    socialRole3: "Startup Série B",
    ctaHeading1: "Parlez toutes les langues.",
    ctaHeading2: "Avec la plus faible latence disponible.",
    ctaSubtext: "Dites-le une fois. Compris partout.",
    ctaButton: "Accès Anticipé",
    ctaCaption: "Clarté instantanée. Conçu pour la vitesse mondiale.",
    footerPrivacy: "Confidentialité",
    footerTerms: "Conditions",
    footerContact: "Contact",
    footerTagline: "Synq Talk. IA contextuelle.",
    modalTitle: "Accès Anticipé",
    modalSubtitle:
      "Rejoignez la liste d'attente et soyez parmi les premiers à expérimenter la traduction en temps réel par IA.",
    modalName: "Nom Complet",
    modalEmail: "Adresse Email",
    modalCompany: "Entreprise",
    modalRole: "Poste",
    modalNamePlaceholder: "Votre nom",
    modalEmailPlaceholder: "vous@entreprise.com",
    modalCompanyPlaceholder: "Nom de l'entreprise (optionnel)",
    modalRolePlaceholder: "Votre poste (optionnel)",
    modalSubmit: "Rejoindre la Liste d'Attente",
    modalSubmitting: "Envoi en cours...",
    modalSuccessTitle: "Vous êtes sur la liste !",
    modalSuccessText:
      "Nous vous contacterons bientôt avec les détails d'accès anticipé. Surveillez votre boîte de réception.",
    modalClose: "Fermer",
    modalDisclaimer:
      "Nous ne partagerons jamais vos informations. Désabonnez-vous à tout moment.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] ?? translations.en[key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
  fr: "FR",
};

export const localeFull: Record<Locale, string> = {
  en: "English",
  pt: "Portugues",
  es: "Espanol",
  fr: "Francais",
};
