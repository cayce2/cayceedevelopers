/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTranslation } from "@/lib/use-translation"

export function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-[#050a14]/95 backdrop-blur-md border-b border-sky-500/20 shadow-lg shadow-sky-500/5" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center group">
          <div className="relative h-10 w-10 overflow-hidden bg-sky-500 shadow-lg shadow-sky-500/30 transition-all group-hover:shadow-sky-500/50 group-hover:scale-110">
            <span className="flex h-full w-full items-center justify-center font-bold text-lg text-white">
              C
            </span>
          </div>
          <span className="ml-3 text-xl font-bold text-white transition-colors group-hover:text-sky-400">CayceeTech</span>
        </Link>

        <nav className="hidden md:flex items-center justify-center space-x-8">
          <div className="relative group">
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-sky-400 transition-all">
              <span>{t('Services')}</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-2 hidden group-hover:block animate-slide-up">
              <div className="bg-[#0a0f1e] border border-sky-500/20 p-2 shadow-xl shadow-sky-500/10 backdrop-blur-md">
                <Link href="#web-dev" className="block px-4 py-2 text-sm text-gray-300 hover:text-sky-400 hover:bg-sky-500/10 transition-all">
                  {t('Web Development')}
                </Link>
                <Link href="#mobile-apps" className="block px-4 py-2 text-sm text-gray-300 hover:text-sky-400 hover:bg-sky-500/10 transition-all">
                  {t('Mobile Apps')}
                </Link>
                <Link href="#design" className="block px-4 py-2 text-sm text-gray-300 hover:text-sky-400 hover:bg-sky-500/10 transition-all">
                  {t('UI/UX Design')}
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="#projects" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-sky-400 transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full">
            {t('Projects')}
          </Link>
          
          <Link href="#about" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-sky-400 transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full">
            {t('About')}
          </Link>
          
          <Link href="#contacts" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-sky-400 transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full">
            {t('Contact')}
          </Link>
          
          <div className="flex items-center space-x-3 ml-6">
            <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-sky-500/30 hover:border-sky-400 hover:bg-sky-500/10 transition-all hover:scale-110">
              <Search className="h-4 w-4 text-gray-300" />
              <span className="sr-only">{t('Search')}</span>
            </Button>
            
            <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/40 hover:scale-105">
              {t('Get Started')}
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-sky-500/30">
            <Search className="h-4 w-4 text-gray-300" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 border-sky-500/30">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] bg-[#0a0f1e] border-l border-sky-500/20">
              <div className="pt-6 pb-10 flex flex-col items-center">
                <Link href="/" className="flex items-center mb-10" onClick={() => setIsMenuOpen(false)}>
                  <div className="h-10 w-10 bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                    <span className="font-bold text-lg text-white">C</span>
                  </div>
                  <span className="ml-3 text-xl font-bold text-white">CayceeTech</span>
                </Link>
              
                <div className="grid gap-1 w-full text-center">
                  <div className="mb-4">
                    <div className="font-medium text-lg mb-2 text-white">{t('Services')}</div>
                    <div className="grid gap-1">
                      <Link href="#web-dev" className="py-2 text-gray-400 hover:text-sky-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {t('Web Development')}
                      </Link>
                      <Link href="#mobile-apps" className="py-2 text-gray-400 hover:text-sky-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {t('Mobile Apps')}
                      </Link>
                      <Link href="#design" className="py-2 text-gray-400 hover:text-sky-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {t('UI/UX Design')}
                      </Link>
                    </div>
                  </div>
                  
                  <Link href="#projects" className="py-3 text-lg font-medium text-white hover:text-sky-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {t('Projects')}
                  </Link>
                  
                  <Link href="#about" className="py-3 text-lg font-medium text-white hover:text-sky-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {t('About')}
                  </Link>
                  
                  <Link href="#contacts" className="py-3 text-lg font-medium text-white hover:text-sky-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {t('Contact')}
                  </Link>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/20">
                      {t('Get Started')}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}