"use client"

import { ArrowRight,  Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/use-translation"

export function HeroSection() {
  const { t } = useTranslation()
  
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-[#050a14]">
      <div className="absolute inset-0 tech-grid"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/30 backdrop-blur-sm animate-slide-up">
            <Sparkles className="h-3 w-3" />
            <span>{t('New Services Available')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <span className="text-white">Caycee-Tech</span>
            <br />
            <span className="text-sky-400">{t('Digital Solutions')}</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-400 mx-auto max-w-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
            {t('We create innovative digital solutions')}
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <Link href="#projects">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-6 h-auto shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/40 hover:scale-105">
                {t('View Our Work')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#contacts">
              <Button size="lg" variant="outline" className="border-2 border-sky-500/30 hover:border-sky-400 hover:bg-sky-500/10 text-sky-400 px-8 py-6 h-auto backdrop-blur-sm transition-all hover:scale-105">
                {t('Contact Us')}
              </Button>
            </Link>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-[#0a0f1e]/80 backdrop-blur-sm p-6 border border-sky-500/20 hover:border-sky-400 transition-all hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <p className="font-bold text-3xl text-sky-400 mb-2">50+</p>
              <p className="text-gray-400 text-sm">{t('Projects Completed')}</p>
            </div>
            <div className="bg-[#0a0f1e]/80 backdrop-blur-sm p-6 border border-sky-500/20 hover:border-sky-400 transition-all hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1 animate-slide-up" style={{animationDelay: '0.5s'}}>
              <p className="font-bold text-3xl text-sky-400 mb-2">100%</p>
              <p className="text-gray-400 text-sm">{t('Client Satisfaction')}</p>
            </div>
            <div className="col-span-2 md:col-span-1 bg-[#0a0f1e]/80 backdrop-blur-sm p-6 border border-sky-500/20 hover:border-sky-400 transition-all hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1 animate-slide-up" style={{animationDelay: '0.6s'}}>
              <p className="font-bold text-3xl text-sky-400 mb-2">15+</p>
              <p className="text-gray-400 text-sm">{t('Industry Awards')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}