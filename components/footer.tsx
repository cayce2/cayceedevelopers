"use client"

import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react"
import { AILanguageSwitcher } from "./ai-language-switcher"
import { useTranslation } from "@/lib/use-translation"

export function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className="bg-purple-50 border-t border-slate-200 py-16">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('Stay Updated')}</h3>
              <p className="text-slate-600">{t('Get the latest news')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder={t('Enter your email')} 
                className="px-4 py-3 flex-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                {t('Subscribe')} <ArrowRight className="h-4 w-4" />
              </button>  
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-purple-600 p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
                  <span className="font-bold text-purple-600 text-sm">
                    C
                  </span>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold">CayceeTech</span>
            </Link>
            <p className="text-slate-600 mb-6 max-w-md">
              Creating innovative digital solutions that help businesses thrive in the modern world. 
              We combine cutting-edge technology with creative thinking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#" aria-label="Twitter" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Email" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-sm mb-4 text-slate-900">{t('Company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('About')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Careers')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Blog')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Press')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-sm mb-4 text-slate-900">{t('Services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Web Development')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Mobile Apps')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('UI/UX Design')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Consulting')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-medium text-sm mb-4 text-slate-900">{t('Resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Documentation')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Help Center')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t('Terms of Service')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} CayceeTech. {t('All rights reserved')}.</p>
          <div className="mt-4 md:mt-0">
            <AILanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
    )
  }
