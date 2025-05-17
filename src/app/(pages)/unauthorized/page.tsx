'use client';
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-4">
            <h1 className="text-4xl font-bold">{t('unauthorized.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('unauthorized.message')}
            </p>
            <Button variant="outline"><Link href="/">{t('unauthorized.backToHomepage')}</Link></Button>
        </div>
    );
}
