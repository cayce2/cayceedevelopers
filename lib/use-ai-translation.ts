'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './language-context'

interface TranslationCache {
  [key: string]: {
    [lang: string]: string
  }
}

export function useAITranslation() {
  const context = useLanguage()
  if (!context) {
    throw new Error('useAITranslation must be used within a LanguageProvider')
  }
  const { language, translateText } = context
  const [cache, setCache] = useState<TranslationCache>({})
  const [isTranslating, setIsTranslating] = useState(false)

  const t = async (key: string, defaultText: string): Promise<string> => {
    // Return original text for English
    if (language === 'en') {
      return defaultText
    }

    // Check cache first
    if (cache[key]?.[language]) {
      return cache[key][language]
    }

    // Translate if not in cache
    try {
      setIsTranslating(true)
      const translated = await translateText(defaultText, language)
      
      // Update cache
      setCache(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [language]: translated
        }
      }))
      
      return translated
    } catch (error) {
      console.warn(`Translation failed for key "${key}":`, error)
      return defaultText
    } finally {
      setIsTranslating(false)
    }
  }

  // Batch translation for multiple texts
  const translateBatch = async (items: Array<{ key: string; text: string }>): Promise<Record<string, string>> => {
    if (language === 'en') {
      return items.reduce((acc, item) => {
        acc[item.key] = item.text
        return acc
      }, {} as Record<string, string>)
    }

    const results: Record<string, string> = {}
    setIsTranslating(true)

    try {
      for (const item of items) {
        // Check cache first
        if (cache[item.key]?.[language]) {
          results[item.key] = cache[item.key][language]
        } else {
          // Translate
          const translated = await translateText(item.text, language)
          results[item.key] = translated
          
          // Update cache
          setCache(prev => ({
            ...prev,
            [item.key]: {
              ...prev[item.key],
              [language]: translated
            }
          }))
        }
      }
    } catch (error) {
      console.warn('Batch translation failed:', error)
      // Fallback to original texts
      items.forEach(item => {
        if (!results[item.key]) {
          results[item.key] = item.text
        }
      })
    } finally {
      setIsTranslating(false)
    }

    return results
  }

  // Clear cache when language changes
  useEffect(() => {
    // Keep cache but mark as potentially stale
    // In a production app, you might want to implement cache invalidation
  }, [language])

  return {
    t,
    translateBatch,
    isTranslating,
    currentLanguage: language
  }
}