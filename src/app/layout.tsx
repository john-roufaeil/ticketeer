import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";

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
        <html lang="en">
            <body dir="auto" className={`${poppins.variable} ${cairo.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
