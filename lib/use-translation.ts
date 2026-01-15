'use client'

import { useLanguage } from './language-context'

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'Services': 'Services',
    'Projects': 'Projects',
    'About': 'About',
    'Contact': 'Contact',
    'Get Started': 'Get Started',
    'Search': 'Search',
    
    // Hero Section
    'New Services Available': 'New Services Available',
    'Digital Solutions': 'Digital Solutions',
    'Where Design Meets Creativity': 'Where Design Meets Creativity',
    'We create innovative digital solutions': 'We create innovative digital solutions that help businesses thrive in the modern world, combining cutting-edge technology with exceptional design.',
    'View Our Work': 'View Our Work',
    'Contact Us': 'Contact Us',
    'Projects Completed': 'Projects Completed',
    'Client Satisfaction': 'Client Satisfaction',
    'Industry Awards': 'Industry Awards',
    'Scroll Down': 'Scroll Down',
    
    // Services Section
    'What We Offer': 'What We Offer',
    'Our Services': 'Our Services',
    'Comprehensive solutions': 'Comprehensive solutions tailored to your unique digital needs, delivered with expertise and precision.',
    'Web Development': 'Web Development',
    'Mobile Apps': 'Mobile Apps',
    'UI/UX Design': 'UI/UX Design',
    'Performance Optimization': 'Performance Optimization',
    'Growth Strategy': 'Growth Strategy',
    'Security Solutions': 'Security Solutions',
    'Learn more': 'Learn more',
    'Ready to transform': 'Ready to transform your digital presence?',
    'Schedule consultation': 'Schedule a free 30-minute consultation with our experts to discuss your project and discover how we can help bring your vision to life.',
    'Book a Consultation': 'Book a Consultation',
    
    // Projects Section
    'Featured Work': 'Featured Work',
    'Our Projects': 'Our Projects',
    'Recent work showcase': 'Recent work we\'ve delivered for our clients that showcase our expertise and creativity.',
    'View All Projects': 'View All Projects',
    'View Case Study': 'View Case Study',
    
    // Contact Section
    'Get in Touch': 'Get in Touch',
    'Lets discuss': 'Let\'s discuss your next project',
    'Fill out the form': 'Fill out the form below or email us directly.',
    'Name': 'Name',
    'Your name': 'Your name',
    'Email': 'Email',
    'your.email@example.com': 'your.email@example.com',
    'Message': 'Message',
    'How can we help': 'How can we help you?',
    'Send Message': 'Send Message',
    'Or reach us directly': 'Or reach us directly at:',
    
    // Footer
    'Stay Updated': 'Stay Updated',
    'Get the latest news': 'Get the latest news and updates from our team.',
    'Enter your email': 'Enter your email',
    'Subscribe': 'Subscribe',
    'Company': 'Company',
    'Careers': 'Careers',
    'Blog': 'Blog',
    'Press': 'Press',
    'Resources': 'Resources',
    'Documentation': 'Documentation',
    'Help Center': 'Help Center',
    'Privacy Policy': 'Privacy Policy',
    'Terms of Service': 'Terms of Service',
    'All rights reserved': 'All rights reserved',
    'Creating innovative digital solutions': 'Creating innovative digital solutions that help businesses thrive in the modern world. We combine cutting-edge technology with creative thinking.',
    
    // Language Switcher
    'AI detected your language': 'AI detected your language',
    'Powered by AI translation': 'Powered by AI translation',
    
    // Additional Service Descriptions
    'Custom websites and web applications': 'Custom websites and web applications',
    'Modern, responsive websites built with the latest technologies like React, Next.js, and Tailwind CSS.': 'Modern, responsive websites built with the latest technologies like React, Next.js, and Tailwind CSS.',
    'Native and cross-platform solutions': 'Native and cross-platform solutions',
    'Engaging mobile experiences for iOS and Android platforms using React Native and Flutter.': 'Engaging mobile experiences for iOS and Android platforms using React Native and Flutter.',
    'User-centered design solutions': 'User-centered design solutions',
    'Beautiful, intuitive interfaces that deliver exceptional user experiences across all devices.': 'Beautiful, intuitive interfaces that deliver exceptional user experiences across all devices.',
    'Speed and efficiency improvements': 'Speed and efficiency improvements',
    'Enhance your digital products with optimized loading times and smoother interactions.': 'Enhance your digital products with optimized loading times and smoother interactions.',
    'Data-driven approach': 'Data-driven approach',
    'Leverage analytics and user insights to drive continuous improvement and business growth.': 'Leverage analytics and user insights to drive continuous improvement and business growth.',
    'Protection for digital assets': 'Protection for digital assets',
    'Implement robust security measures to safeguard your applications and user data.': 'Implement robust security measures to safeguard your applications and user data.',
    'Popular': 'Popular',
    'Schedule a Consultation': 'Schedule a Consultation',
    'Your Name': 'Your Name',
    'Enter your name': 'Enter your name',
    'Email Address': 'Email Address',
    'Select a Date': 'Select a Date',
    'Select a Time': 'Select a Time',
    'Confirm Appointment': 'Confirm Appointment',
    'Processing...': 'Processing...',
    'Your booking details will be sent to our team and you\'ll receive a confirmation email shortly.': 'Your booking details will be sent to our team and you\'ll receive a confirmation email shortly.',
    'Consulting': 'Consulting'
  },
  es: {
    // Navigation
    'Services': 'Servicios',
    'Projects': 'Proyectos',
    'About': 'Acerca de',
    'Contact': 'Contacto',
    'Get Started': 'Comenzar',
    'Search': 'Buscar',
    
    // Hero Section
    'New Services Available': 'Nuevos Servicios Disponibles',
    'Digital Solutions': 'Soluciones Digitales',
    'Where Design Meets Creativity': 'Donde el Diseño se Encuentra con la Creatividad',
    'We create innovative digital solutions': 'Creamos soluciones digitales innovadoras que ayudan a las empresas a prosperar en el mundo moderno, combinando tecnología de vanguardia con un diseño excepcional.',
    'View Our Work': 'Ver Nuestro Trabajo',
    'Contact Us': 'Contáctanos',
    'Projects Completed': 'Proyectos Completados',
    'Client Satisfaction': 'Satisfacción del Cliente',
    'Industry Awards': 'Premios de la Industria',
    'Scroll Down': 'Desplazar Hacia Abajo',
    
    // Services Section
    'What We Offer': 'Lo Que Ofrecemos',
    'Our Services': 'Nuestros Servicios',
    'Comprehensive solutions': 'Soluciones integrales adaptadas a sus necesidades digitales únicas, entregadas con experiencia y precisión.',
    'Web Development': 'Desarrollo Web',
    'Mobile Apps': 'Aplicaciones Móviles',
    'UI/UX Design': 'Diseño UI/UX',
    'Performance Optimization': 'Optimización de Rendimiento',
    'Growth Strategy': 'Estrategia de Crecimiento',
    'Security Solutions': 'Soluciones de Seguridad',
    'Learn more': 'Saber más',
    'Ready to transform': '¿Listo para transformar tu presencia digital?',
    'Schedule consultation': 'Programa una consulta gratuita de 30 minutos con nuestros expertos para discutir tu proyecto y descubrir cómo podemos ayudar a dar vida a tu visión.',
    'Book a Consultation': 'Reservar una Consulta',
    
    // Projects Section
    'Featured Work': 'Trabajo Destacado',
    'Our Projects': 'Nuestros Proyectos',
    'Recent work showcase': 'Trabajo reciente que hemos entregado para nuestros clientes que muestra nuestra experiencia y creatividad.',
    'View All Projects': 'Ver Todos los Proyectos',
    'View Case Study': 'Ver Caso de Estudio',
    
    // Contact Section
    'Get in Touch': 'Ponte en Contacto',
    'Lets discuss': 'Hablemos de tu próximo proyecto',
    'Fill out the form': 'Completa el formulario a continuación o envíanos un correo electrónico directamente.',
    'Name': 'Nombre',
    'Your name': 'Tu nombre',
    'Email': 'Correo Electrónico',
    'your.email@example.com': 'tu.correo@ejemplo.com',
    'Message': 'Mensaje',
    'How can we help': '¿Cómo podemos ayudarte?',
    'Send Message': 'Enviar Mensaje',
    'Or reach us directly': 'O contáctanos directamente en:',
    
    // Footer
    'Stay Updated': 'Mantente Actualizado',
    'Get the latest news': 'Obtén las últimas noticias y actualizaciones de nuestro equipo.',
    'Enter your email': 'Ingresa tu correo electrónico',
    'Subscribe': 'Suscribirse',
    'Company': 'Empresa',
    'Careers': 'Carreras',
    'Blog': 'Blog',
    'Press': 'Prensa',
    'Resources': 'Recursos',
    'Documentation': 'Documentación',
    'Help Center': 'Centro de Ayuda',
    'Privacy Policy': 'Política de Privacidad',
    'Terms of Service': 'Términos de Servicio',
    'All rights reserved': 'Todos los derechos reservados',
    'Creating innovative digital solutions': 'Creando soluciones digitales innovadoras que ayudan a las empresas a prosperar en el mundo moderno. Combinamos tecnología de vanguardia con pensamiento creativo.',
    
    // Language Switcher
    'AI detected your language': 'IA detectó tu idioma',
    'Powered by AI translation': 'Impulsado por traducción IA',
    
    // Additional Service Descriptions
    'Custom websites and web applications': 'Sitios web personalizados y aplicaciones web',
    'Modern, responsive websites built with the latest technologies like React, Next.js, and Tailwind CSS.': 'Sitios web modernos y responsivos construidos con las últimas tecnologías como React, Next.js y Tailwind CSS.',
    'Native and cross-platform solutions': 'Soluciones nativas y multiplataforma',
    'Engaging mobile experiences for iOS and Android platforms using React Native and Flutter.': 'Experiencias móviles atractivas para plataformas iOS y Android usando React Native y Flutter.',
    'User-centered design solutions': 'Soluciones de diseño centradas en el usuario',
    'Beautiful, intuitive interfaces that deliver exceptional user experiences across all devices.': 'Interfaces hermosas e intuitivas que brindan experiencias de usuario excepcionales en todos los dispositivos.',
    'Speed and efficiency improvements': 'Mejoras de velocidad y eficiencia',
    'Enhance your digital products with optimized loading times and smoother interactions.': 'Mejore sus productos digitales con tiempos de carga optimizados e interacciones más fluidas.',
    'Data-driven approach': 'Enfoque basado en datos',
    'Leverage analytics and user insights to drive continuous improvement and business growth.': 'Aproveche los análisis y conocimientos del usuario para impulsar la mejora continua y el crecimiento empresarial.',
    'Protection for digital assets': 'Protección para activos digitales',
    'Implement robust security measures to safeguard your applications and user data.': 'Implemente medidas de seguridad robustas para proteger sus aplicaciones y datos de usuario.',
    'Popular': 'Popular',
    'Schedule a Consultation': 'Programar una Consulta',
    'Your Name': 'Su Nombre',
    'Enter your name': 'Ingrese su nombre',
    'Email Address': 'Dirección de Correo Electrónico',
    'Select a Date': 'Seleccione una Fecha',
    'Select a Time': 'Seleccione una Hora',
    'Confirm Appointment': 'Confirmar Cita',
    'Processing...': 'Procesando...',
    'Your booking details will be sent to our team and you\'ll receive a confirmation email shortly.': 'Los detalles de su reserva se enviarán a nuestro equipo y recibirá un correo electrónico de confirmación en breve.',
    'Consulting': 'Consultoría'
  },
  fr: {
    // Navigation
    'Services': 'Services',
    'Projects': 'Projets',
    'About': 'À Propos',
    'Contact': 'Contact',
    'Get Started': 'Commencer',
    'Search': 'Rechercher',
    
    // Hero Section
    'New Services Available': 'Nouveaux Services Disponibles',
    'Digital Solutions': 'Solutions Numériques',
    'Where Design Meets Creativity': 'Où le Design Rencontre la Créativité',
    'We create innovative digital solutions': 'Nous créons des solutions numériques innovantes qui aident les entreprises à prospérer dans le monde moderne, en combinant une technologie de pointe avec un design exceptionnel.',
    'View Our Work': 'Voir Notre Travail',
    'Contact Us': 'Nous Contacter',
    'Projects Completed': 'Projets Terminés',
    'Client Satisfaction': 'Satisfaction Client',
    'Industry Awards': 'Prix de l\'Industrie',
    'Scroll Down': 'Faire Défiler',
    
    // Services Section
    'What We Offer': 'Ce Que Nous Offrons',
    'Our Services': 'Nos Services',
    'Comprehensive solutions': 'Solutions complètes adaptées à vos besoins numériques uniques, livrées avec expertise et précision.',
    'Web Development': 'Développement Web',
    'Mobile Apps': 'Applications Mobiles',
    'UI/UX Design': 'Design UI/UX',
    'Performance Optimization': 'Optimisation des Performances',
    'Growth Strategy': 'Stratégie de Croissance',
    'Security Solutions': 'Solutions de Sécurité',
    'Learn more': 'En savoir plus',
    'Ready to transform': 'Prêt à transformer votre présence numérique?',
    'Schedule consultation': 'Planifiez une consultation gratuite de 30 minutes avec nos experts pour discuter de votre projet et découvrir comment nous pouvons aider à donner vie à votre vision.',
    'Book a Consultation': 'Réserver une Consultation',
    
    // Projects Section
    'Featured Work': 'Travail en Vedette',
    'Our Projects': 'Nos Projets',
    'Recent work showcase': 'Travail récent que nous avons livré pour nos clients qui met en valeur notre expertise et créativité.',
    'View All Projects': 'Voir Tous les Projets',
    'View Case Study': 'Voir l\'Étude de Cas',
    
    // Contact Section
    'Get in Touch': 'Entrer en Contact',
    'Lets discuss': 'Discutons de votre prochain projet',
    'Fill out the form': 'Remplissez le formulaire ci-dessous ou envoyez-nous un e-mail directement.',
    'Name': 'Nom',
    'Your name': 'Votre nom',
    'Email': 'E-mail',
    'your.email@example.com': 'votre.email@exemple.com',
    'Message': 'Message',
    'How can we help': 'Comment pouvons-nous vous aider?',
    'Send Message': 'Envoyer le Message',
    'Or reach us directly': 'Ou contactez-nous directement à:',
    
    // Footer
    'Stay Updated': 'Restez Informé',
    'Get the latest news': 'Obtenez les dernières nouvelles et mises à jour de notre équipe.',
    'Enter your email': 'Entrez votre e-mail',
    'Subscribe': 'S\'abonner',
    'Company': 'Entreprise',
    'Careers': 'Carrières',
    'Blog': 'Blog',
    'Press': 'Presse',
    'Resources': 'Ressources',
    'Documentation': 'Documentation',
    'Help Center': 'Centre d\'Aide',
    'Privacy Policy': 'Politique de Confidentialité',
    'Terms of Service': 'Conditions de Service',
    'All rights reserved': 'Tous droits réservés',
    'Creating innovative digital solutions': 'Créer des solutions numériques innovantes qui aident les entreprises à prospérer dans le monde moderne. Nous combinons une technologie de pointe avec une pensée créative.',
    
    // Language Switcher
    'AI detected your language': 'L\'IA a détecté votre langue',
    'Powered by AI translation': 'Alimenté par la traduction IA',
    
    // Additional Service Descriptions
    'Custom websites and web applications': 'Sites web personnalisés et applications web',
    'Modern, responsive websites built with the latest technologies like React, Next.js, and Tailwind CSS.': 'Sites web modernes et réactifs construits avec les dernières technologies comme React, Next.js et Tailwind CSS.',
    'Native and cross-platform solutions': 'Solutions natives et multiplateformes',
    'Engaging mobile experiences for iOS and Android platforms using React Native and Flutter.': 'Expériences mobiles engageantes pour les plateformes iOS et Android utilisant React Native et Flutter.',
    'User-centered design solutions': 'Solutions de conception centrées sur l\'utilisateur',
    'Beautiful, intuitive interfaces that deliver exceptional user experiences across all devices.': 'Interfaces belles et intuitives qui offrent des expériences utilisateur exceptionnelles sur tous les appareils.',
    'Speed and efficiency improvements': 'Améliorations de vitesse et d\'efficacité',
    'Enhance your digital products with optimized loading times and smoother interactions.': 'Améliorez vos produits numériques avec des temps de chargement optimisés et des interactions plus fluides.',
    'Data-driven approach': 'Approche basée sur les données',
    'Leverage analytics and user insights to drive continuous improvement and business growth.': 'Tirez parti des analyses et des informations utilisateur pour stimuler l\'amélioration continue et la croissance de l\'entreprise.',
    'Protection for digital assets': 'Protection des actifs numériques',
    'Implement robust security measures to safeguard your applications and user data.': 'Mettez en place des mesures de sécurité robustes pour protéger vos applications et données utilisateur.',
    'Popular': 'Populaire',
    'Schedule a Consultation': 'Planifier une Consultation',
    'Your Name': 'Votre Nom',
    'Enter your name': 'Entrez votre nom',
    'Email Address': 'Adresse E-mail',
    'Select a Date': 'Sélectionnez une Date',
    'Select a Time': 'Sélectionnez une Heure',
    'Confirm Appointment': 'Confirmer le Rendez-vous',
    'Processing...': 'Traitement en cours...',
    'Your booking details will be sent to our team and you\'ll receive a confirmation email shortly.': 'Les détails de votre réservation seront envoyés à notre équipe et vous recevrez un e-mail de confirmation sous peu.',
    'Consulting': 'Conseil'
  },
  de: {
    // Navigation
    'Services': 'Dienstleistungen',
    'Projects': 'Projekte',
    'About': 'Über Uns',
    'Contact': 'Kontakt',
    'Get Started': 'Loslegen',
    'Search': 'Suchen',
    
    // Hero Section
    'New Services Available': 'Neue Dienstleistungen Verfügbar',
    'Digital Solutions': 'Digitale Lösungen',
    'Where Design Meets Creativity': 'Wo Design auf Kreativität trifft',
    'We create innovative digital solutions': 'Wir schaffen innovative digitale Lösungen, die Unternehmen dabei helfen, in der modernen Welt erfolgreich zu sein, indem wir modernste Technologie mit außergewöhnlichem Design kombinieren.',
    'View Our Work': 'Unsere Arbeit Ansehen',
    'Contact Us': 'Kontaktieren Sie Uns',
    'Projects Completed': 'Abgeschlossene Projekte',
    'Client Satisfaction': 'Kundenzufriedenheit',
    'Industry Awards': 'Branchenauszeichnungen',
    'Scroll Down': 'Nach Unten Scrollen',
    
    // Services Section
    'What We Offer': 'Was Wir Anbieten',
    'Our Services': 'Unsere Dienstleistungen',
    'Comprehensive solutions': 'Umfassende Lösungen, die auf Ihre einzigartigen digitalen Bedürfnisse zugeschnitten und mit Expertise und Präzision geliefert werden.',
    'Web Development': 'Webentwicklung',
    'Mobile Apps': 'Mobile Apps',
    'UI/UX Design': 'UI/UX Design',
    'Performance Optimization': 'Leistungsoptimierung',
    'Growth Strategy': 'Wachstumsstrategie',
    'Security Solutions': 'Sicherheitslösungen',
    'Learn more': 'Mehr erfahren',
    'Ready to transform': 'Bereit, Ihre digitale Präsenz zu transformieren?',
    'Schedule consultation': 'Vereinbaren Sie eine kostenlose 30-minütige Beratung mit unseren Experten, um Ihr Projekt zu besprechen und zu entdecken, wie wir Ihre Vision zum Leben erwecken können.',
    'Book a Consultation': 'Beratung Buchen',
    
    // Projects Section
    'Featured Work': 'Ausgewählte Arbeiten',
    'Our Projects': 'Unsere Projekte',
    'Recent work showcase': 'Aktuelle Arbeiten, die wir für unsere Kunden geliefert haben und die unsere Expertise und Kreativität zeigen.',
    'View All Projects': 'Alle Projekte Anzeigen',
    'View Case Study': 'Fallstudie Anzeigen',
    
    // Contact Section
    'Get in Touch': 'Kontakt Aufnehmen',
    'Lets discuss': 'Lassen Sie uns über Ihr nächstes Projekt sprechen',
    'Fill out the form': 'Füllen Sie das untenstehende Formular aus oder senden Sie uns direkt eine E-Mail.',
    'Name': 'Name',
    'Your name': 'Ihr Name',
    'Email': 'E-Mail',
    'your.email@example.com': 'ihre.email@beispiel.com',
    'Message': 'Nachricht',
    'How can we help': 'Wie können wir Ihnen helfen?',
    'Send Message': 'Nachricht Senden',
    'Or reach us directly': 'Oder kontaktieren Sie uns direkt unter:',
    
    // Footer
    'Stay Updated': 'Auf dem Laufenden Bleiben',
    'Get the latest news': 'Erhalten Sie die neuesten Nachrichten und Updates von unserem Team.',
    'Enter your email': 'Geben Sie Ihre E-Mail ein',
    'Subscribe': 'Abonnieren',
    'Company': 'Unternehmen',
    'Careers': 'Karriere',
    'Blog': 'Blog',
    'Press': 'Presse',
    'Resources': 'Ressourcen',
    'Documentation': 'Dokumentation',
    'Help Center': 'Hilfezentrum',
    'Privacy Policy': 'Datenschutzrichtlinie',
    'Terms of Service': 'Nutzungsbedingungen',
    'All rights reserved': 'Alle Rechte vorbehalten',
    'Creating innovative digital solutions': 'Innovative digitale Lösungen schaffen, die Unternehmen helfen, in der modernen Welt erfolgreich zu sein. Wir kombinieren modernste Technologie mit kreativem Denken.',
    
    // Language Switcher
    'AI detected your language': 'KI hat Ihre Sprache erkannt',
    'Powered by AI translation': 'Angetrieben von KI-Übersetzung',
    
    // Additional Service Descriptions
    'Custom websites and web applications': 'Maßgeschneiderte Websites und Webanwendungen',
    'Modern, responsive websites built with the latest technologies like React, Next.js, and Tailwind CSS.': 'Moderne, responsive Websites, die mit den neuesten Technologien wie React, Next.js und Tailwind CSS erstellt wurden.',
    'Native and cross-platform solutions': 'Native und plattformübergreifende Lösungen',
    'Engaging mobile experiences for iOS and Android platforms using React Native and Flutter.': 'Ansprechende mobile Erfahrungen für iOS- und Android-Plattformen mit React Native und Flutter.',
    'User-centered design solutions': 'Benutzerzentrierte Design-Lösungen',
    'Beautiful, intuitive interfaces that deliver exceptional user experiences across all devices.': 'Schöne, intuitive Oberflächen, die außergewöhnliche Benutzererfahrungen auf allen Geräten bieten.',
    'Speed and efficiency improvements': 'Geschwindigkeits- und Effizienzverbesserungen',
    'Enhance your digital products with optimized loading times and smoother interactions.': 'Verbessern Sie Ihre digitalen Produkte mit optimierten Ladezeiten und flüssigeren Interaktionen.',
    'Data-driven approach': 'Datengetriebener Ansatz',
    'Leverage analytics and user insights to drive continuous improvement and business growth.': 'Nutzen Sie Analysen und Benutzererkenntnisse, um kontinuierliche Verbesserung und Geschäftswachstum voranzutreiben.',
    'Protection for digital assets': 'Schutz für digitale Vermögenswerte',
    'Implement robust security measures to safeguard your applications and user data.': 'Implementieren Sie robuste Sicherheitsmaßnahmen zum Schutz Ihrer Anwendungen und Benutzerdaten.',
    'Popular': 'Beliebt',
    'Schedule a Consultation': 'Beratung Vereinbaren',
    'Your Name': 'Ihr Name',
    'Enter your name': 'Geben Sie Ihren Namen ein',
    'Email Address': 'E-Mail-Adresse',
    'Select a Date': 'Datum Auswählen',
    'Select a Time': 'Uhrzeit Auswählen',
    'Confirm Appointment': 'Termin Bestätigen',
    'Processing...': 'Verarbeitung...',
    'Your booking details will be sent to our team and you\'ll receive a confirmation email shortly.': 'Ihre Buchungsdetails werden an unser Team gesendet und Sie erhalten in Kürze eine Bestätigungs-E-Mail.',
    'Consulting': 'Beratung'
  }
}

export function useTranslation() {
  const languageContext = useLanguage()
  
  const t = (key: string): string => {
    if (!languageContext) return key
    
    const { language } = languageContext
    const languageTranslations = translations[language as keyof typeof translations]
    
    return languageTranslations?.[key as keyof typeof languageTranslations] || key
  }
  
  return { t, language: languageContext?.language || 'en' }
}