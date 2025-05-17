'use client';
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import {
    FaWhatsapp, FaFacebook, FaInstagram, FaTiktok
} from 'react-icons/fa';
import lightLogo from "@/../public/lightLogo.png";
import darkLogo from "@/../public/darkLogo.png";
import lightLogoAR from "@/../public/lightLogoAR.png";
import darkLogoAR from "@/../public/darkLogoAR.png";
import { useTheme } from 'next-themes';


const Footer: React.FC = () => {
    const { t, language } = useLanguage();
    const currentYear = new Date().getFullYear();
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? "dark" : "light";
    const Logo = () => (
        <Link href="/" className="flex items-center space-x-2 h-full">
            <Image
                src={
                    theme === "dark" && language === "en"
                        ? darkLogo
                        : theme === "dark" && language === "ar"
                            ? darkLogoAR
                            : theme === "light" && language === "en"
                                ? lightLogo
                                : lightLogoAR
                }
                alt="logo"
                width={200}
                height={200}
                className="h-full w-auto"
            />
        </Link>
    );
    return (
        <footer className="bg-primary bg-brand text-white  py-2 border-t-1 border-light-text dark:border-dark-text">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row sm:justify-start items- md:items-center gap-8 gap-x-30">
                    {/* Brand */}
                    <div className="h-full">
                        <Logo />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between md:justify-start gap-6 md:gap-20 w-fit">
                        {/* Contact */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
                                {t('footer.contact')}
                            </h3>
                            <address className="not-italic text-light-text dark:text-dark-text">
                                <p>info@ticketeer.com</p>
                            </address>
                            <div className="mt-2 w-full flex space-x-4">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-light-primary dark:hover:text-dark-primary hover:font-medium hover:scale-110 duration-300 transition-all active:scale-95 text-light-text dark:text-dark-text hover:underline">
                                    <FaInstagram size={24} />
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 duration-300 transition-all active:scale-95 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:font-medium hover:underline">
                                    <FaFacebook size={24} />
                                </a>
                                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 duration-300 transition-all active:scale-95 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:font-medium hover:underline">
                                    <FaTiktok size={24} />
                                </a>
                                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 duration-300 w-fit transition-all active:scale-95 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:font-medium hover:underline">
                                    <FaWhatsapp size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-1 w-4/5 mx-auto bg-light-primary dark:bg-dark-primary rounded-lg" />

                <div className="pt-4 text-sm text-center text-gray-400">
                    <p>
                        &copy; {currentYear} Ticketeer. {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;