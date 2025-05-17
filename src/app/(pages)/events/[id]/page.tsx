'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Event from "@/types/Event";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Calendar, PinIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function ProductDetailsPage() {
    const { user, bookings, login } = useAuth();
    const { t, language } = useLanguage();
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);
    const isBooked = event
        ? bookings.some(booking => {
            if (typeof booking.eventId === 'string') {
                return booking.eventId === event._id;
            } else {
                return booking.eventId._id === event._id;
            }
        })
        : false;

    useEffect(() => {
        const fetchEventByID = async () => {
            const res = await fetch(`/api/events/${id}`);
            if (res.ok) {
                const data = await res.json();
                setEvent(data);
            } else {
                setEvent(null);
            }
        };
        fetchEventByID();
    }, [id]);

    console.log("EVENT", event);
    console.log("BOOKINGS", bookings);
    const handleBookNow = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({
                eventId: event?._id,
                userId: user._id
            }),
        });

        if (res.ok) {
            toast.success(t('event.bookingSuccess'));
            const token = localStorage.getItem('auth_token');
            const userId = user?._id;
            if (token && userId) {
                login(token, userId, false);
            }
            router.push('/congratulations');
        } else {
            toast.error(t('event.bookingError'));
        }
    };

    if (!event) {
        return <div className="text-center py-10">Loading event details...</div>;
    }

    if (!event._id) {
        return <div className="text-center py-10">Event not found.</div>;
    }

    return (
        <main className="w-5xl mx-auto px-4 py-8">
            <Button
                className="mb-4"
                variant="outline"
                onClick={() => router.push("/")}
            >
                {language === "en" ? <ChevronLeft /> : <ChevronRight />} {t('event.backToEvents')}
            </Button>
            <div className="w-5xl mx-auto bg-light-surface dark:bg-dark-surface rounded-lg shadow p-6">
                <Image
                    width={500}
                    height={500}
                    src={event.image || "/placeholder.jpg"}
                    alt={event.nameEN}
                    className="w-full h-96 object-cover rounded mb-4"
                />
                <h1 className="text-4xl font-bold mb-2">{language === "en" ? event.nameEN : event.nameAR}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{language === "en" ? event.categoryEN : event.categoryAR}</p>
                <p className="mb-4">{language === "en" ? event.descriptionEN : event.descriptionAR}</p>
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-light-primary dark:text-dark-primary" /><p className="text-sm mb-1"> {new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <PinIcon className="text-light-primary dark:text-dark-primary" />
                    <p className="text-sm mb-1">{event.venue}</p>
                </div>
                <p className="text-lg font-semibold mb-4">{event.price}{t('general.egp')}</p>

                {isBooked ? (
                    <div className="p-4 mb-4 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {t('event.alreadyBooked')}
                    </div>
                ) : (
                    <Button variant="primary" onClick={handleBookNow} className="px-4 py-2">
                        {t('event.bookNow')}
                    </Button>
                )}
            </div>
        </main>
    );
}
