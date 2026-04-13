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

// Comprehensive translation strings
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    search: "Search",
    searchHousing: "Search Housing",
    findHousing: "Find Housing",
    programs: "Programs",
    resources: "Resources",
    contact: "Contact",
    about: "About",
    account: "Account",
    signIn: "Sign In",
    signOut: "Sign Out",
    register: "Register",
    myDashboard: "My Dashboard",
    language: "Language",
    menu: "Menu",
    
    // Programs
    section8: "Section 8 Vouchers",
    section8Desc: "Housing choice voucher program",
    taxCredit: "Tax Credit Housing",
    taxCreditDesc: "Low income housing tax credit",
    publicHousing: "Public Housing",
    publicHousingDesc: "Government-owned housing",
    seniorHousing: "Senior Housing",
    seniorHousingDesc: "Housing for ages 62+",
    allPrograms: "All Programs",
    viewAllPrograms: "View All Programs",
    
    // Resources
    applicationGuide: "Application Guide",
    applicationGuideDesc: "Step-by-step help",
    faq: "FAQ",
    faqDesc: "Common questions answered",
    contactSupport: "Contact Support",
    contactSupportDesc: "Get personalized help",
    emergencyHousing: "Emergency Housing",
    emergencyHousingDesc: "Crisis assistance",
    housingRights: "Housing Rights",
    housingRightsDesc: "Know your rights",
    downloadableForms: "Downloadable Forms",
    downloadableFormsDesc: "Application materials",
    
    // Hero Section
    heroTitle: "Find Your Perfect Affordable Home in Illinois",
    heroSubtitle: "Search thousands of affordable housing options across Illinois. Apply to waitlists, track your applications, and find your next home.",
    searchPlaceholder: "Enter city, ZIP code, or address...",
    popularCities: "Popular:",
    
    // Search & Filters
    filters: "Filters",
    price: "Price",
    priceRange: "Price Range",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    beds: "Beds",
    baths: "Baths",
    bedsAndBaths: "Beds & Baths",
    anyBeds: "Any Beds",
    anyBaths: "Any Baths",
    sqft: "Sq Ft",
    squareFeet: "Square Feet",
    propertyType: "Property Type",
    apartment: "Apartment",
    house: "House",
    townhouse: "Townhouse",
    condo: "Condo",
    studio: "Studio",
    sortBy: "Sort By",
    relevance: "Relevance",
    newest: "Newest",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    clearAll: "Clear All",
    apply: "Apply",
    reset: "Reset",
    moreFilters: "More Filters",
    
    // Accessibility
    accessibility: "Accessibility",
    wheelchairAccessible: "Wheelchair Accessible",
    hearingAccessible: "Hearing Accessible",
    visualAccessible: "Visual Accessible",
    mobilityFeatures: "Mobility Features",
    
    // Property Details
    available: "Available",
    unavailable: "Unavailable",
    waitlistOpen: "Waitlist Open",
    waitlistClosed: "Waitlist Closed",
    comingSoon: "Coming Soon",
    perMonth: "/month",
    monthlyRent: "Monthly Rent",
    deposit: "Security Deposit",
    applicationFee: "Application Fee",
    utilities: "Utilities",
    utilitiesIncluded: "Utilities Included",
    utilitiesNotIncluded: "Utilities Not Included",
    petFriendly: "Pet Friendly",
    noPets: "No Pets",
    laundry: "Laundry",
    inUnitLaundry: "In-Unit Laundry",
    sharedLaundry: "Shared Laundry",
    parking: "Parking",
    parkingIncluded: "Parking Included",
    amenities: "Amenities",
    features: "Features",
    description: "Description",
    location: "Location",
    neighborhood: "Neighborhood",
    nearbyTransit: "Nearby Transit",
    walkScore: "Walk Score",
    
    // Income Requirements
    incomeRequirements: "Income Requirements",
    annualIncome: "Annual Income",
    minIncome: "Minimum Income",
    maxIncome: "Maximum Income",
    areaMedianIncome: "Area Median Income",
    incomeLimit: "Income Limit",
    
    // Actions
    applyNow: "Apply Now",
    joinWaitlist: "Join Waitlist",
    saveProperty: "Save Property",
    saved: "Saved",
    share: "Share",
    contact: "Contact",
    schedule: "Schedule",
    scheduleTour: "Schedule Tour",
    requestInfo: "Request Info",
    callNow: "Call Now",
    email: "Email",
    directions: "Directions",
    viewDetails: "View Details",
    viewMore: "View More",
    viewLess: "View Less",
    viewAll: "View All",
    seeAllPhotos: "See All Photos",
    
    // Property Card
    photos: "Photos",
    photo: "Photo",
    verified: "Verified",
    featured: "Featured",
    newListing: "New Listing",
    priceReduced: "Price Reduced",
    openHouse: "Open House",
    
    // Map
    map: "Map",
    list: "List",
    mapView: "Map View",
    listView: "List View",
    splitView: "Split View",
    satellite: "Satellite",
    terrain: "Terrain",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    myLocation: "My Location",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit Fullscreen",
    drawArea: "Draw Area",
    clearDrawing: "Clear Drawing",
    
    // Results
    results: "Results",
    properties: "Properties",
    propertiesFound: "properties found",
    noResults: "No Results",
    noResultsDesc: "Try adjusting your filters or search in a different area",
    loading: "Loading...",
    loadMore: "Load More",
    showingOf: "Showing {count} of {total}",
    
    // Dashboard
    dashboard: "Dashboard",
    overview: "Overview",
    myApplications: "My Applications",
    myWaitlists: "My Waitlists",
    savedProperties: "Saved Properties",
    notifications: "Notifications",
    settings: "Settings",
    profile: "Profile",
    documents: "Documents",
    messages: "Messages",
    
    // Application Status
    applicationStatus: "Application Status",
    pending: "Pending",
    approved: "Approved",
    denied: "Denied",
    underReview: "Under Review",
    incomplete: "Incomplete",
    submitted: "Submitted",
    waitlistPosition: "Waitlist Position",
    estimatedWait: "Estimated Wait",
    
    // Footer
    aboutUs: "About Us",
    careers: "Careers",
    press: "Press",
    blog: "Blog",
    helpCenter: "Help Center",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    accessibility: "Accessibility",
    sitemap: "Sitemap",
    copyright: "Illinois Housing Development Authority. All rights reserved.",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    newsletterDesc: "Get housing updates and tips",
    subscribe: "Subscribe",
    enterEmail: "Enter your email",
    
    // Contact Page
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    contactDesc: "Have questions? We're here to help you find affordable housing.",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    message: "Message",
    subject: "Subject",
    send: "Send",
    sendMessage: "Send Message",
    officeLocations: "Office Locations",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    
    // Misc
    back: "Back",
    next: "Next",
    previous: "Previous",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    open: "Open",
    yes: "Yes",
    no: "No",
    ok: "OK",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
    required: "Required",
    optional: "Optional",
    learnMore: "Learn More",
    getStarted: "Get Started",
    startSearch: "Start Your Search",
    
    // CTA Section
    ctaTitle: "Ready to Find Your New Home?",
    ctaSubtitle: "Join thousands of Illinois residents who have found affordable housing through IHDA.",
    
    // Stats
    propertiesAvailable: "Properties Available",
    familiesHoused: "Families Housed",
    counties: "Counties Served",
    yearsServing: "Years Serving Illinois",
    
    // How It Works
    howItWorks: "How It Works",
    step1Title: "Search Properties",
    step1Desc: "Browse thousands of affordable housing options across Illinois using our easy-to-use search tools.",
    step2Title: "Check Eligibility",
    step2Desc: "Review income requirements and program eligibility to find housing that fits your needs.",
    step3Title: "Apply Online",
    step3Desc: "Submit your application directly through our platform and track your status in real-time.",
    step4Title: "Move In",
    step4Desc: "Once approved, complete your lease and move into your new affordable home.",
    
    // Testimonials
    testimonials: "What Our Users Say",
    testimonialsSubtitle: "Hear from families who found their home through IHDA",
    
    // Featured Listings
    featuredListings: "Featured Listings",
    featuredListingsSubtitle: "Handpicked properties with immediate availability",
    
    // Features Section
    whyChooseUs: "Why Choose IHDA Housing Locator",
    feature1Title: "Comprehensive Database",
    feature1Desc: "Access the largest database of affordable housing in Illinois, updated daily.",
    feature2Title: "Easy Application",
    feature2Desc: "Apply to multiple properties with a single application through our streamlined process.",
    feature3Title: "Real-Time Updates",
    feature3Desc: "Get instant notifications about waitlist status and new property availability.",
    feature4Title: "Expert Support",
    feature4Desc: "Our housing specialists are here to guide you through every step of the process.",
  },
  es: {
    // Navigation
    home: "Inicio",
    search: "Buscar",
    searchHousing: "Buscar Vivienda",
    findHousing: "Encontrar Vivienda",
    programs: "Programas",
    resources: "Recursos",
    contact: "Contacto",
    about: "Acerca de",
    account: "Cuenta",
    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión",
    register: "Registrarse",
    myDashboard: "Mi Panel",
    language: "Idioma",
    menu: "Menú",
    
    // Programs
    section8: "Vales Sección 8",
    section8Desc: "Programa de vales de elección de vivienda",
    taxCredit: "Vivienda con Crédito Fiscal",
    taxCreditDesc: "Crédito fiscal para viviendas de bajos ingresos",
    publicHousing: "Vivienda Pública",
    publicHousingDesc: "Viviendas de propiedad gubernamental",
    seniorHousing: "Vivienda para Adultos Mayores",
    seniorHousingDesc: "Vivienda para mayores de 62 años",
    allPrograms: "Todos los Programas",
    viewAllPrograms: "Ver Todos los Programas",
    
    // Resources
    applicationGuide: "Guía de Solicitud",
    applicationGuideDesc: "Ayuda paso a paso",
    faq: "Preguntas Frecuentes",
    faqDesc: "Respuestas a preguntas comunes",
    contactSupport: "Contactar Soporte",
    contactSupportDesc: "Obtener ayuda personalizada",
    emergencyHousing: "Vivienda de Emergencia",
    emergencyHousingDesc: "Asistencia en crisis",
    housingRights: "Derechos de Vivienda",
    housingRightsDesc: "Conozca sus derechos",
    downloadableForms: "Formularios Descargables",
    downloadableFormsDesc: "Materiales de solicitud",
    
    // Hero Section
    heroTitle: "Encuentre Su Hogar Asequible Perfecto en Illinois",
    heroSubtitle: "Busque miles de opciones de vivienda asequible en Illinois. Aplique a listas de espera, rastree sus solicitudes y encuentre su próximo hogar.",
    searchPlaceholder: "Ingrese ciudad, código postal o dirección...",
    popularCities: "Populares:",
    
    // Search & Filters
    filters: "Filtros",
    price: "Precio",
    priceRange: "Rango de Precio",
    minPrice: "Precio Mínimo",
    maxPrice: "Precio Máximo",
    bedrooms: "Habitaciones",
    bathrooms: "Baños",
    beds: "Camas",
    baths: "Baños",
    bedsAndBaths: "Camas y Baños",
    anyBeds: "Cualquier Cama",
    anyBaths: "Cualquier Baño",
    sqft: "Pies²",
    squareFeet: "Pies Cuadrados",
    propertyType: "Tipo de Propiedad",
    apartment: "Apartamento",
    house: "Casa",
    townhouse: "Casa Adosada",
    condo: "Condominio",
    studio: "Estudio",
    sortBy: "Ordenar Por",
    relevance: "Relevancia",
    newest: "Más Reciente",
    priceLowHigh: "Precio: Menor a Mayor",
    priceHighLow: "Precio: Mayor a Menor",
    clearAll: "Limpiar Todo",
    apply: "Aplicar",
    reset: "Restablecer",
    moreFilters: "Más Filtros",
    
    // Accessibility
    accessibility: "Accesibilidad",
    wheelchairAccessible: "Accesible en Silla de Ruedas",
    hearingAccessible: "Accesible para Sordos",
    visualAccessible: "Accesible para Ciegos",
    mobilityFeatures: "Características de Movilidad",
    
    // Property Details
    available: "Disponible",
    unavailable: "No Disponible",
    waitlistOpen: "Lista de Espera Abierta",
    waitlistClosed: "Lista de Espera Cerrada",
    comingSoon: "Próximamente",
    perMonth: "/mes",
    monthlyRent: "Alquiler Mensual",
    deposit: "Depósito de Seguridad",
    applicationFee: "Tarifa de Solicitud",
    utilities: "Servicios",
    utilitiesIncluded: "Servicios Incluidos",
    utilitiesNotIncluded: "Servicios No Incluidos",
    petFriendly: "Acepta Mascotas",
    noPets: "No Mascotas",
    laundry: "Lavandería",
    inUnitLaundry: "Lavandería en Unidad",
    sharedLaundry: "Lavandería Compartida",
    parking: "Estacionamiento",
    parkingIncluded: "Estacionamiento Incluido",
    amenities: "Comodidades",
    features: "Características",
    description: "Descripción",
    location: "Ubicación",
    neighborhood: "Vecindario",
    nearbyTransit: "Transporte Cercano",
    walkScore: "Puntaje de Caminabilidad",
    
    // Income Requirements
    incomeRequirements: "Requisitos de Ingresos",
    annualIncome: "Ingreso Anual",
    minIncome: "Ingreso Mínimo",
    maxIncome: "Ingreso Máximo",
    areaMedianIncome: "Ingreso Medio del Área",
    incomeLimit: "Límite de Ingresos",
    
    // Actions
    applyNow: "Aplicar Ahora",
    joinWaitlist: "Unirse a Lista de Espera",
    saveProperty: "Guardar Propiedad",
    saved: "Guardado",
    share: "Compartir",
    schedule: "Programar",
    scheduleTour: "Programar Visita",
    requestInfo: "Solicitar Info",
    callNow: "Llamar Ahora",
    email: "Correo",
    directions: "Direcciones",
    viewDetails: "Ver Detalles",
    viewMore: "Ver Más",
    viewLess: "Ver Menos",
    viewAll: "Ver Todo",
    seeAllPhotos: "Ver Todas las Fotos",
    
    // Property Card
    photos: "Fotos",
    photo: "Foto",
    verified: "Verificado",
    featured: "Destacado",
    newListing: "Nuevo Listado",
    priceReduced: "Precio Reducido",
    openHouse: "Casa Abierta",
    
    // Map
    map: "Mapa",
    list: "Lista",
    mapView: "Vista de Mapa",
    listView: "Vista de Lista",
    splitView: "Vista Dividida",
    satellite: "Satélite",
    terrain: "Terreno",
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    myLocation: "Mi Ubicación",
    fullscreen: "Pantalla Completa",
    exitFullscreen: "Salir de Pantalla Completa",
    drawArea: "Dibujar Área",
    clearDrawing: "Borrar Dibujo",
    
    // Results
    results: "Resultados",
    properties: "Propiedades",
    propertiesFound: "propiedades encontradas",
    noResults: "Sin Resultados",
    noResultsDesc: "Intente ajustar sus filtros o buscar en una área diferente",
    loading: "Cargando...",
    loadMore: "Cargar Más",
    showingOf: "Mostrando {count} de {total}",
    
    // Dashboard
    dashboard: "Panel",
    overview: "Resumen",
    myApplications: "Mis Solicitudes",
    myWaitlists: "Mis Listas de Espera",
    savedProperties: "Propiedades Guardadas",
    notifications: "Notificaciones",
    settings: "Configuración",
    profile: "Perfil",
    documents: "Documentos",
    messages: "Mensajes",
    
    // Application Status
    applicationStatus: "Estado de Solicitud",
    pending: "Pendiente",
    approved: "Aprobado",
    denied: "Denegado",
    underReview: "En Revisión",
    incomplete: "Incompleto",
    submitted: "Enviado",
    waitlistPosition: "Posición en Lista",
    estimatedWait: "Espera Estimada",
    
    // Footer
    aboutUs: "Sobre Nosotros",
    careers: "Carreras",
    press: "Prensa",
    blog: "Blog",
    helpCenter: "Centro de Ayuda",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    sitemap: "Mapa del Sitio",
    copyright: "Autoridad de Desarrollo de Vivienda de Illinois. Todos los derechos reservados.",
    followUs: "Síguenos",
    newsletter: "Boletín",
    newsletterDesc: "Reciba actualizaciones y consejos de vivienda",
    subscribe: "Suscribirse",
    enterEmail: "Ingrese su correo",
    
    // Contact Page
    contactUs: "Contáctenos",
    getInTouch: "Póngase en Contacto",
    contactDesc: "¿Tiene preguntas? Estamos aquí para ayudarle a encontrar vivienda asequible.",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    message: "Mensaje",
    subject: "Asunto",
    send: "Enviar",
    sendMessage: "Enviar Mensaje",
    officeLocations: "Ubicaciones de Oficinas",
    businessHours: "Horario de Atención",
    mondayFriday: "Lunes - Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
    closed: "Cerrado",
    
    // Misc
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Cerrar",
    open: "Abrir",
    yes: "Sí",
    no: "No",
    ok: "OK",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Info",
    required: "Requerido",
    optional: "Opcional",
    learnMore: "Más Información",
    getStarted: "Comenzar",
    startSearch: "Iniciar Búsqueda",
    
    // CTA Section
    ctaTitle: "¿Listo para Encontrar Su Nuevo Hogar?",
    ctaSubtitle: "Únase a miles de residentes de Illinois que han encontrado vivienda asequible a través de IHDA.",
    
    // Stats
    propertiesAvailable: "Propiedades Disponibles",
    familiesHoused: "Familias Alojadas",
    counties: "Condados Atendidos",
    yearsServing: "Años Sirviendo a Illinois",
    
    // How It Works
    howItWorks: "Cómo Funciona",
    step1Title: "Buscar Propiedades",
    step1Desc: "Explore miles de opciones de vivienda asequible en Illinois usando nuestras herramientas de búsqueda.",
    step2Title: "Verificar Elegibilidad",
    step2Desc: "Revise los requisitos de ingresos y elegibilidad del programa para encontrar vivienda que se adapte a sus necesidades.",
    step3Title: "Aplicar en Línea",
    step3Desc: "Envíe su solicitud directamente a través de nuestra plataforma y rastree su estado en tiempo real.",
    step4Title: "Mudarse",
    step4Desc: "Una vez aprobado, complete su contrato y múdese a su nuevo hogar asequible.",
    
    // Testimonials
    testimonials: "Lo Que Dicen Nuestros Usuarios",
    testimonialsSubtitle: "Escuche de familias que encontraron su hogar a través de IHDA",
    
    // Featured Listings
    featuredListings: "Listados Destacados",
    featuredListingsSubtitle: "Propiedades seleccionadas con disponibilidad inmediata",
    
    // Features Section
    whyChooseUs: "Por Qué Elegir IHDA Housing Locator",
    feature1Title: "Base de Datos Completa",
    feature1Desc: "Acceda a la base de datos más grande de viviendas asequibles en Illinois, actualizada diariamente.",
    feature2Title: "Solicitud Fácil",
    feature2Desc: "Aplique a múltiples propiedades con una sola solicitud a través de nuestro proceso simplificado.",
    feature3Title: "Actualizaciones en Tiempo Real",
    feature3Desc: "Reciba notificaciones instantáneas sobre el estado de la lista de espera y disponibilidad de nuevas propiedades.",
    feature4Title: "Soporte Experto",
    feature4Desc: "Nuestros especialistas en vivienda están aquí para guiarlo en cada paso del proceso.",
  },
  pl: {
    // Navigation
    home: "Strona główna",
    search: "Szukaj",
    searchHousing: "Szukaj Mieszkania",
    findHousing: "Znajdź Mieszkanie",
    programs: "Programy",
    resources: "Zasoby",
    contact: "Kontakt",
    about: "O nas",
    account: "Konto",
    signIn: "Zaloguj się",
    signOut: "Wyloguj się",
    register: "Zarejestruj się",
    myDashboard: "Mój Panel",
    language: "Język",
    menu: "Menu",
    
    // Programs
    section8: "Bony Sekcji 8",
    section8Desc: "Program bonów mieszkaniowych",
    taxCredit: "Mieszkania z Ulgą Podatkową",
    taxCreditDesc: "Ulga podatkowa dla mieszkań o niskich dochodach",
    publicHousing: "Mieszkania Komunalne",
    publicHousingDesc: "Mieszkania należące do rządu",
    seniorHousing: "Mieszkania dla Seniorów",
    seniorHousingDesc: "Mieszkania dla osób 62+",
    allPrograms: "Wszystkie Programy",
    viewAllPrograms: "Zobacz Wszystkie Programy",
    
    // Resources
    applicationGuide: "Przewodnik Aplikacji",
    applicationGuideDesc: "Pomoc krok po kroku",
    faq: "FAQ",
    faqDesc: "Odpowiedzi na częste pytania",
    contactSupport: "Skontaktuj się z Pomocą",
    contactSupportDesc: "Uzyskaj spersonalizowaną pomoc",
    emergencyHousing: "Mieszkania Awaryjne",
    emergencyHousingDesc: "Pomoc kryzysowa",
    housingRights: "Prawa Mieszkaniowe",
    housingRightsDesc: "Poznaj swoje prawa",
    downloadableForms: "Formularze do Pobrania",
    downloadableFormsDesc: "Materiały aplikacyjne",
    
    // Hero Section
    heroTitle: "Znajdź Swój Idealny Przystępny Dom w Illinois",
    heroSubtitle: "Przeszukaj tysiące opcji przystępnych cenowo mieszkań w Illinois. Aplikuj na listy oczekujących, śledź swoje aplikacje i znajdź swój następny dom.",
    searchPlaceholder: "Wpisz miasto, kod pocztowy lub adres...",
    popularCities: "Popularne:",
    
    // Search & Filters
    filters: "Filtry",
    price: "Cena",
    priceRange: "Zakres Cen",
    minPrice: "Cena Min",
    maxPrice: "Cena Max",
    bedrooms: "Sypialnie",
    bathrooms: "Łazienki",
    beds: "Łóżka",
    baths: "Łazienki",
    bedsAndBaths: "Łóżka i Łazienki",
    anyBeds: "Dowolne Łóżka",
    anyBaths: "Dowolne Łazienki",
    sqft: "m²",
    squareFeet: "Metry Kwadratowe",
    propertyType: "Typ Nieruchomości",
    apartment: "Apartament",
    house: "Dom",
    townhouse: "Szeregowiec",
    condo: "Kondominium",
    studio: "Kawalerka",
    sortBy: "Sortuj Według",
    relevance: "Trafność",
    newest: "Najnowsze",
    priceLowHigh: "Cena: Rosnąco",
    priceHighLow: "Cena: Malejąco",
    clearAll: "Wyczyść Wszystko",
    apply: "Zastosuj",
    reset: "Resetuj",
    moreFilters: "Więcej Filtrów",
    
    // Accessibility
    accessibility: "Dostępność",
    wheelchairAccessible: "Dostępne dla Wózków",
    hearingAccessible: "Dostępne dla Niesłyszących",
    visualAccessible: "Dostępne dla Niewidomych",
    mobilityFeatures: "Udogodnienia Mobilności",
    
    // Property Details
    available: "Dostępne",
    unavailable: "Niedostępne",
    waitlistOpen: "Lista Otwarta",
    waitlistClosed: "Lista Zamknięta",
    comingSoon: "Wkrótce",
    perMonth: "/mies.",
    monthlyRent: "Czynsz Miesięczny",
    deposit: "Kaucja",
    applicationFee: "Opłata Aplikacyjna",
    utilities: "Media",
    utilitiesIncluded: "Media Wliczone",
    utilitiesNotIncluded: "Media Nie Wliczone",
    petFriendly: "Przyjazne Zwierzętom",
    noPets: "Bez Zwierząt",
    laundry: "Pralnia",
    inUnitLaundry: "Pralnia w Mieszkaniu",
    sharedLaundry: "Wspólna Pralnia",
    parking: "Parking",
    parkingIncluded: "Parking Wliczony",
    amenities: "Udogodnienia",
    features: "Cechy",
    description: "Opis",
    location: "Lokalizacja",
    neighborhood: "Okolica",
    nearbyTransit: "Pobliski Transport",
    walkScore: "Ocena Pieszego",
    
    // Income Requirements
    incomeRequirements: "Wymagania Dochodowe",
    annualIncome: "Roczny Dochód",
    minIncome: "Min Dochód",
    maxIncome: "Max Dochód",
    areaMedianIncome: "Mediana Dochodu Obszaru",
    incomeLimit: "Limit Dochodu",
    
    // Actions
    applyNow: "Aplikuj Teraz",
    joinWaitlist: "Dołącz do Listy",
    saveProperty: "Zapisz",
    saved: "Zapisano",
    share: "Udostępnij",
    schedule: "Zaplanuj",
    scheduleTour: "Zaplanuj Wizytę",
    requestInfo: "Poproś o Info",
    callNow: "Zadzwoń",
    email: "Email",
    directions: "Wskazówki",
    viewDetails: "Zobacz Szczegóły",
    viewMore: "Zobacz Więcej",
    viewLess: "Zobacz Mniej",
    viewAll: "Zobacz Wszystko",
    seeAllPhotos: "Zobacz Wszystkie Zdjęcia",
    
    // Property Card
    photos: "Zdjęcia",
    photo: "Zdjęcie",
    verified: "Zweryfikowane",
    featured: "Wyróżnione",
    newListing: "Nowa Oferta",
    priceReduced: "Obniżona Cena",
    openHouse: "Dzień Otwarty",
    
    // Map
    map: "Mapa",
    list: "Lista",
    mapView: "Widok Mapy",
    listView: "Widok Listy",
    splitView: "Widok Podzielony",
    satellite: "Satelita",
    terrain: "Teren",
    zoomIn: "Przybliż",
    zoomOut: "Oddal",
    myLocation: "Moja Lokalizacja",
    fullscreen: "Pełny Ekran",
    exitFullscreen: "Zamknij Pełny Ekran",
    drawArea: "Rysuj Obszar",
    clearDrawing: "Wyczyść Rysunek",
    
    // Results
    results: "Wyniki",
    properties: "Nieruchomości",
    propertiesFound: "znalezionych nieruchomości",
    noResults: "Brak Wyników",
    noResultsDesc: "Spróbuj dostosować filtry lub szukaj w innym obszarze",
    loading: "Ładowanie...",
    loadMore: "Załaduj Więcej",
    showingOf: "Pokazuję {count} z {total}",
    
    // Dashboard
    dashboard: "Panel",
    overview: "Przegląd",
    myApplications: "Moje Aplikacje",
    myWaitlists: "Moje Listy Oczekujących",
    savedProperties: "Zapisane Nieruchomości",
    notifications: "Powiadomienia",
    settings: "Ustawienia",
    profile: "Profil",
    documents: "Dokumenty",
    messages: "Wiadomości",
    
    // Application Status
    applicationStatus: "Status Aplikacji",
    pending: "Oczekujące",
    approved: "Zatwierdzone",
    denied: "Odrzucone",
    underReview: "W Trakcie Przeglądu",
    incomplete: "Niekompletne",
    submitted: "Wysłane",
    waitlistPosition: "Pozycja na Liście",
    estimatedWait: "Szacowany Czas",
    
    // Footer
    aboutUs: "O Nas",
    careers: "Kariera",
    press: "Prasa",
    blog: "Blog",
    helpCenter: "Centrum Pomocy",
    termsOfService: "Regulamin",
    privacyPolicy: "Polityka Prywatności",
    sitemap: "Mapa Strony",
    copyright: "Illinois Housing Development Authority. Wszelkie prawa zastrzeżone.",
    followUs: "Obserwuj Nas",
    newsletter: "Newsletter",
    newsletterDesc: "Otrzymuj aktualizacje i porady mieszkaniowe",
    subscribe: "Subskrybuj",
    enterEmail: "Wpisz swój email",
    
    // Contact Page
    contactUs: "Skontaktuj się",
    getInTouch: "Napisz do Nas",
    contactDesc: "Masz pytania? Jesteśmy tutaj, aby pomóc Ci znaleźć przystępne mieszkanie.",
    firstName: "Imię",
    lastName: "Nazwisko",
    phone: "Telefon",
    message: "Wiadomość",
    subject: "Temat",
    send: "Wyślij",
    sendMessage: "Wyślij Wiadomość",
    officeLocations: "Lokalizacje Biur",
    businessHours: "Godziny Pracy",
    mondayFriday: "Poniedziałek - Piątek",
    saturday: "Sobota",
    sunday: "Niedziela",
    closed: "Zamknięte",
    
    // Misc
    back: "Wstecz",
    next: "Dalej",
    previous: "Poprzedni",
    cancel: "Anuluj",
    confirm: "Potwierdź",
    close: "Zamknij",
    open: "Otwórz",
    yes: "Tak",
    no: "Nie",
    ok: "OK",
    error: "Błąd",
    success: "Sukces",
    warning: "Ostrzeżenie",
    info: "Info",
    required: "Wymagane",
    optional: "Opcjonalne",
    learnMore: "Dowiedz się Więcej",
    getStarted: "Rozpocznij",
    startSearch: "Rozpocznij Wyszukiwanie",
    
    // CTA Section
    ctaTitle: "Gotowy na Znalezienie Nowego Domu?",
    ctaSubtitle: "Dołącz do tysięcy mieszkańców Illinois, którzy znaleźli przystępne mieszkanie przez IHDA.",
    
    // Stats
    propertiesAvailable: "Dostępnych Nieruchomości",
    familiesHoused: "Zakwaterowanych Rodzin",
    counties: "Obsługiwanych Hrabstw",
    yearsServing: "Lat Służenia Illinois",
    
    // How It Works
    howItWorks: "Jak To Działa",
    step1Title: "Szukaj Nieruchomości",
    step1Desc: "Przeglądaj tysiące opcji przystępnych mieszkań w Illinois używając naszych narzędzi wyszukiwania.",
    step2Title: "Sprawdź Kwalifikowalność",
    step2Desc: "Sprawdź wymagania dochodowe i kwalifikowalność programu.",
    step3Title: "Aplikuj Online",
    step3Desc: "Złóż aplikację bezpośrednio przez naszą platformę i śledź status w czasie rzeczywistym.",
    step4Title: "Wprowadź się",
    step4Desc: "Po zatwierdzeniu, podpisz umowę i wprowadź się do nowego domu.",
    
    // Testimonials
    testimonials: "Co Mówią Nasi Użytkownicy",
    testimonialsSubtitle: "Posłuchaj rodzin, które znalazły dom przez IHDA",
    
    // Featured Listings
    featuredListings: "Wyróżnione Oferty",
    featuredListingsSubtitle: "Wybrane nieruchomości z natychmiastową dostępnością",
    
    // Features Section
    whyChooseUs: "Dlaczego Wybrać IHDA",
    feature1Title: "Kompleksowa Baza Danych",
    feature1Desc: "Dostęp do największej bazy danych przystępnych mieszkań w Illinois, aktualizowanej codziennie.",
    feature2Title: "Łatwa Aplikacja",
    feature2Desc: "Aplikuj do wielu nieruchomości jedną aplikacją przez nasz uproszczony proces.",
    feature3Title: "Aktualizacje w Czasie Rzeczywistym",
    feature3Desc: "Otrzymuj natychmiastowe powiadomienia o statusie listy i dostępności nowych nieruchomości.",
    feature4Title: "Wsparcie Ekspertów",
    feature4Desc: "Nasi specjaliści mieszkaniowi są tutaj, aby prowadzić Cię przez każdy krok procesu.",
  },
  zh: {
    // Navigation
    home: "首页",
    search: "搜索",
    searchHousing: "搜索住房",
    findHousing: "寻找住房",
    programs: "项目",
    resources: "资源",
    contact: "联系我们",
    about: "关于我们",
    account: "账户",
    signIn: "登录",
    signOut: "退出",
    register: "注册",
    myDashboard: "我的面板",
    language: "语言",
    menu: "菜单",
    
    // Programs
    section8: "第8节住房券",
    section8Desc: "住房选择券计划",
    taxCredit: "税收抵免住房",
    taxCreditDesc: "低收入住房税收抵免",
    publicHousing: "公共住房",
    publicHousingDesc: "政府所有住房",
    seniorHousing: "老年住房",
    seniorHousingDesc: "62岁以上住房",
    allPrograms: "所有项目",
    viewAllPrograms: "查看所有项目",
    
    // Resources
    applicationGuide: "申请指南",
    applicationGuideDesc: "逐步帮助",
    faq: "常见问题",
    faqDesc: "常见问题解答",
    contactSupport: "联系支持",
    contactSupportDesc: "获取个性化帮助",
    emergencyHousing: "紧急住房",
    emergencyHousingDesc: "危机援助",
    housingRights: "住房权利",
    housingRightsDesc: "了解您的权利",
    downloadableForms: "可下载表格",
    downloadableFormsDesc: "申请材料",
    
    // Hero Section
    heroTitle: "在伊利诺伊州找到您理想的经济适用房",
    heroSubtitle: "搜索伊利诺伊州数千个经济适用房选项。申请候补名单，跟踪您的申请，找到您的下一个家。",
    searchPlaceholder: "输入城市、邮编或地址...",
    popularCities: "热门城市：",
    
    // Search & Filters
    filters: "筛选",
    price: "价格",
    priceRange: "价格范围",
    minPrice: "最低价格",
    maxPrice: "最高价格",
    bedrooms: "卧室",
    bathrooms: "浴室",
    beds: "床",
    baths: "浴室",
    bedsAndBaths: "卧室和浴室",
    anyBeds: "任意卧室",
    anyBaths: "任意浴室",
    sqft: "平方英尺",
    squareFeet: "平方英尺",
    propertyType: "房产类型",
    apartment: "公寓",
    house: "房屋",
    townhouse: "联排别墅",
    condo: "共管公寓",
    studio: "单间公寓",
    sortBy: "排序",
    relevance: "相关性",
    newest: "最新",
    priceLowHigh: "价格：从低到高",
    priceHighLow: "价格：从高到低",
    clearAll: "清除全部",
    apply: "应用",
    reset: "重置",
    moreFilters: "更多筛选",
    
    // Accessibility
    accessibility: "无障碍",
    wheelchairAccessible: "轮椅无障碍",
    hearingAccessible: "听力无障碍",
    visualAccessible: "视觉无障碍",
    mobilityFeatures: "行动功能",
    
    // Property Details
    available: "可用",
    unavailable: "不可用",
    waitlistOpen: "候补名单开放",
    waitlistClosed: "候补名单关闭",
    comingSoon: "即将推出",
    perMonth: "/月",
    monthlyRent: "月租金",
    deposit: "押金",
    applicationFee: "申请费",
    utilities: "公用事业",
    utilitiesIncluded: "包含公用事业",
    utilitiesNotIncluded: "不包含公用事业",
    petFriendly: "允许宠物",
    noPets: "不允许宠物",
    laundry: "洗衣",
    inUnitLaundry: "单元内洗衣",
    sharedLaundry: "共享洗衣",
    parking: "停车",
    parkingIncluded: "包含停车",
    amenities: "设施",
    features: "特色",
    description: "描述",
    location: "位置",
    neighborhood: "社区",
    nearbyTransit: "附近交通",
    walkScore: "步行指数",
    
    // Income Requirements
    incomeRequirements: "收入要求",
    annualIncome: "年收入",
    minIncome: "最低收入",
    maxIncome: "最高收入",
    areaMedianIncome: "地区中位收入",
    incomeLimit: "收入限制",
    
    // Actions
    applyNow: "立即申请",
    joinWaitlist: "加入候补名单",
    saveProperty: "保存房产",
    saved: "已保存",
    share: "分享",
    schedule: "安排",
    scheduleTour: "安排参观",
    requestInfo: "请求信息",
    callNow: "立即致电",
    email: "电子邮件",
    directions: "方向",
    viewDetails: "查看详情",
    viewMore: "查看更多",
    viewLess: "收起",
    viewAll: "查看全部",
    seeAllPhotos: "查看所有照片",
    
    // Property Card
    photos: "照片",
    photo: "照片",
    verified: "已验证",
    featured: "精选",
    newListing: "新房源",
    priceReduced: "降价",
    openHouse: "开放参观",
    
    // Map
    map: "地图",
    list: "列表",
    mapView: "地图视图",
    listView: "列表视图",
    splitView: "分屏视图",
    satellite: "卫星",
    terrain: "地形",
    zoomIn: "放大",
    zoomOut: "缩小",
    myLocation: "我的位置",
    fullscreen: "全屏",
    exitFullscreen: "退出全屏",
    drawArea: "绘制区域",
    clearDrawing: "清除绘制",
    
    // Results
    results: "结果",
    properties: "房产",
    propertiesFound: "个房产",
    noResults: "无结果",
    noResultsDesc: "尝试调整筛选条件或在其他区域搜索",
    loading: "加载中...",
    loadMore: "加载更多",
    showingOf: "显示 {count} / {total}",
    
    // Dashboard
    dashboard: "仪表板",
    overview: "概览",
    myApplications: "我的申请",
    myWaitlists: "我的候补名单",
    savedProperties: "已保存房产",
    notifications: "通知",
    settings: "设置",
    profile: "个人资料",
    documents: "文档",
    messages: "消息",
    
    // Application Status
    applicationStatus: "申请状态",
    pending: "待处理",
    approved: "已批准",
    denied: "已拒绝",
    underReview: "审核中",
    incomplete: "不完整",
    submitted: "已提交",
    waitlistPosition: "候补位置",
    estimatedWait: "预计等待",
    
    // Footer
    aboutUs: "关于我们",
    careers: "职业",
    press: "新闻",
    blog: "博客",
    helpCenter: "帮助中心",
    termsOfService: "服务条款",
    privacyPolicy: "隐私政策",
    sitemap: "网站地图",
    copyright: "伊利诺伊州住房发展局。保留所有权利。",
    followUs: "关注我们",
    newsletter: "通讯",
    newsletterDesc: "获取住房更新和提示",
    subscribe: "订阅",
    enterEmail: "输入您的电子邮件",
    
    // Contact Page
    contactUs: "联系我们",
    getInTouch: "取得联系",
    contactDesc: "有问题吗？我们在这里帮助您找到经济适用房。",
    firstName: "名",
    lastName: "姓",
    phone: "电话",
    message: "消息",
    subject: "主题",
    send: "发送",
    sendMessage: "发送消息",
    officeLocations: "办公地点",
    businessHours: "营业时间",
    mondayFriday: "周一 - 周五",
    saturday: "周六",
    sunday: "周日",
    closed: "关闭",
    
    // Misc
    back: "返回",
    next: "下一步",
    previous: "上一步",
    cancel: "取消",
    confirm: "确认",
    close: "关闭",
    open: "打开",
    yes: "是",
    no: "否",
    ok: "确定",
    error: "错误",
    success: "成功",
    warning: "警告",
    info: "信息",
    required: "必填",
    optional: "可选",
    learnMore: "了解更多",
    getStarted: "开始",
    startSearch: "开始搜索",
    
    // CTA Section
    ctaTitle: "准备好找到您的新家了吗？",
    ctaSubtitle: "加入数千名通过IHDA找到经济适用房的伊利诺伊州居民。",
    
    // Stats
    propertiesAvailable: "可用房产",
    familiesHoused: "已安置家庭",
    counties: "服务县",
    yearsServing: "服务伊利诺伊州年数",
    
    // How It Works
    howItWorks: "如何运作",
    step1Title: "搜索房产",
    step1Desc: "使用我们易于使用的搜索工具浏览伊利诺伊州数千个经济适用房选项。",
    step2Title: "检查资格",
    step2Desc: "查看收入要求和项目资格，找到适合您需求的住房。",
    step3Title: "在线申请",
    step3Desc: "直接通过我们的平台提交申请并实时跟踪状态。",
    step4Title: "入住",
    step4Desc: "获得批准后，完成租约并搬入您的新经济适用房。",
    
    // Testimonials
    testimonials: "用户评价",
    testimonialsSubtitle: "听听通过IHDA找到家的家庭的故事",
    
    // Featured Listings
    featuredListings: "精选房源",
    featuredListingsSubtitle: "精心挑选的即时可用房产",
    
    // Features Section
    whyChooseUs: "为什么选择IHDA住房搜索器",
    feature1Title: "全面的数据库",
    feature1Desc: "访问伊利诺伊州最大的经济适用房数据库，每日更新。",
    feature2Title: "简便申请",
    feature2Desc: "通过我们简化的流程，用一份申请申请多个房产。",
    feature3Title: "实时更新",
    feature3Desc: "获取关于候补名单状态和新房产可用性的即时通知。",
    feature4Title: "专家支持",
    feature4Desc: "我们的住房专家在这里指导您完成每一步。",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    search: "بحث",
    searchHousing: "البحث عن سكن",
    findHousing: "ابحث عن سكن",
    programs: "البرامج",
    resources: "الموارد",
    contact: "اتصل بنا",
    about: "حولنا",
    account: "الحساب",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    register: "التسجيل",
    myDashboard: "لوحة التحكم",
    language: "اللغة",
    menu: "القائمة",
    
    // Programs
    section8: "قسائم القسم 8",
    section8Desc: "برنامج قسيمة اختيار السكن",
    taxCredit: "إسكان الائتمان الضريبي",
    taxCreditDesc: "ائتمان ضريبي للإسكان منخفض الدخل",
    publicHousing: "الإسكان العام",
    publicHousingDesc: "إسكان مملوك للحكومة",
    seniorHousing: "إسكان كبار السن",
    seniorHousingDesc: "إسكان لمن هم 62+",
    allPrograms: "جميع البرامج",
    viewAllPrograms: "عرض جميع البرامج",
    
    // Resources
    applicationGuide: "دليل التطبيق",
    applicationGuideDesc: "مساعدة خطوة بخطوة",
    faq: "الأسئلة الشائعة",
    faqDesc: "إجابات على الأسئلة الشائعة",
    contactSupport: "اتصل بالدعم",
    contactSupportDesc: "احصل على مساعدة شخصية",
    emergencyHousing: "إسكان الطوارئ",
    emergencyHousingDesc: "مساعدة الأزمات",
    housingRights: "حقوق السكن",
    housingRightsDesc: "اعرف حقوقك",
    downloadableForms: "نماذج قابلة للتنزيل",
    downloadableFormsDesc: "مواد التقديم",
    
    // Hero Section
    heroTitle: "ابحث عن منزلك الميسور المثالي في إلينوي",
    heroSubtitle: "ابحث في آلاف خيارات الإسكان الميسور في إلينوي. قدم طلبات لقوائم الانتظار، وتتبع طلباتك، وابحث عن منزلك التالي.",
    searchPlaceholder: "أدخل المدينة أو الرمز البريدي أو العنوان...",
    popularCities: "شائعة:",
    
    // Search & Filters
    filters: "الفلاتر",
    price: "السعر",
    priceRange: "نطاق السعر",
    minPrice: "الحد الأدنى للسعر",
    maxPrice: "الحد الأقصى للسعر",
    bedrooms: "غرف النوم",
    bathrooms: "الحمامات",
    beds: "أسرة",
    baths: "حمامات",
    bedsAndBaths: "أسرة وحمامات",
    anyBeds: "أي أسرة",
    anyBaths: "أي حمامات",
    sqft: "قدم²",
    squareFeet: "قدم مربع",
    propertyType: "نوع العقار",
    apartment: "شقة",
    house: "منزل",
    townhouse: "تاون هاوس",
    condo: "كوندو",
    studio: "استوديو",
    sortBy: "ترتيب حسب",
    relevance: "الصلة",
    newest: "الأحدث",
    priceLowHigh: "السعر: من الأدنى للأعلى",
    priceHighLow: "السعر: من الأعلى للأدنى",
    clearAll: "مسح الكل",
    apply: "تطبيق",
    reset: "إعادة تعيين",
    moreFilters: "المزيد من الفلاتر",
    
    // Accessibility
    accessibility: "إمكانية الوصول",
    wheelchairAccessible: "وصول للكراسي المتحركة",
    hearingAccessible: "وصول للصم",
    visualAccessible: "وصول للمكفوفين",
    mobilityFeatures: "ميزات التنقل",
    
    // Property Details
    available: "متاح",
    unavailable: "غير متاح",
    waitlistOpen: "قائمة الانتظار مفتوحة",
    waitlistClosed: "قائمة الانتظار مغلقة",
    comingSoon: "قريباً",
    perMonth: "/شهر",
    monthlyRent: "الإيجار الشهري",
    deposit: "التأمين",
    applicationFee: "رسوم التقديم",
    utilities: "المرافق",
    utilitiesIncluded: "المرافق مشمولة",
    utilitiesNotIncluded: "المرافق غير مشمولة",
    petFriendly: "يسمح بالحيوانات",
    noPets: "لا حيوانات",
    laundry: "غسيل",
    inUnitLaundry: "غسيل في الوحدة",
    sharedLaundry: "غسيل مشترك",
    parking: "موقف سيارات",
    parkingIncluded: "موقف مشمول",
    amenities: "وسائل الراحة",
    features: "الميزات",
    description: "الوصف",
    location: "الموقع",
    neighborhood: "الحي",
    nearbyTransit: "المواصلات القريبة",
    walkScore: "درجة المشي",
    
    // Income Requirements
    incomeRequirements: "متطلبات الدخل",
    annualIncome: "الدخل السنوي",
    minIncome: "الحد الأدنى للدخل",
    maxIncome: "الحد الأقصى للدخل",
    areaMedianIncome: "متوسط دخل المنطقة",
    incomeLimit: "حد الدخل",
    
    // Actions
    applyNow: "قدم الآن",
    joinWaitlist: "انضم لقائمة الانتظار",
    saveProperty: "حفظ العقار",
    saved: "محفوظ",
    share: "مشاركة",
    schedule: "جدولة",
    scheduleTour: "جدولة جولة",
    requestInfo: "طلب معلومات",
    callNow: "اتصل الآن",
    email: "البريد الإلكتروني",
    directions: "الاتجاهات",
    viewDetails: "عرض التفاصيل",
    viewMore: "عرض المزيد",
    viewLess: "عرض أقل",
    viewAll: "عرض الكل",
    seeAllPhotos: "مشاهدة جميع الصور",
    
    // Property Card
    photos: "صور",
    photo: "صورة",
    verified: "موثق",
    featured: "مميز",
    newListing: "قائمة جديدة",
    priceReduced: "سعر مخفض",
    openHouse: "يوم مفتوح",
    
    // Map
    map: "خريطة",
    list: "قائمة",
    mapView: "عرض الخريطة",
    listView: "عرض القائمة",
    splitView: "عرض مقسم",
    satellite: "قمر صناعي",
    terrain: "تضاريس",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    myLocation: "موقعي",
    fullscreen: "ملء الشاشة",
    exitFullscreen: "خروج من ملء الشاشة",
    drawArea: "رسم منطقة",
    clearDrawing: "مسح الرسم",
    
    // Results
    results: "النتائج",
    properties: "العقارات",
    propertiesFound: "عقارات موجودة",
    noResults: "لا نتائج",
    noResultsDesc: "حاول تعديل الفلاتر أو البحث في منطقة مختلفة",
    loading: "جار التحميل...",
    loadMore: "تحميل المزيد",
    showingOf: "عرض {count} من {total}",
    
    // Dashboard
    dashboard: "لوحة التحكم",
    overview: "نظرة عامة",
    myApplications: "طلباتي",
    myWaitlists: "قوائم انتظاري",
    savedProperties: "العقارات المحفوظة",
    notifications: "الإشعارات",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    documents: "المستندات",
    messages: "الرسائل",
    
    // Application Status
    applicationStatus: "حالة الطلب",
    pending: "قيد الانتظار",
    approved: "موافق عليه",
    denied: "مرفوض",
    underReview: "قيد المراجعة",
    incomplete: "غير مكتمل",
    submitted: "مقدم",
    waitlistPosition: "موقع قائمة الانتظار",
    estimatedWait: "الانتظار المقدر",
    
    // Footer
    aboutUs: "حولنا",
    careers: "الوظائف",
    press: "الصحافة",
    blog: "المدونة",
    helpCenter: "مركز المساعدة",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    sitemap: "خريطة الموقع",
    copyright: "هيئة تطوير الإسكان في إلينوي. جميع الحقوق محفوظة.",
    followUs: "تابعنا",
    newsletter: "النشرة الإخبارية",
    newsletterDesc: "احصل على تحديثات ونصائح الإسكان",
    subscribe: "اشتراك",
    enterEmail: "أدخل بريدك الإلكتروني",
    
    // Contact Page
    contactUs: "اتصل بنا",
    getInTouch: "تواصل معنا",
    contactDesc: "لديك أسئلة؟ نحن هنا لمساعدتك في إيجاد سكن ميسور.",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    phone: "الهاتف",
    message: "الرسالة",
    subject: "الموضوع",
    send: "إرسال",
    sendMessage: "إرسال الرسالة",
    officeLocations: "مواقع المكاتب",
    businessHours: "ساعات العمل",
    mondayFriday: "الاثنين - الجمعة",
    saturday: "السبت",
    sunday: "الأحد",
    closed: "مغلق",
    
    // Misc
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    cancel: "إلغاء",
    confirm: "تأكيد",
    close: "إغلاق",
    open: "فتح",
    yes: "نعم",
    no: "لا",
    ok: "موافق",
    error: "خطأ",
    success: "نجاح",
    warning: "تحذير",
    info: "معلومات",
    required: "مطلوب",
    optional: "اختياري",
    learnMore: "اعرف المزيد",
    getStarted: "ابدأ",
    startSearch: "ابدأ البحث",
    
    // CTA Section
    ctaTitle: "مستعد للعثور على منزلك الجديد؟",
    ctaSubtitle: "انضم إلى آلاف سكان إلينوي الذين وجدوا سكناً ميسوراً من خلال IHDA.",
    
    // Stats
    propertiesAvailable: "عقارات متاحة",
    familiesHoused: "عائلات تم إسكانها",
    counties: "مقاطعات مخدومة",
    yearsServing: "سنوات خدمة إلينوي",
    
    // How It Works
    howItWorks: "كيف يعمل",
    step1Title: "ابحث عن العقارات",
    step1Desc: "تصفح آلاف خيارات الإسكان الميسور في إلينوي باستخدام أدوات البحث السهلة.",
    step2Title: "تحقق من الأهلية",
    step2Desc: "راجع متطلبات الدخل وأهلية البرنامج للعثور على سكن يناسب احتياجاتك.",
    step3Title: "قدم عبر الإنترنت",
    step3Desc: "أرسل طلبك مباشرة من خلال منصتنا وتتبع حالتك في الوقت الفعلي.",
    step4Title: "انتقل",
    step4Desc: "بمجرد الموافقة، أكمل عقد الإيجار وانتقل إلى منزلك الجديد الميسور.",
    
    // Testimonials
    testimonials: "ماذا يقول مستخدمونا",
    testimonialsSubtitle: "استمع إلى العائلات التي وجدت منزلها من خلال IHDA",
    
    // Featured Listings
    featuredListings: "القوائم المميزة",
    featuredListingsSubtitle: "عقارات مختارة بعناية متاحة فوراً",
    
    // Features Section
    whyChooseUs: "لماذا تختار IHDA",
    feature1Title: "قاعدة بيانات شاملة",
    feature1Desc: "الوصول إلى أكبر قاعدة بيانات للإسكان الميسور في إلينوي، محدثة يومياً.",
    feature2Title: "تقديم سهل",
    feature2Desc: "قدم لعقارات متعددة بطلب واحد من خلال عمليتنا المبسطة.",
    feature3Title: "تحديثات فورية",
    feature3Desc: "احصل على إشعارات فورية حول حالة قائمة الانتظار وتوفر العقارات الجديدة.",
    feature4Title: "دعم الخبراء",
    feature4Desc: "متخصصو الإسكان لدينا هنا لإرشادك خلال كل خطوة.",
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load from localStorage on mount
    const saved = localStorage.getItem("ihda-language") as LanguageCode
    if (saved && languages.some(l => l.code === saved)) {
      setLanguageState(saved)
      // Update document direction for RTL languages
      const lang = languages.find(l => l.code === saved)
      if (lang) {
        document.documentElement.dir = lang.direction
        document.documentElement.lang = saved
      }
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

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ 
        language: "en", 
        setLanguage, 
        t: (key: string) => translations.en[key] || key, 
        direction: "ltr",
        currentLanguage: languages[0]
      }}>
        {children}
      </LanguageContext.Provider>
    )
  }

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
