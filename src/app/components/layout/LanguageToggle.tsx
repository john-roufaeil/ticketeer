"use client";


import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const [mounted, setMounted] = useState(false);
    const { language, setLanguage } = useLanguage();
    // Avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isEnglish = language === "en";

    return (
        <Button
            variant="outline"
            onClick={() => setLanguage(isEnglish ? "ar" : "en")}
            className="flex items-center gap-2 px-4 py-2 border rounded"
        >
            {isEnglish ? "العربية" : "English"}
        </Button>
    );
}
