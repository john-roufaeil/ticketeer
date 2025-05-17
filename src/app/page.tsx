'use client';
import { useLanguage } from "@/context/LanguageContext";
import { Hero } from "@/app/components/Hero";
import { useEffect, useState } from 'react';
import Link from "next/link";
import Event from "@/types/Event";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from 'next-themes';

export default function HomePage() {
    const { t, language } = useLanguage();
    const [events, setEvents] = useState([]);
    const { bookings } = useAuth();
    const [loading, setLoading] = useState(true);
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? "dark" : "light";

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('/api/events');
            const data = await res.json();
            setEvents(data.events);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    return (
        <main className="mx-auto space-y-16">
            <Hero />
            <div className="space-y-8 px-24 mb-16">
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold">{t('homepage.availableEvents')}</h2>
                    <div className={`grid gap-6 ${loading ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {events.length > 0 ? (
                            events.map((event: Event) => {
                                const isBooked = event
                                    ? bookings.some(booking => {
                                        if (typeof booking.eventId === 'string') {
                                            return booking.eventId === event._id;
                                        } else {
                                            return booking.eventId._id === event._id;
                                        }
                                    })
                                    : false;
                                return (
                                    <div key={event?._id} className="relative bg-light-surface dark:bg-dark-surface rounded-lg shadow p-4 transition hover:shadow-lg">
                                        {isBooked && (
                                            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg shadow-md">
                                                {t('event.alreadyBooked')}
                                            </div>
                                        )}

                                        <Image width={100} height={100} src={event.image || "/placeholder.jpg"} alt={event?.nameEN} className="w-full h-48 object-cover rounded mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">{language === "ar" ? event?.nameAR : event?.nameEN}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-2">{language === "ar" ? event?.categoryAR : event?.categoryEN} - {new Date(event?.date).toLocaleDateString(language)}</p>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">{language === "ar" ? event?.descriptionAR : event?.descriptionEN}</p>

                                        <Link href={`/events/${event?._id}`} className="inline-block bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded hover:opacity-90 transition">
                                            {isBooked ? t('event.viewDetails') : t('homepage.bookNow')}
                                        </Link>
                                    </div>

                                );
                            })
                        ) : loading ? (
                            <div className="w-full flex items-center justify-center min-h-screen">
                                <Spinner size="lg" className="text-4xl bg-light-primary dark:bg-dark-primary" />
                            </div>
                        )
                            : (
                                <p className="text-gray-600 dark:text-gray-400">{t('homepage.noEvents')}</p>
                            )}
                    </div>
                </section>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col space-y-8">

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
                    <div className="w-1/2">
                        <Image src={theme === "dark" ? "/homeDark.svg" : "/homeLight.svg"} width={0} height={100} className="w-3/4 mx-auto h-auto" alt="Welcome illustration" />
                    </div>
                </div>

            </div>
        </main>
    );
}
