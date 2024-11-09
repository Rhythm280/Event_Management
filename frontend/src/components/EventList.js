import React, { useEffect, useState } from 'react';
import api from '../api';

function EventList() {
    const [events, setEvents] = useState([]);

    // Fetch events when the component loads
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    // Delete event function
    const deleteEvent = async (id) => {
        console.log('Attempting to delete event with ID:', id);
        try {
            await api.delete(`/events/${id}`);
            setEvents(events.filter(event => event._id !== id)); // Update state after deleting
            console.log('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };
    return (
        <div className="eventList">
            <h2 className="heading2">Event List:</h2>
            {events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <ol>
                    {events.map(event => (
                        <li key={event._id}>
                            <div className="title">
                                <h3>{event.title}</h3>
                            </div>
                            <div className="description">
                                <p>{event.description}</p>
                            </div>
                            <div className="date">
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                            <button
                                className="delete"
                                onClick={() => deleteEvent(event._id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}

export default EventList;
