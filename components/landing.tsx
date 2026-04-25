"use client"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero"
import { ServicesSection } from "@/components/services"
import { ProjectsSection } from "@/components/projects"
import { ContactSection } from "@/components/contacts"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  useEffect(() => {
    fetch('/api/admin/activity-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'view', page: 'landing', status: 'success', timestamp: new Date() })
    }).catch(() => {})
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
        <script>
  window.SupportHubConfig = {
    apiUrl: 'https://linkssupport.vercel.app',
    widgetId: 'website-main',
    position: 'bottom-right',
    primaryColor: '#0f766e',
    theme: 'light',
    widgetName: 'Links Concierge',
    greeting: 'Share what you need and we will route it to the right teammate with the full conversation intact.'
  };
</script>
<script src="https://linkssupport.vercel.app/supporthub-widget.js"></script>

<script>
  window.__SUPPORTHUB_STATUS__ = window.__SUPPORTHUB_STATUS__ || {
    ready: false,
    sessionSynced: false,
    messageSent: false,
    errors: [],
  };

  window.addEventListener('supporthub:ready', (event) => {
    window.__SUPPORTHUB_STATUS__.ready = true;
    window.__SUPPORTHUB_STATUS__.readyAt = new Date().toISOString();
    window.__SUPPORTHUB_STATUS__.widgetId = event.detail.widgetId;
    document.documentElement.dataset.supporthubWidget = 'ready';
    console.info('[SupportHub] ready', event.detail);
  });

  window.addEventListener('supporthub:session:sync', (event) => {
    window.__SUPPORTHUB_STATUS__.sessionSynced = true;
    window.__SUPPORTHUB_STATUS__.sessionSyncedAt = new Date().toISOString();
    window.__SUPPORTHUB_STATUS__.lastSession = event.detail;
    document.documentElement.dataset.supporthubSession = 'synced';
    console.info('[SupportHub] session sync', event.detail);
  });

  window.addEventListener('supporthub:message:sent', (event) => {
    window.__SUPPORTHUB_STATUS__.messageSent = true;
    window.__SUPPORTHUB_STATUS__.lastMessageAt = new Date().toISOString();
    window.__SUPPORTHUB_STATUS__.lastMessage = event.detail;
    document.documentElement.dataset.supporthubMessage = 'sent';
    console.info('[SupportHub] message sent', event.detail);
  });

  window.addEventListener('supporthub:error', (event) => {
    window.__SUPPORTHUB_STATUS__.errors.push(event.detail);
    console.error('[SupportHub] widget error', event.detail);
  });
</script>
      </main>
      <Footer />
    </div>
  )
}

