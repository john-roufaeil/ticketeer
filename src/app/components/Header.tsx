"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/context/LanguageContext"
import { Menu, User } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "./ModeToggle"
import { LanguageToggle } from "./LanguageToggle"
import lightLogo from "@/../public/lightLogoCropped.png";
import darkLogo from "@/../public/darkLogoCropped.png";
import lightLogoAR from "@/../public/lightLogoARCropped.png";
import darkLogoAR from "@/../public/darkLogoARCropped.png";
import Image from "next/image"
import { useTheme } from "next-themes"
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

export default function Header() {
    const { language } = useLanguage()
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(false)
    const { resolvedTheme } = useTheme()
    const theme = resolvedTheme === "dark" ? "dark" : "light"
    const pathname = usePathname();

    const { t } = useLanguage();
    return (
        <header
            className={`px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ${language === "ar" ? "rtl" : "ltr"}`}
        >
            <div className="flex h-20 items-center justify-between w-full">
                <div className="flex items-center h-full gap-10">
                    <Link href="/" className="flex items-center space-x-2 h-full">
                        <Image
                            src={
                                theme === "dark" && language === "en" ?
                                    darkLogo : theme === "dark" && language === "ar" ?
                                        darkLogoAR : theme === "light" && language === "en" ?
                                            lightLogo : lightLogoAR}
                            alt="logo"
                            width={100}
                            height={100}
                            className="h-1/2 w-auto"
                        />
                    </Link>
                    {!isMobile && (
                        // <nav className="flex items-center space-x-6 mx-6">
                        //     <Link href="/" className=" text-xl transition-colors hover:underline">
                        //         {t('nav.home')}
                        //     </Link>
                        //     <Link href="/about" className=" text-xl transition-colors hover:underline">
                        //         {t('nav.about')}
                        //     </Link>
                        //     <Link href="/events" className=" text-xl transition-colors hover:underline">
                        //         {t('nav.events')}
                        //     </Link>
                        // </nav>
                        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
                            {['/', '/about', '/products'].map((path) => {
                                const isActive = pathname === path;
                                const label = path === '/' ? t('nav.home') : path === '/about' ? t('nav.about') : t('nav.events');
                                return (
                                    <Link
                                        key={path}
                                        href={path}
                                        className={cn(
                                            "text-light-primary dark:text-dark-primary relative transition-colors",
                                            "after:content-[''] font-medium after:absolute after:-bottom-1 after:rounded-lg after:start-0 after:h-[4px] after:w-0 after:bg-light-primary after:dark:bg-dark-primary after:transition-all after:duration-300",
                                            "hover:after:w-full",
                                            isActive && "after:w-full"
                                        )}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}
                </div>

                {isMobile ? (
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={language === "ar" ? "right" : "left"}>
                            <nav className="flex flex-col space-y-4 mt-8">
                            </nav>
                            <div className="flex flex-col space-y-4 mt-8">
                                {/* <ActionButtons /> */}
                            </div>
                        </SheetContent>
                    </Sheet>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" asChild>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/profile">
                                <User className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Profile</span>
                            </Link>
                        </Button>

                        <ModeToggle />
                        <LanguageToggle />
                    </div>
                )}
            </div>
        </header>
    )
}
