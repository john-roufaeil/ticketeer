"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    en: {
        hello: "Hello",
    },
    ar: {
        hello: "مرحبا",
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

    const translate = (key: string): string =>
        translations[language][key as keyof typeof translations.en] || key;

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