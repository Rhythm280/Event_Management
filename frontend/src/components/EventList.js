import React, { useEffect, useState } from 'react';
import api from '../api';
import axios from 'axios';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await api.get('/');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            setEvents(events.filter(event => event._id !== id)); // Remove the deleted event from state
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className='eventList'>
            <h2 className='heading2'>Event List:</h2>
            <ol>
                {events.map(event => (
                    <li key={event._id}>
                        <div className="title">
                            <h3>{event.title}</h3>
                        </div>
                        <div className='description'>
                            <p>{event.description}</p>
                        </div>
                        <div className="date">
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                        <button className='delete' onClick={() => deleteEvent(event._id)}>Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default EventList;
