"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "./ModeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

import lightLogo from "@/../public/lightLogoCropped.png";
import darkLogo from "@/../public/darkLogoCropped.png";
import lightLogoAR from "@/../public/lightLogoARCropped.png";
import darkLogoAR from "@/../public/darkLogoARCropped.png";

export default function Header() {
    const { language, t } = useLanguage();
    const { resolvedTheme } = useTheme();
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const theme = resolvedTheme === "dark" ? "dark" : "light";

    const navLinks = [
        { href: "/", label: t("nav.home") },
        { href: "/about", label: t("nav.about") },
        { href: "/events", label: t("nav.events") },
    ];

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
                width={100}
                height={100}
                className="h-1/2 w-auto"
            />
        </Link>
    );

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-4 ${language === "ar" ? "rtl" : "ltr"
                }`}
        >
            <div className={`${language === "ar" && isMobile ? "flex-row-reverse" : "flex-row"} flex h-20 items-center justify-between w-full`}>
                <div className="flex items-center h-full gap-16 text-lg ">
                    <Logo />

                    {!isMobile && (
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map(({ href, label }) => {
                                const isActive = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={cn(
                                            "text-light-text dark:text-dark-text relative transition-colors",
                                            "after:content-[''] font-medium after:absolute after:-bottom-1 after:rounded-lg after:start-0 after:h-[4px] after:w-0 after:bg-light-primary dark:after:bg-dark-primary after:transition-all after:duration-300",
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

                {!isMobile && (
                    <div className="flex items-center space-x-2">
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

                {/* Mobile Actions */}
                {isMobile && (
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? (
                                    <X className="h-[1.2rem] w-[1.2rem]" />
                                ) : (
                                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                                )}
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side={language === "ar" ? "left" : "right"}
                            className="bg-light-background dark:bg-dark-background p-4"
                        >
                            <nav className={`flex flex-col space-y-4 mt-8 ${language === "ar" ? "text-right" : "text-left"}`}>
                                {navLinks.map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="relative transition-colors font-medium"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="flex flex-row space-x-4 mt-8 w-fit">
                                <div onClick={() => setIsMenuOpen(false)}>
                                    <ModeToggle />
                                </div>
                                <div onClick={() => setIsMenuOpen(false)}>
                                    <LanguageToggle />
                                </div>
                            </div>
                        </SheetContent>

                    </Sheet>
                )}
            </div>
        </header>
    );
}
