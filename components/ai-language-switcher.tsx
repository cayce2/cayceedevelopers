/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Languages, Sparkles, Check } from 'lucide-react'
import { useLanguage } from '../lib/language-context'
import { useTranslation } from '../lib/use-translation'

interface LanguageOption {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English (US)', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
]

export function AILanguageSwitcher() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [translatedNames, setTranslatedNames] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Always call hooks at the top level
  useEffect(() => {
    // Only run translation if languageContext and language are available
    if (!languageContext) return;

    const { language, translateText } = languageContext;

    const translateLanguageNames = async () => {
      if (language === 'en') return

      setIsLoading(true)
      const translations: Record<string, string> = {}

      for (const lang of languages) {
        try {
          translations[lang.code] = await translateText(lang.name, language)
        } catch (error) {
          translations[lang.code] = lang.name
        }
      }

      setTranslatedNames(translations)
      setIsLoading(false)
    }

    translateLanguageNames()
  }, [languageContext])

  if (!languageContext) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
        <Languages className="h-4 w-4" />
        <span>EN</span>
      </button>
    )
  }

  const { language, setLanguage, suggestedLanguages, isAutoDetected, translateText } = languageContext
  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageChange = async (langCode: string) => {
    await setLanguage(langCode as 'en' | 'es' | 'fr' | 'de')
    setIsOpen(false)
  }

  const getDisplayName = (lang: LanguageOption) => {
    if (language === 'en') return lang.name
    return translatedNames[lang.code] || lang.name
  }

  const getSortedLanguages = () => {
    // Sort languages by suggestion priority
    return languages.sort((a, b) => {
      const aIndex = suggestedLanguages.indexOf(a.code)
      const bIndex = suggestedLanguages.indexOf(b.code)
      
      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      
      return aIndex - bIndex
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0a0f1e]/80 backdrop-blur-sm border border-sky-500/30 hover:border-sky-400 text-sky-400 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:scale-105 group"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline font-semibold">
          {isLoading ? '...' : currentLanguage?.code.toUpperCase()}
        </span>
        {isAutoDetected && (
          <Sparkles className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
        )}
        <Languages className="h-4 w-4 text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 bottom-full mb-3 w-72 bg-[#0a0f1e]/95 backdrop-blur-xl border border-sky-500/30 rounded-xl shadow-2xl shadow-sky-500/10 z-20 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            {isAutoDetected && (
              <div className="px-4 py-3 bg-sky-500/10 border-b border-sky-500/20">
                <div className="flex items-center gap-2 text-xs font-medium text-sky-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t('AI detected your language')}</span>
                </div>
              </div>
            )}

            <div className="p-2">
              {getSortedLanguages().map((lang) => {
                const isSuggested = suggestedLanguages.includes(lang.code)
                const isCurrent = lang.code === language

                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200 flex items-center justify-between group ${
                      isCurrent 
                        ? 'bg-sky-500/20 border border-sky-500/40 shadow-sm shadow-sky-500/20' 
                        : 'hover:bg-sky-500/10 hover:border hover:border-sky-500/20 active:scale-[0.98]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{lang.flag}</span>
                      <div>
                        <div className={`text-sm font-semibold ${
                          isCurrent ? 'text-sky-400' : 'text-gray-300'
                        }`}>
                          {getDisplayName(lang)}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          {lang.nativeName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isSuggested && !isCurrent && (
                        <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                      )}
                      {isCurrent && (
                        <div className="h-5 w-5 rounded-full bg-sky-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="px-4 py-3 bg-[#050a14]/50 border-t border-sky-500/20">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                <span>{t('Powered by AI translation')}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
    }