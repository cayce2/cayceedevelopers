/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Globe, Sparkles, Check } from 'lucide-react'
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
      <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
        <option value="en">English (US)</option>
      </select>
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
            className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all group"
          >
            <Globe className="h-4 w-4 text-slate-400 group-hover:text-purple-500 transition-colors" />
            <span className="flex items-center gap-1">
              {currentLanguage?.flag}
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                getDisplayName(currentLanguage!)
              )}
            </span>
            {isAutoDetected && (
              <Sparkles className="h-3 w-3 text-purple-500" />
            )}
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
    
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-20 overflow-hidden">
                {isAutoDetected && (
                  <div className="px-3 py-2 bg-purple-50 border-b border-purple-100">
                    <div className="flex items-center gap-2 text-xs text-purple-700">
                      <Sparkles className="h-3 w-3" />
                      <span>{t('AI detected your language')}</span>
                    </div>
                  </div>
                )}
    
                <div className="py-1">
                  {getSortedLanguages().map((lang) => {
                    const isSuggested = suggestedLanguages.includes(lang.code)
                    const isCurrent = lang.code === language
    
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors flex items-center justify-between group ${
                          isCurrent ? 'bg-purple-50 text-purple-700' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{lang.flag}</span>
                          <div>
                            <div className={`text-sm font-medium ${
                              isCurrent ? 'text-purple-700' : 'text-slate-900'
                            }`}>
                              {getDisplayName(lang)}
                            </div>
                            <div className="text-xs text-slate-500">
                              {lang.nativeName}
                            </div>
                          </div>
                        </div>
    
                        <div className="flex items-center gap-1">
                          {isSuggested && !isCurrent && (
                            <Sparkles className="h-3 w-3 text-purple-400" />
                          )}
                          {isCurrent && (
                            <Check className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
    
                <div className="px-3 py-2 bg-slate-50 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Sparkles className="h-3 w-3" />
                    <span>{t('Powered by AI translation')}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )
    }