import Service from './service.model.js'
import Hotel from '../hotel/hotel.model.js'

// CREAR SERVICIO
export const saveService = async (req, res) => {
    try {
        const service = new Service(req.body)
        await service.save()
        return res.send({ success: true, message: 'Service created successfully', service })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error saving service', error })
    }
};

// ACTUALIZAR SERVICIO
export const updateService = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const service = await Service.findByIdAndUpdate(id, data, { new: true });
        
        return res.send({ success: true, message: 'Service updated successfully', service })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error updating service', error })
    }
};

// ELIMINAR SERVICIO
export const deleteService = async (req, res) => {
    try {
        const id = req.params.id
        const deleteService = await Service.findByIdAndDelete(id)
        
        return res.send({ message: 'Service deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General Error', err })
    }
};

// OBTENER TODOS LOS SERVICIOS
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('hotel', 'name address')
        if (services.length === 0) return res.status(404).send({ success: false, message: 'No services found' })
        
        return res.send({ success: true, message: 'Services found', services })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error retrieving services', error })
    }
};

// OBTENER SERVICIO POR ID
export const getService = async (req, res) => {
    try {
        const { id } = req.params
        const service = await Service.findById(id).populate('hotel', 'name address')
        if (!service) return res.status(404).send({ success: false, message: 'Service not found' })
        
        return res.send({ success: true, message: 'Service found', service })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error retrieving service', error })
    }
};

// OBTENER SERVICIOS POR HOTEL
export const getServicesByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params
        const services = await Service.find({ hotel: hotelId })
        if (services.length === 0) return res.status(404).send({ success: false, message: 'No services found for this hotel' })
        
        return res.send({ success: true, message: 'Hotel services found', services })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error retrieving hotel services', error })
    }
}