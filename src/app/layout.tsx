import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider"
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner"

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
            <body dir="auto" className={`${poppins.variable} ${cairo.variable} bg-light-background dark:bg-dark-background text-light-text text-lg dark:text-dark-text antialiased scroll-smooth`}>
                <AuthProvider>
                    <LanguageProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            enableColorScheme
                        >
                            <Header />
                            <div className="min-h-[80vh]">
                                {children}
                                <Toaster />
                            </div>
                            <Footer />
                        </ThemeProvider>
                    </LanguageProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
