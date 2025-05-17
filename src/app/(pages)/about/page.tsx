"use client";
import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../lib/utils';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const About: React.FC = () => {
    const { t, language } = useLanguage();
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? "dark" : "light";

    return (
        <main className="w-full sm:w-6xl mx-auto animate-fade">
            <section className="bg-primary text-brand py-10">
                <div className="container mx-auto px-4">
                    <div className={cn(
                        " mx-auto text-center",
                        language === 'ar' ? "text-right" : "text-left"
                    )}>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
                        <p className="text-2xl font-light">{t('about.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className={cn("order-1")}>
                            <Image src={theme === "dark" ? "/aboutDark.svg" : "/aboutLight.svg"} width={0} height={100} className="w-3/4 mx-auto h-auto" alt="Welcome illustration" />
                        </div>
                        <div className={cn("space-y-6")}>
                            <p className="text-lg">
                                {t('about.description1')}
                            </p>
                            <p className="text-lg">
                                {t('about.description2')}
                            </p>
                            <p className="text-lg">
                                {t('about.description3')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-10 bg-accent/20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className={cn(
                            "bg-light-surface dark:bg-dark-surface p-8 rounded-lg shadow-md hover:-translate-y-2 hover:shadow-xl transition-all",
                            language === 'ar' ? "text-right" : "text-left"
                        )}>
                            <h2 className="text-2xl font-bold text-primary mb-4">{t('about.mission.title')}</h2>
                            <p className="text-lg">{t('about.mission.description')}</p>
                        </div>

                        {/* Vision */}
                        <div className={cn(
                            "bg-light-surface dark:bg-dark-surface p-8 rounded-lg shadow-md hover:-translate-y-2 hover:shadow-xl transition-all",
                            language === 'ar' ? "text-right" : "text-left"
                        )}>
                            <h2 className="text-2xl font-bold text-primary mb-4">{t('about.vision.title')}</h2>
                            <p className="text-lg">{t('about.vision.description')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;