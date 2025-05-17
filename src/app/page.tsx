'use client';
import { useLanguage } from "@/context/LanguageContext";
import { Hero } from "@/app/components/Hero";

export default function HomePage() {
    const { t, language } = useLanguage();
    return (
        <main className="mx-auto space-y-16">
            <Hero />
            <div className="space-y-8 px-24 mb-16">

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold">{t('homepage.howItWorks')}</h2>
                    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 text-xl">
                        <li>{t('homepage.browse')}</li>
                        <li>{t('homepage.book')}</li>
                        <li>{t('homepage.confirmation')}</li>
                    </ol>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold">{t('homepage.whyTicketeer')}</h2>
                    <div className="flex items-center justify-start space-x-4">
                        <div className="w-fit p-4 rounded border-1 hover:-translate-y-1 shadow transition-all hover:shadow-lg bg-light-primary/10 dark:bg-dark-primary/10 font-medium text-lg">
                            {t('homepage.trusted')}
                        </div>
                        <div className="w-fit p-4 rounded border-1 hover:-translate-y-1 shadow transition-all hover:shadow-lg bg-light-primary/10 dark:bg-dark-primary/10 font-medium text-lg">
                            {t('homepage.instantBooking')}
                        </div>
                        <div className="w-fit p-4 rounded border-1 hover:-translate-y-1 shadow transition-all hover:shadow-lg bg-light-primary/10 dark:bg-dark-primary/10 font-medium text-lg">
                            {t('homepage.noHiddenFees')}
                        </div>
                    </div>
                </section>

                <section className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h2 className="text-3xl font-semibold">{t('homepage.testimonials')}</h2>

                    <blockquote
                        className={`italic ${language === "ar" ? "border-r-4 pr-4" : "border-l-4 pl-4"} 
                border-light-primary dark:border-dark-primary 
                text-gray-700 dark:text-gray-300`}
                    >
                        {t('homepage.testimonial1')}
                    </blockquote>

                    <blockquote
                        className={`italic ${language === "ar" ? "border-r-4 pr-4" : "border-l-4 pl-4"} 
                border-light-primary dark:border-dark-primary 
                text-gray-700 dark:text-gray-300`}
                    >
                        {t('homepage.testimonial2')}
                    </blockquote>
                </section>

            </div>
        </main>
    );
}
