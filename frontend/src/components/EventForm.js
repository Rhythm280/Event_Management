import React, { useState } from 'react';
import api from '../api';

function EventForm() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/', { title, date, description });
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <button type="submit">Add Event</button>
        </form>
    );
}

export default EventForm;
