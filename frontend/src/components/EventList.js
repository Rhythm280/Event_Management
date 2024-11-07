import React, { useEffect, useState } from 'react';
import api from '../api';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await api.get('/');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Events</h2>
            {events.map((event) => (
                <div key={event._id}>
                    <h3>{event.title}</h3>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    );
}

export default EventList;
