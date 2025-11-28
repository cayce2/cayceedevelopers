'use client'

export interface LanguageDetection {
  language: string
  confidence: number
  region?: string
}

export interface TranslationRequest {
  text: string
  from: string
  to: string
}

export class AILanguageService {
  private static instance: AILanguageService
  private cache = new Map<string, string>()

  static getInstance(): AILanguageService {
    if (!AILanguageService.instance) {
      AILanguageService.instance = new AILanguageService()
    }
    return AILanguageService.instance
  }

  // Auto-detect user's preferred language using browser APIs and AI
  async detectUserLanguage(): Promise<LanguageDetection> {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en'
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // Extract language and region
    const [language, region] = browserLang.split('-')
    
    // AI-enhanced detection based on timezone and browser preferences
    const confidence = this.calculateConfidence(language, timezone, navigator.languages)
    
    return {
      language: this.mapToSupportedLanguage(language),
      confidence,
      region
    }
  }

  // Get intelligent language suggestions based on user context
  async getLanguageSuggestions(): Promise<string[]> {
    const detection = await this.detectUserLanguage()
    const suggestions = ['en'] // Always include English
    
    // Add detected language if different
    if (detection.language !== 'en') {
      suggestions.unshift(detection.language)
    }
    
    // Add regional languages based on timezone
    const regionalLangs = this.getRegionalLanguages(detection.region)
    regionalLangs.forEach(lang => {
      if (!suggestions.includes(lang)) {
        suggestions.push(lang)
      }
    })
    
    return suggestions.slice(0, 4) // Limit to 4 suggestions
  }

  // AI-powered translation (mock implementation - in production, use OpenAI/Google Translate API)
  async translateText(request: TranslationRequest): Promise<string> {
    const cacheKey = `${request.from}-${request.to}-${request.text}`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Mock AI translation - in production, integrate with OpenAI or Google Translate
    const translated = await this.mockAITranslation(request)
    this.cache.set(cacheKey, translated)
    
    return translated
  }

  // Smart language switching with context awareness
  async smartLanguageSwitch(targetLang: string): Promise<void> {
    const currentLang = localStorage.getItem('language') || 'en'
    
    // Store language preference with timestamp and context
    const languageData = {
      language: targetLang,
      timestamp: Date.now(),
      previousLanguage: currentLang,
      autoDetected: false
    }
    
    localStorage.setItem('language', targetLang)
    localStorage.setItem('languageData', JSON.stringify(languageData))
    
    // Trigger custom event for components to react
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: targetLang, previous: currentLang }
    }))
  }

  private calculateConfidence(language: string, timezone: string, languages: readonly string[]): number {
    let confidence = 0.5 // Base confidence
    
    // Increase confidence if multiple browser languages match
    const matchingLangs = languages.filter(lang => lang.startsWith(language))
    confidence += matchingLangs.length * 0.1
    
    // Timezone-based confidence boost
    const timezoneBoost = this.getTimezoneLanguageMatch(timezone, language)
    confidence += timezoneBoost
    
    return Math.min(confidence, 1.0)
  }

  private mapToSupportedLanguage(language: string): string {
    const supportedLanguages = ['en', 'es', 'fr', 'de']
    return supportedLanguages.includes(language) ? language : 'en'
  }

  private getRegionalLanguages(region?: string): string[] {
    const regionalMap: Record<string, string[]> = {
      'US': ['en'],
      'CA': ['en', 'fr'],
      'MX': ['es'],
      'ES': ['es'],
      'FR': ['fr'],
      'DE': ['de'],
      'AT': ['de'],
      'CH': ['de', 'fr']
    }
    
    return regionalMap[region || ''] || []
  }

  private getTimezoneLanguageMatch(timezone: string, language: string): number {
    const timezoneLanguageMap: Record<string, string[]> = {
      'America/New_York': ['en'],
      'America/Los_Angeles': ['en'],
      'America/Mexico_City': ['es'],
      'Europe/Madrid': ['es'],
      'Europe/Paris': ['fr'],
      'Europe/Berlin': ['de'],
      'Europe/Vienna': ['de'],
      'Europe/Zurich': ['de', 'fr']
    }
    
    const expectedLanguages = timezoneLanguageMap[timezone] || []
    return expectedLanguages.includes(language) ? 0.2 : 0
  }

  private async mockAITranslation(request: TranslationRequest): Promise<string> {
    // Mock translation dictionary for demo purposes
    const translations: Record<string, Record<string, string>> = {
      'en-es': {
        'English (US)': 'Inglés (EE.UU.)',
        'Spanish': 'Español',
        'French': 'Francés',
        'German': 'Alemán',
        'Auto-detected': 'Detectado automáticamente'
      },
      'en-fr': {
        'English (US)': 'Anglais (États-Unis)',
        'Spanish': 'Espagnol',
        'French': 'Français',
        'German': 'Allemand',
        'Auto-detected': 'Détecté automatiquement'
      },
      'en-de': {
        'English (US)': 'Englisch (USA)',
        'Spanish': 'Spanisch',
        'French': 'Französisch',
        'German': 'Deutsch',
        'Auto-detected': 'Automatisch erkannt'
      }
    }
    
    const key = `${request.from}-${request.to}`
    const translationMap = translations[key]
    
    if (translationMap && translationMap[request.text]) {
      return translationMap[request.text]
    }
    
    // Fallback: return original text
    return request.text
  }
}