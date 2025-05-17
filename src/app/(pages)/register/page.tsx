'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner"

export default function RegisterPage() {
    const { t } = useLanguage();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/login');
            setIsLoading(false);
            toast.success(t('auth.registerSuccess'));
        } else {
            toast.error(t('auth.registerError'));
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">

            <Card className="border-none shadow-sm w-2xl mx-auto h-full bg-light-surface dark:bg-dark-surface">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-medium">{t('auth.register')}</CardTitle>
                    <CardDescription>{t('auth.registerDetails')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 w-1/2 mx-auto">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('auth.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">{t('auth.password')}</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                placeholder={t('auth.password')}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-10"
                            />
                        </div>
                        <Button variant="primary" type="submit" className="w-full h-10" disabled={isLoading}>
                            {isLoading ? t('auth.registering') : t('auth.register')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center p-2">
                    <p className="text-sm">
                        {t('auth.alreadyHaveAccount')}{' '}
                        <Link href="/login" className="underline hover:tracking-wider transition-all">
                            {t('auth.signin')}
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
