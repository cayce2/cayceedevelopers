"use client"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero"
import { ServicesSection } from "@/components/services"
import { ProjectsSection } from "@/components/projects"
import { ContactSection } from "@/components/contacts"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

