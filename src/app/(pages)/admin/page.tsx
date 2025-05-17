'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

type Event = {
    _id: string;
    nameEN: string;
    nameAR: string;
    descriptionEN: string;
    descriptionAR: string;
    categoryEN: string;
    categoryAR: string;
    venue: string;
    price: number;
    date: string;
    image: string;
};

export default function AdminPanel() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [modalType, setModalType] = useState<'view' | 'edit' | 'create' | 'delete-confirm' | null>(null);
    const [form, setForm] = useState<Partial<Event>>({});

    const fetchEvents = async () => {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(data.events);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createEvent = async () => {
        console.log(form);
        const res = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            setForm({});
            setModalType(null);
            fetchEvents();
        }
    };

    const updateEvent = async () => {
        if (!selectedEvent) return;
        const res = await fetch(`/api/events/${selectedEvent._id}`, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            setForm({});
            setModalType(null);
            setSelectedEvent(null);
            fetchEvents();
        }
    };

    const deleteEvent = async () => {
        if (!selectedEvent) return;
        const res = await fetch(`/api/events/${selectedEvent._id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            setModalType(null);
            setSelectedEvent(null);
            fetchEvents();
        }
    };

    return (
        <div className="min-h-screen p-8 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Events</h1>

            <Button onClick={() => { setForm({}); setModalType('create'); }}>+ Create Event</Button>

            <table className="w-full border-collapse border mt-4">
                <thead>
                    <tr>
                        <th className="border p-2">Name (EN)</th>
                        <th className="border p-2">Category (EN)</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td className="border p-2">{event.nameEN}</td>
                            <td className="border p-2">{event.categoryEN}</td>
                            <td className="border p-2">{new Date(event.date).toLocaleDateString('en-GB')}</td>
                            <td className="border p-2">{event.price}</td>
                            <td className="border p-2 space-x-2">
                                <Button size="sm" onClick={() => { setSelectedEvent(event); setModalType('view'); }}>View</Button>
                                <Button size="sm" variant="outline" onClick={() => { setSelectedEvent(event); setForm(event); setModalType('edit'); }}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => { setSelectedEvent(event); setModalType('delete-confirm'); }}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View, Edit, Create, Delete Confirmation Modals */}
            {(modalType && selectedEvent) || modalType === 'create' ? (
                <Dialog open onOpenChange={() => { setModalType(null); setSelectedEvent(null); }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {modalType === 'view' && `Event Details: ${selectedEvent?.nameEN}`}
                                {modalType === 'edit' && `Edit Event: ${selectedEvent?.nameEN}`}
                                {modalType === 'create' && 'Create New Event'}
                                {modalType === 'delete-confirm' && `Confirm Deletion`}
                            </DialogTitle>
                        </DialogHeader>

                        {/* View Modal */}
                        {modalType === 'view' && selectedEvent && (
                            <div className="space-y-2">
                                <p><strong>Name AR:</strong> {selectedEvent.nameAR}</p>
                                <p><strong>Category EN:</strong> {selectedEvent.categoryEN}</p>
                                <p><strong>Category AR:</strong> {selectedEvent.categoryAR}</p>
                                <p><strong>Description EN:</strong> {selectedEvent.descriptionEN}</p>
                                <p><strong>Description AR:</strong> {selectedEvent.descriptionAR}</p>
                                <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                                <p><strong>Price:</strong> {selectedEvent.price}</p>
                                <p><strong>Date:</strong> {selectedEvent.date}</p>
                                <p><strong>Image:</strong> {selectedEvent.image}</p>
                            </div>
                        )}

                        {/* Edit & Create Modals */}
                        {(modalType === 'edit' || modalType === 'create') && (
                            <div className="space-y-2">
                                {['nameEN', 'nameAR', 'descriptionEN', 'descriptionAR', 'categoryEN', 'categoryAR', 'venue', 'image'].map(key => (
                                    <Input
                                        key={key}
                                        name={key}
                                        placeholder={key}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        value={(form as any)[key] || ''}
                                        onChange={handleChange}
                                    />
                                ))}
                                <Input
                                    name="price"
                                    type="number"
                                    placeholder="Price"
                                    value={form.price ?? ''}
                                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                />
                                <Input
                                    name="date"
                                    type="date"
                                    value={form.date || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {/* Delete Confirmation */}
                        {modalType === 'delete-confirm' && selectedEvent && (
                            <p>Are you sure you want to delete <strong>{selectedEvent.nameEN}</strong>?</p>
                        )}

                        <DialogFooter>
                            {modalType === 'create' && (
                                <Button onClick={createEvent}>Create Event</Button>
                            )}
                            {modalType === 'edit' && (
                                <Button onClick={updateEvent}>Save Changes</Button>
                            )}
                            {modalType === 'delete-confirm' && (
                                <Button variant="destructive" onClick={deleteEvent}>Confirm Delete</Button>
                            )}
                            <Button variant="outline" onClick={() => setModalType(null)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ) : null}
        </div>
    );
}
