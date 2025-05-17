'use client';
import { useLanguage } from "@/context/LanguageContext";
import { Hero } from "@/app/components/Hero";
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function HomePage() {
    const { t, language } = useLanguage();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('/api/events');
            const data = await res.json();
            setEvents(data);
        };
        fetchEvents();
    }, []);

    type Event = {
        _id: string;
        name: string;
        description: string;
        category: string;
        date: string;
        image: string;
    };

    return (
        <main className="mx-auto space-y-16">
            <Hero />
            <div className="space-y-8 px-24 mb-16">
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold">{t('homepage.featuredEvents')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.length > 0 ? (
                            events.map((event: Event) => (
                                <div key={event?._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition hover:shadow-lg">
                                    <img src={event.image || "/placeholder.jpg"} alt={event?.name} className="w-full h-48 object-cover rounded mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{event?.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">{event?.category} - {new Date(event?.date).toLocaleDateString(language)}</p>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">{event?.description}</p>
                                    <Link href={`/events/${event?._id}`} className="inline-block bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded hover:opacity-90 transition">
                                        {t('homepage.bookNow')}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">{t('homepage.noEvents')}</p>
                        )}
                    </div>
                </section>
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
