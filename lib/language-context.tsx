"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type LanguageCode = "en" | "es" | "pl" | "zh" | "ar"

interface Language {
  code: LanguageCode
  label: string
  nativeLabel: string
  direction: "ltr" | "rtl"
}

export const languages: Language[] = [
  { code: "en", label: "English", nativeLabel: "English", direction: "ltr" },
  { code: "es", label: "Spanish", nativeLabel: "Español", direction: "ltr" },
  { code: "pl", label: "Polish", nativeLabel: "Polski", direction: "ltr" },
  { code: "zh", label: "Chinese", nativeLabel: "中文", direction: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", direction: "rtl" },
]

// Translation strings
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    home: "Home",
    search: "Search",
    searchHousing: "Search Housing",
    findHousing: "Find Housing",
    programs: "Programs",
    resources: "Resources",
    contact: "Contact",
    account: "Account",
    signIn: "Sign In",
    signOut: "Sign Out",
    myDashboard: "My Dashboard",
    language: "Language",
    section8: "Section 8 Vouchers",
    section8Desc: "Housing choice voucher program",
    taxCredit: "Tax Credit Housing",
    taxCreditDesc: "Low income housing tax credit",
    publicHousing: "Public Housing",
    publicHousingDesc: "Government-owned housing",
    seniorHousing: "Senior Housing",
    seniorHousingDesc: "Housing for ages 62+",
    applicationGuide: "Application Guide",
    applicationGuideDesc: "Step-by-step help",
    faq: "FAQ",
    faqDesc: "Common questions answered",
    contactSupport: "Contact Support",
    contactSupportDesc: "Get personalized help",
    emergencyHousing: "Emergency Housing",
    emergencyHousingDesc: "Crisis assistance",
    heroTitle: "Find Your Perfect Affordable Home in Illinois",
    heroSubtitle: "Search thousands of affordable housing options across Illinois. Apply to waitlists, track your applications, and find your next home.",
    searchPlaceholder: "Enter city, ZIP code, or address...",
    popularCities: "Popular cities:",
  },
  es: {
    home: "Inicio",
    search: "Buscar",
    searchHousing: "Buscar Vivienda",
    findHousing: "Encontrar Vivienda",
    programs: "Programas",
    resources: "Recursos",
    contact: "Contacto",
    account: "Cuenta",
    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión",
    myDashboard: "Mi Panel",
    language: "Idioma",
    section8: "Vales Sección 8",
    section8Desc: "Programa de vales de elección de vivienda",
    taxCredit: "Vivienda con Crédito Fiscal",
    taxCreditDesc: "Crédito fiscal para viviendas de bajos ingresos",
    publicHousing: "Vivienda Pública",
    publicHousingDesc: "Viviendas de propiedad gubernamental",
    seniorHousing: "Vivienda para Adultos Mayores",
    seniorHousingDesc: "Vivienda para mayores de 62 años",
    applicationGuide: "Guía de Solicitud",
    applicationGuideDesc: "Ayuda paso a paso",
    faq: "Preguntas Frecuentes",
    faqDesc: "Respuestas a preguntas comunes",
    contactSupport: "Contactar Soporte",
    contactSupportDesc: "Obtener ayuda personalizada",
    emergencyHousing: "Vivienda de Emergencia",
    emergencyHousingDesc: "Asistencia en crisis",
    heroTitle: "Encuentre Su Hogar Asequible Perfecto en Illinois",
    heroSubtitle: "Busque miles de opciones de vivienda asequible en Illinois. Aplique a listas de espera, rastree sus solicitudes y encuentre su próximo hogar.",
    searchPlaceholder: "Ingrese ciudad, código postal o dirección...",
    popularCities: "Ciudades populares:",
  },
  pl: {
    home: "Strona główna",
    search: "Szukaj",
    searchHousing: "Szukaj Mieszkania",
    findHousing: "Znajdź Mieszkanie",
    programs: "Programy",
    resources: "Zasoby",
    contact: "Kontakt",
    account: "Konto",
    signIn: "Zaloguj się",
    signOut: "Wyloguj się",
    myDashboard: "Mój Panel",
    language: "Język",
    section8: "Bony Sekcji 8",
    section8Desc: "Program bonów mieszkaniowych",
    taxCredit: "Mieszkania z Ulgą Podatkową",
    taxCreditDesc: "Ulga podatkowa dla mieszkań o niskich dochodach",
    publicHousing: "Mieszkania Komunalne",
    publicHousingDesc: "Mieszkania należące do rządu",
    seniorHousing: "Mieszkania dla Seniorów",
    seniorHousingDesc: "Mieszkania dla osób 62+",
    applicationGuide: "Przewodnik Aplikacji",
    applicationGuideDesc: "Pomoc krok po kroku",
    faq: "FAQ",
    faqDesc: "Odpowiedzi na częste pytania",
    contactSupport: "Skontaktuj się z Pomocą",
    contactSupportDesc: "Uzyskaj spersonalizowaną pomoc",
    emergencyHousing: "Mieszkania Awaryjne",
    emergencyHousingDesc: "Pomoc kryzysowa",
    heroTitle: "Znajdź Swój Idealny Dom w Illinois",
    heroSubtitle: "Przeszukaj tysiące opcji przystępnych cenowo mieszkań w Illinois. Aplikuj na listy oczekujących, śledź swoje aplikacje i znajdź swój następny dom.",
    searchPlaceholder: "Wpisz miasto, kod pocztowy lub adres...",
    popularCities: "Popularne miasta:",
  },
  zh: {
    home: "首页",
    search: "搜索",
    searchHousing: "搜索住房",
    findHousing: "寻找住房",
    programs: "项目",
    resources: "资源",
    contact: "联系我们",
    account: "账户",
    signIn: "登录",
    signOut: "退出",
    myDashboard: "我的面板",
    language: "语言",
    section8: "第8节住房券",
    section8Desc: "住房选择券计划",
    taxCredit: "税收抵免住房",
    taxCreditDesc: "低收入住房税收抵免",
    publicHousing: "公共住房",
    publicHousingDesc: "政府所有住房",
    seniorHousing: "老年住房",
    seniorHousingDesc: "62岁以上住房",
    applicationGuide: "申请指南",
    applicationGuideDesc: "逐步帮助",
    faq: "常见问题",
    faqDesc: "常见问题解答",
    contactSupport: "联系支持",
    contactSupportDesc: "获取个性化帮助",
    emergencyHousing: "紧急住房",
    emergencyHousingDesc: "危机援助",
    heroTitle: "在伊利诺伊州找到您理想的经济适用房",
    heroSubtitle: "搜索伊利诺伊州数千个经济适用房选项。申请候补名单，跟踪您的申请，找到您的下一个家。",
    searchPlaceholder: "输入城市、邮编或地址...",
    popularCities: "热门城市：",
  },
  ar: {
    home: "الرئيسية",
    search: "بحث",
    searchHousing: "البحث عن سكن",
    findHousing: "ابحث عن سكن",
    programs: "البرامج",
    resources: "الموارد",
    contact: "اتصل بنا",
    account: "الحساب",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    myDashboard: "لوحة التحكم",
    language: "اللغة",
    section8: "قسائم القسم 8",
    section8Desc: "برنامج قسيمة اختيار السكن",
    taxCredit: "إسكان الائتمان الضريبي",
    taxCreditDesc: "ائتمان ضريبي للإسكان منخفض الدخل",
    publicHousing: "الإسكان العام",
    publicHousingDesc: "إسكان مملوك للحكومة",
    seniorHousing: "إسكان كبار السن",
    seniorHousingDesc: "إسكان لمن هم 62+",
    applicationGuide: "دليل التطبيق",
    applicationGuideDesc: "مساعدة خطوة بخطوة",
    faq: "الأسئلة الشائعة",
    faqDesc: "إجابات على الأسئلة الشائعة",
    contactSupport: "اتصل بالدعم",
    contactSupportDesc: "احصل على مساعدة شخصية",
    emergencyHousing: "إسكان الطوارئ",
    emergencyHousingDesc: "مساعدة الأزمات",
    heroTitle: "ابحث عن منزلك الميسور المثالي في إلينوي",
    heroSubtitle: "ابحث في آلاف خيارات الإسكان الميسور في إلينوي. قدم طلبات لقوائم الانتظار، وتتبع طلباتك، وابحث عن منزلك التالي.",
    searchPlaceholder: "أدخل المدينة أو الرمز البريدي أو العنوان...",
    popularCities: "المدن الشائعة:",
  },
}

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: string) => string
  direction: "ltr" | "rtl"
  currentLanguage: Language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en")

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("ihda-language") as LanguageCode
    if (saved && languages.some(l => l.code === saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code)
    localStorage.setItem("ihda-language", code)
    
    // Update document direction for RTL languages
    const lang = languages.find(l => l.code === code)
    if (lang) {
      document.documentElement.dir = lang.direction
      document.documentElement.lang = code
    }
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  const currentLanguage = languages.find(l => l.code === language) || languages[0]

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      direction: currentLanguage.direction,
      currentLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
