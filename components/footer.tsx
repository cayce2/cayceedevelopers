"use client"

import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react"
import { AILanguageSwitcher } from "./ai-language-switcher"
import { useTranslation } from "@/lib/use-translation"

export function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className="bg-[#050a14] border-t border-sky-500/20 py-16">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-16 bg-sky-500/10 backdrop-blur-sm p-8 shadow-lg border border-sky-500/20 hover:border-sky-400 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">{t('Stay Updated')}</h3>
              <p className="text-gray-400">{t('Get the latest news')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder={t('Enter your email')} 
                className="px-4 py-3 flex-1 rounded-lg border border-sky-500/30 bg-[#0f1729] text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-500"
              />
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-3 flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-105">
                {t('Subscribe')} <ArrowRight className="h-4 w-4" />
              </button>  
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative h-10 w-10 overflow-hidden bg-sky-500 p-[2px] shadow-lg shadow-sky-500/30 transition-all hover:shadow-sky-500/50 hover:scale-110">
                <div className="flex h-full w-full items-center justify-center bg-[#050a14]">
                  <span className="font-bold text-sky-400 text-sm">
                    C
                  </span>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold text-white">CayceeTech</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('Creating innovative digital solutions')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#" aria-label="Twitter" className="bg-sky-500/10 p-2 shadow-sm border border-sky-500/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/20 transition-all hover:scale-110">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className="bg-sky-500/10 p-2 shadow-sm border border-sky-500/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/20 transition-all hover:scale-110">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="bg-sky-500/10 p-2 shadow-sm border border-sky-500/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/20 transition-all hover:scale-110">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="bg-sky-500/10 p-2 shadow-sm border border-sky-500/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/20 transition-all hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Email" className="bg-sky-500/10 p-2 shadow-sm border border-sky-500/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/20 transition-all hover:scale-110">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-sm mb-4 text-white">{t('Company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('About')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Careers')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Blog')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Press')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-sm mb-4 text-white">{t('Services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Web Development')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Mobile Apps')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('UI/UX Design')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Consulting')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-medium text-sm mb-4 text-white">{t('Resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Documentation')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Help Center')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                  {t('Terms of Service')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-sky-500/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} CayceeTech. {t('All rights reserved')}.</p>
          <div className="mt-4 md:mt-0">
            <AILanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
    )
  }
