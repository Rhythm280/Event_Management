import React, { useState } from 'react';
import api from '../api';

function EventForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = { title, description, date };
            await api.post('/events', newEvent); // Make sure this matches your backend route
            setTitle('');
            setDescription('');
            setDate('');
            window.location.reload(); // Refresh to update the list
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <button type="submit">Add Event</button>
        </form>
    );
}

export default EventForm;
