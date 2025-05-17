'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import User from '@/types/User';
import Booking from '@/types/Booking';

type AuthContextType = {
    user: User | null;
    bookings: Booking[];
    loading: boolean;
    login: (token: string, userId: string, redirect: boolean) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
    fetchBookings: (userId: string, token: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = (userId: string, token: string) => {
        fetch(`/api/bookings/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setBookings(data.bookings || []);
            })
            .catch(() => setBookings([]));
    };

    const login = async (token: string, userId: string, redirect: boolean) => {
        setLoading(true);
        try {
            localStorage.setItem('auth_token', token);

            const userRes = await fetch(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = await userRes.json();

            const bookingsRes = await fetch(`/api/bookings/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const bookingsData = await bookingsRes.json();
            setBookings(bookingsData.bookings || []);
            setUser(userData);
            if (redirect) {
                if (userData.role === 'admin') {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/';
                }
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };



    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        setBookings([]);
        window.location.href = '/';
    };

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const userId = tokenPayload.userId;

            if (userId) {
                login(token, userId, false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Token parsing failed:', error);
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, bookings, loading, login, logout, setUser, fetchBookings }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
