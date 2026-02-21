"use client"

import { useState } from "react"
import { I18nProvider } from "@/lib/i18n"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { DemoCard } from "@/components/demo-card"
import { BentoGrid } from "@/components/bento-grid"
import { HowItWorks } from "@/components/how-it-works"
import { SocialProof } from "@/components/social-proof"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { WaitlistModal } from "@/components/waitlist-modal"

export function PageContent() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <I18nProvider>
      <Navigation onOpenWaitlist={openModal} />
      <HeroSection onOpenWaitlist={openModal} />
      <DemoCard />
      <section id="features">
        <BentoGrid />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="testimonials">
        <SocialProof />
      </section>
      <FinalCta onOpenWaitlist={openModal} />
      <Footer />
      <WaitlistModal open={modalOpen} onClose={closeModal} />
    </I18nProvider>
  )
}
