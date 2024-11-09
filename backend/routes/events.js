const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// Add a new event
router.post('/', async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newEvent = new Event({ title, description, date });
        await newEvent.save();
        res.json(newEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error adding event' });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event' });
    }
});

module.exports = router;
