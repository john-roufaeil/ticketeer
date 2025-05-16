import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider"
import { LanguageProvider } from "@/context/LanguageContext";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-poppins",
});
const cairo = Cairo({
    subsets: ["arabic", "latin"],
    weight: ["400", "700"],
    variable: "--font-cairo",
});

export const metadata: Metadata = {
    title: "Ticketeer",
    description: "Events made easy",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body dir="auto" className={`${poppins.variable} ${cairo.variable} bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text antialiased transition-all scroll-smooth duration-300`}>
                <LanguageProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        enableColorScheme
                    >
                        {children}
                    </ThemeProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
