import React, { useEffect, useState } from 'react';
import api from '../api';

function EventList() {
    const [events, setEvents] = useState([]);

    // Fetch all events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/api/events'); // Use your custom Axios instance
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    // Delete event function
    const deleteEvent = async (id) => {
        try {
            await api.delete(`/api/events/${id}`); // Use your custom Axios instance
            // Update the state to remove the deleted event
            setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
            // alert('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
            // alert('Failed to delete event');
        }
    };

    return (
        <div className='eventList'>
            <h2 className='heading2'>Event List:</h2>
            <ol>
                {events.length > 0 ? (
                    events.map(event => (
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
                            <button className='delete' onClick={() => deleteEvent(event._id)}>
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </ol>
        </div>
    );
}

export default EventList;
