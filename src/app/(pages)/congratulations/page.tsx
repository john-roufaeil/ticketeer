'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

export default function BookingSuccessPage() {
    const router = useRouter();
    const { t } = useLanguage();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold mb-2">{t('congratulations.title')}</h1>
            <p className="text-lg mb-6">{t('congratulations.message')}</p>
            <Button variant="primary" onClick={() => router.push('/')}>
                {t('congratulations.backToEvents')}
            </Button>
        </div>
    );
}
