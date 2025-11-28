'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AILanguageService } from './ai-language-service'

type Language = 'en' | 'es' | 'fr' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  suggestedLanguages: string[]
  isAutoDetected: boolean
  translateText: (text: string, targetLang?: Language) => Promise<string>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [suggestedLanguages, setSuggestedLanguages] = useState<string[]>(['en'])
  const [isAutoDetected, setIsAutoDetected] = useState(false)
  const aiService = AILanguageService.getInstance()

  useEffect(() => {
    const initializeLanguage = async () => {
      const saved = localStorage.getItem('language') as Language
      const languageData = localStorage.getItem('languageData')
      
      if (saved) {
        setLanguageState(saved)
        if (languageData) {
          const data = JSON.parse(languageData)
          setIsAutoDetected(data.autoDetected || false)
        }
      } else {
        // Auto-detect language on first visit
        try {
          const detection = await aiService.detectUserLanguage()
          if (detection.confidence > 0.7) {
            setLanguageState(detection.language as Language)
            setIsAutoDetected(true)
            localStorage.setItem('language', detection.language)
            localStorage.setItem('languageData', JSON.stringify({
              language: detection.language,
              timestamp: Date.now(),
              autoDetected: true,
              confidence: detection.confidence
            }))
          }
        } catch (error) {
          console.warn('Language auto-detection failed:', error)
        }
      }
      
      // Get AI-powered language suggestions
      try {
        const suggestions = await aiService.getLanguageSuggestions()
        setSuggestedLanguages(suggestions)
      } catch (error) {
        console.warn('Failed to get language suggestions:', error)
      }
    }

    initializeLanguage()
  }, [])

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang)
    setIsAutoDetected(false)
    await aiService.smartLanguageSwitch(lang)
  }

  const translateText = async (text: string, targetLang: Language = language): Promise<string> => {
    try {
      return await aiService.translateText({
        text,
        from: 'en',
        to: targetLang
      })
    } catch (error) {
      console.warn('Translation failed:', error)
      return text
    }
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      suggestedLanguages,
      isAutoDetected,
      translateText
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType | null {
  const context = useContext(LanguageContext)
  if (!context) {
    console.warn('useLanguage must be used within LanguageProvider')
    return null
  }
  return context
}