'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import User from '@/types/User';
import Booking from '@/types/Booking';

type AuthContextType = {
    user: User | null;
    bookings: Booking[];
    loading: boolean;
    login: (token: string, userId: string) => void;
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
        fetch(`/api/bookings/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setBookings(data.bookings || []);
            })
            .catch(() => setBookings([]));
    };

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const userId = tokenPayload ? tokenPayload.userId : null;

        if (token && userId) {
            fetch(`/api/auth/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    setUser({ ...data.user, _id: data.user.id });
                    fetchBookings(userId, token);
                })
                .catch(() => {
                    setUser(null);
                    setBookings([]);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token: string, userId: string) => {
        localStorage.setItem('auth_token', token);
        fetch(`/api/auth/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setUser({ ...data.user, _id: data.user.id });
                fetchBookings(userId, token);
            });
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        setBookings([]);
        window.location.href = '/';
    };

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
