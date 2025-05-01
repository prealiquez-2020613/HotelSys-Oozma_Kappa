import Event from './event.model.js'
import Service from '../service/service.model.js'
import Resource from '../resource/resource.model.js'

export const createEvent = async (req, res) => {
    try {
        const { hotel, title, description, date, resources = [], services = [], category } = req.body

        // Validar categoría base
        const categoryBasePrices = {
            WEDDING: 1500,
            BIRTHDAY: 1200,
            BUSINESS: 2000
        }

        const basePrice = categoryBasePrices[category?.toUpperCase()]
        if (!basePrice) {
            return res.status(400).send({ success: false, message: 'Invalid event category' })
        }

        // Convertir a arrays (por si vienen como strings)
        const serviceArray = Array.isArray(services)
            ? services
            : typeof services === 'string'
                ? services.split(',').map(s => s.trim())
                : []

        const resourceArray = Array.isArray(resources)
            ? resources
            : typeof resources === 'string'
                ? resources.split(',').map(r => r.trim())
                : []

        // Obtener precios de services
        const serviceDocs = await Service.find({ _id: { $in: serviceArray } })
        const serviceTotal = serviceDocs.reduce((acc, s) => acc + s.price, 0)

        // Obtener precios de resources
        const resourceDocs = await Resource.find({ _id: { $in: resourceArray } })
        const resourceTotal = resourceDocs.reduce((acc, r) => acc + r.price, 0)

        // Calcular precio final
        const totalPrice = basePrice + serviceTotal + resourceTotal

        const event = new Event({
            hotel,
            title,
            description,
            date,
            category: category.toUpperCase(),
            services: serviceArray,
            resources: resourceArray,
            price: totalPrice
        })

        await event.save()

        return res.send({
            success: true,
            message: 'Event created successfully',
            event
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error creating event', err })
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