import React from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
    return (
        <div className="App">
            <h1>Event Management System</h1>
            <EventForm />
            <EventList />
        </div>
    );
}

export default App;