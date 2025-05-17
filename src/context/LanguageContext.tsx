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
        unauthorized: {
            title: "Unauthorized",
            message: "You do not have permission to access this page.",
            backToHomepage: "Back to homepage",
        },
        general: {
            egp: "EGP",
        },
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
        },
        event: {
            bookNow: "Book Now",
            booked: "Booked",
            eventDetails: "Event Details",
            backToEvents: "Back to Events",
            bookingSuccess: "Booking successful!",
            bookingError: "Booking failed.",
            alreadyBooked: "You booked this event.",
            viewDetails: "View Details",
        },
        auth: {
            invalidCredentials: "Invalid email or password.",
            serverError: "Server error. Please try again later.",
            emailAlreadyExists: "Email already exists.",
            signin: "Sign in",
            signingIn: "Signing in...",
            signinDetails: "Enter your email and password to log in",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Password",
            dontHaveAccount: "Don't have an account?",
            register: "Register",
            registering: "Registering...",
            registerDetails: "Create an account to book events",
            email: "Email",
            password: "Password",
            alreadyHaveAccount: "Already have an account?",
            createAccount: "Create a new account",
            registerSuccess: "Registration successful!",
            registerError: "Registration failed.",
            loginSuccess: "Login successful!",
            loginError: "Login failed.",
        },
        congratulations: {
            title: "Congratulations!",
            message: "You have successfully booked the event.",
            viewDetails: "View Details",
            backToEvents: "Back to Events",
        },
        about: {
            title: "About Ticketeer",
            subtitle: "Your Gateway to Memorable Experiences",
            welcomeIllustration: "/images/about-illustration.png", // example path
            description1: "Ticketeer connects you with the best events, from concerts and workshops to conferences and expos, all in one platform.",
            description2: "We partner with event organizers to provide seamless ticketing, instant booking confirmations, and transparent pricing.",
            description3: "Whether you’re looking to learn, network, or have fun, Ticketeer helps you find and book events effortlessly.",
            mission: {
                title: "Our Mission",
                description: "To make discovering and booking events simple, accessible, and enjoyable for everyone."
            },
            vision: {
                title: "Our Vision",
                description: "To be the leading platform for connecting people with events they love, worldwide."
            }
        }
    },
    ar: {
        unauthorized: {
            title: "غير مصرح",
            message: "ليس لديك إذن للوصول إلى هذه الصفحة.",
            backToHomepage: "العودة إلى الصفحة الرئيسية",
        },
        general: {
            egp: "ج.م"
        },
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
        },
        event: {
            bookNow: "احجز الآن",
            booked: "تم الحجز",
            eventDetails: "تفاصيل الفعالية",
            backToEvents: "العودة إلى الفعاليات",
            bookingSuccess: "تم الحجز بنجاح!",
            bookingError: "فشل الحجز.",
            alreadyBooked: "لقد قمت بحجز هذه الفعالية بالفعل.",
            viewDetails: "عرض التفاصيل",
        },
        auth: {
            invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
            serverError: "خطأ في الخادم. يرجى المحاولة لاحقًا.",
            emailAlreadyExists: "البريد الإلكتروني موجود بالفعل.",
            signin: "تسجيل الدخول",
            signingIn: "تسجيل الدخول...",
            signinDetails: "أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول",
            emailPlaceholder: "البريد الإلكتروني",
            passwordPlaceholder: "كلمة المرور",
            dontHaveAccount: "ليس لديك حساب؟",
            register: "إنشاء حساب",
            registerDetails: "أنشئ حسابًا لحجز الفعاليات",
            registering: "جارٍ التسجيل...",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            alreadyHaveAccount: "هل لديك حساب بالفعل؟",
            createAccount: "إنشاء حساب جديد",
            loginSuccess: "تم تسجيل الدخول بنجاح!",
            loginError: "فشل تسجيل الدخول.",
        },
        congratulations: {
            title: "تهانينا!",
            message: "لقد قمت بحجز الفعالية بنجاح.",
            viewDetails: "عرض التفاصيل",
            backToEvents: "العودة إلى الفعاليات",
        },
        about: {
            title: "حول تيكيتر",
            subtitle: "بوابتك إلى تجارب لا تُنسى",
            welcomeIllustration: "/images/about-illustration.png", // مثال على المسار
            description1: "تيكيتر يربطك بأفضل الفعاليات من حفلات موسيقية وورش عمل إلى مؤتمرات ومعارض، كل ذلك في منصة واحدة.",
            description2: "نتعاون مع منظمي الفعاليات لتوفير تجربة حجز سلسة، وتأكيدات فورية، وتسعير شفاف.",
            description3: "سواء كنت تبحث عن التعلم أو التواصل أو الاستمتاع، تيكيتر يساعدك في العثور على الفعاليات وحجزها بسهولة.",
            mission: {
                title: "مهمتنا",
                description: "جعل اكتشاف وحجز الفعاليات بسيطًا ومتاحًا وممتعًا للجميع."
            },
            vision: {
                title: "رؤيتنا",
                description: "أن نكون المنصة الرائدة لربط الناس بالفعاليات التي يحبونها حول العالم."
            }
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