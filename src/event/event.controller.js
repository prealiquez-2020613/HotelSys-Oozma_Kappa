import Event from './event.model.js'

export const createEvent = async (req, res) => {
    try {
        const { hotel, title, description, date } = req.body

        const existingEvent = await Event.findOne({ date })
        if (existingEvent) {
            return res.status(400).send({ success: false, message: "There is already an event for this date" })
        }

        const newEvent = new Event({
            hotel,
            title,
            description,
            date
        })

        await newEvent.save()

        return res.status(201).send({ success: true, message: "Event created successfully", event: newEvent })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: "Error creating event", error: err.message })
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()

        if (!events.length) {
            return res.status(404).send({ success: false, message: "There are no registered events" })
        }

        return res.send({ success: true, message: "Events successfully recovered", events })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error getting events", error: err.message })
    }
}

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params

        const event = await Event.findById(id)

        if (!event) {
            return res.status(404).send({ success: false, message: "Event not found" })
        }

        return res.send({ success: true, message: "Event successfully recovered", event })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error getting event", error: err.message })
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params
        const { hotel, title, description, date, status } = req.body

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { hotel, title, description, date, status },
            { new: true, runValidators: true }
        )

        if (!updatedEvent) {
            return res.status(404).send({ success: false, message: "Event not found" })
        }

        return res.send({ success: true, message: "Event updated successfully", event: updatedEvent })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error updating event", error: err.message })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params

        const deletedEvent = await Event.findByIdAndDelete(id)

        if (!deletedEvent) {
            return res.status(404).send({ success: false, message: "Event not found" })
        }

        return res.send({ success: true, message: "Event successfully deleted", event: deletedEvent })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error deleting event", error: err.message })
    }
}