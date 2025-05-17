"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}
type TranslationValue = string | { [key: string]: TranslationValue };

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    en: {
        homepage: {
            ticketeer: "Ticketeer",
            slogan: "Make Your Next Event Unforgettable",
            description: "Discover, Book, and Enjoy Events Near You.",
            howItWorks: "How It Works",
            whyTicketeer: "Why Ticketeer?",
            testimonials: "What Our Users Say",
            browseEvents: "Browse Events",
            trusted: "Trusted by event organizers",
            instantBooking: "Instant booking confirmation",
            noHiddenFees: "No hidden fees",
            testimonial1: "Smooth booking experience and excellent customer service. - Sarah Mohamed",
            testimonial2: "I found all the top events in my city easily. - Ahmed Ali",
            browse: "Browse available events",
            book: "Book your ticket instantly",
            confirmation: "Get your confirmation and enjoy!",
            bookNow: "Book Now",
            availableEvents: "Available Events",
            noEvents: "No events available at the moment.",
        },
        nav: {
            home: "Home",
            about: "About",
            events: "Events",
        },
        footer: {
            contact: "Contact Us",
            links: "Quick Links",
            faq: "FAQ",
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            rights: "All rights reserved.",
        }
    },
    ar: {
        homepage: {
            ticketeer: "تيكيتير",
            slogan: "اجعل فعاليتك القادمة لا تُنسى",
            description: "اكتشف، احجز، واستمتع بالفعاليات القريبة منك.",
            featured: "الأحداث المميزة لهذا الشهر",
            howItWorks: "كيف تعمل",
            whyTicketeer: "لماذا تيكيتير؟",
            testimonials: "ماذا يقول مستخدمونا",
            browseEvents: "استعرض الفعاليات",
            trusted: "موثوق به من قبل منظمي الفعاليات",
            instantBooking: "تأكيد الحجز الفوري",
            noHiddenFees: "لا توجد رسوم خفية",
            testimonial1: "تجربة حجز سلسة وخدمة عملاء ممتازة. - سارة محمد",
            testimonial2: "وجدت جميع الفعاليات الكبرى في مدينتي بسهولة. - أحمد علي",
            browse: "استعرض الفعاليات المتاحة",
            book: "احجز تذكرتك على الفور",
            confirmation: "احصل على تأكيدك واستمتع!",
            bookNow: "احجز الآن",
            availableEvents: "الفعاليات المتاحة",
            noEvents: "لا توجد فعاليات متاحة في الوقت الحالي.",
        },
        nav: {
            home: "الرئيسية",
            about: "من نحن",
            events: "الفعاليات",
        },
        footer: {
            contact: "تواصل معنا",
            links: "روابط سريعة",
            faq: "الأسئلة الشائعة",
            terms: "الشروط والأحكام",
            privacy: "سياسة الخصوصية",
            rights: "جميع الحقوق محفوظة",
        }
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("en");
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang) {
            setLanguage(savedLang);
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("language", language);
        }
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }, [language]);

    function getNestedValue(obj: TranslationValue, path: string[]): TranslationValue | undefined {
        let result: TranslationValue | undefined = obj;
        for (const key of path) {
            if (typeof result === "object" && result !== null && key in result) {
                result = result[key];
            } else {
                return undefined;
            }
        }
        return result;
    }

    const translate = (key: string): string => {
        const keys = key.split(".");
        const result = getNestedValue(translations[language], keys);
        return typeof result === "string" ? result : key;
    };

    const value = {
        language,
        setLanguage,
        t: translate,
    };
    if (!hydrated) return null;

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};


export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};