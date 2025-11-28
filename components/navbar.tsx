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
  
  // Handle navbar appearance on scroll
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
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-purple-600 p-[2px] shadow-md transition-all duration-300 group-hover:shadow-purple-300">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
                <span className="font-bold text-lg text-purple-600">
                  C
                </span>
              </div>
            </div>
            <span className="ml-3 text-xl font-bold">CayceeTech</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6">
          <div className="relative group">
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-slate-700 group-hover:text-purple-600 transition-colors">
              <span>{t('Services')}</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-2 hidden group-hover:block">
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-3 grid grid-cols-1 gap-1">
                <Link href="#web-dev" className="px-3 py-2 text-sm rounded-lg hover:bg-purple-50 text-slate-700 hover:text-purple-600 text-center">
                  {t('Web Development')}
                </Link>
                <Link href="#mobile-apps" className="px-3 py-2 text-sm rounded-lg hover:bg-purple-50 text-slate-700 hover:text-purple-600 text-center">
                  {t('Mobile Apps')}
                </Link>
                <Link href="#design" className="px-3 py-2 text-sm rounded-lg hover:bg-purple-50 text-slate-700 hover:text-purple-600 text-center">
                  {t('UI/UX Design')}
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="#projects" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors">
            {t('Projects')}
          </Link>
          
          <Link href="#about" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors">
            {t('About')}
          </Link>
          
          <Link href="#contacts" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors">
            {t('Contact')}
          </Link>
          
          <div className="flex items-center space-x-3 ml-6">
            <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full border-slate-200">
              <Search className="h-4 w-4 text-slate-600" />
              <span className="sr-only">{t('Search')}</span>
            </Button>
            
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm">
              {t('Get Started')}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 md:hidden">
          <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full border-slate-200">
            <Search className="h-4 w-4 text-slate-600" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-slate-200">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] border-l border-slate-100">
              <div className="pt-6 pb-10 flex flex-col items-center">
                <Link href="/" className="flex items-center mb-10 justify-center" onClick={() => setIsMenuOpen(false)}>
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-purple-600 p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
                      <span className="font-bold text-lg text-purple-600">
                        C
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-xl font-bold">CayceeTech</span>
                </Link>
              
                <div className="grid gap-1 w-full text-center">
                  <div className="mb-4">
                    <div className="font-medium text-lg mb-2">{t('Services')}</div>
                    <div className="grid gap-1">
                      <Link
                        href="#web-dev"
                        className="py-2 text-slate-600 hover:text-purple-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('Web Development')}
                      </Link>
                      <Link
                        href="#mobile-apps"
                        className="py-2 text-slate-600 hover:text-purple-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('Mobile Apps')}
                      </Link>
                      <Link
                        href="#design"
                        className="py-2 text-slate-600 hover:text-purple-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('UI/UX Design')}
                      </Link>
                    </div>
                  </div>
                  
                  <Link
                    href="#projects"
                    className="py-3 text-lg font-medium hover:text-purple-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('Projects')}
                  </Link>
                  
                  <Link
                    href="#about"
                    className="py-3 text-lg font-medium hover:text-purple-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('About')}
                  </Link>
                  
                  <Link
                    href="#contacts"
                    className="py-3 text-lg font-medium hover:text-purple-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('Contact')}
                  </Link>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
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